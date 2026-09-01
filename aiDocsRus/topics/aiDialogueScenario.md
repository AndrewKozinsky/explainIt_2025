# Сценарии ролевого диалога с ИИ (AiDialogueScenario)

## Что делает функционал

Позволяет получить список сценариев для ролевого диалога пользователя с LLM. Сценарий — это описание конкретной
сценки (визит к стоматологу, паспортный контроль, покупка абонемента в бассейн), в которой LLM играет роль NPC
(врача, офицера, администратора), ведёт диалог и реагирует на реплики пользователя.

Сценарий содержит:

- **`title`** — название, показываемое на кнопке
- **`description`** — короткое описание сценки (показывается пользователю)
- **`systemPrompt`** — системный промпт со сценой и ролью NPC (используется при обращении к LLM, клиенту **не отдаётся**)
- **`languageCode`** — язык диалога (из enum `LanguageCode`)

> **Важно:** это первый шаг функционала — реализованы сами сценарии (данные + сид + REST-список) и страница со
> списком сценариев на клиенте. Сам диалог (обращение к LLM, сообщения, страница самого диалога) — следующий шаг.
> Существующий SentenceChat к этой фиче отношения не имеет.

## Статус: что уже сделано

- Только **публичные** сценарии, создаваемые при старте сервера (как публичные книги).
- Сценарии сгруппированы по языкам в `server/src/features/aiDialogueScenario/<lang>/scenarios.ts`. Сейчас есть только
  английский (`english/scenarios.ts`) — 3 сценария.
- REST-эндпоинт списка публичных сценариев.
- Страница со списком сценариев на клиенте (`/ai-dialogue-scenarios`) — две вкладки: «Библиотека» и «Мои сценарии».
  «Библиотека» показывает публичные сценарии с переключателем языка, «Мои сценарии» пока пуста.
- Пункт «Сценарии» добавлен в главное меню.
- Пользовательские сценарии пока **не создаются**, но `user_id` уже в схеме (nullable) — чтобы не делать миграцию
  позже.

## Как работает сервер

### Сид при старте

`StartServerTasksRunner.onApplicationBootstrap()` вызывает `CreateAiDialogueScenariosCommand` (после создания публичных
книг). Команда проходит по списку сид-данных и для каждого сценария:

1. Ищет сценарий по `slug` (`getScenarioBySlug`)
2. Если найден — ничего не делает (идемпотентно)
3. Если не найден — создаёт через `createScenario`

Благодаря этому повторный запуск сервера не дублирует сценарии. `slug` уникален и используется именно для
идемпотентного сида и будущих URL.

### Данные сценариев

```ts
// server/src/features/aiDialogueScenario/common.ts
type AiDialogueScenarioSeedData = {
	slug: string
	title: string
	description: string
	systemPrompt: string
	languageCode: Language
}
```

Английские сценарии (`englishScenarios`): `at-the-dentist`, `passport-control`, `pool-membership`. Все на языке `en`
с уровнем A2–B1. В `systemPrompt` заложены правила: короткие реплики (1–3 предложения), оставаться в роли,
мягко перефразировать грамматические ошибки без лекции, подсказывать по-русски только если ученик совсем застрял.

### REST API

```
GET /ai-dialogue-scenario
```

Возвращает массив публичных сценариев (`AiDialogueScenarioOutModel[]`), отсортированных по `id`.

Пример ответа:

```json
[
	{
		"id": 1,
		"slug": "at-the-dentist",
		"title": "At the Dentist",
		"description": "Вы приходите на приём к стоматологу: ...",
		"languageCode": "en"
	}
]
```

**Обрати внимание:** `system_prompt` в ответе **отсутствует** — он не попадает в `OutModel` и не отдаётся клиенту.

### Схема обработки (CQRS)

`AiDialogueScenarioController` вызывает `GetAiDialogueScenariosCommand` → `AiDialogueScenarioQueryRepository.getPublicScenarios()`,
который выбирает `where: { user_id: null }` и маппит в `OutModel`.

## Как работает клиент

Страница со списком сценариев построена по образцу страницы книг (`BooksPage`), но проще — пока есть только
публичные сценарии и у карточек нет обложек.

### Маршрут и страница

