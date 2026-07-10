# Получение данных пользователя на клиенте

## Архитектура

Данные пользователя загружаются на сервере (Server Component) и передаются одновременно в React Context и React Query кэш. Клиентские компоненты получают их мгновенно, без спиннера и дополнительного запроса.

```
Браузер → app/[locale]/layout.tsx (Server Component)
              │
              ├─ cookies() → connect.sid
              ├─ fetch('http://explainserver{MODE}:3001/api/auth/me')
              └─ user: UserOutModel | null
              │
              ▼
         UserProvider (Client)
              │
              ├─ UserContext.Provider value={user}  → useUser() — прямой доступ
              └─ queryClient.setQueryData(...)       → useAuthControllerGetMe() — через кэш
```

**useUser()** — основной способ. Возвращает `UserOutModel | null` напрямую, без деструктуризации `data`. Не зависит от React Query.

**useAuthControllerGetMe()** — если нужны возможности React Query (`isPending`, `isError`, инвалидация).

## Файлы

| Файл | Роль |
|---|---|
| `shared/api/auth/getCurrentUser.ts` | Серверная функция: читает `connect.sid`, вызывает `GET /api/auth/me` внутри Docker-сети, возвращает `UserOutModel \| null` |
| `shared/api/auth/Providers.tsx` | `QueryClientProvider` со `staleTime: 5min` |
| `shared/api/auth/UserProvider.tsx` | Принимает `user` пропсом. Предоставляет через React Context (`useUser()`) и одновременно кладёт в кэш React Query (`queryClient.setQueryData`) |
| `app/[locale]/layout.tsx` | Вызывает `getCurrentUser()`, оборачивает дерево в `Providers > UserProvider` |
| `shared/api/generated/auth/auth.ts` | Содержит `useAuthControllerGetMe()` и `getAuthControllerGetMeQueryKey()` (генерируется Orval) |

## Использование в компонентах

Данные уже загружены на сервере и помещены в кэш React Query и React Context на этапе рендера лейаута. Поэтому:

- **Server Components** — получают пользователя через `await getCurrentUser()`
- **Client Components** — вызывают `useUser()` (контекст) или `useAuthControllerGetMe()` (React Query). Оба возвращают данные мгновенно, без задержки.

### Server Component (layout, page)

```typescript
// app/[locale]/layout.tsx — пользователь уже получен
const user = await getCurrentUser()
// user: UserOutModel | null — готов к использованию в любом месте лейаута
```

```typescript
// app/[locale]/me/page.tsx
import { getCurrentUser } from '@/shared/api/auth/getCurrentUser'

export default async function MePage() {
    const user = await getCurrentUser()
    // user уже здесь, без хуков, без спиннера
    if (!user) return <LoginPrompt />
    return <div>Привет, {user.email}</div>
}
```

### Client Component — основной способ (useUser)

```typescript
import { useUser } from '@/shared/api/auth/UserProvider'

function AuthButtons() {
    const user = useUser()
    // user: UserOutModel | null — готов сразу, без деструктуризации data
    // Тип известен точно, не нужны type assertion'ы

    if (!user) return <LoginButton />
    return <span>{user.email} — {user.balance} копеек</span>
}
```

### Client Component — через React Query (useAuthControllerGetMe)

```typescript
import { useAuthControllerGetMe } from '@/shared/api/generated/auth/auth'

function AuthButtons() {
    const { data: user } = useAuthControllerGetMe()
    // user уже в кэше → возвращается синхронно, без задержки
    // isPending === false с первого рендера

    if (!user) return <LoginButton />
    return <span>{user.email}</span>
}
```

`isPending` может стать `true` только после инвалидации кэша (логин/логаут) — и только на долю секунды, пока идёт перезапрос.

### Когда что использовать

| Ситуация | Подход |
|---|---|
| Server Component (layout/page) | `await getCurrentUser()` — пользователь как переменная |
| Client Component, любое обращение к полям пользователя | `useUser()` — из контекста, точный тип, без деструктуризации |
| Нужен `isPending` / `isError` / инвалидация | `useAuthControllerGetMe()` — из кэша React Query |
| Проверка авторизации в `fn/` | `useUser()` — проще и короче |

### Перезагрузка после мутации (логин/логаут)

```typescript
import { useQueryClient } from '@tanstack/react-query'
import { useAuthControllerLogin, getAuthControllerGetMeQueryKey } from '@/shared/api/generated/auth/auth'

function LoginForm() {
    const queryClient = useQueryClient()

    const { mutate: login } = useAuthControllerLogin({
        mutation: {
            onSuccess: () => {
                // Сбросить кэш — useAuthControllerGetMe перезапросит свежие данные
                queryClient.invalidateQueries({
                    queryKey: getAuthControllerGetMeQueryKey(),
                })
            },
        },
    })
}
```

### Логаут

```typescript
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useQueryClient } from '@tanstack/react-query'
import { useAuthControllerLogout, getAuthControllerGetMeQueryKey } from '@/shared/api/generated/auth/auth'
import { pageUrls, localizePath } from '@/utils/pageUrls'

export function useGetLogout() {
    const router = useRouter()
    const locale = useLocale()
    const queryClient = useQueryClient()
    const { mutateAsync: logout } = useAuthControllerLogout()

    return useCallback(
        async function () {
            try {
                await logout()
                queryClient.invalidateQueries({ queryKey: getAuthControllerGetMeQueryKey() })
                router.push(localizePath(locale, pageUrls.main.path))
            } catch (error: unknown) {
                console.error(error)
            }
        },
        [logout, router, locale, queryClient],
    )
}
```
После логаута:
1. Сервер уничтожает сессию и удаляет cookie
2. Инвалидируется кэш `getMe` — все `useAuthControllerGetMe()` перезапрашивают и получают 401
3. Редирект на главную страницу

## Как добавить серверную предзагрузку для других сущностей

Паттерн универсален. Для любой сущности, которую нужно загрузить на сервере:

1. Создать серверную функцию в `shared/api/auth/` (или в своём FSD-слайсе)
2. Вызвать её в `layout.tsx` или `page.tsx`
3. Создать Provider для сидирования кэша (или использовать общий `PreloadProvider`)
4. На клиенте использовать сгенерированный Orval-хук
