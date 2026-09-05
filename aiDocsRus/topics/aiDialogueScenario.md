# Сценарии ролевого диалога с ИИ (AiDialogueScenario)

## Что делает функционал

Позволяет получить список сценариев для ролевого диалога пользователя с LLM. Сценарий — это описание конкретной сценки
(визит к стоматологу, паспортный контроль, покупка абонемента в бассейн), в которой LLM играет роль NPC (врача, офицера,
администратора), ведёт диалог и реагирует на реплики пользователя.

Сценарий содержит:

- **`title`** — название, показываемое на кнопке. Хранится как JSON-строка переводов (`{"en":"...","ru":"..."}`),
  клиент выбирает строку под свою локаль.
- **`description`** — короткое описание сценки (показывается пользователю). Тоже JSON-строка переводов.
- **`systemPrompt`** — системный промпт со сценой и ролью NPC (используется при обращении к LLM, клиенту **не
  отдаётся**). Языконейтрален — пишется один раз на английском.

Сценарий **языконейтрален**: у него нет поля языка. Один и тот же сценарий ведётся на любом языке — язык практики
(`source_language_code`) и язык перевода (`target_language_code`) задаются на уровне диалога (`AiDialogue`), а не
сценария.

> **Важно:** сценарий — лишь тема разговора; основная сущность — диалог (`AiDialogue`). Сценарии (данные + сид +
> REST-список) описаны здесь. Диалоги (создание/список/удаление) реализованы отдельно — см.
> `aiDocsRus/topics/aiDialogue.md`. Существующий SentenceChat к этой фиче отношения не имеет.

## Статус: что уже сделано

- Только **публичные** сценарии, создаваемые при старте сервера (как публичные книги).
- Сценарии языконейтральны: `title`/`description` хранятся как JSON-строки с переводами на 7 языков
  (`en`, `es`, `fr`, `de`, `it`, `tr`, `ru`), заданные через `localized()` в
  `server/src/features/aiDialogueScenario/english/scenarios.ts` (3 сценария).
- REST-эндпоинт списка публичных сценариев.
- Страница на клиенте (`/dialogues`) — показывает секцию «Сценарии» («Библиотека» публичных сценариев; «Мои сценарии»
  пока пуста) и секцию «История диалогов» для залогиненного пользователя. Клик по карточке сценария создаёт диалог
  с ИИ (см. `aiDocsRus/topics/aiDialogue.md`).
- Пункт «Сценарии» добавлен в главное меню.
- Пользовательские сценарии пока **не создаются**, но `user_id` уже в схеме (nullable) — чтобы не делать миграцию позже.

## Как работает сервер

### Сид при старте

`StartServerTasksRunner.onApplicationBootstrap()` вызывает `CreateAiDialogueScenariosCommand` (после создания публичных
книг). Команда проходит по списку сид-данных и для каждого сценария:

1. Ищет сценарий по `slug` (`getScenarioBySlug`)
2. Если найден — ничего не делает (идемпотентно)
3. Если не найден — создаёт через `createScenario`

Благодаря этому повторный запуск сервера не дублирует сценарии. `slug` уникален и используется именно для идемпотентного
сида и будущих URL.

### Данные сценариев

```ts
// server/src/features/aiDialogueScenario/common.ts
type AiDialogueScenarioSeedData = {
    slug: string
    title: string        // JSON-строка переводов (см. localized ниже)
    description: string  // JSON-строка переводов
    systemPrompt: string // языконейтральный английский промпт
}

// Упаковывает переводы в JSON-строку, которую хранит колонка title/description.
function localized(translations: Partial<Record<Language, string>>): string
```

