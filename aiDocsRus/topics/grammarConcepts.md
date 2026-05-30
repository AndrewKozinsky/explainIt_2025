# Раздел «Грамматические конструкции» — извлечение и отображение

## Что делает функционал

При чтении книги или просмотре субтитров пользователь видит после каждого предложения ссылки на грамматические статьи (фразовые глаголы, выражения, коллокации и т.д.). Система:

1. **Извлекает** грамматические конструкции из текста предложения через LLM (Gemini Flash)
2. **Ищет** существующие статьи в БД по lemma и aliases
3. **Показывает** найденные статьи как синие ссылки, а ненайденные — как серые метки (чтобы контент-райтеры знали, о чём писать)
4. **Синхронизирует** MDX-статьи из `content/` с таблицей `GrammarConcept` при старте сервера
5. **Автоматически связывает** ранее ненайденные конструкции с новыми статьями (через `resolveMissingConcepts`)

## Структура контента

Статьи хранятся в общей папке `content/` в корне проекта (вне `face/` и `server/`):

```
content/
  {targetLanguage}/      — язык перевода (ru)
    {sourceLanguage}/     — изучаемый язык (en)
      {category}/         — категория грамматики
        1_имя.mdx         — файл статьи
```

Пример: `content/ru/en/expression/1_pullFace.mdx` — статья о выражении "pull a face" для русскоязычных, изучающих английский.

### Формат MDX-файла

```mdx
---
lesson_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
title: "Pull a face"
slug: "pull-a-face"
order: 1
category: "expression"
lemma: "pull a face"
sourceLanguage: "en"
targetLanguage: "ru"
aliases:
  - "pull a face"
  - "make a face"
---

## Значение
...
```

### Поля frontmatter

| Поле | Тип | Описание |
|------|-----|----------|
| `lesson_id` | `string` | UUID статьи (первичный ключ в БД) |
| `title` | `string` | Название для отображения |
| `slug` | `string` | Уникальный идентификатор для URL |
| `order` | `number` | Порядок сортировки в списке |
| `category` | `string` | Категория: `expression`, `phrasal_verb`, `collocation`, `conditional`, etc. |
| `lemma` | `string` | Каноническая форма (словарная) |
| `sourceLanguage` | `string` | Код изучаемого языка |
| `targetLanguage` | `string` | Код языка перевода |
| `aliases` | `string[]` | Варианты написания и синонимы для поиска |

### Категории по языкам

Определены в `server/src/features/grammarConcept/grammarCategories.ts`:

- **en**: `phrasal_verb`, `expression`, `collocation`, `conditional`, `inversion`, `gerund_vs_infinitive`, `reported_speech`, `other`
- **es**: `expression`, `collocation`, `conditional`, `subjunctive`, `ser_vs_estar`, `por_vs_para`, `other`
- **fr**: `expression`, `collocation`, `conditional`, `subjunctive`, `partitive_articles`, `other`
- **de**: `expression`, `collocation`, `separable_verbs`, `cases`, `word_order`, `modal_particles`, `other`
- **it**: `expression`, `collocation`, `conditional`, `subjunctive`, `other`
- **tr**: `expression`, `collocation`, `cases`, `agglutination`, `evidentiality`, `other`

## Схема БД

### GrammarConcept — статьи

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | `String` (UUID) | Первичный ключ, равен `lesson_id` из MDX |
| `source_language_code` | `LanguageCode` enum | Код изучаемого языка |
| `target_language_code` | `LanguageCode` enum | Код языка перевода |
| `category` | `String` | Категория грамматики |
| `lemma` | `String` | Каноническая форма |
| `title` | `String` | Название |
| `slug` | `String` | URL-идентификатор |
| `order` | `Int` | Порядок сортировки |
| `aliases` | `String[]` | Массив вариантов для поиска |

Уникальный индекс: `[source_language_code, target_language_code, category, lemma]`

### UniversalPhrase — кеш предложений

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | `Int` (автоинкремент) | Первичный ключ |
| `text` | `String` | Нормализованный текст предложения |
| `source_language_code` | `LanguageCode` | Код языка |
| `grammarExtractionStatus` | `GrammarExtractionStatus` | `NOT_STARTED`, `ERROR`, `SUCCESS` |

Уникальный индекс: `[text, source_language_code]`

### MissingGrammarConcept — ненайденные конструкции

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | `Int` | Первичный ключ |
| `universal_phrase_id` | `Int` | FK → UniversalPhrase |
| `source_language_code` | `LanguageCode` | Код языка |
| `target_language_code` | `LanguageCode` | Код языка перевода |
| `category` | `String` | Категория (от LLM) |
| `lemma` | `String` | Лемма (от LLM) |
| `sentence_text` | `String` | Исходный текст предложения |

