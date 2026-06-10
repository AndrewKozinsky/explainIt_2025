# Раздел «Грамматические конструкции» — извлечение и отображение

## Что делает функционал

При чтении книги или просмотре субтитров пользователь видит после каждого предложения ссылки на грамматические статьи (фразовые глаголы, выражения, коллокации и т.д.). Система:

1. **Извлекает** грамматические конструкции из текста предложения через LLM (Gemini Flash)
2. **Ищет** существующие статьи в БД по aliases
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
        {slug}.mdx         — файл статьи, где имя файла = slug
```

Пример: `content/ru/en/expression/pull-a-face.mdx` — статья о выражении "pull a face" для русскоязычных, изучающих английский.

### Формат MDX-файла

```mdx
---
lesson_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
title: "Pull a face"
slug: "pull-a-face"           # совпадает с именем файла: pull-a-face.mdx
order: 1
category: "expression"
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
| `slug` | `string` | Уникальный идентификатор для URL. **Всегда равен имени файла без `.mdx`** |
| `order` | `number` | Порядок сортировки в списке |
| `category` | `string` | Категория: `expression`, `phrasal_verb`, `collocation`, `conditional`, etc. |
| `sourceLanguage` | `string` | Код изучаемого языка |
| `targetLanguage` | `string` | Код языка перевода |
| `aliases` | `string[]` | Варианты написания и синонимы для поиска. **Первое значение (`aliases[0]`) — каноническая форма** |

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
| `title` | `String` | Название |
| `slug` | `String` | URL-идентификатор. **Равен имени файла без `.mdx`** |
| `order` | `Int` | Порядок сортировки |
| `aliases` | `String[]` | Массив вариантов для поиска. `aliases[0]` — каноническая форма |

Уникальный индекс: `[source_language_code, target_language_code, category, slug]`

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
| `alias` | `String` | Форма, которую вернул LLM |
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
    missingGrammarConcepts { category alias }
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
6. **Ищет совпадения** в БД через `GrammarConceptRepository.findByLemmas()` — поиск по `[sourceLanguage, targetLanguage, category]` AND `aliases has`
7. **Создаёт связки** через `UniversalPhraseRepository.completeExtraction()` — одной транзакцией:
   - Обновляет статус UniversalPhrase на `SUCCESS`
   - Создаёт записи в `GrammarConceptToUniversalPhrase` для найденных концептов
   - Создаёт записи в `MissingGrammarConcept` для ненайденных
8. **При ошибке** LLM (сетевой сбой, невалидный JSON) — статус ставится `ERROR`

### 3. Промпт для LLM

`buildGrammarExtractionPrompt` (`server/src/features/grammarConcept/buildGrammarExtractionPrompt.ts`):

- Системный промпт и правила нормализации alias написаны **на языке предложения** (en/es/fr/de/it/tr)
- Для каждого языка свой набор категорий из `GRAMMAR_CATEGORIES_BY_LANGUAGE`
- Правила нормализации описывают, как приводить alias к словарной форме для каждой категории
- Ответ должен быть строго JSON: `{ "items": [{ "category": "...", "lemma": "..." }] }`

### 4. Очистка ответа LLM

`GrammarExtractionService.parseResponse()` чистит ответ перед `JSON.parse`:
- Убирает markdown-обёртку ```` ```json ... ``` ````
- Убирает висячие запятые перед `}` и `]`
- Только затем парсит JSON

## Поток получения статьи (GetGrammarArticle)

### 1. GraphQL-запрос `grammar_article_get`

Клиент отправляет:
```graphql
query {
  grammar_article_get(input: {
    sourceLanguage: "en"
    targetLanguage: "ru"
    category: "phrasal_verb"
    slug: "wake-up"
  }) {
    title
    content
    compiledSource
  }
}
```

### 2. Обработчик команды

`GetGrammarArticleHandler` (`server/src/features/grammarConcept/GetGrammarArticle.command.ts`):

1. Ищет папку `content/{targetLanguage}/{sourceLanguage}/{category}/` (проверяет `cwd` и `cwd/..`)
2. Сканирует `.mdx` файлы, ищет совпадение по `slug` в frontmatter
3. Извлекает контент через `gray-matter` (отделяя frontmatter от тела статьи)
4. Компилирует MDX через `@mdx-js/mdx` compile() с опциями:
   - `outputFormat: 'function-body'` — формат, совместимый с `next-mdx-remote`
   - `providerImportSource: '@mdx-js/react'` — источник MDX-провайдера
   - `development: process.env.NODE_ENV !== 'production'`