- Маршрут — `/ai-dialogue-scenarios` (`face/app/[locale]/ai-dialogue-scenarios/page.tsx` + `layout.tsx` с обёрткой
  `MediaPageLayout`, как у `/books`).
- Страница `AiDialogueScenariosPage` рендерит `MediaPageContentTabs` с двумя вкладками:
  - «Библиотека» — `PublicAiDialogueScenariosList`;
  - «Мои сценарии» — пока пусто (`content: null`), пользовательские сценарии не реализованы.
- Выбранная вкладка сохраняется в `localStorage` через `useAiDialogueScenariosPageTabs`
  (ключ `ai-dialogue-scenarios`, менеджер `localStorageManager.lastMediaTab`).

### Загрузка данных (entity-слой)

Повторяет структуру `entities/book`:

- `AiDialogueScenarioRepository` — унифицированный тип `AiDialogueScenarioModel` и интерфейс репозитория.
- `AiDialogueScenarioApi` — реализация через сгенерированную Orval-функцию
  `aiDialogueScenarioControllerGetAiDialogueScenarios()` и `executeApiCall`; маппит `AiDialogueScenarioOutModel`
  в `AiDialogueScenarioModel` (через `extractString` для nullable полей).
- `AiDialogueScenarioService` — прослойка между компонентами и репозиторием.
- `AiDialogueScenarioQueryFacade` — TanStack Query `queryOptions`, экспортирует `aiDialogueScenarioQueries`.

Ключ кэша запроса — `['ai-dialogue-scenario', 'list']`.

### Список сценариев

`PublicAiDialogueScenariosList` повторяет `PublicBooksList`, но:

- `MediaCardButton` **не оборачивается** в `MediaCardWrapper` (у сценариев нет страницы «подробнее» с info-кнопкой);
- у карточки нет обложки (`coverUrl` не передаётся), в `subTitle` — `description` сценария;
- `defaultMediaName` берётся из `aiDialogueScenarioConfig.emptyScenarioName`.

Переключатель языка (`LanguageSwitch`) фильтрует сценарии по `languageCode` — как у книг, через локальный
`useLanguageChange`.

### URL карточки и будущая страница диалога

Ссылка карточки ведёт на будущую страницу диалога по `id` сценария:

```
pageUrls.aiDialogueScenarios.dialog(scenario.id)  →  /ai-dialogue-scenarios/{id}
```

Самой страницы диалога ещё нет — это следующий шаг, поэтому клик по карточке пока ведёт на 404.

### pageUrls и меню

- В `pageUrls` добавлен `aiDialogueScenarios`: `name: 'Сценарии'`, `path: '/ai-dialogue-scenarios'`,
  `dialog(id)` → `/ai-dialogue-scenarios/{id}`.
- В главное меню (`MainMenu`) добавлен пункт «Сценарии» — между «Книги» и «Контакты».

## База данных

### Таблица AiDialogueScenario

| Поле            | Тип           | Описание                                                               |
|-----------------|---------------|------------------------------------------------------------------------|
| `id`            | `Int`         | Первичный ключ (autoincrement)                                         |
| `slug`          | `String?`     | Стабильный уникальный ключ (null для пользовательских сценариев)       |
| `title`         | `String`      | Название сценария                                                      |
| `description`   | `String`      | Короткое описание сценки                                               |
| `system_prompt` | `String`      | Системный промпт с ролью NPC (не отдаётся клиенту)                     |
| `language_code` | `LanguageCode`| Язык диалога                                                           |
| `user_id`       | `Int?`        | Владелец сценария (null для публичных)                                 |
| `created_at`    | `DateTime`    | Дата создания                                                          |

- `slug` имеет `@unique`.
- `@@index([user_id])` для быстрого поиска по владельцу.
- `user_id` → `User.id` с `onDelete: Cascade`.

## Ключевые файлы

### Схема БД

- `server/src/db/dbConfig/dbConfig.ts` — таблица `AiDialogueScenario` + обратный `oneToMany` на `User`
- `server/prisma/schema.prisma` — генерируется из `bdConfig` командой `npm run generatePrismaFile`

### Сид и данные

