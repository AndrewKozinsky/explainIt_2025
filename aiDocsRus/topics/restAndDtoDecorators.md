# REST-маршруты и декораторы DTO

## Декораторы DTO

### Принцип единого источника (`bdConfig`)

Все метаданные полей (тип, описание, пример, правила валидации) хранятся в одном месте — `server/src/db/dbConfig/dbConfig.ts`. Этот файл используется:

1. **Генератором Prisma-схемы** — на основе `dbFields` строится `schema.prisma`
2. **`DtoFieldDecorators`** — на основе тех же `dbFields` (или `dtoProps`) строятся декораторы валидации и OpenAPI
3. **`UserOutModel` и другие Out-модели** — ссылаются на `bdConfig` для `description` и `example` в `@ApiProperty`

Не нужно дублировать `description`, `example`, `minLength` и прочие атрибуты в DTO или Out-моделях — они должны приходить из `bdConfig`.

### `DtoFieldDecorators`

Файл: `server/src/db/dtoFieldDecorators.ts`

Универсальный декоратор, который по конфигурации поля из `bdConfig` автоматически добавляет:

- **`@ApiProperty(...)`** — описание, пример, required, minLength/maxLength, minimum/maximum для OpenAPI
- **class-validator декораторы** — `@IsString`, `@IsEmail`, `@MinLength`, `@Matches` и т.д. в зависимости от `type` поля
- **class-transformer декораторы** — `@Type(() => Number)`, `@Trim`, `@Transform(...)`

Использование в DTO:

```typescript
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class LoginDto {
    @DtoFieldDecorators('email', bdConfig.User.dbFields.email)
    email: string

    @DtoFieldDecorators('password', bdConfig.User.dtoProps.password)
    password: string
}
```

Больше никаких дополнительных декораторов на поле вешать не нужно. `@ApiProperty` НЕ добавляется вручную — он уже внутри `DtoFieldDecorators`.

`getApiPropertyOptions` (экспортируется из `dtoFieldDecorators`) вызывается внутри `DtoFieldDecorators` и автоматически выставляет `nullable: !required` — если поле не обязательное (`required: false`), оно помечается как `nullable: true` в OpenAPI. Для обязательных полей (`required: true`) — `nullable: false`. Эта же функция используется в Out-моделях: `@ApiProperty(getApiPropertyOptions($.field))`.

### Структура `bdConfig`

```typescript
export const bdConfig = {
    User: {
        dtoProps: {
            // Поля, используемые ТОЛЬКО в DTO (не хранятся в БД).
            // Например, password — приходит от клиента, но в БД хранится хеш.
            password: {
                type: 'string',
                minLength: 6,
                maxLength: 30,
                match: /[0-9A-Za-z!...]/,
                description: 'User password',
                example: '$1Hn[595n8]T',
                required: false,
            },
        },
        dbFields: {
            // Поля, соответствующие колонкам в БД.
            id: {
                type: 'index',
                description: 'User ID',
                example: 1,
            },
            email: {
                type: 'email',
                unique: true,
                description: 'User-s email',
                example: 'user@example.com',
                required: true,
            },
            // ...
        },
    },
}
```

- **`dbFields`** — для полей, которые есть в БД
- **`dtoProps`** — для полей, которые есть только в DTO (например, сырой пароль)
- При добавлении нового поля в `bdConfig` всегда заполнять `description` и `example` — они автоматически попадут в OpenAPI-спеку

### `UserOutModel` и другие Out-модели

Out-модели используют `@ApiProperty` с `getApiPropertyOptions` — функцией, которая автоматически формирует объект настроек из `bdConfig`:

```typescript
import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'

const $ = bdConfig.User.dbFields

export class UserOutModel {
    @ApiProperty(getApiPropertyOptions($.id))
    id: number

    @ApiProperty(getApiPropertyOptions($.email))
    email: string

    @ApiProperty(getApiPropertyOptions($.is_user_confirmed))
    isUserConfirmed: boolean

    @ApiProperty(getApiPropertyOptions($.balance))
    balance: number
}
```

`getApiPropertyOptions` автоматически берёт `description`, `example` из `bdConfig`, а также выводит `nullable: !required` и добавляет `minLength`/`maxLength`/`minimum`/`maximum` если они есть в конфигурации поля. Алиас `const $ = bdConfig.User.dbFields` делает код короче.

