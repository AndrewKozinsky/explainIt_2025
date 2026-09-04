# Диалоги с ИИ (AiDialogue)

## Что делает функционал

Ролевой диалог пользователя с LLM на иностранном языке. Пользователь выбирает сценарий
(`AiDialogueScenario`) — например, визит к стоматологу — и в рамках **диалога** (`AiDialogue`)
обменивается с LLM репликами: LLM играет роль NPC (врача, офицера, администратора), ведёт сцену и
реагирует на действия пользователя.

- один сценарий → **много** диалогов (ограничения на пару `(user, scenario)` нет);
- диалог принадлежит **одному** пользователю;
- диалог — контейнер: у него нет текстовых полей, вся переписка хранится в `AiDialogueMessage`;
- **одно событие = одна строка** в `AiDialogueMessage` (реплика, смена сцены, подсказка и т. д.);
- `id` сообщения назначает **сервер** (autoincrement), а не LLM;
- обмен идёт по двум каналам: клиент → сервер через REST (`POST .../messages`), сервер → клиент через
  постоянный SSE-поток (`GET .../stream`).

Сценарии описаны отдельно — см. `aiDocsRus/topics/aiDialogueScenario.md`. Существующий SentenceChat к
этой фиче отношения не имеет.

## Доменная модель

### `AiDialogue` (контейнер)

| Поле          | Тип       | Описание                                                     |
|---------------|-----------|--------------------------------------------------------------|
| `id`          | `Int`     | Первичный ключ (autoincrement)                               |
| `scenario_id` | `Int`     | FK → `AiDialogueScenario.id`, `onDelete: Cascade`            |
| `user_id`     | `Int`     | FK → `User.id`, `onDelete: Cascade`                          |
| `summary`     | `String?` | Компактная сводка истории (JSON-строка, см. «Компакция»)     |
| `summary_up_to` | `Int`   | `id` последнего сообщения, покрытого сводкой (default `0`)   |
| `created_at` / `updated_at` | `DateTime` | Даты                                    |

### `AiDialogueMessage` (событие)

Одна строка = одно событие. Колонка `type` хранит дискриминатор события, `payload` — JSON-тело события
**без** поля `type` (ключи в camelCase).

| Поле         | Тип       | Описание                                                       |
|--------------|-----------|----------------------------------------------------------------|
| `id`         | `Int`     | Первичный ключ (autoincrement), назначается сервером           |
| `dialogue_id`| `Int`     | FK → `AiDialogue.id`, `onDelete: Cascade`                      |
| `type`       | enum `AiDialogueMessageType` | Дискриминатор события            |
| `payload`    | `String`  | JSON-тело события (без `type`)                                 |
| `created_at` | `DateTime`| Дата создания                                                  |

## Статус: что уже сделано

- Таблицы `AiDialogue` (+ колонки `summary`/`summary_up_to`) и `AiDialogueMessage` (миграция
  `20260903151732_add_ai_dialogue_message`).
- REST: создать диалог, список диалогов, удалить диалог, **отправить сообщение** (`POST .../messages`).
- SSE-поток `GET .../stream`: replay истории + подписка на новые события + запуск первого хода.
- Генерация хода LLM (стриминг + парсинг событий через `jsonrepair`), рассылка через in-memory шину.
- Фоновая компакция истории в `AiDialogue.summary` (append-only).
- Клиент: entity-слой `AiDialogue` (list/create/delete), секция «История диалогов», создание по клику на
  сценарий. **Страница самого диалога `/dialogues/{dialogId}` и клиентский слой сообщений — следующий шаг.**

## REST API

> Все пути ниже — относительны контроллера `@Controller('ai-dialogue')`. Фактический URL — с глобальным
> префиксом `/api/` (задан в `infrastructure/applyAppSettings.ts`: `app.setGlobalPrefix('api')`).
> SSE-соединение клиент открывает по `/api/ai-dialogue/:id/stream`.

Все эндпоинты требуют авторизации (`CheckSessionCookieGuard`).

