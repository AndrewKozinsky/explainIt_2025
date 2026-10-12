# Получение данных пользователя на клиенте

## Архитектура

Чтение текущего пользователя следует тому же подходу, что и работа с главами книг:

```text
getCurrentUser (SSR) / UserQueryFacade (React Query)
                         ↓
                    UserService
                         ↓
                 UserRepository
                         ↓
                      UserApi
                         ↓
          Orval userControllerGetMe → customMutator
                         ↓
                  GET /api/user/me
```

`UserApi` преобразует ответ OpenAPI в доменную модель `UserModel` через общий `mapToUser`.
`UserService` принимает репозиторий в конструкторе, поэтому источник данных можно подменить.
`UserQueryFacade` возвращает `queryOptions` и через `unwrapApiResult` превращает ошибки API в ошибки React Query.
В кэше хранится `UserModel`, а не обёртка Orval `{ data, status, headers }`.

## Серверная предзагрузка и состояние клиента

`app/[locale]/layout.tsx` вызывает `getCurrentUser()` и передаёт пользователя в `UserProvider`.
`getCurrentUser` — тонкий SSR-адаптер: читает cookie `session`, без неё возвращает null,
иначе вызывает `userService.getMe()`. Ошибки запроса также дают null, как и раньше.
Прямого `fetch` в этом адаптере нет.

`customMutator` определяет внутренний адрес NestJS через `shared/api/getApiInternalUrl.ts`:

1. Явный `NEXT_PUBLIC_API_BASE_URL`, если задан.
2. `http://explainserver{MODE}:3001` в окружении Docker.
3. `http://localhost:3001` при запуске вне Docker без MODE.

Mutator передаёт входящие cookies при SSR и использует `credentials: include` в браузере.
`UserApi.getMe()` задаёт `cache: no-store`, чтобы данные разных сессий не попадали в серверный кэш Next.js.
Singleton сервиса не хранит cookies или пользователя: данные запроса читаются из текущего контекста Next.js.

`UserProvider` одновременно обновляет React Context и кэш под доменным ключом `userQueryKeys.me()`:
`['user', 'me']`. Вход, OAuth и выход используют существующий `useSetUser()`.
Контекст и запросы фасада получают одинаковый тип данных.
Сгенерированные `useUserControllerGetMe` и ключ `/api/user/me` напрямую в UI не используются;
они относятся к транспортному слою и имеют другой формат ответа.

## Файлы

| Файл | Роль |
|---|---|
| `entities/user/repository/UserRepository.ts` | `UserModel` и интерфейс доступа к данным пользователя |
| `entities/user/repository/UserApi.ts` | REST-реализация через Orval и `executeApiCall` |
| `entities/user/repository/UserMappers.ts` | Общий mapper чтения пользователя и ответов авторизации |
| `entities/user/UserService.ts` | Доменный сервис и готовый экземпляр `userService` |
| `entities/user/UserQueryFacade.ts` | `userQueries` и единые ключи `userQueryKeys` |
| `shared/api/auth/getCurrentUser.ts` | SSR-адаптер над сервисом, возвращающий `UserModel \| null` |
| `shared/api/auth/UserProvider.tsx` | Контекст, предзагрузка кэша и `useSetUser` |
| `shared/api/auth/Providers.tsx` | QueryClientProvider со staleTime 5 минут |
| `shared/api/getApiInternalUrl.ts` | Выбор внутреннего адреса API для SSR |
| `shared/api/mutator.ts` | HTTP-транспорт, cookies и обработка ответов |

`UserModel` объявлен в пользовательском слайсе. `AuthRepository` переэкспортирует его для совместимости,
а `LoginWithOAuthResult` является алиасом этой модели. Авторизация остаётся в `AuthService`/`AuthApi`;
они используют тот же mapper и возвращают данные, совместимые с контекстом пользователя.

## Использование

### Server Component

```typescript
import { getCurrentUser } from '@/shared/api/auth/getCurrentUser'

const user = await getCurrentUser()
// UserModel | null
```

### Client Component — доступ к уже загруженным данным

```typescript
import { useUser } from '@/shared/api/auth/UserProvider'

function AccountInfo() {
    const user = useUser()
    if (!user) return null
    return <span>{user.email}</span>
}
```

### Client Component — React Query

```typescript
import { useQuery } from '@tanstack/react-query'
import { userQueries } from '@/entities/user/UserQueryFacade'

function AccountInfo() {
    const { data: user, isPending, isError } = useQuery(userQueries.getMe())
    // user: UserModel | undefined; кэш уже заполнен UserProvider
    if (isPending || isError || !user) return null
    return <span>{user.email}</span>
}
```

### После изменения пользователя или авторизации

Если API вернул обновлённого пользователя, вызвать `useSetUser()` — обновятся контекст и кэш:

```typescript
import { useSetUser } from '@/shared/api/auth/UserProvider'

const setUser = useSetUser()
setUser(updatedUser)
// При выходе: setUser(null)
```

Для перечитывания серверных данных через React Query:

```typescript
import { userQueryKeys } from '@/entities/user/UserQueryFacade'

queryClient.invalidateQueries({ queryKey: userQueryKeys.me() })
```

## Следующий этап

Старый маршрут `/api/auth/me` удалён. Пол, аватары и загрузка фото реализованы на сервере — см.
[`userProfile.md`](userProfile.md). Расширение клиентской модели этими полями и форма профиля
остаются следующим этапом; текущая задача меняет слой доступа к данным пользователя.
