# Обработка ошибок: сервер → клиент

## Обзор

Сервер выбрасывает доменные ошибки в формате `ErrorMessage` (JSON-объект с кодом). Nest.js/GraphQL передаёт их клиенту как `ApolloError`. Клиент извлекает код ошибки и по словарю находит русский текст.

## Сервер: как выбрасывается ошибка

### Формат `ErrorMessage`

Ошибка — это объект с обязательным полем `errorMessageCode`:

```typescript
// server/src/infrastructure/exceptions/errorMessage.ts

export type ErrorMessage = {
    errorMessageCode: string
    [key: string]: string | number | boolean | null
}
```

Пример:

```json
{ "errorMessageCode": "INSUFFICIENT_BALANCE_FOR_TRANSLATION" }
```

Некоторые ошибки несут дополнительные данные для подстановки в текст:

```json
{ "errorMessageCode": "MIN_NUM", "minNumber": 1 }
```

### Реестр ошибок

Все ошибки объявлены в `server/src/infrastructure/exceptions/errorMessage.ts` в объекте `errorMessage`:

```typescript
export const errorMessage = {
    user: {
        notFound:            { errorMessageCode: 'USER_NOT_FOUND' },
        unauthorized:        { errorMessageCode: 'USER_UNAUTHORIZED' },
        isNotOwner:          { errorMessageCode: 'USER_IS_NOT_OWNER' },
    },
    video: {
        notFound:            { errorMessageCode: 'VIDEO_NOT_FOUND' },
        subtitlesGenerationDurationRequired: {
            errorMessageCode: 'VIDEO_SUBTITLES_GENERATION_DURATION_REQUIRED',
        },
        // ...
    },
    // ...
}
```

### Класс `CustomError`

Сервер выбрасывает ошибки через `CustomError` (`server/src/infrastructure/exceptions/customErrors.ts`):

```typescript
export class CustomError extends Error {
    public readonly code: string  // HTTP-код: BAD_REQUEST, UNAUTHORIZED, …

    constructor(
        public readonly errorMessage: ErrorMessage,
        public readonly statusCode: ErrorStatusCode,  // 400, 401, 403, 404, 500
    ) {
        super(serializeErrorMessage(errorMessage))  // → JSON-строка
        this.code = errorCodeByStatusCode[statusCode]
    }
}
```

`serializeErrorMessage` превращает `ErrorMessage` в JSON-строку:

```typescript
export function serializeErrorMessage(errorMessage: ErrorMessage) {
    return JSON.stringify(errorMessage)
}
```

**Важно:** `CustomError.message` — это всегда JSON-строка. Именно она попадает в GraphQL-ответ и затем в `ApolloError.message` на клиенте.

### Пример использования в handler'е

```typescript
throw new CustomError(
    errorMessage.video.subtitlesGenerationDurationRequired,
    ErrorStatusCode.BadRequest_400,
)
```

### Как ошибка проходит через GraphQL

1. Nest.js ловит `CustomError`.
2. GraphQL-слой помещает его в `errors[].extensions`:
   - `extensions.code` — `'BAD_REQUEST'`
   - `extensions.message` — JSON-строка `'{"errorMessageCode":"VIDEO_SUBTITLES_GENERATION_DURATION_REQUIRED"}'`
   - `extensions.statusCode` — `400`
3. Apollo Client на клиенте оборачивает ответ в `ApolloError`.

## Клиент: как ошибка превращается в текст

### Словарь переводов

`face/utils/errorMessages.ts` — единственный источник текстов ошибок. Содержит:

- **`serverErrorMessagesByCode`** — маппинг `errorMessageCode → русский текст`. Ключи совпадают с серверными `errorMessageCode`.
- **`errorMessages`** — локальные тексты клиента (`unknownServerError`, `requiredField`, …).

Формат записи:

```typescript
// Простой текст:
INSUFFICIENT_BALANCE_FOR_TRANSLATION: 'Недостаточно средств на балансе для перевода.',

// С параметрами:
MIN_NUM: (errorMessage) => 'Минимальное число: ' + errorMessage.minNumber,
```

### Функции извлечения текста

Все функции живут в `face/utils/extractErrorText.ts`.

#### `extractErrorText(error, fallbackMessage?)` — основная

Универсальная функция. Принимает любую ошибку, возвращает русский текст:

```
error
  ├─ ApolloError? → graphQLErrors[0].extensions.message → поиск по errorMessageCode
  ├─ ServerErrorMessage? → поиск по errorMessageCode
  ├─ Error? → JSON.parse(error.message) → поиск по errorMessageCode, иначе error.message
  ├─ string? → JSON.parse → поиск по errorMessageCode, иначе сама строка
  ├─ fallbackMessage (если передан)
  └─ errorMessages.unknownServerError («Неизвестная ошибка сервера.»)
```

**Это основная функция для использования в `catch`-блоках GraphQL-мутаций.**

```typescript
import { extractErrorText } from 'utils/extractErrorText'

try {
    await generateSubtitles({ variables: { input: { videoId } } })
} catch (err) {
    notify({
        type: 'error',
        message: extractErrorText(err),
    })
}
```

