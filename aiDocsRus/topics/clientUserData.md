# Данные пользователя и форма профиля на клиенте

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
Модель включает `gender`, `avatarPresetId`, `avatarUrl`, `uploadedAvatarUrl` и `avatarUrlExpiresAt` наряду с ID, почтой, подтверждением и балансом.
`UserService` принимает репозиторий в конструкторе, поэтому источник данных можно подменить.
`UserQueryFacade` возвращает `queryOptions` для чтения и настройки мутаций для изменений.
Запросы чтения вызывают `unwrapApiResult` внутри фасада. Мутации возвращают `ApiResult<UserModel>`;
форма вызывает `unwrapApiResult` после `mutateAsync`, чтобы обработать ошибки сохранения.
В кэше хранится `UserModel`, а не обёртка Orval `{ data, status, headers }`.

## Модель аватара

`UserModel` различает выбранный аватар и сохранённую собственную фотографию:

| Поле | Значение |
|---|---|
| `gender` | `MALE` или `FEMALE`; пол можно менять независимо от картинки |
| `avatarPresetId` | ID выбранного готового аватара; null означает, что выбрана своя фотография |
| `avatarUrl` | Подписанная ссылка на выбранный аватар |
| `uploadedAvatarUrl` | Подписанная ссылка на последнюю загруженную фотографию или null, если её нет |
| `avatarUrlExpiresAt` | Общий срок обновления `avatarUrl` и `uploadedAvatarUrl` |

Когда выбран готовый аватар, `uploadedAvatarUrl` остаётся заполненным, если пользователь ранее загрузил фото.
Первая плитка ленты использует именно `uploadedAvatarUrl`; её выделение определяется `avatarPresetId === null`.
Для показа выбранного аватара в других местах используется `avatarUrl`.
Ключ R2 остаётся на сервере. Клиент передаёт ID готового варианта или null, а не URL и не ключ файла.

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

## Форма профиля

`_pages/me/UserProfileForm/UserProfileForm.tsx` подключена в `MePageContent` перед кнопкой выхода.
Порядок: пол, одна горизонтальная лента аватаров. Первая плитка — своя фотография/загрузка, затем четыре готовых варианта.
На узком экране лента прокручивается. Выбранный аватар отмечен обводкой.
Нажатие на неактивную свою фотографию выбирает её (`avatarPresetId: null`), на активную или пустую плитку — открывает выбор файла.
Изменения сохраняются сразу, кнопки общего сохранения нет.

Слой пользователя предоставляет `getMe`, `getAvatarPresets`, `updateMe`, `uploadAvatar`.
`UserQueryFacade` задаёт запросы, мутации и ключ каталога `userQueryKeys.avatarPresets()`.
Все ответы изменения профиля проходят общий mapper и обновляют контекст/кэш через `useSetUser()`.
Выбор готового варианта устанавливает пол из ответа сервера и сохраняет загруженную фотографию;
загрузка заменяет только прежнюю фотографию и выбирает новую, сохраняя пол.
Возврат к своей фотографии сохраняет пол.
Отдельная смена пола сохраняет картинку. Все четыре варианта видны независимо от пола.

### Операции и сохранение

| Действие | Вызов | Результат |
|---|---|---|
| Изменить пол | `updateMe({ gender })` → PATCH `/api/user/me` | Меняется только пол |
| Выбрать готовый аватар | `updateMe({ avatarPresetId: id })` → PATCH `/api/user/me` | Выбирается вариант, пол меняется на пол варианта, своя фотография сохраняется |
| Вернуться к сохранённой фотографии | `updateMe({ avatarPresetId: null })` → PATCH `/api/user/me` | Выбирается фотография, пол сохраняется; сервер отклоняет запрос, если фотографии нет |
| Загрузить или заменить фотографию | `uploadAvatar(file)` → POST `/api/user/me/avatar` | Multipart с полем `file`; новая фотография становится выбранной, пол сохраняется |