### GrammarConceptToUniversalPhrase — many-to-many связка

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | `Int` | Первичный ключ |
| `grammar_concept_id` | `String` (UUID) | FK → GrammarConcept |
| `universal_phrase_id` | `Int` | FK → UniversalPhrase |

Уникальный индекс: `[grammar_concept_id, universal_phrase_id]`

## Поток извлечения (FetchGrammarConcepts)

### 1. GraphQL-мутация `grammar_concept_fetch`

Клиент отправляет:
```graphql
mutation {
  grammar_concept_fetch(input: {
    sentenceText: "She pulled a face when she saw it."
    sourceLanguage: "en"
    targetLanguage: "ru"
  }) {
    grammarConcepts { id title slug category sourceLanguage }
    missingGrammarConcepts { category lemma }
  }
}
```

### 2. Обработчик команды

`FetchGrammarConceptsHandler` (`server/src/features/grammarConcept/FetchGrammarConcepts.command.ts`):

1. **Нормализует** текст предложения (trim, единый пробел)
2. **Находит или создаёт** `UniversalPhrase` через `UniversalPhraseRepository.findOrCreate()`
3. **Проверяет кеш**: если статус = `SUCCESS`, возвращает сохранённый результат (без повторного вызова LLM)
4. **Вызывает LLM** (Gemini Flash) через `GrammarExtractionService.extractConcepts()` с промптом на языке предложения
5. **Парсит ответ** LLM: очищает markdown-обёртку и висячие запятые, затем `JSON.parse`
6. **Ищет совпадения** в БД через `GrammarConceptRepository.findByLemmas()` — поиск по `[sourceLanguage, targetLanguage, category]` AND (`lemma` OR `aliases has`)
7. **Создаёт связки** через `UniversalPhraseRepository.completeExtraction()` — одной транзакцией:
   - Обновляет статус UniversalPhrase на `SUCCESS`
   - Создаёт записи в `GrammarConceptToUniversalPhrase` для найденных концептов
   - Создаёт записи в `MissingGrammarConcept` для ненайденных
8. **При ошибке** LLM (сетевой сбой, невалидный JSON) — статус ставится `ERROR`

### 3. Промпт для LLM

`buildGrammarExtractionPrompt` (`server/src/features/grammarConcept/buildGrammarExtractionPrompt.ts`):

- Системный промпт и правила нормализации lemma написаны **на языке предложения** (en/es/fr/de/it/tr)
- Для каждого языка свой набор категорий из `GRAMMAR_CATEGORIES_BY_LANGUAGE`
- Правила нормализации описывают, как приводить lemma к словарной форме для каждой категории
- Ответ должен быть строго JSON: `{ "items": [{ "category": "...", "lemma": "..." }] }`

### 4. Очистка ответа LLM

`GrammarExtractionService.parseResponse()` чистит ответ перед `JSON.parse`:
- Убирает markdown-обёртку ```` ```json ... ``` ````
- Убирает висячие запятые перед `}` и `]`
- Только затем парсит JSON

## Стартовая синхронизация (SyncMdxGrammarConcepts)

При старте сервера `StartServerTasksRunner.onApplicationBootstrap()` выполняет `SyncMdxGrammarConceptsCommand`:

1. **Сканирует** `content/` рекурсивно, собирает все `.mdx` файлы
2. **Для каждого файла** извлекает frontmatter через `gray-matter`, upsert-ит запись в `GrammarConcept` по `id = lesson_id`
3. **Удаляет** из БД GrammarConcept, чьи `id` не найдены среди `lesson_id` файлов
4. **Разрешает missing-концепты** (`resolveMissingConcepts`): для каждой записи в `MissingGrammarConcept` ищет появившуюся статью по `[sourceLanguage, targetLanguage, category]` AND (`lemma` OR `aliases has`). Если находит — создаёт связку `GrammarConceptToUniversalPhrase` и удаляет `MissingGrammarConcept`

Поиск по алиасам в шаге 4 критичен: LLM может вернуть "get oneself in over one's head", а статья имеет `lemma: "in over one's head"` и `aliases: ["get oneself in over one's head"]`.

## Клиент: страницы /grammar

Роутинг через App Router:

```
app/grammar/
  layout.tsx                           — PageContentWrapper + BreadCrumbs + Header + GrammarPageContent
  page.tsx                             — GrammarCategoriesList (слева) + заглушка (справа)
  [sourceLanguage]/[category]/
    layout.tsx                         — GrammarArticlesList (слева) + children (справа)
    page.tsx                           — заглушка «Выберите статью»
    [articleSlug]/
      page.tsx                         — GrammarArticlePage (рендер MDX)
```