С кастомным fallback:

```typescript
extractErrorText(err, 'Не удалось добавить карточку. Попробуйте ещё раз.')
```

#### `getTextByServerErrorMessage(message)` — поиск по словарю

Принимает JSON-строку или объект `ServerErrorMessage`, ищет перевод в `serverErrorMessagesByCode`. Если код не найден — возвращает `errorMessages.unknownServerError`.

Используется для ответов мутации, где ошибки пришли не как исключение, а в `response.errors`:

```typescript
const responseErrorMessage = response.errors?.[0]
    ? getTextByServerErrorMessage(response.errors[0].extensions?.message)
    : 'Не удалось выполнить операцию. Попробуйте ещё раз.'
```

#### `getTextByUnknownError(error, fallbackMessage?)` — общий fallback

Извлекает текст из любого Error-объекта, строки или `ServerErrorMessage`. **Не обрабатывает** `ApolloError.graphQLErrors` — для этого используй `extractErrorText`.

#### `isServerErrorMessage(message)` — type guard

Проверяет, является ли значение объектом `ServerErrorMessage` (имеет поле `errorMessageCode`).

#### `extractGraphQLError(error)` — для форм

Специализированная функция в `face/graphql/extractGraphQLError.ts`. Достаёт из `ApolloError` структурированную информацию: код, сообщение, HTTP-статус и ошибки валидации по полям. Используется в `setErrorsToForm` для отображения ошибок у конкретных полей формы.

Не используй её напрямую для показа toast-уведомлений — для этого есть `extractErrorText`.

### Полная схема прохождения ошибки

```
Сервер                                Клиент
──────                                ──────

throw new CustomError(          ──→   ApolloError {
  { errorMessageCode:                  message: '{"errorMessageCode":"..."}',
    "INSUFFICIENT_BALANCE..."          graphQLErrors: [{
  },                                     extensions: {
  400                                     code: "BAD_REQUEST",
)                                         message: '{"errorMessageCode":"..."}',
                                          statusCode: 400
                                        }]
                                      }

                                      extractErrorText(err)
                                        ├─ ApolloError? → graphQLErrors[0].extensions.message
                                        └─ getTextByUnknownError()
                                              └─ getTextByServerErrorMessage()
                                                    └─ serverErrorMessagesByCode[code]
                                                          └─ "Недостаточно средств на балансе для перевода."
```

## Как добавить новую ошибку

### 1. Сервер

Добавить запись в `server/src/infrastructure/exceptions/errorMessage.ts`:

```typescript
// В подходящую группу или создать новую:
export const errorMessage = {
    // ...
    video: {
        // ...существующие...
        subtitlesGenerationMyNewError: {
            errorMessageCode: 'VIDEO_SUBTITLES_GENERATION_MY_NEW_ERROR',
        },
    },
}
```

Бросить в коде:

```typescript
throw new CustomError(
    errorMessage.video.subtitlesGenerationMyNewError,
    ErrorStatusCode.BadRequest_400,
)
```

### 2. Клиент

Добавить перевод в `face/utils/errorMessages.ts` в объект `serverErrorMessagesByCode`:

```typescript
VIDEO_SUBTITLES_GENERATION_MY_NEW_ERROR: 'Понятный русский текст ошибки.',
```

Больше ничего делать не нужно — `extractErrorText` автоматически найдёт новый код.

### Согласование

Проверить, что все серверные коды имеют перевод, можно командой:

```bash
# Серверные коды
grep -oP "errorMessageCode:\s*'[A-Z_]+'" server/src/infrastructure/exceptions/errorMessage.ts \
  | sed "s/errorMessageCode: '//" | sed "s/'//" | sort > /tmp/server_codes.txt

# Клиентские коды
grep -oP '^\s+[A-Z_]+:' face/utils/errorMessages.ts \
  | sed 's/^[[:space:]]*//' | tr -d ' :' | sort > /tmp/client_codes.txt

# На сервере есть, на клиенте нет — нужно добавить перевод
comm -23 /tmp/server_codes.txt /tmp/client_codes.txt
```

## Ключевые файлы

### Сервер

- `server/src/infrastructure/exceptions/errorMessage.ts` — реестр всех ошибок, `ErrorMessage` тип, `serializeErrorMessage`.
- `server/src/infrastructure/exceptions/customErrors.ts` — класс `CustomError`.
- `server/src/infrastructure/exceptions/errorStatusCode.ts` — HTTP-статусы (400, 401, 403, 404, 500).

### Клиент

- `face/utils/errorMessages.ts` — **только** словари текстов: `serverErrorMessagesByCode` (серверные коды → русский текст) и `errorMessages` (локальные константы). Функций нет.
- `face/utils/extractErrorText.ts` — все функции извлечения текста: `extractErrorText`, `getTextByUnknownError`, `getTextByServerErrorMessage`, `isServerErrorMessage`.
- `face/graphql/extractGraphQLError.ts` — структурированное извлечение `ApolloError` для форм (с `validationErrors`).
- `face/utils/forms.ts` — `setErrorsToForm` использует `extractGraphQLError` для показа ошибок у полей формы.
