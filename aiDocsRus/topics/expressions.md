# Раздел «Выражения» — MDX-уроки

## Что делает функционал

Раздел «Выражения» (`/expressions`) — это каталог уроков по английским выражениям и фразовым глаголам. Каждый урок написан в формате MDX и рендерится через `next-mdx-remote/rsc` с кастомными UI-компонентами.

Раздел делится на две категории:
- **Выражения** (`textbooks/ruUser/en/expressions/`) — идиомы и устойчивые выражения.
- **Фразовые глаголы** (`textbooks/ruUser/en/phrasalVerbs/`) — phrasal verbs.

## Структура MDX-файла урока

Каждый `.mdx` файл содержит frontmatter и тело:

```mdx
---
lesson_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
title: "Pull a face"
slug: "pull-a-face"
order: 1
---

## Заголовок секции

Текст параграфа.

<Note noteStyle="gray">
  ## Важно
  Текст внутри серой заметки.
</Note>

<Examples>
  <Example foreign="The child **pulled a face**." native="Ребёнок **скривился**." />
</Examples>

- элемент списка
- ещё один элемент

1. нумерованный пункт
2. второй пункт
```

### Поля frontmatter

| Поле | Тип | Описание |
|------|-----|----------|
| `lesson_id` | `string` | UUID урока |
| `title` | `string` | Название для отображения в боковом меню |
| `slug` | `string` | Уникальный идентификатор для URL |
| `order` | `number` | Порядок сортировки в списке |

### Тип LessonMeta

```ts
type LessonMeta = {
    lesson_id: string
    title: string
    slug: string
    order: number
}
```

## Доступные MDX-компоненты

Все компоненты зарегистрированы в `face/ui/articleBuilder/mdxComponentsRouter.tsx` через маппинг `MDXComponents`.

### Стандартные HTML-элементы (автоматический маппинг)

| MDX | Компонент | Описание |
|-----|-----------|----------|
| `##` / `###` / `####` | `<Header tag="h2"/"h3"/"h4">` | Заголовки секций |
| `текст` | `<Paragraph>` | Обычный текст |
| `- item` | `<List listType="dots">` | Маркированный список |
| `1. item` | `<List listType="numbers">` | Нумерованный список |

### Кастомные компоненты

#### `<Note>`
Серая или жёлтая обёртка для выделенного блока. Может содержать любые вложенные MDX-элементы.

```mdx
<Note noteStyle="gray">  <!-- или "yellow", по умолчанию "gray" -->
  ## Заголовок внутри заметки
  Текст внутри заметки.
</Note>
```

#### `<Examples>` и `<Example>`
Блок с примерами употребления. `<Example>` принимает две строковые пропсы: `foreign` (фраза на английском) и `native` (перевод на русский). Жирный текст выделяется через `**word**`.

```mdx
<Examples>
  <Example foreign="She **pulled a face** at the suggestion." native="Она **скривилась** от этого предложения." />
  <Example foreign="Stop **pulling faces**!" />
</Examples>
```

Важно: пропсы `foreign` и `native` должны быть **строками**. JS-выражения внутри пропсов (`{someVar}`) не поддерживаются в `next-mdx-remote/rsc`.

## Как работает клиент

### Роутинг

Страницы раздела используют App Router Next.js:

```
app/expressions/
  layout.tsx                       — общая обёртка PageWrapper для всех страниц раздела
  page.tsx                         — индексная страница (список уроков + заглушка)
  [articleSlug]/
    layout.tsx                     — лейаут статьи (хлебные крошки + заголовок)
    page.tsx                       — страница статьи (рендер MDX)
```

### Цепочка рендеринга индексной страницы

1. `app/expressions/page.tsx` → `ExpressionsLayout` > `ExpressionsPage`
2. `ExpressionsLayout` — отрисовывает `BreadCrumbs` (Главная), `Header` («Выражения»), и `ExpressionsPageContent`
3. `ExpressionsPageContent` — две колонки:
   - **Левая (sidebar):** `ExpressionsList` → две `LessonSection` («Выражения» и «Фразовые глаголы»), каждая вызывает `getAllLessons(subDir)` и рендерит `<Link>` на каждый урок
   - **Правая (контент):** `children` (на индексной — заглушка «Please select an article»)

### Цепочка рендеринга страницы статьи

1. `app/expressions/[articleSlug]/layout.tsx` — получает `articleSlug` из params, вызывает `getLessonBySlug(slug)`, передаёт заголовок статьи в `headerText` и добавляет `pageUrls.expressions` в `breadcrumbItems`
2. `app/expressions/[articleSlug]/page.tsx` → `ExpressionPage`
3. `ExpressionPage` — вызывает `getLessonBySlug(slug)`, получает `{ frontmatter, content }`, рендерит `<MDXRemote source={content} components={mdxComponentsRouter} />`

