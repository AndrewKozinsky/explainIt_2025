# Репозитории на клиенте (Repository Pattern)

## Обзор

Репозиторий — это прослойка между компонентами и серверным API. Компоненты зависят от абстрактного интерфейса (`BooksRepository`), а не от конкретных Orval-хуков или fetch-вызовов.

**Зачем:**
- **Переиспользование** — компонент не знает, откуда приходят данные (REST, GraphQL, localStorage)
- **Тестирование** — в тестах подставляется мок-репозиторий, сервер не нужен
- **Устойчивость к изменениям API** — при смене формата ответа меняется только маппер в репозитории, компоненты не трогаем

## Архитектура

```
Компонент                    useFetchData              BooksApi                 Сервер
────────                     ────────────              ────────                 ──────

const { loading, error,      <T>(fetcher, deps)        implements               GET /api/book
  data } = useFetchData(       → { loading, error,     BooksRepository          ↓
  () => api.getBooks()         data }                   ↓                       BookOutModel[]
)                            ┌─ try/catch              bookControllerGetBooks()  (OpenAPI → Orval)
                             │   → resolveError         ↓
                             │   → русский текст        response.data.map(...)
                             └─ ошибка → текст           BookOutModel → Book
```

### Слои

| Слой | Где лежит | Ответственность |
|---|---|---|
| **Типы** (`Book`, `BooksRepository`) | `face/entites/<entity>/repository/BooksRepository.ts` | Унифицированные типы, не зависящие от API |
| **Реализация** (`BooksApi`) | `face/entites/<entity>/repository/BooksApi.ts` | Вызов Orval-функций, маппинг в унифицированные типы |
| **Хуки** (`useFetchData`, `useAsyncMutation`) | `face/shared/hooks/` | `useFetchData` — запрос при монтировании, `useAsyncMutation` — запрос по событию |
| **Утилита** (`fetchData`) | `face/shared/utils/fetchData.ts` | Для Server Components — нет хуков, нет `loading` |

## Как создать репозиторий

### 1. Определить унифицированный тип и интерфейс (`BooksRepository.ts`)

```typescript
// face/entites/books/repository/BooksRepository.ts

export type Book = {
    id: number
    type: 'public' | 'private'
    name: null | string
    // ... остальные поля — чистые типы (string, number, boolean)
}

export type BooksRepository = {
    getBooks(): Promise<Book[]>
    getBook(id: number): Promise<Book>
}
```

**Правила для типов:**
- Только примитивы: `string`, `number`, `boolean`, `null`
- Никаких Orval-обёрток (`BookOutModelName` и подобных)
- Поля, которые могут отсутствовать — `null | string` (не `undefined`)

### 2. Реализовать API-адаптер (`BooksApi.ts`)

```typescript
// face/entites/books/repository/BooksApi.ts

import { bookControllerGetBooks } from '@/shared/api/generated/book/book'
import type { BookOutModel, BookChapterLiteOutModel } from '@/shared/api/generated/models'
import { extractString, extractNumber, extractBoolean } from '@/shared/utils/extractors'
import type { Book, BooksRepository } from './types'

export class BooksApi implements BooksRepository {
    async getBooks(): Promise<Book[]> {
        const response = await bookControllerGetBooks()
        return response.data.map(mapToBook)  // ← ошибки не ловим, прокидываем наверх
    }
}

// Приватные мапперы
function mapToBook(raw: BookOutModel): Book {
    return {
        id: raw.id,
        type: raw.type as Book['type'],
        name: extractString(raw.name),
        // ...
    }
}
```

**Правила для BooksApi:**
- Методы НЕ содержат try/catch — ошибки прокидываются наверх
- Для маппинга строковых полей использовать `extractString` (из `shared/utils/extractors`)
- Мапперы — приватные функции в этом же файле, не экспортируются

### 3. Использовать в компоненте

#### Получение данных при монтировании (`useFetchData`)

```typescript
import { useMemo } from 'react'
import { BooksApi } from '@/entites/books/repository/BooksApi'
import { useFetchData } from '@/shared/hooks/useFetchData'

function BooksPage() {
    const api = useMemo(() => new BooksApi(), [])
    const { loading, error, data } = useFetchData(
        () => api.getBooks(),
        [api],
    )

    if (loading) return <Spinner />
    if (error) return <ErrorMessage text={error} />

    // data: Book[] — чистые типы, никаких Orval-обёрток
    return <BooksList books={data} />
}
```

#### Действия по событию (`useAsyncMutation`)

Для создания, обновления, удаления — запросы, которые происходят при клике или submit, а не при монтировании компонента:

```typescript
import { useRouter } from '@/i18n/routing'
import { BooksApi } from '@/entites/books/repository/BooksApi'
import { useAsyncMutation } from '@/shared/hooks/useAsyncMutation'
import { NotificationContext } from '@/ui/Notification/context'

function AddBookButton() {
    const router = useRouter()
    const { notify } = useContext(NotificationContext)
    const api = useMemo(() => new BooksApi(), [])

    const { loading, error, mutate } = useAsyncMutation(
        (input: CreateBookInput) => api.createBook(input),
    )

    const handleClick = async function () {
        const book = await mutate({ name: null, author: null, languageCode: 'en', note: null })

        if (book) {
            // Успех — навигируемся. Ошибка уже в error, если не null.
            router.push(pageUrls.books.book(book.id).path)
        }
    }

    return (
        <button onClick={handleClick} disabled={loading}>
            {loading ? 'Создаю...' : 'Добавить книгу'}
        </button>
    )
}
```

