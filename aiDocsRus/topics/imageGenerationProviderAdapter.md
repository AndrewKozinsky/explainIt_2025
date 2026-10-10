# Универсальный адаптер генерации изображений

Этап 1 реализован 10 октября 2026 года. Папка: `server/src/infrastructure/imageGenerationProviderAdapter`.
Адаптер работает с любыми изображениями и не зависит от диалогов, NPC, спрайтов, БД, R2, BullMQ или SSE.
Текстовый `llmProviderAdapter` не расширяется.

## Общий контракт

`ImageGenerationAdapterService` выбирает поставщика по точному имени обязательной модели.
Дефолта, подмены модели/параметров, автоматических повторов внешних вызовов и fallback нет.

`ImageGenerationInput`:

- `model`, `prompt`;
- необязательные упорядоченные `references`: исходные `Buffer`-байты, `mimeType`, назначение `purpose`;
- `size`: либо `{ width, height }` в пикселях, либо `{ aspectRatio, resolution }` с именованным режимом площади;
- необязательные `quality`, `format` (`png`/`jpeg`/`webp`), `abortSignal`.

Поставщик валидирует свой поддерживаемый набор до HTTP. `validateInput` можно вызвать до резервирования
отправки у потребителя. `isConfigured(model)` проверяет наличие настройки без внешнего запроса,
но не подтверждает доступность API, баланс или права аккаунта.

`generate(input)` делает одну отправку и возвращает `ImageGenerationResult`:

- `ready`: массив исходных изображений `{ bytes, contentType }`;
- `pending`: `operation` с `provider`, `model`, `version` и JSON-объектом `data`.

Потребитель сохраняет реквизиты pending и передаёт их в `resume(operation, abortSignal)`.
`resume` делает один шаг без расписания/ожидания и возвращает общий результат. У поставщика этот метод
необязателен: синхронный API может сразу вернуть ready и не поддерживать восстановление.
Общий контракт не требует polling URL, request ID или другого конкретного поля.
Смена настройки модели не переадресует операцию: фасад проверяет соответствие provider/model.
Реквизиты сериализуемы, без ключей API, AbortSignal и байтов. URL операции могут содержать временные
параметры: их нельзя выводить в публичные ответы или диагностические ошибки.
Фактический MIME/геометрию результата проверяет потребитель перед публикацией.

## Ошибки и неопределённый исход

`ImageGenerationError` содержит безопасное сообщение, `code`, необязательный HTTP `statusCode` и `outcome`:

- `not_sent`: ошибка до отправки генерации (валидация, отсутствующая настройка, заранее отменённый запрос);
- `unknown`: отправка началась, но надёжный результат/реквизиты не получены;
- `existing_operation`: ошибка при продолжении известной операции.

Это описание отправки, а не политика повторов. При `unknown` автоматически отправлять новый платный запрос
нельзя. Отмена/тайм-аут после начала POST и некорректный ответ submit не доказывают отказ генератора.
При существующей операции можно повторять только продолжение с теми же реквизитами по политике потребителя.
Модерация и окончательный отказ имеют коды `moderated`/`operation_failed`.
Сырые ошибки Axios/SDK с конфигурацией и секретами наружу не передаются.

## Первая реализация: FLUX

`FluxImageGenerationProvider` использует существующий `Flux3ImageAdapter`, сохраняя HTTPS-проверки,
региональный BFL polling URL, обработку статуса задания в HTTP 503, ограничения скачивания и тайм-ауты.
AbortSignal передаётся в submit/poll/download. `resume` выполняет один poll и при Ready скачивает
исходные байты; временный sample URL не выдаётся как готовый результат общего фасада.

Поддерживается существующий набор: `flux-3-image`, `aspectRatio: 4:3 | 2:1`, `resolution: 768sq`,
до 10 референсов PNG/JPEG/WebP; `grounding: false` задаёт поставщик.
Точные пиксельные размеры, другое соотношение/разрешение, quality и явный output format отклоняются.
Набор не заявляет поддержку всех возможностей BFL: новые параметры требуют отдельной реализации.
Назначения референсов передаются нейтральными нумерованными инструкциями в промпте, поскольку текущий
FLUX-контракт не имеет отдельного поля назначения. Исходные байты передаются по порядку как data URI.

