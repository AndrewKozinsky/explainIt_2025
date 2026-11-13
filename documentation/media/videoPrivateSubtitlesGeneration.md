# Автоматическая генерация субтитров для приватных видео

## Что делает функционал

Пользователь загружает своё видео (`Video` с `type = private`) и может запустить автоматическую генерацию субтитров.
Сервер ставит задачу в очередь BullMQ, отдельный worker скачивает видео из S3 (Cloudflare R2), извлекает аудио через
`ffmpeg`, отправляет его в Deepgram Nova-3 Speech-to-Text, собирает SRT и сохраняет его как субтитры видео.

Перед запуском проверяется баланс владельца (402 `BALANCE_EXHAUSTED`), после распознавания с него списывается
стоимость Deepgram по длительности аудио ([billing.md](../topics/billing.md)).

Результат сохраняется в те же поля и связи, что и при ручной загрузке SRT:

- `Video.original_content` — сгенерированный SRT;
- `Video.processed_content` — очищенный текст субтитров;
- `Video.content_type = 'subtitles'`;
- `Video.subtitles_source = 'llm'`, `Video.subtitles_status = 'done'`;
- `Subtitle`, `Sentence`, `SubtitleSentenceInit` — пересозданные связи субтитров и предложений.

Та же очередь и тот же worker обрабатывают YouTube-видео — см. раздел «YouTube-видео в той же очереди».

## Пользовательский поток

1. Пользователь создаёт приватное видео и загружает видеофайл в S3. Длительность (`durationSec`) клиент передаёт при
   создании видео.
2. У видео должен быть указан язык (`source_language_code`).
3. Пользователь нажимает «Сгенерировать субтитры».
4. Сервер проверяет владельца, факт загрузки файла, язык и ненулевую длительность.
5. Сервер переводит видео в `pending`, ставит задачу в BullMQ и возвращает статус.
6. Клиент опрашивает статус генерации.
7. Worker выполняет распознавание и сохраняет субтитры.
8. После успеха статус становится `done`, страница видео перезагружает данные и показывает субтитры.

## Доменная модель

### Поля `Video`, связанные с субтитрами

- `subtitles_source` (`SubtitlesSource`) — кто создал субтитры: `user` (ручная загрузка), `youTube`, `llm`
  (автоматическое распознавание).
- `subtitles_status` (`SubtitlesStatus`) — статус обработки субтитров.
- `subtitles_error_code` — машиночитаемый код ошибки последней неудачной попытки.
- `subtitles_job_id` — id BullMQ job.
- `duration_sec` — длительность видео в секундах; для запуска генерации должна быть больше нуля.

### `SubtitlesStatus`

- `idle` — генерация ещё не запускалась;
- `pending` — задача поставлена в очередь, worker ещё не начал обработку;
- `processing` — worker обрабатывает видео;
- `done` — субтитры сохранены;
- `failed` — генерация завершилась ошибкой.

## Как работает сервер

### REST API

Маршруты в `server/src/routes/video/video.controller.ts`, префикс `/video`:

| Маршрут | Guard | Назначение |
|---|---|---|
| `POST /video/:id/generate-subtitles` | `CheckSessionCookieGuard` | запустить генерацию, вернуть статус |
| `GET /video/:id/subtitles-status` | — | текущий статус субтитров видео |

Оба маршрута возвращают `VideoSubtitlesStatusOutModel`
(`server/src/models/video/videoSubtitlesStatus.out.model.ts`):

- `videoId` — id видео;
- `source` — `SubtitlesSource`;
- `status` — `SubtitlesStatus`;
- `errorCode` — код ошибки или `null`;
- `jobId` — id BullMQ job или `null`.

Клиентские функции генерирует Orval в `face/shared/api/generated/video/video.ts`.

### CQRS handlers

#### `StartGenerateSubtitlesHandler` (`GenerateSubtitlesCommand`)