```
POST   /ai-dialogue                body: { scenarioId } → 201 AiDialogueOutModel
GET    /ai-dialogue                → 200 AiDialogueOutModel[]
DELETE /ai-dialogue/:id            → 200 boolean
POST   /ai-dialogue/:id/messages   body: CreateAiDialogueMessageInput → 201 AiDialogueMessageOutModel
GET    /ai-dialogue/:id/stream     → SSE (Server-Sent Events)
```

`AiDialogueOutModel`:

```json
{
    "id": 1,
    "scenario": {
        "id": 1,
        "slug": "at-the-dentist",
        "title": "At the Dentist",
        "description": "Вы приходите на приём к стоматологу: ...",
        "languageCode": "en"
    },
    "createdAt": "2026-09-02T10:41:57.000Z",
    "updatedAt": "2026-09-02T10:41:57.000Z"
}
```

**Обрати внимание:** `system_prompt` сценария не попадает в ответ (как и в списке сценариев) — он не
отдаётся клиенту.

`AiDialogueMessageOutModel`:

```json
{
    "id": 10,
    "dialogueId": 1,
    "payload": { "type": "npcActions", "npcId": "...", "npcName": "...", "npcRole": "...", "emotion": "...", "actions": [{"type": "speech", "content": "..."}] },
    "createdAt": "2026-09-03T10:00:00.000Z"
}
```

### Создание диалога

- При создании передаётся `scenarioId`.
- Сценарий должен существовать (иначе `404` `AI_DIALOGUE_SCENARIO_NOT_FOUND`).
- Начать диалог можно только по **публичному** (`user_id === null`) или **своему** сценарию (иначе
  `403` `USER_IS_NOT_OWNER`).
- Повторные вызовы создают новые диалоги.

### Удаление диалога

- Проверяются существование (`404` `AI_DIALOGUE_NOT_FOUND`) и владение (`403` `USER_IS_NOT_OWNER`).
- Возвращает `true` (каскадно удаляются и сообщения).

### Отправка сообщения (действие пользователя)

`POST /ai-dialogue/:id/messages` — единственный канал «клиент → сервер». Клиент может отправить только
событие пользователя (`CreateAiDialogueMessageInput`):

```ts
type CreateAiDialogueMessageInput =
    | { type: 'userActions'; actions: AiDialogueActionItem[] }   // действия и реплики пользователя
    | { type: 'userAvoidsNPC' }                                   // пользователь ушёл от разговора
```

Хендлер проверяет существование и владение диалога, затем:

1. Если для диалога уже идёт генерация (`generationAlreadyActive`) — возвращает
   `400` `AI_DIALOGUE_GENERATION_ALREADY_ACTIVE` (нельзя действовать, пока NPC отвечает).
2. Иначе сохраняет сообщение и **fire-and-forget** запускает генерацию ответа (результат доедет через
   SSE).

## События диалога

Дискриминированный union `AiDialogueEvent` (в `types/aiDialogueMessage.ts`). `type` — дискриминатор.

| `type`          | Поля                                    | Кто генерирует        |
|-----------------|-----------------------------------------|-----------------------|
| `sceneUpdate`   | `newScene: string`                      | LLM                   |
| `npcActions`    | `npcId`, `npcName`, `npcRole`, `emotion`, `actions` | LLM   |
| `help`          | `help: string`                          | LLM                   |
| `worldEvent`    | `content: string`                       | LLM                   |
| `userActions`   | `actions`                               | клиент                |
| `userAvoidsNPC` | —                                       | клиент                |

`actions` — массив `AiDialogueActionItem = { type: 'action' | 'speech'; content: string }` (`action` —
невербальное действие, `speech` — реплика).

Сервер **сам** никогда не генерирует `userActions`/`userAvoidsNPC` от имени пользователя — эти два типа
выделены в отдельный тип `AiDialogueClientEvent`.

## SSE-протокол

`GET /api/ai-dialogue/:id/stream` — постоянное соединение (открывается один раз при открытии страницы
диалога). Каждый фрейм — `MessageEvent`, `data` которого — `AiDialogueStreamEvent`:

```
{ "type": "message",  "message": DialogueServerMessage }   // одно сохранённое сообщение
{ "type": "chunk",    "chunk": "..." }                     // сырой фрагмент ответа LLM (превью)
{ "type": "turnDone" }                                     // ход завершён (успех или ошибка)
{ "type": "turnError","error": "..." }                     // ход не удался
```

