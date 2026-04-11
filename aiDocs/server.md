# Server

## Overview
The backend lives in `server/` and is built with NestJS, CQRS, Prisma and Postgres.

Use clear and descriptive names in server-side code.

If database tables need to change, do not edit `server/prisma/schema.prisma` directly. Prisma schema is generated from the project DB config, so update the source config first and then regenerate:

```bash
npm run generatePrismaFile
```

## Sentence Translation

### Main entrypoint
The main sentence translation flow goes through the SSE route:

- `server/src/features/sentenceTranslation/translateSentence/TranslateSentence.command.ts`

This route is universal:

1. resolve current user optionally
2. check translation access
3. try to return an already saved translation from DB
4. if translation is missing, create and stream a new one

The old GraphQL translation path in `server/src/routes/sentenceTranslation/` is temporarily disabled and should not be used as the main source of truth for translation behavior.

### Optional user
The route uses:

- `server/src/infrastructure/guards/optionalSessionUser.guard.ts`

This guard always allows the request:

- if `request.session?.userId` exists, it loads the user into `request.user`
- if there is no session, it sets `request.user = null`

Do not overload `CheckSessionCookieGuard` with optional behavior. Keep strict auth and optional auth separate.

### Current user and subscription
`request.user` comes from `UserRepository.getUserById()` and already includes `currentSubscription`.

Relevant files:

- `server/src/repo/user.repository.ts`
- `server/src/models/auth/auth.service.model.ts`
- `server/src/types/express.d.ts`

If code already has `request.user`, prefer using `request.user.currentSubscription` instead of querying active subscription again.

## Translation access rules
Access is decided in:

This service determines:

- whether material is public or private
- whether public material has `free_to_use = true`
- whether current user owns a private material
- whether user has an active subscription
- whether access mode should be:
  - `unlimited`
  - `dailyLimit`
  - `subscriptionBalance`
  - `forbidden`

### Public materials
- If a public material has `free_to_use = true`, it is available to everyone, including anonymous users.
- If a public material is not `free_to_use`:
  - user without subscription uses daily limit
  - user with any active subscription has unlimited access

### Private materials
- Private material belongs only to its owner.
- Other users must not access translations of someone else’s private materials.
- Owner can always read already existing private translations.
- Creating a new private translation requires an active standard subscription with positive balance.
- If standard balance is unavailable, new private translation is forbidden, but existing translations remain readable.

## Daily limit in Redis
Daily translation limit is implemented in:

It uses Redis and stores unique `sentenceId` values per user per day.

Rules:

- the same `sentenceId` requested again on the same day does not spend the limit twice
- the limit is counted immediately when the request is accepted
- Redis keys live only until the end of the current day

Business code should use service methods like `tryCountSentenceToday(...)` and not work with raw Redis commands directly.

## Translation providers
Provider adapters should stay thin.

Relevant files:

- `server/src/features/sentenceTranslation/translateSentence/StreamTranslateWithDeepSeek.service.ts`
- `server/src/features/sentenceTranslation/translateSentence/StreamTranslateWithChatGPT.service.ts`
- `server/src/features/sentenceTranslation/translateSentence/SentenceTranslationProvider.ts`

Shared workflow belongs in `TranslateSentence.command.ts`, including:

- loading existing translation
- access checks
- draft creation
- partial DB updates
- final parsing and save
- post-success balance charging

Provider adapters should mainly do:

- prompt/request preparation
- provider API call
- streaming text chunks
- returning normalized usage metadata

## Repositories vs QueryRepositories

### Repository
Examples:

- `server/src/repo/sentenceTranslation.repository.ts`
- `server/src/repo/user.repository.ts`

Use repositories for:

- business-logic DB reads
- create/update/delete operations
- relation loading needed for access checks and orchestration

Repository methods may return DB-shaped data or service models.

### QueryRepository
Examples:

- `server/src/repo/bookChapter.queryRepository.ts`
- `server/src/repo/videoPrivate.queryRepository.ts`

Use query repositories for data already prepared for the client, usually mapped to `OutModel`.

If code needs internal access checks or workflow decisions, prefer `Repository`, not `QueryRepository`.

## CQRS and routing conventions

### CQRS
- handlers live in `server/src/features/<domain>/<Action>.command.ts`
- handlers contain orchestration, validation and ACL

### Routes
- REST/SSE routes live in `server/src/routes/**`
- GraphQL operation names live in `server/src/infrastructure/routeNames.ts`

## Errors
Domain-specific user-facing errors should be added to:

- `server/src/infrastructure/exceptions/errorMessage.ts`

Reuse an existing error message when one text already covers multiple forbidden scenarios.

## Nginx
Nginx reverse proxy in the folder "nginx". It is used to communicate with the server from the front-end.

## Commands
If you need to run Node-based commands locally, use:

```bash
nvm use 24
```