`ImageGenerationProviderModule` экспортирует фасад. Конфигурация использует существующий путь
`MainConfigService.getEnVariables()` → `get().blackForestLabs.apiKey`; прямого чтения process.env нет.
Модуль подключён в WorkerModule. HTTP сейчас не вызывает генерацию и не требует импорта этого модуля.
Сам импорт адаптера не запускает генерацию. OpenAI-поставщик на этапе 1 отсутствует.

## Диалоговый потребитель и совместимость

Промпты, назначение/порядок референсов, извлечение ячейки NPC, подготовка R2 и публикация остаются
в `features/aiDialogue/imageGeneration`. `buildImageGenerationInput` переводит проверенные data URI
в общий контракт байтов/MIME без перекодирования.

`startOrResumeFlux3Request.ts` и тесты перенесены из infrastructure в эту feature:
резервирование и сохранение внешних реквизитов относятся к потребителю.
Существующие `provider_request_id`/`provider_polling_url` хранят BFL-пару без изменения схемы.
`savedFluxOperation` восстанавливает общий envelope версии 1 для старых заданий. При сохранённой паре
worker не перестраивает промпт/референсы и не делает POST. Неопределённый submit блокирует повторную отправку,
включая сбой сохранения принятого запроса. Ошибка публикации продолжает тот же запрос.
Диалоговый потребитель на этапе 1 остаётся BFL-only; поддержка синхронного ready и его устойчивого сохранения
будет отдельной частью этапа OpenAI. Универсальный контракт уже допускает такой результат.

## Проверки этапа

`npm run build`, `npx tsc --noEmit --incremental false`, `npm test`, `git diff --check`: 234 теста проходят в 30 наборах,
14 существующих тестов в 9 наборах пропущены. Внешние HTTP, репозитории и хранилище подменяются.
Проверены выбор модели, синхронный ready без polling URL, неподдерживаемое восстановление,
сериализация операции, строгая валидация до claim/HTTP, референсы и AbortSignal,
модерация/терминальные ответы, неопределённый submit, старые запросы и единственный POST
при конкурентных попытках. Изолированный настоящий Nest TestingModule подтвердил регистрацию фасада
с подменённым MainConfigService без внешних запросов.

БД/миграции, реальные R2/Redis и платные генерации не использовались. Клиент не менялся, коммит не создавался.
Этап 2 начинается только после просмотра и подтверждения: актуальная официальная документация OpenAI,
согласование модели и обработка отличий восстановления/публикации синхронного результата.

## Изменённые файлы этапа 1

В `server/src/infrastructure/imageGenerationProviderAdapter/` добавлены:

- `ImageGenerationProvider.interface.ts`;
- `ImageGenerationError.ts`;
- `ImageGenerationAdapter.service.ts` и `ImageGenerationAdapter.service.spec.ts`;
- `FluxImageGenerationProvider.ts` и `FluxImageGenerationProvider.spec.ts`;
- `imageGenerationProvider.module.ts`.

В `server/src/features/aiDialogue/imageGeneration/` изменены:

- `GenerateAiDialogueImage.service.ts` и `GenerateAiDialogueImage.service.spec.ts`;
- `buildImageGenerationPrompt.ts` и `buildImageGenerationPrompt.spec.ts`;
- `startOrResumeFlux3Request.ts` и `startOrResumeFlux3Request.spec.ts` — перенесены из `infrastructure/fluxImageGeneration/` и адаптированы к общему фасаду.

Также изменены:

- `server/src/infrastructure/fluxImageGeneration/flux3Image.adapter.ts`;
- `server/src/repo/aiDialogue/imageGenerationRequest.repository.ts`;
- `server/src/worker.module.ts`;
- `CLAUDE.md`;
- `aiDocsRus/topics/aiDialogue/aiDialogue.md`;
- `aiDocsRus/topics/aiDialogue/aiDialogueImages.md`;
- этот новый документ `aiDocsRus/topics/imageGenerationProviderAdapter.md`.

Существующее пользовательское изменение `.DS_Store` сохранено, агент его не редактировал.
