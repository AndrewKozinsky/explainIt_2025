# Server

## Overview
Сервер находится в папке `server/`. Сделан с помощью NestJS, GraphQL, CQRS, Prisma и Postgres.

Главная конфигурация находится в сервисе `server/src/infrastructure/mainConfig/mainConfig.service.ts`.

## Назначение папок
`server/src/features/**` — use cases или основная логика сервера. Обычно маршрут обращается к use case, который в свою очередь использует репозитории для взаимодействия с базой данных.
`server/src/infrastructure/**` — вспомогательные сервисы для взаимодействия с внешними системами, адаптеры, конфигурация, операции запускаемые при старте сервера, имена маршрутов и прочие вспомогательные вещи. 
`server/src/models/**` — модели данных. Модель данных в файлах заканчивающихся на .service.model можно использовать только внутри сервисов. Модель данных в файлах заканчивающихся на .out.model используется для передачи данных клиенту.   
`server/src/repo/**` — репозитории для взаимодействия с базой данных. 
`server/src/routes/**` — маршруты GraphQL и REST.
`server/src/types/**` — вспомогательные типы используемые во всём проекте
`server/src/utils/**` — вспомогательные функции используемые во всём проекте


## Database tables
Взаимодействие с базой данных идёт через Prisma ORM.

Таблица User — данные пользователя
Таблица UserBalanceTransaction — транзакции баланса пользователя
Таблица Payment — оплаты пользователя
Таблица BookPrivate — личные книги
Таблица BookPublic — публичные книги
Таблица BookChapter — главы книг
Таблица VideoPrivate — личные фильмы
Таблица VideoPublic — публичные фильмы
Таблица Sentence — предложения из глав книг и субтитров фильмов
Таблица SentenceTranslation — переводы предложений из глав книг и субтитров фильмов
Таблица SentencePhraseTranslation — переводы фраз из глав книг и субтитров фильмов
Таблица Subtitle — субтитры фильмов
Таблица SubtitleSentenceInit — связь субтитров фильмов с предложениями
Таблица UniversalPhrase — фразы на иностранном языке
Таблица UniversalTranscription — транскрипции фраз на иностранном языке (зависит от UniversalPhrase)
Таблица UniversalAudioPronunciation — озвучка фраз на иностранном языке (зависит от UniversalPhrase)
Таблица GrammarConcept — грамматические концепты/статьи (синхронизируются с .mdx файлами в content/)
Таблица UniversalSentence — тексты предложений для извлечения грамматических концептов
Таблица MissingGrammarConcept — ненайденные грамматические концепты (для контент-райтеров)
Таблица GrammarConceptToUniversalSentence — many-to-many связка GrammarConcept и UniversalSentence


## Как менять базу данных
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


## Errors
Domain-specific user-facing errors should be added to:

- `server/src/infrastructure/exceptions/errorMessage.ts`

Reuse an existing error message when one text already covers multiple forbidden scenarios.

## Nest.js guards
Гард получающий userId из запроса с клиента и помещающий в объект запроса данные пользователя. Не блокирует запрос на маршрут.
Нужен если в маршруте требуются данные пользователя, но они могут быть необязательными.
```server/src/infrastructure/guards/optionalSessionUser.guard.ts```

Гард получающий userId из запроса с клиента и помещающий в объект запроса данные пользователя. Блокирует запрос авторизационная кука не передана.
```server/src/infrastructure/guards/checkSessionCookie.guard.ts```

Гард следящий чтобы запросы делал пользователь не с нулевым балансом.
```server/src/infrastructure/guards/userWithPositiveBalanceGuard.guard.ts```
