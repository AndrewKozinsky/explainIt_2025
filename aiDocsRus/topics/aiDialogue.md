# Диалоги с ИИ (AiDialogue)

## Что делает функционал

Диалог — это **контейнер для сообщений** между пользователем и LLM в рамках какого-то сценария
(`AiDialogueScenario`). Сценарий лишь указывает тему разговора; диалог является основной сущностью,
которой владеет пользователь.

- один сценарий → **много** диалогов (однозначного ограничения на пару `(user, scenario)` нет);
- диалог принадлежит **одному** пользователю;
- у диалога нет собственных текстовых полей — сцена, роль NPC и язык берутся из связанного сценария;
- сообщения (`AiDialogueMessage`) будут храниться в отдельной таблице — это следующий шаг.

## Статус: что уже сделано

- Таблица `AiDialogue` (создание через `bdConfig` + миграция).
- REST-эндпоинты: создать диалог, получить список диалогов текущего пользователя, удалить диалог.
- В ответе диалога возвращаются **вложенные данные сценария** (без `systemPrompt`).
- Клиентский entity-слой (`AiDialogueRepository`/`Api`/`Service`/`QueryFacade`) и `npm run orval`.
- На странице `/dialogues`: клик по сценарию создаёт диалог, секция «История диалогов» показывает диалоги пользователя.
- Таблица сообщений и сам обмен репликами с LLM — следующий шаг.

## REST API

Все эндпоинты требуют авторизации (`CheckSessionCookieGuard`).

