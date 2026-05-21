# Автоматическая генерация субтитров для приватных видео

## Что делает функционал
Пользователь загружает приватное видео (`VideoPrivate`) и может запустить автоматическую генерацию субтитров. Сервер ставит задачу в очередь, отдельный worker скачивает видео из S3, извлекает аудио через `ffmpeg`, отправляет его в Deepgram Nova-3 Speech-to-Text, собирает SRT и сохраняет его как текст субтитров видео.

Функционал работает **только для приватных видео**. Публичные видео (`VideoPublic`) не участвуют в этом пайплайне.

Результат сохраняется в те же поля и связи, что и при ручной загрузке SRT:
- `VideoPrivate.original_content` — сгенерированный SRT;
- `VideoPrivate.processed_content` — очищенный текст субтитров;
- `VideoPrivate.content_type = 'subtitles'`;
- `Subtitle`, `Sentence`, `SubtitleSentenceInit` — пересозданные связи субтитров и предложений.

## Пользовательский поток

1. Пользователь создаёт приватное видео и загружает видеофайл в S3.
2. У видео должен быть указан `languageCode`.
3. Пользователь нажимает «Сгенерировать субтитры».
4. Сервер проверяет владельца, факт загрузки файла, язык, известную длительность и баланс на сумму предварительной стоимости.
5. Сервер списывает предварительную стоимость, сохраняет сумму списания, создаёт задачу в BullMQ и возвращает статус `pending`.
6. Клиент периодически опрашивает статус генерации.
7. Worker выполняет распознавание и сохраняет субтитры.
8. После успеха статус становится `done`, а пользователь видит видео уже с субтитрами.

## Доменная модель

### Новые поля `VideoPrivate`

- `subtitles_generation_status` — статус жизненного цикла генерации.
- `subtitles_generation_error` — текст ошибки последней неудачной попытки.
- `subtitles_generation_started_at` — время запуска текущей/последней задачи.
- `subtitles_generation_job_id` — id BullMQ job.
- `file_duration_sec` — длительность загруженного видео в секундах, используется для предварительного расчёта стоимости.
- `subtitles_generation_charge_kopecks` — сумма, списанная перед запуском текущей попытки генерации.
- `subtitles_generation_refunded_at` — время возврата предоплаты, если генерация завершилась ошибкой.

### `SubtitlesGenerationStatus`

Возможные значения:
- `idle` — генерация ещё не запускалась;
- `pending` — задача поставлена в очередь, worker ещё не начал обработку;
- `processing` — worker обрабатывает видео;
- `done` — субтитры успешно сгенерированы и сохранены;
- `failed` — генерация завершилась ошибкой.

## Как работает сервер

### GraphQL API

- **Mutation** `video_private_generate_subtitles(input: { videoId })` → `VideoPrivateSubtitlesStatusOutModel`. Запускает генерацию субтитров для приватного видео.
- **Query** `video_private_get_subtitles_generation_status(input: { videoId })` → `VideoPrivateSubtitlesStatusOutModel`. Возвращает текущий статус генерации.

Обе ручки требуют авторизации через `CheckSessionCookieGuard`. Мутация сама рассчитывает предварительную стоимость по сохранённой длительности видео и списывает её перед постановкой задачи в очередь.

### `VideoPrivateSubtitlesStatusOutModel`

- `videoId` — id видео;
- `status` — текущий `SubtitlesGenerationStatus`;
- `error` — текст ошибки или `null`;
- `startedAt` — ISO-время запуска задачи или `null`;
- `jobId` — id BullMQ job или `null`.

### CQRS handlers

#### `StartGenerateSubtitlesHandler`

Последовательность:
1. Загружает состояние видео через `VideoPrivateRepository.getSubtitlesGenerationState`.
2. Проверяет, что видео существует.
3. Проверяет, что текущий пользователь — владелец видео.
4. Проверяет, что файл загружен (`isFileUploaded` и `fileS3Key`).
5. Проверяет, что указан `languageCode`.
6. Проверяет, что сохранена `fileDurationSec`.
7. Рассчитывает стоимость по `fileDurationSec`.
8. Делает атомарный переход статуса в `pending` через `tryStartSubtitlesGeneration`.
9. Списывает рассчитанную сумму с баланса пользователя.
10. Сохраняет сумму списания в `subtitles_generation_charge_kopecks`.
11. Ставит задачу в BullMQ через `SubtitlesGenerationQueue.enqueue`.
12. Сохраняет `jobId` в `VideoPrivate`.
13. Возвращает `VideoPrivateSubtitlesStatusOutModel`.