5. Возвращает `{ title, content, compiledSource }`

### 3. Рендеринг на клиенте

`GrammarArticleModal` использует `<MDXRemote>` из `next-mdx-remote` (non-RSC) с:
- `compiledSource` — скомпилированный код
- `components={mdxComponentsRouter}` — кастомные MDX-компоненты (`Header`, `Paragraph`, `List`, `Note`, `Examples`, `Example`)
- `frontmatter={{}}` и `scope={{}`} — обязательные поля для TypeScript

## Поток получения списка статей (GetGrammarConceptsList)

### 1. GraphQL-запрос `grammar_concepts_list`

Используется на страницах `/grammar/{sourceLanguage}` и в сайдбаре статьи. Клиент отправляет:

```graphql
query {
  grammar_concepts_list(input: {
    sourceLanguage: "en"
    targetLanguage: "ru"
  }) {
    sourceLanguage
    targetLanguage
    categories {
      category
      articles {
        id
        title
        slug
        category
        order
        sourceLanguage
        targetLanguage
      }
    }
  }
}
```

### 2. Обработчик команды

`GetGrammarConceptsListHandler` (`server/src/features/grammarConcept/GetGrammarConceptsList.command.ts`):

1. Вызывает `GrammarConceptRepository.findByLanguages(sourceLanguage, targetLanguage)` — выборка всех статей для языковой пары из БД, отсортированных по `order`
2. Группирует статьи по `category` через `Map<string, GrammarConceptOutModel[]>`
3. Маппит DB-строки в `GrammarConceptOutModel` через `GrammarConceptQueryRepository.mapDbToOutModel()`
4. Возвращает `{ sourceLanguage, targetLanguage, categories: [{ category, articles }] }`

### 3. Резолвер

Резолвер — тонкая прослойка (CQRS): вызывает handler через `CommandBus` и возвращает результат без дополнительной обработки.

### 4. Клиентские компоненты

- **`LanguagePage`** (`/grammar/en`) — вызывает `useGrammarConceptsList`, рендерит все категории со статьями через `SectionWithHeader` + `GrammarLink`
- **`GrammarArticlesList`** (сайдбар статьи) — вызывает `useGrammarConceptsList`, фильтрует по текущей категории, рендерит только статьи этой категории

Метаданные статей читаются из БД. Тело статьи по-прежнему читается из `.mdx` файла (через `getLessonBySlug`).

## Стартовая синхронизация (SyncMdxGrammarConcepts)

При старте сервера `StartServerTasksRunner.onApplicationBootstrap()` выполняет `SyncMdxGrammarConceptsCommand`:

1. **Сканирует** `content/` рекурсивно, собирает все `.mdx` файлы
2. **Для каждого файла** извлекает frontmatter через `gray-matter`, upsert-ит запись в `GrammarConcept` по `id = lesson_id`
3. **Удаляет** из БД GrammarConcept, чьи `id` не найдены среди `lesson_id` файлов
4. **Разрешает missing-концепты** (`resolveMissingConcepts`): для каждой записи в `MissingGrammarConcept` ищет появившуюся статью по `[sourceLanguage, targetLanguage, category]` AND `aliases has`. Если находит — создаёт связку `GrammarConceptToUniversalPhrase` и удаляет `MissingGrammarConcept`

Поиск по алиасам в шаге 4 критичен: LLM может вернуть "get oneself in over one's head", а статья имеет `aliases: ["in over one's head", "get oneself in over one's head"]`.

## Клиент: страницы /grammar

Роутинг через App Router:

```
app/grammar/
  layout.tsx                           — PageContentWrapper + BreadCrumbs + Header
  page.tsx                             — LanguagesPage (выбор языка)
  [sourceLanguage]/
    page.tsx                           — LanguagePage (категории + статьи, сгруппированные по категориям)
    [category]/
      [articleSlug]/
        layout.tsx                     — BreadCrumbs + Header статьи
        page.tsx                       — TopicPage (рендер MDX + сайдбар статей категории)
```

Промежуточная страница категории (`[category]/page.tsx`) убрана. На странице языка (`/grammar/en`) показываются и категории, и ссылки на статьи — навигация сокращена с 3 кликов до 2.

Хлебные крошки:
- **Языковая страница**: Грамматика → Язык
- **Страница статьи**: Грамматика → Язык → Статья (категория исключена из крошек)

### Загрузка данных

**Списки статей читаются из БД** через GraphQL-запрос `grammar_concepts_list` (см. ниже). Это устраняет дублирование: раньше списки читали `.mdx` из файловой системы, а модалка в читалке ходила через GraphQL. Теперь все клиенты получают метаданные единообразно.