```
POST   /ai-dialogue         body: { scenarioId }   → 201 AiDialogueOutModel
GET    /ai-dialogue         → 200 AiDialogueOutModel[]
DELETE /ai-dialogue/:id     → 200 boolean
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

**Обрати внимание:** `system_prompt` сценария не попадает в ответ (как и в списке сценариев) — он не отдаётся
клиенту.

### Создание диалога

- При создании передаётся `scenarioId`.
- Сценарий должен существовать (иначе `404` `AI_DIALOGUE_SCENARIO_NOT_FOUND`).
- Начать диалог можно только по **публичному** (`user_id === null`) или **своему** сценарию (иначе
  `403` `USER_IS_NOT_OWNER`).
- Создаётся новая запись — повторные вызовы создают новые диалоги (диалогов на сценарий может быть много).

### Удаление диалога

- Проверяется существование (`404` `AI_DIALOGUE_NOT_FOUND`) и владение (`403` `USER_IS_NOT_OWNER`).
- Возвращает `true`.

## Схема обработки (CQRS)

`AiDialogueController` вызывает через `CommandBus`:

- `CreateAiDialogueCommand` → проверка сценария → `AiDialogueRepository.createDialogue` →
  `AiDialogueQueryRepository.getDialogueById`.
- `GetUserDialoguesCommand` → `AiDialogueQueryRepository.getUserDialogues`.
- `DeleteAiDialogueCommand` → проверка владения → `AiDialogueRepository.deleteDialogueById`.

`AiDialogueQueryRepository` маппит строки БД в `AiDialogueOutModel`, а вложенный сценарий — через
переиспользование `AiDialogueScenarioQueryRepository.mapDbToOutModel`.

## База данных

### Таблица AiDialogue

| Поле          | Тип        | Описание                                                          |
|---------------|------------|-------------------------------------------------------------------|
| `id`          | `Int`      | Первичный ключ (autoincrement)                                    |
| `scenario_id` | `Int`      | FK → `AiDialogueScenario.id`, `onDelete: Cascade`                 |
| `user_id`     | `Int`      | FK → `User.id`, `onDelete: Cascade`                               |
| `created_at`  | `DateTime` | Дата создания                                                     |
| `updated_at`  | `DateTime` | Дата последнего изменения (для сортировки и будущего touch)        |

- Индексы: `@@index([user_id])`, `@@index([scenario_id])`.
- Обратные связи: `User.AiDialogue` и `AiDialogueScenario.AiDialogue` (`oneToMany`).

## Ключевые файлы

### Схема БД

- `server/src/db/dbConfig/dbConfig.ts` — таблица `AiDialogue` + обратные `oneToMany` на `User` и
  `AiDialogueScenario`.
- `server/prisma/schema.prisma` — генерируется из `bdConfig` командой `npm run generatePrismaFile`.

### CQRS-команды

- `server/src/features/aiDialogue/CreateAiDialogue.command.ts` — создание диалога.
- `server/src/features/aiDialogue/GetUserDialogues.command.ts` — список диалогов пользователя.
- `server/src/features/aiDialogue/DeleteAiDialogue.command.ts` — удаление диалога.

### REST-маршрут

- `server/src/routes/aiDialogue/aiDialogue.controller.ts` — контроллер (`POST/GET/DELETE /ai-dialogue`).
- `server/src/routes/aiDialogue/inputs/createAiDialogue.input.ts` — DTO создания (`scenarioId`).
- `server/src/routes/aiDialogue/openAPI.decorators.ts` — композитные декораторы OpenAPI.
- `server/src/routes/aiDialogue/aiDialogue.module.ts` — NestJS-модуль.

### Репозитории и модели

- `server/src/repo/aiDialogue/aiDialogue.repository.ts` — `createDialogue`, `getDialogueById`,
  `deleteDialogueById`.
- `server/src/repo/aiDialogue/aiDialogue.queryRepository.ts` — `getUserDialogues`, `getDialogueById`
  с `include: { scenario: true }` и маппингом в OutModel.
- `server/src/models/aiDialogue/aiDialogue.out.model.ts` — `AiDialogueOutModel` с вложенным `scenario`.

### Инфраструктура

- `server/src/app.module.ts` — регистрация `AiDialogueModule`.
- `server/src/infrastructure/exceptions/errorMessage.ts` — секция `aiDialogue` (`notFound`,
  `scenarioNotFound`).

### Клиент

- `face/entities/aiDialogue/repository/AiDialogueRepository.ts` — тип `AiDialogueModel` + интерфейс репозитория.
- `face/entities/aiDialogue/repository/AiDialogueApi.ts` — реализация через REST + маппинг.
- `face/entities/aiDialogue/AiDialogueService.ts` — сервис.
- `face/entities/aiDialogue/AiDialogueQueryFacade.ts` — TanStack Query фасад.
- `face/widgets/aiDialogue/UserAiDialoguesList/UserAiDialoguesList.tsx` — история диалогов пользователя
  (пустое сообщение + карточки).
- `face/widgets/aiDialogue/UserAiDialoguesList/fn/getDialoguesCardsConfig.ts` — маппинг диалогов в карточки.
- `face/widgets/aiDialogueScenario/PublicAiDialogueScenariosList/fn/useAiDialogueScenarioClick.ts` — клик по сценарию
  (создание диалога + модалка логина).
- `face/widgets/aiDialogueScenario/PublicAiDialogueScenariosList/ui/LoginPromptModal/LoginPromptModal.tsx` — модалка
  «войдите в учётную запись».
- `face/shared/api/generated/ai-dialogue/ai-dialogue.ts` — сгенерированные функции
  `aiDialogueControllerCreateAiDialogue`, `aiDialogueControllerGetAiDialogues`.

## Как работает клиент

### Entity-слой

Повторяет структуру `entities/aiDialogueScenario`:

- `AiDialogueRepository` — унифицированный тип `AiDialogueModel` (id, вложенный `scenario`, `createdAt`, `updatedAt`)
  и интерфейс репозитория.
- `AiDialogueApi` — реализация через сгенерированные Orval-функции `aiDialogueControllerCreateAiDialogue` и
  `aiDialogueControllerGetAiDialogues`; маппит `AiDialogueOutModel` в `AiDialogueModel`. Вложенный сценарий маппится
  через переиспользованный `mapToAiDialogueScenario` из `AiDialogueScenarioApi`.
- `AiDialogueService` — прослойка между компонентами и репозиторием.
- `AiDialogueQueryFacade` — TanStack Query `queryOptions`, экспортирует `aiDialogueQueries`.

Ключ кэша запроса списка — `['ai-dialogue', 'list']`.

### Создание диалога по клику на сценарий

Клик по карточке сценария обрабатывается хуком `useAiDialogueScenarioClick`:

1. Если пользователь не вошёл (`useUser()` → `null`) — открывается `LoginPromptModal` с просьбой войти.
2. Иначе вызывается `aiDialogueService.createDialogue({ scenarioId })`.
3. При успехе инвалидируется кэш списка (`aiDialogueQueryKeys.list()`) и выполняется `router.push` на
   `pageUrls.aiDialogues.dialog(dialog.id)`.

### История диалогов

Секция «История диалогов» рендерится только для залогиненного пользователя; запрос списка идёт с `enabled: !!user`.

- Пустой список → сообщение «У вас ещё нет ни одного диалога. Выберите сценарий чтобы начать.».
- Непустой список → `UserAiDialoguesList` (карточки `MediaCardButton` только с названием сценария, без описания).

## Вне объёма (следующие шаги)

- Таблица `AiDialogueMessage` (dialog → messages, роли user/assistant).
- Обращение к LLM и стриминг ответов.
- Страница самого диалога `/dialogues/{dialogId}` (обмен репликами с LLM).