- `message` — используется и для **replay** истории (при подключении), и для новых событий. Обёртка
  `DialogueServerMessage = { id, dialogueId, createdAt, payload }`.
- `chunk` — сырой текст стрима LLM. Клиент показывает превью через partial-json; авторитетный разбор
  делает сервер (`jsonrepair` + `JSON.parse`) в конце стрима.
- `turnDone` — сигнал, что можно снова действовать (после каждого хода, даже при ошибке).

### Порядок при подключении

1. Клиент открывает SSE-соединение.
2. Сервер проверяет существование и владение диалога.
3. Подписывается на in-memory шину диалога (чтобы ловить события параллельной генерации).
4. Отдаёт **replay** всех сохранённых сообщений (дедуп по `id` — события, уже пришедшие через шину,
   не повторяются).
5. Если диалог «ждёт хода» (см. ниже) — запускает генерацию первого ответа.

Соединение не закрывается по завершении хода — оно живёт, пока открыта страница.

## Схема обработки (CQRS)

`AiDialogueController` вызывает через `CommandBus`:

- `CreateAiDialogueCommand` → проверка сценария → `AiDialogueRepository.createDialogue` →
  `AiDialogueQueryRepository.getDialogueById`.
- `GetUserDialoguesCommand` → `AiDialogueQueryRepository.getUserDialogues`.
- `DeleteAiDialogueCommand` → проверка владения → `AiDialogueRepository.deleteDialogueById`.
- `CreateAiDialogueMessageCommand` → проверка существования/владения → запрет при активной генерации →
  `AiDialogueMessageRepository.createMessage` → `AiDialogueQueryRepository.getMessageById` → fire-and-forget
  запуск `GenerateAiDialogueTurn`.

SSE-эндпоинт не использует CQRS: контроллер напрямую подписывается на `AiDialogueSseHub` и вызывает
`GenerateAiDialogueTurn.triggerIfNeeded`.

## Генерация хода (`GenerateAiDialogueTurn`)

Сервис `features/aiDialogue/GenerateAiDialogueTurn.service.ts`. Один «ход» = один вызов LLM, который может
вернуть **несколько** событий (`{ events: [...] }`).

### Когда генерировать («ждёт ли диалог хода»)

Детерминированное правило в `shouldGenerateTurn`:

- сообщений нет → генерировать;
- последнее сообщение — событие пользователя (`userActions`/`userAvoidsNPC`) → генерировать;
- иначе (последнее — событие LLM) → ждать действия пользователя.

### Процесс `generate(dialogueId)`

1. Guard: если для диалога уже идёт генерация — выход (идемпотентно). Иначе регистрирует
   `AbortController` в `ActiveAiDialogueGenerationRegistry` (лимит — **1 активная генерация на диалог**).
2. Читает диалог (нужен `summary`, `summary_up_to`, `scenario_id`) и сценарий.
3. Читает все сообщения; «свежие» события = сообщения с `id > summary_up_to`.
4. Собирает промпт через `buildAiDialoguePrompt` (system = `system_prompt` сценария + строгий контракт
   `{ "events": [...] }` + реестр NPC; user = текущая сцена + сжатая история + свежие события).
5. Стримит ответ: `LlmAdapterService.stream({ responseFormat: 'json_object' })`, накапливает текст и
   рассылает сырые `chunk`-события в шину.
6. В конце парсит накопленный текст через `parseAiDialogueEvents` (`jsonrepair` → `JSON.parse` →
   строгая валидация union). При невалидной структуре — ошибка `cannotParseLlmResponse`.
7. Каждое событие сохраняет (`createMessage`) и рассылает как `message`.
8. В `finally`: снимает регистрацию в registry и рассылает `turnDone`.
9. После хода (уже вне registry) fire-and-forget вызывает `SummarizeAiDialogue.summarizeIfNeeded`.

Ошибки не роняют поток: в `catch` рассылается `turnError`, затем всё равно `turnDone`.

### Стриминг и формат ответа