В `face/_pages/grammar/`:

- **`LanguagePage`** — клиентский компонент, использует хук `useGrammarConceptsList` для получения всех категорий и статей, группирует по категориям, рендерит `SectionWithHeader` + `GrammarLink`
- **`GrammarArticlesList`** — клиентский компонент в сайдбаре статьи, использует `useGrammarConceptsList`, фильтрует только статьи текущей категории
- **`TopicContent/fn/getLessonBySlug(sourceLanguage, category, slug)`** — читает тело статьи из `.mdx` файла (файловая система для тела статьи сохранена)

## Клиент: отображение в чтении

### Компонент GrammarConceptLinks

`face/_pages/media/reading/content/tools/GrammarConceptLinks/GrammarConceptLinks.tsx`

Отображает после каждого предложения:

| Тип | Вид | Поведение |
|-----|-----|-----------|
| Найденные статьи | Синие кнопки (`theme='outline'`) | При клике открывают модальное окно `GrammarArticleModal` |
| Missing-концепты | Серые кнопки (`theme='plain'`, disabled) | Не кликабельны, показывают `alias` как текст |

### Модальное окно GrammarArticleModal

`face/_pages/media/reading/content/tools/GrammarArticleModal/GrammarArticleModal.tsx`

При клике на кнопку концепта открывается модальное окно, которое:

1. Делает GraphQL-запрос `grammar_article_get` с параметрами `sourceLanguage`, `targetLanguage`, `category`, `slug`
2. Получает `compiledSource` — скомпилированный MDX (с сервера через `@mdx-js/mdx`, формат `function-body`)
3. Рендерит статью через `<MDXRemote>` из `next-mdx-remote` (non-RSC) с `mdxComponentsRouter` — те же компоненты, что использует `Article` (`Header`, `Paragraph`, `List`, `Note`, `Examples`, `Example`)

### Поток в чтении