**Как `useAsyncMutation` обрабатывает ошибки:**

```
Клик → mutate(input) → api.createBook(input)
                         ↓ (сервер вернул ошибку)
                       ApiError брошен
                         ↓
                       useAsyncMutation ловит
                         ↓
                       resolveError → "Книга не создана."
                         ↓
                       setState({ error: "Книга не создана." })
                         ↓
                       mutate возвращает null
                         ↓
                       Компонент: error !== null → показываем
```

`mutate()` возвращает `null | TResult`. Если `null` — ошибка (текст уже в `error`). Если не `null` — успех, можно использовать результат для навигации, инвалидации кэша и т.д.

#### Получение данных в Server Components (`fetchData`)

В серверных компонентах Next.js хуки недоступны. Вместо `useFetchData` используется `fetchData` — обычная асинхронная функция:

```typescript
// app/[locale]/books/page.tsx (Server Component)
import { BooksApi } from '@/entites/books/repository/BooksApi'
import { fetchData } from '@/shared/utils/fetchData'

export default async function BooksPage() {
    const api = new BooksApi()
    const { error, data } = await fetchData(() => api.getBooks())

    if (error) return <ErrorMessage text={error} />

    // data: Book[] — те же чистые типы
    return <BooksList books={data} />
}
```

**Отличия от `useFetchData`:**
- Нет `loading` — серверный компонент ждёт завершения запроса перед рендером
- Не использует React-хуки
- Ошибки обрабатываются через тот же `resolveError`

## Обработка ошибок

### Цепочка ошибки от сервера до компонента

```
1. Сервер
   Контроллер бросает CustomError → GlobalExceptionFilter
   Ответ: { message: '{"errorMessageCode":"BOOK_NOT_FOUND"}', code: 'NOT_FOUND', statusCode: 404 }

2. customMutator (face/shared/api/mutator.ts)
   Видит !res.ok → throw new ApiError(404, body)

3. BooksApi.getBooks()
   НЕ ловит ошибку → она прокидывается наверх

4. useFetchData
   Ловит в try/catch → вызывает resolveError(error)

5. resolveError (face/shared/utils/resolveError.ts)
   Извлекает errorMessageCode из body.message (JSON)
   Резолвит через serverErrorMessagesByCode
   "BOOK_NOT_FOUND" → "Книга не найдена."

6. Компонент
   Получает { error: "Книга не найдена.", data: null }
```

### Почему BooksApi НЕ ловит ошибки

Ошибки всегда выглядят одинаково (ApiError с errorMessageCode) и обрабатываются единообразно через `resolveError`. Если ловить в каждом методе репозитория — будет дублирование.

## Тестирование

```typescript
// Создать мок-репозиторий
const mockRepo: BooksRepository = {
    getBooks: () => Promise.resolve([
        { id: 1, type: 'public', name: 'Test Book', /* ... */ }
    ])
}

// Передать в компонент вместо BooksApi
<BooksPage repo={mockRepo} />

// Или протестировать сам BooksApi с мок-сервером
```

## Утилиты

### extractors (`face/shared/utils/extractors.ts`)

Вытаскивают примитивы из Orval-обёрток. Orval генерирует для строковых полей тип `{ [key: string]: unknown } | null`, хотя реальное значение — `string | null`.

```typescript
import { extractString, extractNumber, extractBoolean } from '@/shared/utils/extractors'

extractString(raw.name)   // → string | null
extractNumber(raw.userId) // → number | null
```

### resolveError (`face/shared/utils/resolveError.ts`)

Принимает ошибку (ApiError), извлекает `errorMessageCode`, возвращает читаемый русский текст.

```typescript
import { resolveError } from '@/shared/utils/resolveError'

try {
    await api.getBooks()
} catch (error) {
    const text = resolveError(error) // → "Книга не найдена."
}
```

### useFetchData (`face/shared/hooks/useFetchData.ts`)

Универсальный хук для данных, которые загружаются при монтировании компонента.

```typescript
const { loading, error, data } = useFetchData(
    () => api.getBooks(),
    [api], // зависимости — при изменении перезапрашивает
)
```

### useAsyncMutation (`face/shared/hooks/useAsyncMutation.ts`)

Хук для действий по событию (клик, submit). Запрос происходит только при вызове `mutate(input)`.

```typescript
const { loading, error, mutate, reset } = useAsyncMutation(
    (input: CreateBookInput) => api.createBook(input),
)

const handleClick = async () => {
    const book = await mutate({ name: '...', ... })
    if (book) {
        // Успех — используем результат
    }
    // Ошибка уже в error
}
```

| Метод | Возвращает | Описание |
|---|---|---|
| `mutate(input)` | `Promise<null \| TOutput>` | Запускает действие. `null` — ошибка (текст в `error`). |
| `reset()` | `void` | Сбрасывает `error` и `data` — например, перед повторной попыткой. |

### fetchData (`face/shared/utils/fetchData.ts`)

Обычная асинхронная функция для Server Components, где хуки недоступны.

```typescript
const { error, data } = await fetchData(() => api.getBooks())
```

Нет `loading` — серверный компонент ждёт результата перед рендером. Ошибки — через `resolveError`.