### Загрузка данных

Два загрузчика в `_pages/expressions/`:

- **`getAllLessons(subDir)`** — читает все `.mdx` файлы из `textbooks/ruUser/en/{subDir}/`, извлекает `LessonMeta` из frontmatter, сортирует по `order`
- **`getLessonBySlug(slug)`** — ищет `.mdx` с matching slug по всем `SUB_DIRS` (`['expressions', 'phrasalVerbs']`), возвращает `{ frontmatter: LessonMeta, content: string }`

Оба используют синхронное чтение через `fs` и парсят frontmatter через `gray-matter`.

### Хлебные крошки и заголовок

- **Индексная страница:** крошки = только «Главная», заголовок = «Выражения» (из `pageUrls.expressions.name`)
- **Страница статьи:** крошки = «Главная» > «Выражения», заголовок = `lesson.frontmatter.title`
- Название статьи **не** добавляется в хлебные крошки (только ссылка на раздел)

### Боковое меню

Боковое меню показывается на всех страницах раздела (и на индексной, и на страницах статей). Оно содержит две секции:
- «Выражения» — уроки из `textbooks/ruUser/en/expressions/`
- «Фразовые глаголы» — уроки из `textbooks/ruUser/en/phrasalVerbs/`

## Как добавить новый урок

1. Создать `.mdx` файл в `face/textbooks/ruUser/en/expressions/` (для выражений) или `face/textbooks/ruUser/en/phrasalVerbs/` (для фразовых глаголов)
2. Заполнить frontmatter: `lesson_id`, `title`, `slug`, `order`
3. Написать тело урока, используя стандартные заголовки (`##`), текст, списки и кастомные компоненты (`<Note>`, `<Examples>`)
4. Перезапустить dev-сервер не требуется — Next.js подхватит новый файл автоматически

## Как добавить новый MDX-компонент

1. Создать React-компонент в `face/ui/articleBuilder/components/<Name>/<Name>.tsx`
2. Добавить экспорт в `face/ui/articleBuilder/mdxComponentsRouter.tsx`
3. Компонент будет доступен в MDX по имени экспорта

## Ключевые файлы

### Роутинг
- `face/app/expressions/layout.tsx` — общий лейаут с `PageWrapper`
- `face/app/expressions/page.tsx` — индексная страница
- `face/app/expressions/[articleSlug]/layout.tsx` — лейаут статьи (крошки + заголовок)
- `face/app/expressions/[articleSlug]/page.tsx` — страница статьи

### Страницы и бизнес-логика
- `face/_pages/expressions/expressions/ExpressionsPage/ExpressionsPage.tsx` — заглушка контента
- `face/_pages/expressions/expressions/ExpressionsLayout/ExpressionsLayout.tsx` — общий лейаут раздела (крошки, заголовок, контент)
- `face/_pages/expressions/expressions/ExpressionsPageContent/ExpressionsPageContent.tsx` — двухколоночный layout (sidebar + контент)
- `face/_pages/expressions/expressions/ExpressionsList/ExpressionsList.tsx` — рендерит две `LessonSection`
- `face/_pages/expressions/expressions/ExpressionsList/LessonSection.tsx` — загружает и отображает список уроков одной категории
- `face/_pages/expressions/expressions/ExpressionsList/fn/getAllLessons.ts` — читает `.mdx` файлы из папки
- `face/_pages/expressions/expression/ExpressionPage/ExpressionPage.tsx` — рендерит MDX-контент урока
- `face/_pages/expressions/expression/ExpressionPage/fn/getLessonBySlug.ts` — ищет урок по slug в обоих подкаталогах

### MDX-компоненты
- `face/ui/articleBuilder/mdxComponentsRouter.tsx` — регистрация всех компонентов
- `face/ui/articleBuilder/components/Header/Header.tsx`
- `face/ui/articleBuilder/components/Paragraph/Paragraph.tsx`
- `face/ui/articleBuilder/components/List/List.tsx`
- `face/ui/articleBuilder/components/Note/Note.tsx`
- `face/ui/articleBuilder/components/Examples/Examples.tsx`

### Контент
- `face/textbooks/ruUser/en/expressions/` — `.mdx` файлы выражений
- `face/textbooks/ruUser/en/phrasalVerbs/` — `.mdx` файлы фразовых глаголов

### Конфигурация
- `face/сonsts/pageUrls.ts` — секция `expressions` с `path`, `name` и функцией `article(slug)`
- `face/next.config.ts` — `transpilePackages: ['next-mdx-remote']`