Атомарный переход защищает от параллельных запусков: если статус уже `pending` или `processing`, повторный запуск не пройдёт.

#### `GetSubtitlesGenerationStatusHandler`

1. Загружает состояние генерации.
2. Проверяет существование видео.
3. Проверяет владельца.
4. Возвращает `VideoPrivateSubtitlesStatusOutModel`.

#### `ChargeSubtitlesGenerationHandler`

Содержит общий расчёт стоимости и может списывать деньги по длительности, но основной запуск генерации теперь списывает предварительную стоимость до постановки задачи в очередь:

`amount = ceil(durationSec * pricePerSecondInKopecks * asrMarkupMultiplier)`

Стоимость берётся из `MainConfigService`:
- `deepgram.pricePerSecondInKopecks` — цена Deepgram Nova-3, пересчитанная в копейки за секунду;
- `generateSubtitles.asrMarkupMultiplier` — наценка приложения.

Списание выполняется через `UserBalanceTransactionRepository.createCharge`.

## Очередь и worker

### Зачем отдельный worker

Генерация субтитров может занимать минуты: нужно скачать видео, прогнать `ffprobe`, извлечь аудио, дождаться Deepgram и пересобрать текстовые связи. Поэтому эта работа вынесена из HTTP/GraphQL процесса в отдельный worker.

Worker запускается из `server/src/main.worker.ts` через `NestFactory.createApplicationContext(WorkerModule)`. Он не поднимает HTTP-сервер и не импортирует `AppModule`.

### BullMQ

Используется очередь `QueueNames.SUBTITLES_GENERATION`.

`SubtitlesGenerationQueue.enqueue` ставит задачу с детерминированным `jobId` для видео. Это уменьшает риск дублей на уровне BullMQ. Дополнительно от дублей защищает DB-переход `idle|done|failed -> pending`.

Настройки очереди:
- `attempts: 3`;
- exponential backoff;
- удаление завершённых задач после лимита;
- хранение части failed-задач для диагностики.

### `SubtitlesGenerationProcessor`

Основной pipeline:

1. Проверяет имя job.
2. Переводит видео в статус `processing`.
3. Повторно загружает состояние видео и проверяет владельца, файл и язык.
4. Создаёт временную папку в `generateSubtitles.tmpDir` (`/tmp/subs`).
5. Скачивает исходное видео из Cloud.ru S3 потоково через `GetObjectCommand`.
6. Измеряет длительность через `ffprobe`.
7. Проверяет лимит длительности `generateSubtitles.maxVideoSeconds` (2 часа).
8. Извлекает аудио через `ffmpeg` в WAV: mono, 16 kHz.
9. Отправляет WAV в `DeepgramSttService.transcribeFile`.
10. Получает `utterances` и собирает SRT через `buildSrtFromUtterances`.
11. Вызывает `UpdatePrivateVideoCommand` с `originalContent = srt`.
12. Ставит статус `done`.
13. В `finally` удаляет временную папку.

Если любой шаг падает, processor пишет `failed` и сохраняет текст ошибки в `subtitles_generation_error`, затем пробрасывает ошибку в BullMQ для retry.

## Deepgram STT

Интеграция вынесена в `DeepgramSttModule` и `DeepgramSttService`, потому что сейчас используется только Speech-to-Text часть Deepgram.

`DeepgramSttService` вызывает prerecorded API:
- endpoint: `https://api.deepgram.com/v1/listen`;
- model: `nova-3`;
- `punctuate=true`;
- `smart_format=true`;
- `utterances=true`;
- `utt_split=1.2`;
- `diarize=false`.

Аудиофайл отправляется stream-ом с диска, чтобы не держать весь WAV в памяти.

