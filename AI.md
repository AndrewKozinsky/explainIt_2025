# AI Development Guidelines

## What is this app about
Это веб-приложение для изучения иностранных языков через чтение книг и просмотр видео. Сейчас пока все материалы на английском языке и перевод будет на русский.

### Как пользователь будет взаимодействовать с приложением
После регистрации пользователю будет доступна загрузка текстов книг и видео.
После загрузки глав книг он может перейти на страницу любой главы и начать читать.
Если какое-то предложение ему не понятно, то он может нажать на кнопку и получить перевод английского предложения на русском языке.
Аналогично и с видео: пользователь загружает видео и субтитры. Затем переход на страницу видео и смотрит видео и полный текст субтитров.
При проигрывании видео подсвечивается текущий субтитр. Он может нажать на слово в субтитре, после показывается предложение, которое относится этому субтитру и он может запросить перевод на русский язык если не понимает его смысл.

## Common rules
- Ask questions if something is unclear
- Follow the existing code style and patterns
- Write clear, concise, and well-documented code
- You cannot make more than 5 indents in the code.

## Root folder structure
- `face` — frontend part
- `server` — backend with Nest.js with PrismaORM (PostgreSQL) and GraphQL (Apollo Server)
— `nginx` — reverse proxy
— `infrastructure` — a tool for creating Docker-compose files

## Front-end part
A Next.js project with Apollo GraphQl and SCSS in the folder "face".
— prefer ordinary functions rather than arrow functions. Use arrow functions only if this way gives better readability or scoping.
— try to avoid excessive nesting and deeply nested conditionals.
— when logic becomes nested or hard to read, extract small helper functions to keep code flat and readable.
— use meaningful variable and function names.
— avoid using any type; prefer specific types or unions.
— for each component create a separate folder with component files. For example: `Button`, `Button.tsx`, `Button.scss`.
— try to avoid putting business logic into component. Use 'fn' folder for business logic. For example: `Button/fn/useFetchData`, `Button/fn/useValidateForm`.
— try to keep components small and focused on a single responsibility.
— try to reuse existing components when possible rather than creating new ones.
— if components become too complex, consider breaking them into smaller, more manageable pieces.
— if components form a logical group, put them in a separate folder.
— use shared components from 'face/ui' when possible.
— put reusable UI elements in the 'face/ui' directory.
— use common styles and utilities from 'face/styles' when possible.
— users work with this web-site on touch devices like tablets and smartphones and desktop computers
— ensure responsive design for various screen sizes

## SSE streaming (translation) — project rules and architecture

This project uses **SSE (Server-Sent Events)** to stream translation results progressively to the UI.

### Server-side contract (events)
- The server responds with `text/event-stream` and sends **custom named events**:
  - `chunk` — a partial piece of the resulting text.
  - `done` — stream finished successfully.
  - `error` — stream finished with an error.

Payload format:
- `chunk` event `data` is a JSON string of shape: `{ "text": "..." }`.
- `error` event `data` is a JSON string of shape: `{ "message": "..." }`.

Important:
- We intentionally use `chunk/done/error` instead of the default SSE `message` event.
- The client must always close the connection on `done` or `error`.

### Front-end layering (do not reimplement “from scratch”)
Client-side streaming is intentionally split into 3 layers (separation of concerns):

1) `face/utils/sse/openSse.ts`
- Low-level transport based on `EventSource`.
- Knows only about SSE mechanics and routing events to callbacks.
- Does not know anything about translation/analyse domain.

2) `face/utils/sse/readStream.ts`
- Universal stream client built on top of `openSse`.
- Responsibilities:
  - parse `chunk` JSON (`{ text }`)
  - accumulate full text into `fullText`
  - call `onChunk({ chunk, fullText })`
  - resolve when `done` arrives, reject on `error`

3) Domain adapter for translation: `face/_pages/readingAndWatchingCommon/selectedSentence/DetailsSentence/fn/translationStream.ts`
- Uses `readStream`.
- Parses the streamed `fullText` into:
  - `translation`
  - `analysis`
- Separator rule: translation and analysis are separated by a **blank line** (`\n\n`).
- Provides `onPartial({ translation, analysis })` so UI can update progressively.

### Where it is used
- `face/_pages/readingAndWatchingCommon/selectedSentence/DetailsSentence/fn/translateSentence.ts` (`useTranslateSentence`)
  - opens stream via `readTranslationStream` (domain adapter)
  - updates Zustand store on **every partial chunk** to render progressive updates
  - does not do client-side prevalidation of sentence length/text (keep behavior)

