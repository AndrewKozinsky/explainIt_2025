# Server

## Overview
Сервер находится в папке `server/`. Сделан с помощью NestJS, GraphQL, CQRS, Prisma и Postgres.

Так как по умолчанию на компьютере работает Node.js v18, то нужно в каждом новом Терминале переключиться на версию 24:

```bash
nvm use 24
```

Главная конфигурация находится в сервисе `server/src/infrastructure/mainConfig/mainConfig.service.ts`.

## Назначение папок
`server/src/features/**` — use cases или основная логика сервера. Обычно маршрут обращается к use case, который в свою очередь использует репозитории для взаимодействия с базой данных.
`server/src/infrastructure/**` — вспомогательные сервисы для взаимодействия с внешними системами, адаптеры, конфигурация, операции запускаемые при старте сервера, имена маршрутов и прочие вспомогательные вещи. 
`server/src/models/**` — модели данных. Модель данных в файлах заканчивающихся на .service.model можно использовать только внутри сервисов. Модель данных в файлах заканчивающихся на .out.model используется для передачи данных клиенту.   
`server/src/repo/**` — репозитории для взаимодействия с базой данных. 
`server/src/routes/**` — маршруты GraphQL и REST.
`server/src/types/**` — вспомогательные типы используемые во всём проекте
`server/src/utils/**` — вспомогательные функции используемые во всём проекте

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

## Как менять базу данных

Взаимодействие с базой данных идёт через Prisma ORM.
У меня есть функция, генерирующая схему призмы: `server/src/db/prismaGenerator/createSchema.ts`.
Эта функция принимает конфигурацию базы данных: `server/prisma/schema.prisma`.
После изменения конфигурации нужно запустить команду

```bash
npm run generatePrismaFile
```

и схема Призмы сгенерируется в файл `server/src/db/dbConfig/dbConfig.ts`.

Для генерации миграции запустить команду

```npm run migrate:dev```

И сгенерируйте типы данных:
```npm run migrate:generate-types```

Если требуется удалить базу данных:
```npx prisma migrate reset```


## Errors
Domain-specific user-facing errors should be added to:

- `server/src/infrastructure/exceptions/errorMessage.ts`

Reuse an existing error message when one text already covers multiple forbidden scenarios.