LLM обязан ответить одним JSON-объектом `{ "events": [...] }` (используется
`response_format: { type: 'json_object' }`, потому что голый массив JSON нельзя задать `response_format`).
Сырые чанки отдаются клиенту для превью, но **авторитетный разбор** событий делает сервер на полном
накопленном тексте. По умолчанию используется DeepSeek (`DEFAULT_FLASH_AI_MODEL`) — выбор модели клиентом
не реализован.

### Реестр активных генераций

`ActiveAiDialogueGenerationRegistry` — `Map<dialogueId, AbortController>`. В отличие от SentenceChat (лимит
на пользователя), здесь лимит **на диалог**. `AbortController` зарезервирован под будущую отмену: сейчас
генерация не привязана к жизни SSE-соединения (она продолжается и при отключении клиента, т.к. результат
пишется в БД).

### In-memory шина (`AiDialogueSseHub`)

`Map<dialogueId, Subject<MessageEvent>>`. SSE-эндпоинт подписывается на `Subject` своего диалога, а
генерация пушит события в него. Благодаря этому события, порождённые POST-запросом (в другом HTTP-запросе),
доезжают до уже открытого SSE-соединения. Субъекты не вычищаются (диалогов немного, `Subject` пустой).

## Компакция истории (`SummarizeAiDialogue`)

Чтобы не переполнять контекст LLM, давние события сжимаются в `AiDialogue.summary`. Сводка — **append-only**
массив блоков, сериализованный в JSON-строку (колонка `TEXT`):

```json
[
  { "state": { "scene": "...", "activeNpcId": "...", "roster": [{"npcId":"...","npcName":"...","npcRole":"..."}] }, "history": "краткий пересказ" }
]
```

### Правила

- **Триггер**: когда несжатых сообщений (`id > summary_up_to`) набралось больше `SUMMARIZE_WHEN_UNCOMPRESSED_GT`
  (= 20) — сжать всё, кроме последних `KEEP_UNCOMPRESSED` (= 5).
- **`history`** (текст пересказа) генерирует LLM через `buildSummaryPrompt` + `LlmAdapterService.generate`
  (обычный текст, не JSON).
- **`state`** (сцена / активный NPC / реестр NPC) сервер выводит **детерминированно** через
  `deriveAiDialogueState` — не полагаясь на LLM. `roster` собирается из `npcActions`, `scene` — из последнего
  `sceneUpdate`, `activeNpcId` — `npcId` последнего `npcActions`.
- **Новый блок** добавляется только при изменении `state` (`sameAiDialogueState`); иначе новый `history`
  дописывается в `history` последнего блока.
- `summary_up_to` сдвигается на `id` последнего сжатого сообщения.

Выполняется в фоне после завершения хода (не блокирует клиента и не занимает registry), защита от
параллельного запуска — `Set` `inFlight`. Ошибки компакции только логируются.

## База данных

### Таблица AiDialogue

| Поле          | Тип        | Описание                                                          |
|---------------|------------|-------------------------------------------------------------------|
| `id`          | `Int`      | Первичный ключ (autoincrement)                                    |
| `scenario_id` | `Int`      | FK → `AiDialogueScenario.id`, `onDelete: Cascade`                 |
| `user_id`     | `Int`      | FK → `User.id`, `onDelete: Cascade`                               |
| `summary`     | `String?`  | Сводка истории (JSON-строка, см. «Компакция»)                     |
| `summary_up_to` | `Int`    | `id` последнего сообщения, покрытого сводкой (default `0`)        |
| `created_at`  | `DateTime` | Дата создания                                                     |
| `updated_at`  | `DateTime` | Дата последнего изменения                                         |

- Индексы: `@@index([user_id])`, `@@index([scenario_id])`.
- Обратные связи: `User.AiDialogue`, `AiDialogueScenario.AiDialogue`, `AiDialogue.AiDialogueMessage`
  (`oneToMany`).

### Таблица AiDialogueMessage

| Поле         | Тип                          | Описание                                        |
|--------------|------------------------------|-------------------------------------------------|
| `id`         | `Int`                        | Первичный ключ (autoincrement)                  |
| `dialogue_id`| `Int`                        | FK → `AiDialogue.id`, `onDelete: Cascade`       |
| `type`       | enum `AiDialogueMessageType` | `sceneUpdate`/`help`/`npcActions`/`userActions`/`userAvoidsNPC`/`worldEvent` |
| `payload`    | `String`                     | JSON-тело события (без `type`, ключи camelCase) |
| `created_at` | `DateTime`                   | Дата создания                                   |