Для работы нужен `DEEPGRAM_API_KEY` в env-файлах.

## Работа с SRT и текстовыми связями

Deepgram возвращает utterance-сегменты с `start`, `end` и `transcript`. `buildSrtFromUtterances` превращает их в стандартный SRT:

```text
1
00:00:01,230 --> 00:00:04,500
First recognized phrase.

2
00:00:04,900 --> 00:00:06,700
Second recognized phrase.
```

Дальше SRT сохраняется не напрямую в репозитории, а через уже существующий `UpdatePrivateVideoCommand`. Это важно, потому что он переиспользует общую логику:
- определяет, что `originalContent` похож на SRT;
- парсит SRT;
- формирует `processedContent`;
- пересоздаёт `Subtitle`;
- делит текст на `Sentence` через NLP-контейнер;
- создаёт связи `SubtitleSentenceInit`.

Так автогенерация и ручная загрузка SRT используют один формат данных.

## Баланс и стоимость

Для запуска требуется, чтобы на балансе хватало денег на предварительную стоимость генерации по сохранённой длительности видео.

Списание происходит **до постановки задачи в очередь**. Если постановка задачи в очередь или последняя попытка worker-а завершается ошибкой, сервер возвращает списанную сумму на баланс отдельной транзакцией `REFUND`.

Возврат защищён от дублей: перед созданием refund-транзакции сервер атомарно выставляет `subtitles_generation_refunded_at`. Повторный refund для той же попытки не создаётся.

Формула:

```text
ceil(durationSec * deepgram.pricePerSecondInKopecks * generateSubtitles.asrMarkupMultiplier)
```

На момент реализации:
- Deepgram Nova-3: `$0.0043 / min`;
- курс в конфиге: `110 ₽ / $`;
- наценка: `2x`;
- лимит видео: 2 часа.

Длительность берётся из `VideoPrivate.file_duration_sec`, которую клиент сохраняет при загрузке видео.

## Как работает клиент

На момент написания документа клиентская часть может быть реализована простым polling-потоком.

### Запуск генерации

1. Пользователь на странице редактирования/просмотра приватного видео нажимает «Сгенерировать субтитры».
2. Клиент вызывает:

```graphql
mutation {
  video_private_generate_subtitles(input: { videoId: 123 }) {
    videoId
    status
    error
    startedAt
    jobId
  }
}
```

3. Если вернулся `pending`, UI показывает состояние «Задача поставлена в очередь».

### Опрос статуса

Клиент периодически вызывает:

```graphql
query {
  video_private_get_subtitles_generation_status(input: { videoId: 123 }) {
    videoId
    status
    error
    startedAt
    jobId
  }
}
```

Рекомендуемый интервал polling: 1-3 секунды.

### Отображение состояний

- `idle` — показать кнопку запуска.
- `pending` — показать «Ожидает обработки».
- `processing` — показать «Генерируем субтитры».
- `done` — обновить данные видео (`video_private_get`) и показать субтитры.
- `failed` — показать `error` и кнопку повторного запуска.

## Ошибки

Ключи из `errorMessage.video`:
- `subtitlesGenerationAlreadyRunning` — генерация уже `pending` или `processing`.
- `subtitlesGenerationFileNotUploaded` — у видео нет загруженного файла.
- `subtitlesGenerationLanguageRequired` — у видео не указан язык.
- `subtitlesGenerationDurationRequired` — у видео нет сохранённой длительности.
- `subtitlesGenerationVideoTooLong` — видео длиннее допустимого лимита.
- `subtitlesGenerationFailed` — общая ошибка генерации.
- `subtitlesAsrFailed` — ошибка сервиса распознавания речи.

Общие ошибки:
- `userIsNotOwner` — пользователь не владелец приватного видео.
- `userUnauthorized` — нет авторизации.
- `insufficientBalanceForTranslation` — денег на балансе не хватает для списания рассчитанной стоимости.

Некоторые ошибки worker-а пишутся в `subtitles_generation_error` как технический текст: например ошибка `ffmpeg`, пустой ответ Deepgram или ошибка скачивания из S3.

## Ограничения и риски