1. Загружает состояние через `VideoRepository.getSubtitlesState`.
2. Проверяет, что видео существует (`video.notFound`).
3. Проверяет, что текущий пользователь — владелец (`user.isNotOwner`).
4. Проверяет, что файл загружен (`isFileUploaded` и `fileS3Key`).
5. Проверяет, что указан язык.
6. Проверяет, что `durationSec` не нулевая.
7. Атомарно переводит статус в `pending` через `tryStartSubtitlesProcessing`: `updateMany` с условием «владелец
   совпадает и статус не `pending`/`processing`». Если ни одна строка не обновилась — `subtitlesGenerationAlreadyRunning`.
8. Ставит задачу в очередь через `SubtitlesGenerationQueue.enqueue` с `source: 'userUpload'`. Если постановка упала —
   статус `failed` с кодом `QUEUE_ENQUEUE_FAILED`, ошибка пробрасывается дальше.
9. Сохраняет `jobId` и возвращает статус `pending`.

#### `GetSubtitlesGenerationStatusHandler`

Загружает состояние, проверяет существование видео и возвращает `VideoSubtitlesStatusOutModel`. Владельца не
проверяет.

## Очередь и worker

### Зачем отдельный worker

Генерация может занимать минуты: нужно скачать видео, прогнать `ffprobe`, извлечь аудио, дождаться Deepgram и
пересобрать текстовые связи. Поэтому работа вынесена из HTTP-процесса в отдельный worker.

Worker запускается из `server/src/main.worker.ts` через `NestFactory.createApplicationContext(WorkerModule)`. Он не
поднимает HTTP-сервер и не импортирует `AppModule`.

### BullMQ

Очередь `QueueNames.SUBTITLES_GENERATION`, имя job — `generate`.

`SubtitlesGenerationQueue.enqueue` формирует `jobId` вида `video-s3-<videoId>-<timestamp>` (для YouTube —
`video-youtube-…`). Метка времени позволяет повторный запуск после `failed`; от параллельных запусков защищает
DB-переход в `pending`.

Настройки очереди (`queues.module.ts`):

- `attempts: 3`;
- exponential backoff с задержкой 30 секунд;
- `removeOnComplete: { count: 100 }`;
- `removeOnFail: { count: 500 }`.

### `SubtitlesGenerationProcessor`

Обрабатывает задачи с `concurrency: 1`. Проверяет имя job и по `job.data.source` выбирает стратегию:
`userUpload` → `S3SubtitlesStrategy`, `youTube` → `YoutubeSubtitlesStrategy`.

### `S3SubtitlesStrategy`

1. Повторно загружает состояние видео и проверяет существование, владельца, файл и язык.
2. Переводит видео в `processing`.
3. Создаёт временную папку в `generateSubtitles.tmpDir` (`/tmp/subs`).
4. Потоково скачивает исходное видео из R2 через `GetObjectCommand` (`downloadS3File.ts`).
5. Измеряет длительность через `ffprobe`.
6. Проверяет лимит `generateSubtitles.maxVideoSeconds` (2 часа).
7. Извлекает аудио через `ffmpeg` в WAV: mono, 16 kHz.
8. Отправляет WAV в `DeepgramSttService.transcribe`; пустой результат считается ошибкой.
9. Собирает SRT через `SubtitlesService.utterancesToSrt`.
10. Вызывает `UpdateVideoCommand` с `originalContent = srt`, `subtitlesSource: 'llm'`, `subtitlesStatus: 'done'`.
11. В `finally` удаляет временную папку.

При ошибке стратегия определяет код через `classifyError`, пишет `failed` и `subtitles_error_code` (если видео
существует) и пробрасывает ошибку в BullMQ для retry.

### YouTube-видео в той же очереди