- Индекс: `@@index([dialogue_id])`.

## Ключевые файлы

### Схема БД

- `server/src/db/dbConfig/dbConfig.ts` — таблицы `AiDialogue` (с `summary`/`summary_up_to`) и
  `AiDialogueMessage`, обратные `oneToMany`.
- `server/prisma/schema.prisma` — генерируется из `bdConfig` командой `npm run generatePrismaFile`.
- `server/prisma/migrations/20260903151732_add_ai_dialogue_message/` — миграция.

### Доменные типы

- `server/src/types/aiDialogueMessage.ts` — `AiDialogueEvent` (union), `AiDialogueClientEvent`,
  `DialogueServerMessage`, `AiDialogueStreamEvent`.
- `server/src/types/aiDialogueSummary.ts` — `AiDialogueSummary`/`AiDialogueSummaryState` +
  `parseAiDialogueSummary`.

### CQRS-команды и сервисы генерации

- `server/src/features/aiDialogue/CreateAiDialogue.command.ts` — создание диалога.
- `server/src/features/aiDialogue/GetUserDialogues.command.ts` — список диалогов пользователя.
- `server/src/features/aiDialogue/DeleteAiDialogue.command.ts` — удаление диалога.
- `server/src/features/aiDialogue/CreateAiDialogueMessage.command.ts` — приём действия пользователя +
  триггер генерации.
- `server/src/features/aiDialogue/GenerateAiDialogueTurn.service.ts` — генерация хода (стрим → парс →
  сохранение → шина).
- `server/src/features/aiDialogue/SummarizeAiDialogue.service.ts` — фоновая компакция истории.
- `server/src/features/aiDialogue/ActiveAiDialogueGenerationRegistry.service.ts` — лимит 1 генерация/диалог.
- `server/src/features/aiDialogue/AiDialogueSseHub.service.ts` — in-memory шина SSE-событий.

### Промпты и парсинг

- `server/src/features/aiDialogue/buildAiDialoguePrompt.ts` — промпт генерации хода.
- `server/src/features/aiDialogue/buildSummaryPrompt.ts` — промпт сжатия истории.
- `server/src/features/aiDialogue/parseAiDialogueEvents.ts` — разбор ответа LLM (`jsonrepair`).
- `server/src/features/aiDialogue/deriveAiDialogueState.ts` — детерминированный вывод `state` +
  `sameAiDialogueState`.
- `server/src/features/aiDialogue/serializeAiDialogueEvent.ts` — сериализация события в текст промпта.

### REST-маршрут

- `server/src/routes/aiDialogue/aiDialogue.controller.ts` — контроллер (`POST/GET/DELETE /ai-dialogue`,
  `POST :id/messages`, `@Sse :id/stream`).
- `server/src/routes/aiDialogue/inputs/createAiDialogue.input.ts` — DTO создания (`scenarioId`).
- `server/src/routes/aiDialogue/inputs/createAiDialogueMessage.input.ts` — DTO действия пользователя.
- `server/src/routes/aiDialogue/openAPI.decorators.ts` — композитные декораторы OpenAPI.
- `server/src/routes/aiDialogue/aiDialogue.module.ts` — NestJS-модуль.

### Репозитории и модели

- `server/src/repo/aiDialogue/aiDialogue.repository.ts` — `createDialogue`, `getDialogueById`,
  `deleteDialogueById`, `updateSummary`.
- `server/src/repo/aiDialogue/aiDialogue.queryRepository.ts` — `getUserDialogues`, `getDialogueById`,
  `getMessagesByDialogueId`, `getMessageById`, маппинг в OutModel (`mapDbMessageToOutModel` +
  `deserializeEvent`).
- `server/src/repo/aiDialogue/aiDialogueMessage.repository.ts` — `createMessage` (type в колонку,
  тело в JSON `payload`).
- `server/src/models/aiDialogue/aiDialogue.out.model.ts` — `AiDialogueOutModel` с вложенным `scenario`.
- `server/src/models/aiDialogue/aiDialogueMessage.out.model.ts` — `AiDialogueMessageOutModel`.