### Загрузка данных

В `face/_pages/grammar/fn/`:

- **`getContentDir()`** — возвращает `path.join(process.cwd(), 'content')`
- **`getCategories()`** — сканирует `content/`, возвращает доступные комбинации `{ targetLang, sourceLang, categories[] }`
- **`getAllLessons(sourceLanguage, category)`** — читает все `.mdx` из `content/{targetLang}/{sourceLanguage}/{category}/`, возвращает массив метаданных
- **`getLessonBySlug(sourceLanguage, category, slug)`** — находит конкретный урок по slug

### Вычисление URL статьи

На клиенте: `computeArticleUrl(sourceLanguage, category, slug)` → `/grammar/{sourceLanguage}/{category}/{slug}`

## Клиент: отображение в чтении

### Компонент GrammarConceptLinks

`face/_pages/media/commonComponents/GrammarConceptLinks/GrammarConceptLinks.tsx`

Три состояния:

| Состояние | Что показывает |
|-----------|---------------|
| `grammarConcepts === null` (не загружено) | Кнопка «Определить грамматические конструкции» |
| `grammarConcepts !== null` (загружено) | Список ссылок: синие (найденные статьи), серые (missing) |

Серые метки для missing-концептов — не кликабельны, показывают `lemma` как текст.

### Поток в чтении

1. При загрузке главы `getBookChapter` возвращает `grammarConcepts` для каждого предложения (если ранее извлекались)
2. `populateChapterStructure` мапит ответ сервера в структуру стора
3. `ChapterSentence` рендерит `GrammarConceptLinks` после каждого предложения
4. При клике на кнопку — `handleFetchGrammarConcepts` вызывает мутацию `grammar_concept_fetch`
5. После ответа обновляет локальный стейт предложения (и `grammarConcepts`, и `missingGrammarConcepts`)

### Типы в readingStore

```ts
export namespace ChapterTextStructurePopulated {
    export type Sentence = {
        id: number
        sentence: string
        grammarConcepts: null | GrammarConceptData[]       // null = ещё не загружалось
        missingGrammarConcepts: MissingGrammarConceptData[]
    }

    export type GrammarConceptData = {
        id: string
        title: string
        slug: string
        category: string
        sourceLanguage: string
    }

    export type MissingGrammarConceptData = {
        category: string
        lemma: string
    }
}
```

## Клиент: отображение в видео

Извлечение грамматических концептов для видео работает по тому же принципу, что и для книг, но использует общую таблицу `Sentence` (с полями `video_private_id` и `video_public_id`).

### GraphQL-запросы

#### getVideoPrivate / getVideoPublic

Оба запроса принимают опциональный `targetLanguageCode`. При его передаче сервер для каждого предложения:
1. Извлекает текст через offsets из `processedContent`
2. Нормализует текст и ищет `UniversalPhrase`
3. Если `grammarExtractionStatus === 'SUCCESS'` — возвращает найденные концепты (фильтруя по `targetLanguageCode`)

```graphql
query {
  video_private_get(input: {
    id: 1
    targetLanguageCode: "ru"
  }) {
    sentences {
      id
      sentence
      grammarConcepts { id title slug category sourceLanguage }
      missingGrammarConcepts { category lemma }
    }
  }
}
```

### Выходные модели

Поля `grammarConcepts` и `missingGrammarConcepts` добавлены как в `VideoPrivateSentenceOutModel`, так и в `VideoPublicSentenceOutModel`:

```typescript
@Field(() => [GrammarConceptOutModel], { nullable: true })
grammarConcepts: GrammarConceptOutModel[] | null
// null = не загружалось (нет targetLanguageCode в запросе)

@Field(() => [MissingGrammarConceptOutModel], { nullable: true })
missingGrammarConcepts: MissingGrammarConceptOutModel[] | null
```

### enrichSentencesWithGrammarConcepts

Общий хелпер `server/src/repo/grammarConcept/enrichSentencesWithGrammarConcepts.ts` используется для обогащения предложений грамматическими концептами как в книгах, так и в видео. Принимает:

- `prisma` — экземпляр PrismaService
- `grammarConceptQueryRepo` — для маппинга DB → OutModel
- `sentences` — массив `{ id, startOffset, length }`
- `content` — полный текст (processedContent)
- `sourceLanguageCode`, `targetLanguageCode`

Для каждого предложения нормализует текст, ищет UniversalPhrase, и если статус SUCCESS — возвращает grammarConcepts и missingGrammarConcepts.

### attachVideoTextRelations