`CreateYoutubeVideoCommand` после создания YouTube-видео ставит задачу с `source: 'youTube'`.
`YoutubeSubtitlesStrategy` скачивает аудиодорожку через `YoutubeService.downloadAudio`, конвертирует её в WAV, распознаёт
через Deepgram, сохраняет SRT и затем анализирует субтитры через LLM (`analyzeVideoMetadata`), сохраняя уровень
сложности, тему и `learnabilityScore`.

## Deepgram STT

Интеграция — `DeepgramSttModule` и `DeepgramSttService` (`server/src/infrastructure/deepgramStt/`).

`DeepgramSttService.transcribe` принимает путь к файлу или поток и вызывает prerecorded API:

- endpoint: `https://api.deepgram.com/v1/listen`;
- `model=nova-3`;
- `detect_language=true` — язык определяется автоматически, `languageCode` видео в запрос не передаётся;
- `punctuate=true`, `smart_format=true`;
- `utterances=true`, `utt_split=1.2`;
- `diarize=false`.

Файл отправляется потоком с диска, чтобы не держать весь WAV в памяти. Если Deepgram не вернул `utterances`, но в
`channels[0].alternatives[0]` есть текст, из него собирается одна utterance. Пустые utterances отбрасываются.

Ключ — `DEEPGRAM_API_KEY` (пример в `docker/.env.example`).

## Работа с SRT и текстовыми связями

Deepgram возвращает utterance-сегменты со временем и словами. `SubtitlesService.utterancesToSrt` делит их на реплики по
предложениям, сортирует по времени и собирает стандартный SRT; конец каждой реплики сдвигается на 1 мс, чтобы не
совпадать с началом следующей:

```text
1
00:00:01,230 --> 00:00:04,499
First recognized phrase.

2
00:00:04,900 --> 00:00:06,699
Second recognized phrase.
```

SRT сохраняется не напрямую в репозитории, а через `UpdateVideoCommand`, который переиспользует общую логику ручной
загрузки:

- определяет, что `originalContent` — SRT;
- парсит SRT и формирует `processedContent`;
- делит текст на `Sentence` через NLP-контейнер;
- пересоздаёт `Subtitle` и связи `SubtitleSentenceInit`.

## Как работает клиент

- `face/entities/video/VideosService.ts` — `generateSubtitles(id)` и `getSubtitlesStatus(id)` поверх `VideosRepository`.
- `face/widgets/privateVideo/GenerateSubtitlesBlock/` и `GenerateSubtitlesButton/` — кнопка запуска.
  `GenerateSubtitlesButton/fn/useGenerateSubtitles.ts` вызывает `generateSubtitles`, затем каждые 1,5 секунды
  опрашивает `getSubtitlesStatus` до `done` или `failed`; при `failed` сохраняет `errorCode`. Ошибку запуска показывает
  уведомлением.
- `face/_pages/media/video/VideoPage/fn/usePollVideoSubtitlesStatus.ts` — на странице видео, пока статус `pending` или
  `processing`, каждые 2 секунды опрашивает `getSubtitlesStatus` (без полной перезагрузки видео, чтобы не менять
  подписанный URL файла). При переходе в `done`/`failed` один раз вызывает `refetch` данных видео.

## Ошибки

Ключи из `errorMessage.video`:

- `notFound` — видео не найдено.
- `subtitlesGenerationAlreadyRunning` — генерация уже `pending` или `processing`.
- `subtitlesGenerationFileNotUploaded` — у видео нет загруженного файла.
- `subtitlesGenerationLanguageRequired` — у видео не указан язык.
- `subtitlesGenerationDurationRequired` — у видео нулевая длительность.
- `subtitlesGenerationVideoTooLong` — видео длиннее лимита (код ошибки worker-а).
- `subtitlesGenerationFailed` — ошибка `ffmpeg`/`ffprobe` (код ошибки worker-а).
- `subtitlesAsrFailed` — ошибка или пустой ответ Deepgram (код ошибки worker-а).

Также используются `user.isNotOwner`, `youtube.videoNotFound`, `youtube.audioDownloadFailed`, `unknownError`.

