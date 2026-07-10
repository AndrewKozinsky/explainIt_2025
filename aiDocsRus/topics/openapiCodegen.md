# Генерация клиентских функций из OpenAPI (Orval)

## Обзор

Для генерации типизированных React Query-хуков и TypeScript-типов из OpenAPI-спекы используется [Orval](https://orval.dev). Это замена старой связки GraphQL Codegen + Apollo Client.

## Как это работает

```
server                              face
──────                              ────
NestJS Swagger                      orval.config.ts
       │                                  │
       ▼                                  ▼
/api/docs-json  ──HTTP──▶  Orval читает спеку
(OpenAPI JSON)              и генерирует:
                              • React Query хуки
                              • TypeScript типы (DTO, OutModel)
                              • queryKey-фабрики
                              • mutationOptions
```

## Структура файлов

```
face/
├── orval.config.ts            ← конфиг Orval
├── shared/
│   └── api/
│       ├── mutator.ts         ← кастомный fetch с обработкой ошибок
│       └── generated/         ← сгенерировано Orval (в .gitignore)
│           ├── auth/
│           │   └── auth.ts    ← useAuthControllerLogin, useAuthControllerGetMe, ...
│           └── models/
│               ├── index.ts
│               ├── userOutModel.ts
│               ├── loginDto.ts
│               └── ...
└── src/
    └── ... (код приложения)
```

## Генерация

### 1. Запустить сервер (если ещё не запущен)

```bash
cd server && npm run start:dev
```

Сервер должен быть запущен, потому что Orval читает спеку по URL `http://localhost/api/docs-json`.

### 2. Сгенерировать клиентские функции

```bash
cd face && npm run orval
```

После генерации файлы появляются в `face/shared/api/generated/`. Эта папка в `.gitignore` — в репозиторий не коммитится.

## Конфигурация Orval

Файл: `face/orval.config.ts`

```typescript
import { defineConfig } from 'orval'

export default defineConfig({
    api: {
        input: {
            target: 'http://localhost/api/docs-json',  // ← сервер должен быть запущен
        },
        output: {
            mode: 'tags-split',        // один файл на @ApiTags
            target: 'shared/api/generated',
            schemas: 'shared/api/generated/models',
            client: 'react-query',     // генерирует useQuery / useMutation
            clean: true,               // удаляет устаревшие файлы
            override: {
                mutator: {
                    path: 'shared/api/mutator.ts',
                    name: 'customMutator',
                },
            },
        },
    },
})
```

## Mutator

Файл: `face/shared/api/mutator.ts`

Кастомный mutator нужен, потому что стандартный `fetch` не выбрасывает исключений на 4xx/5xx, а React Query определяет успех/ошибку по статусу промиса (resolved = success, rejected = error).

Mutator делает три вещи:
1. Добавляет `credentials: 'include'` для передачи session cookie
2. Выбрасывает `ApiError` при `!res.ok` — ошибка попадает в `error` React Query
3. Корректно обрабатывает `204 No Content`

## Использование в компонентах

```typescript
import { useAuthControllerLogin } from '@/shared/api/generated/auth/auth'
import { useAuthControllerGetMe } from '@/shared/api/generated/auth/auth'
import type { UserOutModel } from '@/shared/api/generated/models'

// Mutation (POST, PUT, DELETE)
function LoginForm() {
    const { mutate: login, isPending, error } = useAuthControllerLogin()

    const onSubmit = (formData: LoginDto) => {
        login({ data: formData })
    }
}

// Query (GET)
function UserProfile() {
    const { data, isPending, isError, error } = useAuthControllerGetMe()

    if (isPending) return <Spinner />
    if (isError) return <Error message={error.message} />

    const user = data.data  // UserOutModel
}
```

### Особенности работы с ответом

Orval оборачивает ответ в структуру `{ data, status, headers }`:

```typescript
type AuthControllerLoginResponse = {
    data: UserOutModel   // ← полезная нагрузка
    status: 200
    headers: Headers
}
```

Поэтому данные лежат в `response.data`, а не напрямую в `response`.

### Инвалидация кэша после мутации

```typescript
import { useQueryClient } from '@tanstack/react-query'
import {
    useAuthControllerLogin,
    getAuthControllerGetMeQueryKey,
} from '@/shared/api/generated/auth/auth'

function LoginForm() {
    const queryClient = useQueryClient()

    const { mutate: login } = useAuthControllerLogin({
        mutation: {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: getAuthControllerGetMeQueryKey(),
                })
            },
        },
    })
}
```

## Почему имена хуков такие длинные

Orval использует `operationId` из OpenAPI-спекы. NestJS по умолчанию генерирует `operationId` как `ControllerName_methodName`, поэтому получается `AuthController_login` → хук `useAuthControllerLogin`.

Чтобы сократить имена, можно явно указать `operationId` в декораторе эндпоинта:

```typescript
// server/src/routes/auth/openAPI.decorators.ts
export function ApiLogin() {
    return applyDecorators(
        ApiOperation({ summary: 'User login', operationId: 'login' }),
        // ...
    )
}
```

После этого Orval сгенерирует `useLogin` вместо `useAuthControllerLogin`.