Синхронная функция `server/src/repo/video/attachVideoTextRelations.ts` — общая для VideoPrivate и VideoPublic. При сборке выходной модели добавляет предложениям `grammarConcepts: null` и `missingGrammarConcepts: null` по умолчанию. Затем `enrichSentencesWithGrammarConcepts` заменяет эти null на реальные данные, если передан `targetLanguageCode`.

## Выбор LLM-провайдера

Провайдер задаётся в `GrammarExtractionService` константой `provider`:

```ts
const provider: GrammarExtractionProvider = 'gemini'  // 'openai' | 'gemini' | 'deepseek'
```

По умолчанию — Gemini (Flash), наиболее быстрый и дешёвый вариант.

## Как добавить новую статью

1. Создать `.mdx` в `content/{targetLanguage}/{sourceLanguage}/{category}/`
2. Заполнить frontmatter: `lesson_id` (UUID), `title`, `slug`, `order`, `category`, `lemma`, `sourceLanguage`, `targetLanguage`, `aliases`
3. Перезапустить сервер — `SyncMdxGrammarConcepts` upsert-нёт запись в БД и разрулит ранее ненайденные missing-концепты

## Как добавить поддержку нового языка

1. Добавить категории в `GRAMMAR_CATEGORIES_BY_LANGUAGE` (`server/src/features/grammarConcept/grammarCategories.ts`)
2. Добавить промпт и правила нормализации в `PROMPTS` (`server/src/features/grammarConcept/buildGrammarExtractionPrompt.ts`)
3. Создать статьи в `content/{targetLanguage}/{sourceLanguage}/`

## Ключевые файлы

### Сервер

#### БД и модели
- `server/src/db/dbConfig/dbConfig.ts` — конфигурация таблиц `GrammarConcept`, `UniversalPhrase`, `MissingGrammarConcept`, `GrammarConceptToUniversalPhrase`
- `server/src/db/prismaGenerator/columns/uuidIndexColumn.ts` — генератор UUID-колонок для Prisma
- `server/src/models/grammarConcept/grammarConcept.out.model.ts` — GraphQL-типы: `GrammarConceptOutModel`, `MissingGrammarConceptOutModel`, `UniversalPhraseOutModel`
- `server/src/models/grammarConcept/grammarConcept.service.model.ts` — внутренние типы: `GrammarConceptServiceModel`, `UniversalPhraseServiceModel`, `MissingGrammarConceptServiceModel`
- `server/src/models/videoPrivate/videoPrivateOut.model.ts` — `VideoPrivateSentenceOutModel` с полями `grammarConcepts`, `missingGrammarConcepts`
- `server/src/models/videoPublic/videoPublic.out.model.ts` — `VideoPublicSentenceOutModel` с полями `grammarConcepts`, `missingGrammarConcepts`

#### Репозитории
- `server/src/repo/grammarConcept.repository.ts` — `findByLemmas()`, `upsertByLessonId()`, `deleteNotInIds()`
- `server/src/repo/grammarConcept.queryRepository.ts` — `mapDbToOutModel()`, `mapDbToMissingOutModel()`
- `server/src/repo/universalPhrase.repository.ts` — `findOrCreate()`, `findByIdWithRelations()`, `completeExtraction()`, `updateStatus()`
- `server/src/repo/grammarConcept/enrichSentencesWithGrammarConcepts.ts` — общий хелпер обогащения предложений концептами (книги + видео)
- `server/src/repo/video/attachVideoTextRelations.ts` — сборка выходной модели видео с дефолтными grammar-полями
- `server/src/repo/bookChapter/bookChapter.queryRepository.ts` — `getBookChapterById()` с поддержкой `targetLanguageCode`
- `server/src/repo/video/videoPrivate.queryRepository.ts` — `getVideoById()` с поддержкой `targetLanguageCode`
- `server/src/repo/video/videoPublic.queryRepository.ts` — `getVideoById()` с поддержкой `targetLanguageCode`

#### Команды
- `server/src/features/grammarConcept/FetchGrammarConcepts.command.ts` — извлечение концептов из предложения
- `server/src/features/grammarConcept/SyncMdxGrammarConcepts.command.ts` — синхронизация MDX-статей с БД при старте
- `server/src/features/video/GetVideoPrivate.command.ts` — команда с параметром `targetLanguageCode`
- `server/src/features/video/GetVideoPublic.command.ts` — команда с параметром `targetLanguageCode`

#### LLM
- `server/src/features/grammarConcept/grammarExtraction.service.ts` — вызов LLM и парсинг ответа
- `server/src/features/grammarConcept/buildGrammarExtractionPrompt.ts` — построение промпта с категориями и правилами
- `server/src/features/grammarConcept/grammarCategories.ts` — категории по языкам