1. При загрузке главы `getBookChapter` возвращает `grammarConcepts` для каждого предложения (если ранее извлекались)
2. `populateChapterStructure` мапит ответ сервера в структуру стора
3. `ChapterSentenceBlock` рендерит `GrammarConceptLinks` после каждого предложения
4. При клике на кнопку концепта — открывается `GrammarArticleModal` и загружает статью через `grammar_article_get`
5. Если концепты ещё не извлекались (`grammarConcepts === null`) — показывается кнопка «Определить грамматические конструкции», которая вызывает мутацию `grammar_concept_fetch`
6. После ответа мутации обновляется локальный стейт предложения

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
        targetLanguage: string
    }

    export type MissingGrammarConceptData = {
        category: string
        alias: string
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
      missingGrammarConcepts { category alias }
    }
  }
}
```

### Выходные модели

#### GrammarExtractionOutModel
Результат мутации `grammar_concept_fetch`:

```typescript
@ObjectType()
export class GrammarExtractionOutModel {
    @Field(() => Int) id: number
    @Field(() => String) sentenceText: string
    @Field(() => String) sourceLanguage: string
    @Field(() => String) grammarExtractionStatus: string
    @Field(() => [GrammarConceptOutModel]) grammarConcepts: GrammarConceptOutModel[]
    @Field(() => [MissingGrammarConceptOutModel]) missingGrammarConcepts: MissingGrammarConceptOutModel[]
}
```

#### GrammarArticleOutModel
Результат запроса `grammar_article_get` (в отдельном файле `grammarArticle.out.model.ts`):

```typescript
@ObjectType()
export class GrammarArticleOutModel {
    @Field(() => String) title: string
    @Field(() => String) content: string        // сырой MDX
    @Field(() => String) compiledSource: string  // скомпилированный MDX (function-body)
}
```

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
2. Заполнить frontmatter: `lesson_id` (UUID), `title`, `slug`, `order`, `category`, `sourceLanguage`, `targetLanguage`, `aliases` (первое значение — каноническая форма)
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
- `server/src/models/grammarConcept/grammarConcept.out.model.ts` — GraphQL-типы: `GrammarConceptOutModel`, `MissingGrammarConceptOutModel`, `GrammarExtractionOutModel`
- `server/src/models/grammarConcept/grammarArticle.out.model.ts` — GraphQL-тип `GrammarArticleOutModel`: `title`, `content`, `compiledSource`
- `server/src/models/grammarConcept/grammarConceptsList.out.model.ts` — GraphQL-типы: `GrammarConceptsListOutModel`, `GrammarConceptCategoryGroup`
- `server/src/models/grammarConcept/grammarConcept.service.model.ts` — внутренние типы: `GrammarConceptServiceModel`, `UniversalPhraseServiceModel`, `MissingGrammarConceptServiceModel`
- `server/src/models/videoPrivate/videoPrivateOut.model.ts` — `VideoPrivateSentenceOutModel` с полями `grammarConcepts`, `missingGrammarConcepts`
- `server/src/models/videoPublic/videoPublic.out.model.ts` — `VideoPublicSentenceOutModel` с полями `grammarConcepts`, `missingGrammarConcepts`

#### Репозитории
- `server/src/repo/grammarConcept.repository.ts` — `findByLemmas()`, `findByLanguages()`, `upsertByLessonId()`, `deleteNotInIds()`
- `server/src/repo/grammarConcept.queryRepository.ts` — `mapDbToOutModel()`, `mapDbToMissingOutModel()`
- `server/src/repo/universalPhrase.repository.ts` — `findOrCreate()`, `findByIdWithRelations()`, `completeExtraction()`, `updateStatus()`
- `server/src/repo/grammarConcept/enrichSentencesWithGrammarConcepts.ts` — общий хелпер обогащения предложений концептами (книги + видео)
- `server/src/repo/video/attachVideoTextRelations.ts` — сборка выходной модели видео с дефолтными grammar-полями
- `server/src/repo/bookChapter/bookChapter.queryRepository.ts` — `getBookChapterById()` с поддержкой `targetLanguageCode`
- `server/src/repo/video/videoPrivate.queryRepository.ts` — `getVideoById()` с поддержкой `targetLanguageCode`
- `server/src/repo/video/videoPublic.queryRepository.ts` — `getVideoById()` с поддержкой `targetLanguageCode`

#### Команды
- `server/src/features/grammarConcept/FetchGrammarConcepts.command.ts` — извлечение концептов из предложения
- `server/src/features/grammarConcept/GetGrammarArticle.command.ts` — получение статьи из `content/` с компиляцией MDX через `@mdx-js/mdx`
- `server/src/features/grammarConcept/GetGrammarConceptsList.command.ts` — получение списка статей из БД, сгруппированных по категориям
- `server/src/features/grammarConcept/SyncMdxGrammarConcepts.command.ts` — синхронизация MDX-статей с БД при старте
- `server/src/features/video/GetVideoPrivate.command.ts` — команда с параметром `targetLanguageCode`
- `server/src/features/video/GetVideoPublic.command.ts` — команда с параметром `targetLanguageCode`

#### LLM
- `server/src/features/grammarConcept/grammarExtraction.service.ts` — вызов LLM и парсинг ответа
- `server/src/features/grammarConcept/buildGrammarExtractionPrompt.ts` — построение промпта с категориями и правилами
- `server/src/features/grammarConcept/grammarCategories.ts` — категории по языкам

#### API
- `server/src/routes/grammarConcept/grammarConcept.resolver.ts` — GraphQL-резолвер: мутация `grammar_concept_fetch`, запросы `grammar_article_get` и `grammar_concepts_list`
- `server/src/routes/grammarConcept/inputs/fetchGrammarConcepts.input.ts` — входной тип мутации с валидацией через `DtoFieldDecorators`
- `server/src/routes/grammarConcept/inputs/getGrammarArticle.input.ts` — входной тип запроса: `sourceLanguage`, `targetLanguage`, `category`, `slug`
- `server/src/routes/grammarConcept/inputs/getGrammarConceptsList.input.ts` — входной тип запроса: `sourceLanguage`, `targetLanguage`
- `server/src/routes/grammarConcept/grammarConcept.module.ts` — модуль со всеми зависимостями
- `server/src/routes/videoPrivate/videoPrivate.resolver.ts` — `getVideoPrivate` с параметром `targetLanguageCode`
- `server/src/routes/videoPrivate/inputs/getPrivateVideo.input.ts` — добавлено поле `targetLanguageCode`
- `server/src/routes/videoPrivate/videoPrivate.module.ts` — провайдер `GrammarConceptQueryRepository`
- `server/src/routes/videoPublic/videoPublic.resolver.ts` — `getPublicVideo` с параметром `targetLanguageCode`
- `server/src/routes/videoPublic/inputs/getPublicVideo.input.ts` — добавлено поле `targetLanguageCode`
- `server/src/routes/videoPublic/videoPublic.module.ts` — провайдер `GrammarConceptQueryRepository`

#### Инфраструктура
- `server/src/infrastructure/routeNames.ts` — имена GraphQL-операций: `FETCH`, `ARTICLE_GET`, `LIST`
- `server/src/infrastructure/StartServerTasksRunner.ts` — запуск `SyncMdxGrammarConceptsCommand` при старте
- `server/src/worker.module.ts` — добавлен `GrammarConceptQueryRepository` в провайдеры (нужен для `VideoPrivateQueryRepository`)

#### Зависимости
- `@mdx-js/mdx` (сервер) — компиляция MDX в `compiledSource` для отправки на клиент
- `next-mdx-remote` (клиент) — non-RSC `<MDXRemote>` для рендеринга скомпилированного MDX в клиентском компоненте
- `gray-matter` (сервер) — извлечение frontmatter из `.mdx` файлов

### Клиент

#### Страницы /grammar
- `face/app/[locale]/grammar/layout.tsx` — корневой лейаут (PageContentWrapper + BreadCrumbs + Header)
- `face/app/[locale]/grammar/page.tsx` — список языков (LanguagesPage)
- `face/app/[locale]/grammar/[sourceLanguage]/page.tsx` — категории + статьи (LanguagePage)
- `face/app/[locale]/grammar/[sourceLanguage]/[category]/[articleSlug]/layout.tsx` — лейаут статьи (BreadCrumbs + Header)
- `face/app/[locale]/grammar/[sourceLanguage]/[category]/[articleSlug]/page.tsx` — страница статьи (TopicPage: MDX + сайдбар)

#### Компоненты грамматики
- `face/_pages/grammar/languagePage/LanguagePage/LanguagePage.tsx` — клиентский компонент, запрашивает `grammar_concepts_list`, показывает категории и статьи
- `face/_pages/grammar/topicPage/TopicPage/TopicPage.tsx` — двухколоночный layout статьи (сайдбар + контент)
- `face/_pages/grammar/topicPage/GrammarArticlesList/GrammarArticlesList.tsx` — клиентский компонент, запрашивает `grammar_concepts_list`, показывает статьи текущей категории в сайдбаре
- `face/_pages/grammar/topicPage/TopicContent/TopicContent.tsx` — рендер тела статьи из MDX
- `face/_pages/grammar/topicPage/TopicContent/fn/getLessonBySlug.ts` — чтение тела статьи из `.mdx` файла
- `face/_pages/grammar/common/GrammarCard/GrammarCard.tsx` — карточка для отображения в сетке
- `face/_pages/grammar/topicPage/GrammarLink/GrammarLink.tsx` — ссылка на статью в списке (сайдбар, LanguagePage)
- `face/utils/contentFolder.ts` — утилиты для чтения структуры `content/` и метаданных статей
- `face/utils/categoryDisplayNames.ts` — человекочитаемые названия категорий

#### Отображение в чтении и видео
- `face/_pages/media/reading/content/tools/GrammarConceptLinks/GrammarConceptLinks.tsx` — кнопки концептов после предложения + модальное окно
- `face/_pages/media/reading/content/tools/GrammarArticleModal/GrammarArticleModal.tsx` — модальное окно со статьёй (GraphQL + MDXRemote)
- `face/_pages/media/reading/ChapterContent/ChapterSentence.tsx` — рендер предложения с GrammarConceptLinks
- `face/_pages/media/reading/ReadingRoot/fn/populateChapterStructure.ts` — маппинг ответа сервера
- `face/_pages/media/reading/readingStore.ts` — типы `GrammarConceptData`, `MissingGrammarConceptData`

#### GraphQL
- `face/graphql/grammarConcept/fetchGrammarConcepts.graphql` — мутация извлечения
- `face/graphql/grammarConcept/getGrammarArticle.graphql` — запрос статьи (`title`, `content`, `compiledSource`)
- `face/graphql/grammarConcept/getGrammarConceptsList.graphql` — запрос списка статей, сгруппированных по категориям
- `face/graphql/bookChapter/bookChapterGet.graphql` — запрос главы с `grammarConcepts`
- `face/graphql/videoPrivate/videoPrivateGet.graphql` — запрос видео с `targetLanguageCode` и `grammarConcepts`
- `face/graphql/videoPublic/videoPublicGet.graphql` — запрос видео с `targetLanguageCode` и `grammarConcepts`

### Конфигурация
- `face/utils/pageUrls.ts` — секция `grammar` с `path`, `name`, `language()`, `article()` (категория в URL осталась, отдельная страница категории — нет)
- `infrastructure/docker-files-generator/src/createDockerConfig.ts` — volume `./content:/app/content` для server и face

### Контент
- `content/` — корневая папка с MDX-статьями, смонтирована в Docker-контейнеры