Сценарии (`englishScenarios`): `at-the-dentist`, `passport-control`, `pool-membership`. `title` и `description`
заданы через `localized({ en, es, fr, de, it, tr, ru })` — сразу на 7 языков. `systemPrompt` — один языконейтральный
английский текст с уровнем A2–B1 и правилами: короткие реплики (1–3 предложения), оставаться в роли, мягко
перефразировать грамматические ошибки без лекции, подсказывать на целевом языке только если ученик совсем застрял
(язык подсказок приходит в промпт отдельно — см. `aiDocsRus/topics/aiDialogue.md`).

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
    "title": "{\"en\":\"At the Dentist\",\"es\":\"En el dentista\",\"fr\":\"Chez le dentiste\",\"de\":\"Beim Zahnarzt\",\"it\":\"Dal dentista\",\"tr\":\"Dişçide\",\"ru\":\"У стоматолога\"}",
    "description": "{\"en\":\"...\",\"ru\":\"...\"}"
  }
]
```

**Обрати внимание:**
- `system_prompt` в ответе **отсутствует** — он не попадает в `OutModel` и не отдаётся клиенту.
- `title` и `description` отдаются **сырой JSON-строкой** — сервер не резолвит локаль. Выбор строки под локаль
  интерфейса делает клиент через `pickLocalized` (см. ниже).

### Схема обработки (CQRS)

`AiDialogueScenarioController` вызывает `GetAiDialogueScenariosCommand` →
`AiDialogueScenarioQueryRepository.getPublicScenarios()`, который выбирает `where: { user_id: null }` и маппит в
`OutModel`.

## Как работает клиент

Страница со списком сценариев построена по образцу страницы книг (`BooksPage`), но проще — пока есть только публичные
сценарии и у карточек нет обложек.

### Маршрут и страница

- Маршрут — `/dialogues`.
- Страница `AiDialoguesPage` рендерит две секции:
    - «Сценарии» — `MediaPageContentTabs` с вкладками «Библиотека» (`PublicAiDialogueScenariosList`) и «Мои сценарии»
      (пока пусто — `content: null`);
    - «История диалогов» — `UserAiDialoguesList`, только для залогиненного пользователя.
- Выбранная вкладка сохраняется в `localStorage` через `useAiDialogueScenariosTabs`
  (ключ `dialogues`, менеджер `localStorageManager.lastMediaTab`).

### Загрузка данных (entity-слой)

Повторяет структуру `entities/book`:

- `AiDialogueScenarioRepository` — унифицированный тип `AiDialogueScenarioModel` и интерфейс репозитория.
- `AiDialogueScenarioApi` — реализация через сгенерированную Orval-функцию
  `aiDialogueScenarioControllerGetAiDialogueScenarios()` и `executeApiCall`; маппит `AiDialogueScenarioOutModel`
  в `AiDialogueScenarioModel` (через `extractString` для nullable полей).
- `AiDialogueScenarioService` — прослойка между компонентами и репозиторием.
- `AiDialogueScenarioQueryFacade` — TanStack Query `queryOptions`, экспортирует `aiDialogueScenarioQueries`.

Ключ кэша запроса — `['ai-dialogue-scenario', 'list']`.

### Резолв локализованных строк (`pickLocalized`)

`title`/`description` приходят с сервера как JSON-строка переводов. Компоненты не хранят «плоскую» строку — они
резолвят её под локаль через `pickLocalized(raw, locale)` (`face/shared/utils/pickLocalized.ts`):

- парсит `raw` как JSON; если это не JSON (legacy-данные в виде обычного текста) — возвращает строку как есть;
- иначе берёт `translations[locale]`, затем fallback-ключ `*`, затем первый доступный перевод, затем `raw`.

Локаль берётся из `useLocale()` (клиентские компоненты) или `getLocale()` (серверные компоненты, `next-intl`).

### Список сценариев

`PublicAiDialogueScenariosList` повторяет `PublicBooksList`, но:

- `MediaCardButton` **не оборачивается** в `MediaCardWrapper` (у сценариев нет страницы «подробнее» с info-кнопкой);
- у карточки нет обложки (`coverUrl` не передаётся), в `subTitle` — `description` сценария;
- `defaultMediaName` берётся из `aiDialogueScenarioConfig.emptyScenarioName`.

Название и описание резолвятся под локаль через `pickLocalized(scenario.title, locale)` /
`pickLocalized(scenario.description, locale)` (см. `getScenarioCardsConfig`). Переключателя языка больше нет —
сценарий языконейтрален, подпись выбирается по текущей локали интерфейса (`useLocale()`).

Карточка сценария — это кнопка, а не ссылка: `MediaCardButton` вызывается без `url`, с `onActionClick`. Клик
обрабатывается хуком `useAiDialogueScenarioClick` (см. `aiDocsRus/topics/aiDialogue.md`), а модалка «войдите в учётную
запись» вынесена в отдельный компонент `LoginPromptModal`.

### URL страницы диалога

`pageUrls.aiDialogues.dialog(dialogId)` ведёт на `/dialogues/{dialogId}` (id диалога, а не сценария). Используется в
хуке `useAiDialogueScenarioClick` (после создания диалога) и в `UserAiDialoguesList`. Сама страница диалога — следующий
шаг.

### pageUrls и меню

- В `pageUrls` добавлен `aiDialogues`: `name: 'Диалоги'`, `path: '/dialogues'`,
  `dialog(dialogId)` → `/dialogues/{dialogId}`.
- В главное меню (`MainMenu`) добавлен пункт «Сценарии» — между «Книги» и «Контакты».

## База данных

### Таблица AiDialogueScenario

| Поле            | Тип       | Описание                                                          |
|-----------------|-----------|-------------------------------------------------------------------|
| `id`            | `Int`     | Первичный ключ (autoincrement)                                    |
| `slug`          | `String?` | Стабильный уникальный ключ (null для пользовательских сценариев)  |
| `title`         | `String`  | Название сценария (JSON-строка переводов, см. `localized`)        |
| `description`   | `String`  | Короткое описание сценки (JSON-строка переводов)                  |
| `system_prompt` | `String`  | Системный промпт с ролью NPC (языконейтральный, не отдаётся клиенту) |
| `user_id`       | `Int?`    | Владелец сценария (null для публичных)                            |
| `created_at`    | `DateTime`| Дата создания                                                     |

- `slug` имеет `@unique`.
- `@@index([user_id])` для быстрого поиска по владельцу.
- `user_id` → `User.id` с `onDelete: Cascade`.

## Ключевые файлы

### Схема БД

- `server/src/db/dbConfig/dbConfig.ts` — таблица `AiDialogueScenario` + обратный `oneToMany` на `User`
- `server/prisma/schema.prisma` — генерируется из `bdConfig` командой `npm run generatePrismaFile`

### Сид и данные

- `server/src/features/aiDialogueScenario/common.ts` — тип `AiDialogueScenarioSeedData` + хелпер `localized`
- `server/src/features/aiDialogueScenario/english/scenarios.ts` — 3 сценария с переводами на 7 языков
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

- `face/app/[locale]/dialogues/page.tsx` — роут страницы.
- `face/app/[locale]/dialogues/layout.tsx` — обёртка `MediaPageLayout`.
- `face/_pages/media/aiDialogues/AiDialoguesPage/AiDialoguesPage.tsx` — страница с вкладками.
- `face/_pages/media/aiDialogues/AiDialoguesPage/fn/useAiDialogueScenariosTabs.tsx` — сохранение вкладки.
- `face/widgets/aiDialogueScenario/PublicAiDialogueScenariosList/PublicAiDialogueScenariosList.tsx` — список публичных
  сценариев.
- `face/widgets/aiDialogueScenario/PublicAiDialogueScenariosList/fn/getScenarioCardsConfig.ts` — маппинг сценариев в
  карточки (резолвит `title`/`description` через `pickLocalized`).
- `face/widgets/aiDialogueScenario/PublicAiDialogueScenariosList/fn/useAiDialogueScenarioClick.ts` — клик по сценарию
  (создание диалога + модалка логина).
- `face/widgets/aiDialogueScenario/PublicAiDialogueScenariosList/ui/LoginPromptModal/LoginPromptModal.tsx` — модалка
  «войдите в учётную запись».
- `face/entities/aiDialogueScenario/repository/AiDialogueScenarioRepository.ts` — тип `AiDialogueScenarioModel` +
  интерфейс репозитория.
- `face/entities/aiDialogueScenario/repository/AiDialogueScenarioApi.ts` — реализация через REST + маппинг (в т.ч.
  экспортирует `mapToAiDialogueScenario` для `AiDialogueApi`).
- `face/shared/utils/pickLocalized.ts` — резолв JSON-строки переводов под локаль (`pickLocalized`).
- `face/entities/aiDialogueScenario/AiDialogueScenarioService.ts` — сервис.
- `face/entities/aiDialogueScenario/AiDialogueScenarioQueryFacade.ts` — TanStack Query фасад.
- `face/entities/aiDialogueScenario/lib/aiDialogueScenarioConfig.ts` — конфиг (`emptyScenarioName`).
- `face/shared/utils/pageUrls.ts` — `pageUrls.aiDialogues`.
- `face/shared/ui/pageRelated/MainMenu/MainMenu.tsx` — пункт «Сценарии».
- `face/shared/api/generated/ai-dialogue-scenario/ai-dialogue-scenario.ts` — сгенерированная функция
  `aiDialogueScenarioControllerGetAiDialogueScenarios`.

## Как добавить новый сценарий или язык

### Новый сценарий

1. Добавить объект `AiDialogueScenarioSeedData` в `english/scenarios.ts` с уникальным `slug`, `title` и `description`
   через `localized({...})` (переводы на все нужные языки) и языконейтральным `systemPrompt`.
2. Если сценарий выносят в отдельный файл/массив — дописать его в `getScenariosData()` команды
   `CreateAiDialogueScenarios.command.ts`.
3. Перезапустить сервер — сид создаст новые сценарии автоматически (идемпотентно по `slug`).

### Новый язык перевода

1. Добавить переводы для нового языка в каждый вызов `localized({...})` (ключ — код языка из `Language`, например
   `'pt'`). Отдельную папку сценариев создавать **не нужно** — сценарий языконейтрален.
2. Убедиться, что новый язык есть в `Language`/`LanguageCode` (см. `utils/languages`).
3. Учесть, что сид идемпотентен по `slug` и **не обновляет** уже существующие строки — новые переводы попадут в БД
   только после удаления сценариев (или ручного обновления), см. «Сид при старте».