#### API
- `server/src/routes/grammarConcept/grammarConcept.resolver.ts` — GraphQL-резолвер мутации `grammar_concept_fetch`
- `server/src/routes/grammarConcept/inputs/fetchGrammarConcepts.input.ts` — входной тип с валидацией через `DtoFieldDecorators`
- `server/src/routes/grammarConcept/grammarConcept.module.ts` — модуль со всеми зависимостями
- `server/src/routes/videoPrivate/videoPrivate.resolver.ts` — `getVideoPrivate` с параметром `targetLanguageCode`
- `server/src/routes/videoPrivate/inputs/getPrivateVideo.input.ts` — добавлено поле `targetLanguageCode`
- `server/src/routes/videoPrivate/videoPrivate.module.ts` — провайдер `GrammarConceptQueryRepository`
- `server/src/routes/videoPublic/videoPublic.resolver.ts` — `getPublicVideo` с параметром `targetLanguageCode`
- `server/src/routes/videoPublic/inputs/getPublicVideo.input.ts` — добавлено поле `targetLanguageCode`
- `server/src/routes/videoPublic/videoPublic.module.ts` — провайдер `GrammarConceptQueryRepository`

#### Инфраструктура
- `server/src/infrastructure/StartServerTasksRunner.ts` — запуск `SyncMdxGrammarConceptsCommand` при старте

### Клиент

#### Страницы /grammar
- `face/app/grammar/layout.tsx` — общий лейаут (PageContentWrapper + BreadCrumbs + Header + GrammarPageContent)
- `face/app/grammar/page.tsx` — список категорий
- `face/app/grammar/[sourceLanguage]/[category]/layout.tsx` — список статей категории
- `face/app/grammar/[sourceLanguage]/[category]/page.tsx` — заглушка
- `face/app/grammar/[sourceLanguage]/[category]/[articleSlug]/page.tsx` — страница статьи (MDX)

#### Компоненты грамматики
- `face/_pages/grammar/GrammarLayout/GrammarLayout.tsx` — обёртка с крошками и заголовком
- `face/_pages/grammar/GrammarPageContent/GrammarPageContent.tsx` — двухколоночный layout
- `face/_pages/grammar/GrammarCategoriesList/GrammarCategoriesList.tsx` — список доступных языков/категорий
- `face/_pages/grammar/GrammarArticlesList/GrammarArticlesList.tsx` — список статей категории
- `face/_pages/grammar/GrammarArticlePage/GrammarArticlePage.tsx` — рендер MDX
- `face/_pages/grammar/fn/getAllLessons.ts` — загрузка списка статей
- `face/_pages/grammar/fn/getLessonBySlug.ts` — загрузка конкретной статьи
- `face/_pages/grammar/fn/getCategories.ts` — сканирование структуры content/
- `face/_pages/grammar/fn/getContentDir.ts` — получение пути к content/

#### Отображение в чтении и видео
- `face/_pages/media/commonComponents/GrammarConceptLinks/GrammarConceptLinks.tsx` — кнопка/ссылки после предложения
- `face/_pages/media/commonComponents/GrammarConceptLinks/computeArticleUrl.ts` — построение URL статьи
- `face/_pages/media/reading/ChapterContent/ChapterContent.tsx` — хендлер мутации `fetchGrammarConcepts`
- `face/_pages/media/reading/ChapterContent/ChapterSentence.tsx` — рендер предложения с GrammarConceptLinks
- `face/_pages/media/reading/ReadingRoot/fn/populateChapterStructure.ts` — маппинг ответа сервера
- `face/_pages/media/reading/readingStore.ts` — типы `GrammarConceptData`, `MissingGrammarConceptData`

#### GraphQL
- `face/graphql/grammarConcept/fetchGrammarConcepts.graphql` — мутация извлечения
- `face/graphql/bookChapter/bookChapterGet.graphql` — запрос главы с `grammarConcepts`
- `face/graphql/videoPrivate/videoPrivateGet.graphql` — запрос видео с `targetLanguageCode` и `grammarConcepts`
- `face/graphql/videoPublic/videoPublicGet.graphql` — запрос видео с `targetLanguageCode` и `grammarConcepts`

### Конфигурация
- `face/сonsts/pageUrls.ts` — секция `grammar` с `path`, `name`, `article()`
- `infrastructure/docker-files-generator/src/createDockerConfig.ts` — volume `./content:/app/content` для server и face

### Контент
- `content/` — корневая папка с MDX-статьями, смонтирована в Docker-контейнеры