- `server/src/features/aiDialogueScenario/common.ts` — тип `AiDialogueScenarioSeedData`
- `server/src/features/aiDialogueScenario/english/scenarios.ts` — английские сценарии
- `server/src/features/aiDialogueScenario/CreateAiDialogueScenarios.command.ts` — CQRS-команда идемпотентного сида

### REST-маршрут

- `server/src/features/aiDialogueScenario/GetAiDialogueScenarios.command.ts` — команда получения списка
- `server/src/routes/aiDialogueScenario/aiDialogueScenario.controller.ts` — контроллер (`GET /ai-dialogue-scenario`)
- `server/src/routes/aiDialogueScenario/openAPI.decorators.ts` — композитный декоратор `ApiGetAiDialogueScenarios`
- `server/src/routes/aiDialogueScenario/aiDialogueScenario.module.ts` — NestJS-модуль

### Репозитории и модели

- `server/src/repo/aiDialogueScenario/aiDialogueScenario.repository.ts` — бизнес-операции (`createScenario`,
  `getScenarioBySlug`)
- `server/src/repo/aiDialogueScenario/aiDialogueScenario.queryRepository.ts` — запрос для клиента (`getPublicScenarios`
  с маппингом в OutModel)
- `server/src/models/aiDialogueScenario/aiDialogueScenario.out.model.ts` — OpenAPI OutModel (без `systemPrompt`)

### Инфраструктура

- `server/src/infrastructure/StartServerTasksRunner.ts` — запуск сида при старте сервера
- `server/src/app.module.ts` — регистрация `AiDialogueScenarioModule`

### Клиент

- `face/app/[locale]/ai-dialogue-scenarios/page.tsx` — роут страницы.
- `face/app/[locale]/ai-dialogue-scenarios/layout.tsx` — обёртка `MediaPageLayout`.
- `face/_pages/media/aiDialogueScenarios/AiDialogueScenariosPage/AiDialogueScenariosPage.tsx` — страница с вкладками.
- `face/_pages/media/aiDialogueScenarios/AiDialogueScenariosPage/fn/useAiDialogueScenariosPageTabs.tsx` — сохранение вкладки.
- `face/widgets/aiDialogueScenario/PublicAiDialogueScenariosList/PublicAiDialogueScenariosList.tsx` — список публичных сценариев.
- `face/widgets/aiDialogueScenario/PublicAiDialogueScenariosList/fn/getScenarioCardsConfig.ts` — маппинг сценариев в карточки.
- `face/widgets/aiDialogueScenario/PublicAiDialogueScenariosList/fn/useLanguageChange.ts` — переключатель языка.
- `face/entities/aiDialogueScenario/repository/AiDialogueScenarioRepository.ts` — тип `AiDialogueScenarioModel` + интерфейс репозитория.
- `face/entities/aiDialogueScenario/repository/AiDialogueScenarioApi.ts` — реализация через REST + маппинг.
- `face/entities/aiDialogueScenario/AiDialogueScenarioService.ts` — сервис.
- `face/entities/aiDialogueScenario/AiDialogueScenarioQueryFacade.ts` — TanStack Query фасад.
- `face/entities/aiDialogueScenario/lib/aiDialogueScenarioConfig.ts` — конфиг (`emptyScenarioName`).
- `face/shared/utils/pageUrls.ts` — `pageUrls.aiDialogueScenarios`.
- `face/shared/ui/pageRelated/MainMenu/MainMenu.tsx` — пункт «Сценарии».
- `face/shared/api/generated/ai-dialogue-scenario/ai-dialogue-scenario.ts` — сгенерированная функция
  `aiDialogueScenarioControllerGetAiDialogueScenarios`.

## Как добавить новый язык или сценарий

1. При необходимости создать папку `server/src/features/aiDialogueScenario/<lang>/scenarios.ts` для нового языка
   (по аналогии с `english/scenarios.ts`).
2. Добавить объект `AiDialogueScenarioSeedData` с уникальным `slug`, `title`, `description`, `systemPrompt` и
   `languageCode: languages.<lang>.code`.
3. Дописать массив в `getScenariosData()` команды `CreateAiDialogueScenarios.command.ts` (`[...englishScenarios, ...другие]`).
4. Перезапустить сервер — сид создаст новые сценарии автоматически (идемпотентно по `slug`).
