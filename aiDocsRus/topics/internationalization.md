# Интернационализация (i18n)

Проект использует библиотеку [next-intl](https://next-intl.dev/) (v4.13.0) для перевода интерфейса и контента на несколько языков. Язык определяется первым сегментом URL: `/en/books`, `/ru/books` и т.д.

## Обзор файлов

| Файл | Назначение |
|---|---|
| `i18n/routing.ts` | Конфигурация роутинга: список локалей, дефолтная локаль, экспорт `Link`, `redirect`, `usePathname`, `useRouter` |
| `i18n/request.ts` | Загрузка JSON-файла с переводами для текущей локали |
| `i18n/serverRedirect.ts` | Серверный редирект с автоматической подстановкой локали |
| `proxy.ts` | Middleware для Next.js 16: редирект с `/` на `/{locale}`, определение языка по cookie/заголовкам |
| `messages/*.json` | JSON-файлы с переводами (en.json, ru.json, es.json и т.д.) |
| `utils/languages.ts` | Определения языков (код, названия), `languageKeys`, `LanguageCode` |
| `utils/pageUrls.ts` | Адреса страниц **без** языкового префикса (`/books`, а не `/en/books`) |

## Как это работает

### Middleware (proxy.ts)

При заходе на сайт `proxy.ts` (Next.js 16 замена `middleware.ts`) определяет локаль:

1. Проверяет cookie `NEXT_LOCALE` (сохраняется при смене языка)
2. Проверяет заголовок `Accept-Language` браузера
3. Если локаль не определена — используется `en`

Затем редиректит `/` → `/en` (или на язык пользователя).

### Определение языка

В URL язык всегда на первом месте: `/[locale]/...`. Next.js передаёт его как параметр `params.locale` в layout'ы и страницы внутри `app/[locale]/`.

#### В серверных компонентах

```typescript
import { getLocale } from 'next-intl/server'

export default async function MyServerComponent() {
    const locale = await getLocale() // 'en' | 'ru' | ...
}
```

#### В клиентских компонентах

```typescript
'use client'
import { useLocale } from 'next-intl'

function MyClientComponent() {
    const locale = useLocale() // 'en' | 'ru' | ...
}
```

### Ссылки

Для всех внутренних ссылок используется `Link` из `@/i18n/routing` (вместо `next/link`). Он автоматически подставляет локаль в URL:

```typescript
'use client'
import { Link } from '@/i18n/routing'
import { pageUrls } from '@/utils/pageUrls'

// pageUrls.books.path → '/books' (без локали)
// Link сам добавит локаль: '/en/books'
<Link href={pageUrls.books.path}>{pageUrls.books.name}</Link>
```

**Правило**: `pageUrls` содержит пути БЕЗ языкового префикса. Локаль добавляется автоматически:
- В `<Link>` — через `@/i18n/routing`
- При редиректе — через `localizePath()` или `serverRedirect()`

### Редиректы

#### Серверные компоненты и server actions

Используется `serverRedirect` из `@/i18n/serverRedirect`. Он автоматически получает текущую локаль через `getLocale()` и добавляет её к пути:

```typescript
import { serverRedirect } from '@/i18n/serverRedirect'
import { pageUrls } from '@/utils/pageUrls'

// Перенаправит на /en/auth/login или /ru/auth/login
await serverRedirect(pageUrls.auth.login.path)
```

#### Клиентские компоненты

Используется `redirect` из `next/navigation` + `useLocale()` + `localizePath()`:

```typescript
'use client'
import { redirect } from 'next/navigation'
import { useLocale } from 'next-intl'
import { pageUrls } from '@/utils/pageUrls'
import { localizePath } from '@/utils/pageUrls'

function MyComponent() {
    const locale = useLocale()

    if (someCondition) {
        // localizePath('en', '/books') → '/en/books'
        redirect(localizePath(locale, pageUrls.books.path))
    }
}
```

**Почему не везде `serverRedirect`?** `serverRedirect` использует `getLocale()` из `next-intl/server`, который работает только на сервере. В клиентских компонентах локаль получается через хук `useLocale()`, а редирект — через нативный `redirect` из `next/navigation`.

### Переводы (JSON)

Переводы хранятся в `messages/*.json`. Наполняются **постепенно** — не нужно переводить всё сразу.

```json
// messages/en.json
{
  "books": {
    "title": "Books",
    "description": "Browse our collection"
  }
}

// messages/ru.json
{
  "books": {
    "title": "Книги",
    "description": "Просмотрите нашу коллекцию"
  }
}
```

#### Использование в серверных компонентах

```typescript
import { getTranslations } from 'next-intl/server'

export default async function BooksPage() {
    const t = await getTranslations('books')
    return <h1>{t('title')}</h1> // → 'Books' или 'Книги'
}
```

#### Использование в клиентских компонентах

```typescript
'use client'
import { useTranslations } from 'next-intl'

function BooksHeader() {
    const t = useTranslations('books')
    return <h1>{t('title')}</h1>
}
```

### Смена языка (LanguageSwitcher)

`ui/pageRelated/pageTopBar/LanguageSwitcher/LanguageSwitcher.tsx` — выпадающий список для смены языка:

```typescript
'use client'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'

function LanguageSwitcher() {
    const router = useRouter()
    const pathname = usePathname() // путь без локали: '/books'
    const locale = useLocale()     // текущая локаль: 'en'

    function handleChange(event) {
        const newLocale = event.target.value
        // Мягкая навигация без перезагрузки страницы
        router.replace(pathname, { locale: newLocale })
    }
}
```

`router.replace(pathname, { locale })` сохраняет текущую страницу и меняет только язык в URL. Next-intl автоматически обновляет cookie `NEXT_LOCALE`.

## Добавление нового языка

1. Добавить язык в `utils/languages.ts` (объект `languages`):
   ```typescript
   zh: {
       nameRus: 'Китайский',
       code: 'zh',
   },
   ```
   `languageKeys` обновится автоматически.

2. Создать `messages/zh.json` (можно пустой `{}`).

3. `i18n/routing.ts` использует `languageKeys` из `languages.ts`, поэтому новая локаль автоматически добавится в роутинг.

4. Добавить переводы в `messages/zh.json`.

Готово — язык появится в LanguageSwitcher и маршрутизации.

## Важные замечания

- **`pageUrls`** содержит пути БЕЗ языкового префикса. Префикс добавляется автоматически через `next-intl` (`Link`, `serverRedirect`) или вручную через `localizePath()` в клиентских компонентах.
- **`proxy.ts`** обязателен — без него не работает определение языка и редирект с `/`.
- **Docker**: при локальной разработке используется bind mount `./face:/app`, поэтому в docker-compose добавлен анонимный volume `/app/node_modules`, чтобы не затирать установленные в контейнере платформенные бинарники.
- **Генератор docker-compose**: docker-compose файлы не редактируются вручную. Правки вносятся в `infrastructure/docker-files-generator/src/createDockerConfig.ts` (функция `createDockerConfig`), затем генерируются командой:
  ```bash
  cd infrastructure/docker-files-generator
  npm run build && npm run generate
  ```