`classifyError` (`subtitlesGeneration/utils/classifyError.ts`) сопоставляет текст ошибки worker-а с кодом, который
сохраняется в `subtitles_error_code`.

## Ограничения

- Нет прогресса в процентах: клиент видит только статусы.
- Worker-образ должен содержать `ffmpeg` и `ffprobe`.

## Как запустить локально

1. Убедиться, что в env-файле задан `DEEPGRAM_API_KEY`.
2. Поднять контейнеры через docker compose из `docker/` (например `docker-compose.local.dev.intl.yml`); worker — сервис
   `explainserverworkerlocaldev`, команда `npm run start:worker:dev`.
3. Создать приватное видео, загрузить файл и указать язык.
4. Нажать «Сгенерировать субтитры» и дождаться `done` или `failed`.

## Ключевые файлы

### Сервер

- `server/prisma/schema.prisma` — поля `subtitles_*` модели `Video`, enum `SubtitlesSource` и `SubtitlesStatus`.
- `server/src/routes/video/video.controller.ts` — маршруты `generate-subtitles` и `subtitles-status`.
- `server/src/routes/video/openAPI.decorators.ts` — OpenAPI-описания.
- `server/src/models/video/videoSubtitlesStatus.out.model.ts`.
- `server/src/features/video/subtitlesGeneration/GenerateSubtitles.command.ts`.
- `server/src/features/video/subtitlesGeneration/GetSubtitlesGenerationStatus.command.ts`.
- `server/src/features/video/subtitlesGeneration/SubtitlesGeneration.processor.ts`.
- `server/src/features/video/subtitlesGeneration/strategies/S3SubtitlesStrategy.ts`.
- `server/src/features/video/subtitlesGeneration/strategies/YoutubeSubtitlesStrategy.ts`.
- `server/src/features/video/subtitlesGeneration/downloadS3File.ts`.
- `server/src/features/video/subtitlesGeneration/shared/ffmpeg.utils.ts`.
- `server/src/features/video/subtitlesGeneration/shared/analyzeVideoMetadata.ts`.
- `server/src/features/video/subtitlesGeneration/utils/classifyError.ts`.
- `server/src/features/video/UpdateVideo.command.ts` — сохранение SRT и пересоздание связей.
- `server/src/repo/video/video.repository.ts` — `getSubtitlesState`, `tryStartSubtitlesProcessing`, `setSubtitlesStatus`.
- `server/src/infrastructure/subtitles/SubtitlesService.ts` — `utterancesToSrt`.
- `server/src/infrastructure/deepgramStt/deepgramStt.service.ts`, `deepgramStt.module.ts`.
- `server/src/infrastructure/queues/queues.module.ts` — регистрация очереди.
- `server/src/infrastructure/queues/subtitlesGeneration.queue.ts` — постановка задач.
- `server/src/infrastructure/queues/subtitlesGeneration.types.ts` — типы job.
- `server/src/infrastructure/queues/queueNames.ts`.
- `server/src/worker.module.ts`, `server/src/main.worker.ts` — worker.
- `server/src/infrastructure/mainConfig/mainConfig.service.ts` — `deepgram` и `generateSubtitles`.
- `server/src/infrastructure/exceptions/errorMessage.ts` — коды ошибок.

### Клиент

- `face/entities/video/VideosService.ts`, `face/entities/video/repository/VideosRepository.ts`.
- `face/widgets/privateVideo/GenerateSubtitlesBlock/`, `face/widgets/privateVideo/GenerateSubtitlesButton/`.
- `face/_pages/media/video/VideoPage/fn/usePollVideoSubtitlesStatus.ts`.

### Docker / запуск

- `server/Dockerfile.worker.dev`, `server/Dockerfile.worker.server` — worker-образы с `ffmpeg`.
- `server/package.json` — `start:worker:dev`, `start:worker:prod`.
- `docker/.env.example` — `DEEPGRAM_API_KEY`.