### Инфраструктура

- `server/src/app.module.ts` — регистрация `AiDialogueModule`.
- `server/src/infrastructure/exceptions/errorMessage.ts` — секция `aiDialogue` (`notFound`,
  `scenarioNotFound`, `generationAlreadyActive`, `cannotParseLlmResponse`).
- `server/src/infrastructure/llmProviderAdapter/LlmProvider.interface.ts` — `responseFormat` в
  `LlmStreamInput` (для `json_object`).

### Клиент

- `face/entities/aiDialogue/repository/AiDialogueRepository.ts` — тип `AiDialogueModel` + интерфейс репозитория.
- `face/entities/aiDialogue/repository/AiDialogueApi.ts` — реализация через REST + маппинг.
- `face/entities/aiDialogue/AiDialogueService.ts` — сервис.
- `face/entities/aiDialogue/AiDialogueQueryFacade.ts` — TanStack Query фасад.
- `face/widgets/aiDialogue/UserAiDialoguesList/UserAiDialoguesList.tsx` — история диалогов пользователя.
- `face/widgets/aiDialogue/UserAiDialoguesList/fn/getDialoguesCardsConfig.ts` — маппинг диалогов в карточки.
- `face/widgets/aiDialogue/UserAiDialoguesList/fn/useAiDialogueDelete.ts` — удаление диалога.
- `face/widgets/aiDialogueScenario/PublicAiDialogueScenariosList/fn/useAiDialogueScenarioClick.ts` — клик по сценарию.
- `face/shared/api/generated/ai-dialogue/ai-dialogue.ts` — сгенерированные функции (Orval).

## Как работает клиент

### Entity-слой

Повторяет структуру `entities/aiDialogueScenario`:

- `AiDialogueRepository` — тип `AiDialogueModel` (id, вложенный `scenario`, `createdAt`, `updatedAt`) и
  интерфейс репозитория.
- `AiDialogueApi` — реализация через сгенерированные Orval-функции; маппит `AiDialogueOutModel` в
  `AiDialogueModel`, вложенный сценарий — через `mapToAiDialogueScenario`.
- `AiDialogueService` — прослойка между компонентами и репозиторием.
- `AiDialogueQueryFacade` — TanStack Query `queryOptions` (`aiDialogueQueries`).

Ключ кэша запроса списка — `['ai-dialogue', 'list']`.

### Создание диалога по клику на сценарий

1. Если пользователь не вошёл (`useUser()` → `null`) — `LoginPromptModal`.
2. Иначе `aiDialogueService.createDialogue({ scenarioId })`.
3. При успехе инвалидируется кэш списка и выполняется `router.push` на `pageUrls.aiDialogues.dialog(dialog.id)`.

### История диалогов

Рендерится только для залогиненного пользователя. Пустой список → сообщение-заглушка; непустой →
`UserAiDialoguesList` (карточки `MediaCardButton` с названием сценария). У карточки иконка удаления
(`TrashButtonIcon`) → модалка `DeleteEntityModal` → `deleteDialogue` + инвалидация кэша.

## Ошибки

Ключи из `errorMessage.aiDialogue`:

- `notFound` — диалог не найден (`404`).
- `scenarioNotFound` — сценарий не найден при создании диалога (`404`).
- `generationAlreadyActive` — для диалога уже идёт генерация (`400`), нельзя отправить действие пользователя.
- `cannotParseLlmResponse` — не удалось разобрать ответ LLM в события (`500`, уходит в `turnError`, а не
  роняет SSE).

Плюс `user.isNotOwner` (`403`) при доступе к чужому диалогу.

## Вне объёма (следующие шаги)

- Страница самого диалога `/dialogues/{dialogId}`: подключение к SSE, рендер событий, отправка действий
  пользователя, превью частичного ответа (partial-json).
- Клиентский entity-слой сообщений (`AiDialogueMessage` repository/api/service/фасад) и регенерация
  Orval-функций (`npm run orval`) для `POST :id/messages` и `GET :id/stream`.
- Отмена генерации пользователем (задействовать `AbortController` в registry) и выбор LLM-модели клиентом.