Отсутствие `avatarPresetId` в PATCH сохраняет текущий выбор; явный null выбирает собственную фотографию.
Повторный выбор готового аватара обычно не отправляет запрос. Если пол был изменён отдельно и отличается
от пола этого варианта, повторное нажатие снова устанавливает пол из каталога.

`useUserProfileForm` управляет запросами; `profileFormReducer` описывает переходы
`idle/saved/error → saving → saved/error`. Синхронная блокировка предотвращает параллельные сохранения.
Пока запрос выполняется, элементы формы недоступны. Выбор пола, готового аватара или сохранённой фотографии виден сразу в локальном состоянии,
а контекст обновляется после успеха; ошибка возвращает прежние значения и показывает уведомление.
После ухода со страницы результат сохранения не восстанавливает старого пользователя в контексте.
Перед изменением профиля отменяется активное чтение `getMe`, чтобы старый ответ не перезаписал новое состояние.

`pendingPresetId` различает undefined (выбор не меняется) и null (выбирается своя фотография).
При отображении нельзя использовать `pendingPresetId ?? user.avatarPresetId`: это скроет выбор фотографии.

### Обновление ссылок и загрузка

`useRefreshUserAvatar` перечитывает пользователя и обновляет обе ссылки в контексте через фасад и `useSetUser`, учитывает сон вкладки,
повторяет неудачное обновление не чаще раза в минуту и приостанавливается на время сохранения.
Каталог обновляется по `avatarUrlExpiresAt` и при возвращении во вкладку; при ошибке доступен повтор.

`UserAvatarField` использует общий `useFileDropzone` с обработчиком `onUploadFile` и явным открытием выбора файла:
файл передаётся сервису через Orval/multipart. Дропзона ограничивает размер 30 MiB и форматы JPEG/PNG/WebP.
Сервер проверяет декодирование, анимацию и число пикселей. Во время загрузки плитка показывает «Загружаем…»,
а форма — статус сохранения; процент прогресса для multipart не вычисляется.
`noClick` и `noKeyboard` отключают автоматическое открытие диалога на контейнере: кнопка сама выбирает
сохранённую фотографию либо вызывает `open()`. Перетаскивание файла на первую плитку загружает новую фотографию.
Общий `FileDropzone` для обложек сохраняет режим подписанной PUT-ссылки с настоящим прогрессом.

Изображения используют `object-fit: contain`; сервер уменьшает фото без обрезки и без превращения в иллюстрацию.
Все пять плиток находятся в одной горизонтальной ленте; при нехватке ширины прокручивается только лента.
Отдельных блоков текущего аватара, загрузки и готовых вариантов нет. Подписей «Выбрать»/«Выбран» нет;
выбор обозначен обводкой и `aria-pressed`. Ошибка изображения показывает заглушку, ошибка каталога — кнопку повтора.

### Файлы формы

| Файл в `_pages/me/UserProfileForm/` | Роль |
|---|---|
| `UserProfileForm.tsx` | Пол, общая лента аватаров и статус автосохранения |
| `fn/useUserProfileForm.ts` | Запрос каталога, выбор пола/аватара, загрузка и обновление пользователя |
| `fn/profileFormState.ts` | Состояния сохранения и временный выбор до ответа сервера |
| `fn/useRefreshUserAvatar.ts` | Перечитывание пользователя для обновления подписанных ссылок |
| `ui/UserGenderField.tsx` | Переключатели пола |
| `ui/UserAvatarField.tsx` | Первая плитка: сохранённая фотография, выбор и загрузка замены |
| `ui/AvatarPresetPicker.tsx` | Общая лента, загрузка каталога и повтор при ошибке |
| `ui/AvatarPresetCard.tsx` | Кнопка готового аватара с обводкой выбранного варианта |
| `ui/AvatarImage.tsx` | Изображение и заглушка при ошибке загрузки |

Старый маршрут `/api/auth/me` удалён. ИИ-диалоги используют выбранный портрет профиля;
DialogueVisualsProvider перечитывает визуальный снимок при смене avatarUrl в UserProvider.
Ссылки диалогов обновляются существующим useAiDialogueVisuals — см. [`userProfile.md`](userProfile.md).