### Rules when changing SSE behavior
- If you need to change the protocol (event names, payload shapes), update both:
  - server event emitter (SSE route/service)
  - `openSse/readStream` contract and the translation adapter.
- Prefer updating existing layers over creating new ones.
- Always keep connection lifecycle correct:
  - close on `done`
  - close on `error`
  - avoid leaking EventSource instances.

## Server-side
A Nest.js project with GraphQl, Prisma ORM and Postgres in the folder "server".
— use clear and descriptive variable names
Если требуется изменить таблицы в базе данных, то не нужно делать это в файле schema.prisma. Файл со схемой призмы генерируется из конфигурации в файле schema.prisma. Поэтому нужно изменить файл конфигурации и затем запустить команду генерирования файла schema.prisma.
```npm run generatePrismaFile```

### Оплата
Оплата описана в резолвере server/src/routes/payment/payment.resolver.ts.

#### Оплата для поднятия баланса

Сейчас есть только 1 способ оплаты — это поднятия баланса через поставщика YooKassa. Для этого обращаются по адресу payment_yookassa_top_up_balance. В резолвере вызывается класс TopUpBalanceWithYooKassaCommand. Там посредством сервиса YooKassaService создаётся платёж и ссылка на оплату. Эта ссылка возвращается пользователя для оплаты на YooKassa.

Как только пользователь совершил оплату во внешнем сервисе YooKassa, то YooKassa вызывает маршрут webhook/yookassa в контроллере server/src/routes/webhook/webhook.controller.ts. Внутри вызывается класс SetPaymentResultWithYooKassaCommand где платёж отмечается успешным и создаётся транзакция для поднятия баланса пользователя.

Если пользователь отказался платить, то снова вызывается этот маршрут webhook/yookassa где в классе SetPaymentResultWithYooKassaCommand где платёж отмечается неудачным.

### Repositories and CQRS (project conventions)

#### Repository vs QueryRepository
- `Repository` (example: `server/src/repo/sentenceTranslation.repository.ts`)
  - Used for **internal work with DB** (create/update/delete and also reads needed for business logic).
  - May return "DB-shaped" data or service models.
  - If business logic needs relations for checks (ACL), it is OK to use Prisma `include` here.

- `QueryRepository` (example: `server/src/repo/bookChapter.queryRepository.ts`, `server/src/repo/videoPrivate.queryRepository.ts`)
  - Contains methods that return data **already prepared for the client**.
  - Methods should return `OutModel` (GraphQL models from `server/src/models/**`), i.e. "ready-to-send" shape.
  - If you need DB data not intended to be returned to client (e.g. for permission checks), use **Repository**, not QueryRepository.

#### Typical server flow
- GraphQL:
  - `routes/**/**.resolver.ts` calls `CommandBus.execute(...)`
  - `features/**/**.command.ts` (Handler) contains orchestration and validation/ACL
  - Handler uses:
    - `Repository` for DB reads/writes used in business logic and permission checks
    - `QueryRepository` for returning the final client-ready `OutModel` (or mapping DB entity to OutModel)

#### Access checks (ACL)
- ACL checks are performed in **Handlers**.
- For "private" entities:
  - Guard: `CheckSessionCookieGuard`
  - Handler verifies ownership and throws `CustomGraphQLError(errorMessage.userIsNotOwner, ErrorCode.Forbidden_403)` when needed.
- For "public" entities (like `book_public`), ownership checks may be skipped/relaxed.

#### Naming and file locations
- CQRS handlers: `server/src/features/<domain>/<Action>.command.ts`
- GraphQL routes: `server/src/routes/<domain>/*` (`*.module.ts`, `*.resolver.ts`, `inputs/*`)
- Out models: `server/src/models/<domain>/*.out.model.ts`
- GraphQL operation names are defined in `server/src/infrastructure/routeNames.ts`.

#### Frontend GraphQL files
- Client operations are stored in `face/graphql/<domain>/*.graphql`.
- Naming pattern usually matches the route name (example: `videoPrivateGet.graphql` -> `video_private_get`).

Use a command
nvm use 24
to switch to an actual Node.js version if you are going to run any command with it.

## Nginx
Nginx reverse proxy in the folder "nginx". It is used to communicate with the server from the front-end.