**Никакие `description`, `example` или `nullable` не хардкодятся — всё из `bdConfig`.**

Если нужного поля нет в `dbFields`, нужно посмотреть в `dtoProps`. Если нет и там — добавить поле в соответствующую секцию `bdConfig` (обычно в `dtoProps`, так как вычисляемые/не-БД поля не имеют колонки в таблице):

```typescript
const $ = bdConfig.BookPrivate.dbFields
const $$ = bdConfig.BookPrivate.dtoProps

export class BookPrivateOutModel {
    // Поле из dbFields
    @ApiProperty(getApiPropertyOptions($.id))
    id: number

    // Поле из dtoProps (вычисляемое, не хранится в БД)
    @ApiProperty(getApiPropertyOptions($$.coverUrl))
    coverUrl: null | string
}
```

Единственное исключение — **отношения** (oneToMany, manyToOne как relation). Для них `@ApiProperty` пишется вручную, потому что для связей нет смысла заводить запись в `bdConfig` — там нужен `type` с ссылкой на другой Out-модель:

```typescript
@ApiProperty({ description: 'Book chapters', type: [BookChapterLiteOutModel] })
chapters: BookChapterLiteOutModel[]
```

---

## REST-маршруты

### Переход с GraphQL на REST

Проект мигрирует с GraphQL на REST.

#### `openAPI.decorators.ts` — композитные декораторы OpenAPI

OpenAPI-декораторы (`@ApiOperation`, `@ApiBody`, `@ApiResponse`) многословны и загромождают контроллер. Они выносятся в отдельный файл `openAPI.decorators.ts` через `applyDecorators` — по одному композитному декоратору на эндпоинт:

```typescript
import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'

export function ApiSomeAction() {
    return applyDecorators(
        ApiOperation({ summary: '...', description: '...' }),
        ApiBody({ type: SomeDto }),
        ApiResponse({ status: 200, description: 'OK', type: SomeOutModel }),
        ApiResponse({ status: 400, description: 'Validation error' }),
        ApiResponse({ status: 404, description: errorMessage.someEntity.notFound.errorMessageCode }),
        ApiResponse({
            status: 500,
            description: [
                errorMessage.unknownDbError.errorMessageCode,
                errorMessage.unknownError.errorMessageCode,
            ].join(' | '),
        }),
    )
}
```

**Именование:** `Api` + действие в PascalCase (`ApiLogin`, `ApiGetMe`, `ApiConfirmEmail`).

**Важно:** композитные декораторы не должны содержать декораторы, не относящиеся к OpenAPI — `@UseGuards`, `@HttpCode`, `@Post`/`@Get` и т.д. остаются в контроллере.

#### Контроллер

Контроллер использует только композитные декораторы — чисто и читаемо:

```typescript
@ApiTags('ModuleName')       // Группировка в Swagger UI
@Controller('module-name')   // Префикс маршрута → /api/module-name
export class SomeController {
    constructor(
        private commandBus: CommandBus,
        // ...сервисы
    ) {}

    @ApiSomeAction()
    @HttpCode(HttpStatus.OK)
    @Post('action')
    async action(@Body() input: SomeDto, @Req() request: Request) {
        return await this.commandBus.execute(/* ... */)
    }
}
```

**Правила:**

1. **Один контроллер на модуль.** Старый GraphQL-резолвер остаётся закомментированным до полного удаления.
2. **Команды CQRS переиспользуются.** Те же `LoginCommand`, `GetUserByIdCommand` и т.д., что использовались в резолвере, вызываются через `commandBus.execute()`.
3. **DTO для каждого эндпоинта.** Отдельный класс в `dto/` с `@DtoFieldDecorators` на полях. Никаких ручных `@ApiProperty`.
4. **OpenAPI-декораторы выносятся в `openAPI.decorators.ts`:**
   - `@ApiTags` — остаётся на контроллере (один на весь модуль)
   - `@ApiOperation`, `@ApiBody`, `@ApiResponse`, `@ApiCookieAuth` — группируются в композитный декоратор через `applyDecorators`
   - По одному композитному декоратору на эндпоинт: `ApiLogin`, `ApiGetMe`, `ApiConfirmEmail`
   - `@UseGuards`, `@HttpCode`, `@Post`/`@Get` — остаются в контроллере, НЕ попадают в композитный декоратор
