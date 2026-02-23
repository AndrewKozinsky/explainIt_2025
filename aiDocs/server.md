# Server (server)

## Server-side
A Nest.js project with GraphQl, Prisma ORM and Postgres in the folder "server".
— use clear and descriptive variable names
Если требуется изменить таблицы в базе данных, то не нужно делать это в файле schema.prisma. Файл со схемой призмы генерируется из конфигурации в файле schema.prisma. Поэтому нужно изменить файл конфигурации и затем запустить команду генерирования файла schema.prisma.
```npm run generatePrismaFile```

## Payments
Payment is implemented in the resolver `server/src/routes/payment/payment.resolver.ts`.

### Subscription payment (non-renewable) via YooKassa

Flow overview:

1) Client calls GraphQL mutation `payment_yookassa_buy_subscription`.
   - Resolver: `server/src/routes/payment/payment.resolver.ts`
   - Handler: `server/src/features/payment/BuySubscriptionWithYooKassa.command.ts`
   - Input: `BuySubscriptionWithYooKassaInput` (`tariffId`).

2) Server creates a YooKassa payment and returns `confirmationUrl` (redirect URL).
   - Provider integration: `server/src/infrastructure/yooKassa/yooKassa.service.ts`
   - Payment must include `metadata` to distinguish the purpose:
     - `purpose: 'SUBSCRIPTION'`
     - `userId: number`
     - `tariffId: number` (for subscription)
   - Important: `Tariff.price` is stored in **kopecks**, so do NOT multiply by 100.

3) YooKassa calls our webhook after the user completes/cancels the payment.
   - HTTP endpoint: `webhook/yookassa`
   - Controller: `server/src/routes/webhook/webhook.controller.ts`
   - Service: `server/src/routes/webhook/webhook.service.ts`

4) Webhook processing is handled by `SetPaymentResultWithYooKassaCommand`.
   - Handler: `server/src/features/payment/SetPaymentResultWithYooKassa.command.ts`
   - The handler routes logic by `metadata.purpose`:
     - `SUBSCRIPTION` creates a `UserSubscription` record.

Subscription-specific rules:

- On `payment.succeeded` with `purpose='SUBSCRIPTION'`:
  - Mark `Payment` as successful.
  - Create `UserSubscription` linked to the `Payment` (via `payment_id`, unique).
  - Set subscription period from tariff:
    - `starts_at = now`
    - `ends_at = now + tariff.duration_days`
  - Store included balance on the subscription itself:
    - `UserSubscription.balance = tariff.included_balance`

- Idempotency:
  - Webhooks can be delivered multiple times.
  - Processing must be idempotent (the same external payment should not create duplicate DB effects).
  - Use unique constraints and/or “already processed” checks (e.g. `payment_id` uniqueness for `UserSubscription`, and payment status checks) and wrap updates in a Prisma transaction.

- Current subscription in user data:
  - `UserOutModel` includes `currentSubscription`.
  - Query layer should return only an active (non-expired) subscription.

## Repositories and CQRS (project conventions)

### Repository vs QueryRepository
- `Repository` (example: `server/src/repo/sentenceTranslation.repository.ts`)
  - Used for **internal work with DB** (create/update/delete and also reads needed for business logic).
  - May return "DB-shaped" data or service models.
  - If business logic needs relations for checks (ACL), it is OK to use Prisma `include` here.

- `QueryRepository` (example: `server/src/repo/bookChapter.queryRepository.ts`, `server/src/repo/videoPrivate.queryRepository.ts`)
  - Contains methods that return data **already prepared for the client**.
  - Methods should return `OutModel` (GraphQL models from `server/src/models/**`), i.e. "ready-to-send" shape.
  - If you need DB data not intended to be returned to client (e.g. for permission checks), use **Repository**, not QueryRepository.

### Typical server flow
- GraphQL:
  - `routes/**/**.resolver.ts` calls `CommandBus.execute(...)`
  - `features/**/**.command.ts` (Handler) contains orchestration and validation/ACL
  - Handler uses:
    - `Repository` for DB reads/writes used in business logic and permission checks
    - `QueryRepository` for returning the final client-ready `OutModel` (or mapping DB entity to OutModel)

### Access checks (ACL)
- ACL checks are performed in **Handlers**.
- For "private" entities:
  - Guard: `CheckSessionCookieGuard`
  - Handler verifies ownership and throws `CustomGraphQLError(errorMessage.userIsNotOwner, ErrorCode.Forbidden_403)` when needed.
- For "public" entities (like `book_public`), ownership checks may be skipped/relaxed.

### Naming and file locations
- CQRS handlers: `server/src/features/<domain>/<Action>.command.ts`
- GraphQL routes: `server/src/routes/<domain>/*` (`*.module.ts`, `*.resolver.ts`, `inputs/*`)
- Out models: `server/src/models/<domain>/*.out.model.ts`
- GraphQL operation names are defined in `server/src/infrastructure/routeNames.ts`.

### Frontend GraphQL files
- Client operations are stored in `face/graphql/<domain>/*.graphql`.
- Naming pattern usually matches the route name (example: `videoPrivateGet.graphql` -> `video_private_get`).

## Nginx
Nginx reverse proxy in the folder "nginx". It is used to communicate with the server from the front-end.

## Commands
Use a command
nvm use 24
to switch to an actual Node.js version if you are going to run any command with it.