### Только `VideoPrivate`

Пайплайн намеренно завязан на `VideoPrivate`. Для `VideoPublic` нет ручек, статусов и worker-задач.

### Идемпотентность списания

Списание происходит после сохранения SRT и перед установкой статуса `done`. Если редкий сбой случится после списания, но до записи `done`, BullMQ может повторить job и списать деньги повторно. Для полной идемпотентности можно добавить `idempotencyKey`/`jobId` в `UserBalanceTransaction` и запрещать повторное списание по одному job.

### Нет прогресса в процентах

Сейчас клиент видит только статусы `pending`/`processing`/`done`/`failed`. При необходимости можно добавить `job.updateProgress()` и поле прогресса в GraphQL output.

### Зависимость от ffmpeg в worker-образе

Worker Dockerfile должен устанавливать `ffmpeg`, потому что используются внешние команды `ffprobe` и `ffmpeg`.

## Как запустить локально

1. Убедиться, что в `.env.localdev` есть `DEEPGRAM_API_KEY`.
2. Пересобрать контейнеры:

```bash
docker compose -f docker-compose.local.dev.yml --env-file .env.localdev up --build
```

3. Проверить, что запущен worker-сервис.
4. Создать приватное видео, загрузить файл и указать язык.
5. Вызвать `video_private_generate_subtitles`.
6. Polling-ом ждать `done` или `failed`.

## Ключевые файлы

### Сервер

- `server/src/db/dbConfig/dbConfig.ts` — поля `subtitles_generation_*` и enum `SubtitlesGenerationStatus` у `VideoPrivate`.
- `server/src/routes/videoPrivate/videoPrivate.resolver.ts` — GraphQL mutation/query.
- `server/src/routes/videoPrivate/videoPrivate.module.ts` — регистрация CQRS handlers и repositories.
- `server/src/routes/videoPrivate/inputs/generateSubtitlesForPrivateVideo.input.ts`.
- `server/src/routes/videoPrivate/inputs/videoPrivateSubtitlesStatus.input.ts`.
- `server/src/models/videoPrivate/videoPrivateSubtitlesStatus.out.model.ts`.
- `server/src/features/video/subtitlesGeneration/StartGenerateSubtitles.command.ts`.
- `server/src/features/video/subtitlesGeneration/GetSubtitlesGenerationStatus.command.ts`.
- `server/src/features/video/subtitlesGeneration/ChargeSubtitlesGeneration.command.ts`.
- `server/src/features/video/subtitlesGeneration/SubtitlesGeneration.processor.ts`.
- `server/src/features/video/subtitlesGeneration/downloadS3File.ts`.
- `server/src/features/video/subtitlesGeneration/ffmpeg.utils.ts`.
- `server/src/features/video/subtitlesGeneration/buildSrtFromUtterances.ts`.
- `server/src/infrastructure/deepgramStt/deepgramStt.service.ts` — Deepgram Speech-to-Text client.
- `server/src/infrastructure/deepgramStt/deepgramStt.module.ts`.
- `server/src/infrastructure/queues/queues.module.ts` — BullMQ registration.
- `server/src/infrastructure/queues/subtitlesGeneration.queue.ts` — enqueue service.
- `server/src/infrastructure/queues/subtitlesGeneration.types.ts` — job types.
- `server/src/infrastructure/queues/queueNames.ts`.
- `server/src/worker.module.ts` — worker Nest module.
- `server/src/main.worker.ts` — worker entrypoint.
- `server/src/infrastructure/mainConfig/mainConfig.service.ts` — `deepgram` и `generateSubtitles` config.
- `server/src/infrastructure/exceptions/errorMessage.ts` — ошибки генерации субтитров.
- `server/src/infrastructure/guards/userWithPositiveBalanceGuard.guard.ts` — `UserWithMinBalanceGuard`.

### Docker / запуск

- `server/Dockerfile.worker.dev` — dev worker image с `ffmpeg`.
- `server/Dockerfile.worker.server` — prod worker image с `ffmpeg`.
- `server/package.json` — `start:worker:dev`, `start:worker:prod`.
- `.env.example` — `DEEPGRAM_API_KEY`.