5. **Пути маршрутов** — kebab-case (`'module-name'`, `'confirm-email'`). Глобальный префикс `api` уже настроен.
6. **Коды ошибок в `@ApiResponse`.** В `description` указывается `errorMessageCode` — прямая ссылка на поле объекта из `errorMessage`, без промежуточных констант. Единственный источник кодов ошибок — `server/src/infrastructure/exceptions/errorMessage.ts`.

   ```typescript
   import { errorMessage } from 'infrastructure/exceptions/errorMessage'

   // Одна ошибка
   @ApiResponse({ status: 404, description: errorMessage.user.notFound.errorMessageCode })

   // Несколько ошибок на один статус — массив строк + join
   @ApiResponse({
       status: 500,
       description: [
           errorMessage.unknownDbError.errorMessageCode,
           errorMessage.noSessionObject.errorMessageCode,
           errorMessage.cannotSaveSession.errorMessageCode,
       ].join(' | '),
   })
   ```

   Validation error (400 от `ValidationPipe`) — единственный случай, когда можно писать человекочитаемый текст.

#### Модуль

```typescript
@Module({
    imports: [CqrsModule],
    controllers: [SomeController],
    providers: [...services, ...commandHandlers, ...repositories],
})
export class SomeModule {}
```

- `controllers` — массив с REST-контроллерами (вместо регистрации в GraphQL-схеме)
- `providers` — те же CQRS-хендлеры, репозитории и сервисы, что использовались раньше

#### Подключение в `app.module.ts`

```typescript
import { SomeModule } from 'routes/someModule/someModule.module'

@Module({
    imports: [
        // ...
        SomeModule,
    ],
})
export class AppModule {}
```

### OpenAPI (Swagger)

Файл: `server/src/infrastructure/applyAppSettings.ts`, функция `setUpSwagger()`.

Swagger UI доступен по адресу: `http://<host>:<port>/api/docs`

**Что попадает в спеку автоматически:**

- Все маршруты контроллеров
- `@ApiProperty` из `DtoFieldDecorators` и Out-моделей
- `@ApiOperation`, `@ApiBody`, `@ApiResponse` — из композитных декораторов `openAPI.decorators.ts` (или напрямую из контроллера)

**Плагин компилятора** (`nest-cli.json`) автоматически подхватывает:
- `class-validator` декораторы (через `classValidatorShim: true`)
- JSDoc-комментарии (через `introspectComments: true`)

Это значит, что для простых DTO без `DtoFieldDecorators` плагин сам выведет типы и добавит `@ApiProperty`. Но лучше всегда использовать `DtoFieldDecorators` — он даёт полный контроль.

### Отличия REST от GraphQL

| Аспект | GraphQL | REST |
|--------|---------|------|
| Входные данные | `@Args('input') input: InputType` | `@Body() input: DtoClass` |
| Request/Response | `@Context('req')` | `@Req() request: Request` |
| Ответ | Возвращаемый тип из резолвера | `return await commandBus.execute(...)` |
| Документация | `description` в `@Mutation`/`@Query` | Композитные декораторы в `openAPI.decorators.ts` |
| Валидация | `@UsePipes(ValidationPipe)` на резолвер | Глобальный `ValidationPipe` в `applyAppSettings` |

---

## Порядок миграции модуля с GraphQL на REST

1. **Создать DTO** в `server/src/routes/<module>/dto/` — по одному файлу на эндпоинт, поля через `@DtoFieldDecorators`
2. **Создать `openAPI.decorators.ts`** — композитные декораторы через `applyDecorators` для каждого эндпоинта
3. **Создать контроллер** `server/src/routes/<module>/<module>.controller.ts` — использовать композитные декораторы из `openAPI.decorators.ts`
4. **Обновить модуль** — добавить `controllers: [XController]`, убрать `resolver` из провайдеров
5. **Включить модуль** в `app.module.ts` (раскомментировать импорт)
6. **Удалить/закомментировать** старый GraphQL-резолвер
7. **Добавить `description` и `example`** в `bdConfig` для полей, которые используются в DTO или Out-моделях, если их ещё нет
