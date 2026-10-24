# Диалоги с ИИ (AiDialogue)

## Что делает функционал

Ролевой диалог пользователя с LLM на иностранном языке. Пользователь выбирает сценарий (`AiDialogueScenario`) —
например, визит к стоматологу — и в рамках **диалога** (`AiDialogue`)
обменивается с LLM репликами: LLM играет роль NPC (врача, офицера, администратора), ведёт сцену и реагирует на действия
пользователя.

- один сценарий → **много** диалогов (ограничения на пару `(user, scenario)` нет);
- диалог принадлежит **одному** пользователю;
- диалог — контейнер: у него нет текстовых полей, вся переписка хранится в `AiDialogueMessage`;
- **одно событие = одна строка** в `AiDialogueMessage` (реплика, смена сцены, подсказка и т. д.);
- `id` сообщения назначает **сервер** (autoincrement), а не LLM;
- обмен идёт по двум каналам: клиент → сервер через REST (`POST .../messages`), сервер → клиент через постоянный
  SSE-поток (`GET .../stream`).

Сценарии описаны отдельно — см. `aiDocsRus/topics/aiDialogue/aiDialogueScenario.md`. Страница самого диалога
`/dialogues/{dialogId}` (SSE-клиент, стор, рендер событий, форма ввода) — см.
`aiDocsRus/topics/aiDialogue/aiDialoguePage.md`. Существующий SentenceChat к этой фиче отношения не имеет.

## Доменная модель

### `AiDialogue` (контейнер)

| Поле                        | Тип                        | Описание                                                        |
|-----------------------------|----------------------------|-----------------------------------------------------------------|
| `id`                        | `Int`                      | Первичный ключ (autoincrement)                                  |
| `scenario_id`               | `Int`                      | FK → `AiDialogueScenario.id`, `onDelete: Cascade`               |
| `user_id`                   | `Int`                      | FK → `User.id`, `onDelete: Cascade`                             |
| `source_language_code`      | `LanguageCode`             | Язык диалога — тот, который практикует ученик (реплики NPC)     |
| `target_language_code`      | `LanguageCode`             | Язык перевода — родной язык ученика (поле `translation`)        |
| `max_cefr_level`            | `CefrSimplificationLevel?` | Верхняя граница сложности A1/A2/B1/B2; `null` — без ограничения |
| `summary`                   | `String?`                  | Компактная сводка истории (JSON-строка, см. «Компакция»)        |
| `summary_up_to`             | `Int`                      | `id` последнего сообщения, покрытого сводкой (default `0`)      |
| `created_at` / `updated_at` | `DateTime`                 | Даты                                                            |

### `AiDialogueMessage` (событие)

Одна строка = одно событие. Колонка `type` хранит дискриминатор события, `payload` — JSON-тело события **без** поля
`type` (ключи в camelCase).

| Поле          | Тип                          | Описание                                             |
|---------------|------------------------------|------------------------------------------------------|
| `id`          | `Int`                        | Первичный ключ (autoincrement), назначается сервером |
| `dialogue_id` | `Int`                        | FK → `AiDialogue.id`, `onDelete: Cascade`            |
| `type`        | enum `AiDialogueMessageType` | Дискриминатор события                                |
| `payload`     | `String`                     | JSON-тело события (без `type`)                       |
| `created_at`  | `DateTime`                   | Дата создания                                        |

## Статус: что уже сделано

- Таблицы `AiDialogue` (+ колонки `summary`/`summary_up_to`) и `AiDialogueMessage` (миграция
  `20260903151732_add_ai_dialogue_message`).
- REST: создать диалог, список диалогов, удалить диалог, **отправить сообщение** (`POST .../messages`).
- SSE-поток `GET .../stream`: replay истории + подписка на новые события + запуск первого хода.
- Генерация хода LLM (стриминг + построчный парсинг событий), рассылка через in-memory шину.
- Фоновая компакция истории в `AiDialogue.summary` (append-only).
- Клиент: entity-слой `AiDialogue` (list/create/delete), секция «История диалогов», создание по клику на сценарий,
  страница диалога `/dialogues/{dialogId}` и клиентский слой сообщений (см.
  `aiDocsRus/topics/aiDialogue/aiDialoguePage.md`).
- Языковая модель: сценарий языконейтрален, языки задаются на диалоге (`source_language_code` — практика,
  `target_language_code` — перевод); `title`/`description` сценария — JSON-строки переводов (резолв на клиенте через
  `pickLocalized`).

## REST API

> Все пути ниже — относительны контроллера `@Controller('ai-dialogue')`. Фактический URL — с глобальным
> префиксом `/api/` (задан в `infrastructure/applyAppSettings.ts`: `app.setGlobalPrefix('api')`).
> SSE-соединение клиент открывает по `/api/ai-dialogue/:id/stream`.

Все эндпоинты требуют авторизации (`CheckSessionCookieGuard`).

```
POST   /ai-dialogue                body: { scenarioId, sourceLanguageCode, targetLanguageCode, maxCefrLevel? } → 201 AiDialogueOutModel
GET    /ai-dialogue?page=1&pageSize=3 → 200 AiDialoguesPageOutModel
GET    /ai-dialogue/:id            → 200 AiDialogueOutModel
PATCH  /ai-dialogue/:id            body: { maxCefrLevel? } → 200 AiDialogueOutModel
DELETE /ai-dialogue/:id            → 200 boolean
POST   /ai-dialogue/:id/messages   body: CreateAiDialogueMessageInput → 201 AiDialogueMessageOutModel
GET    /ai-dialogue/:id/visuals    → 200 AiDialogueVisualsOutModel (только владельцу)
GET    /ai-dialogue/:id/stream     → SSE (Server-Sent Events)
POST   /ai-dialogue/:id/check-message body: { speech?, action? } → 200 AiDialogueUserMessageCheckOutModel
WS     /ai-dialogue/:id/dictation  → потоковое распознавание аудио (отдельный WebSocket, не REST)
```

Проверка черновика реплики и/или действия, категории ошибок, контекст и компактный формат ответа LLM:
[`aiDialogueMessageCheck.md`](aiDialogueMessageCheck.md). Она не сохраняет сообщение и не ограничивает
существующий маршрут отправки; достаточно заполнить хотя бы одно поле.

Диктовка черновика с авторизацией по общей сессии и распознаванием двух языков:
[`aiDialogueDictation.md`](aiDialogueDictation.md).

`AiDialogueOutModel` (создание, получение одного диалога, PATCH; список имеет отдельную модель ниже):

```json
{
  "id": 1,
  "sourceLanguageCode": "en",
  "targetLanguageCode": "ru",
  "maxCefrLevel": null,
  "scenario": {
    "id": 1,
    "slug": "at-the-dentist",
    "title": "{\"en\":\"At the Dentist\",\"ru\":\"У стоматолога\", ...}",
    "description": "{\"en\":\"...\",\"ru\":\"...\"}"
  },
  "createdAt": "2026-09-02T10:41:57.000Z",
  "updatedAt": "2026-09-02T10:41:57.000Z"
}
```

**Обрати внимание:**

- `system_prompt` сценария не попадает в ответ (как и в списке сценариев) — он не отдаётся клиенту.
- `sourceLanguageCode` — язык практики, `targetLanguageCode` — язык перевода (см. «Доменная модель»).
- `scenario.title`/`scenario.description` — сырые JSON-строки переводов; резолвит их клиент через `pickLocalized`.

Список «Мои диалоги», контракт карточек и пагинация описаны отдельно: [aiDialogueList.md](aiDialogueList.md).

`AiDialogueMessageOutModel`:

```json
{
  "id": 10,
  "dialogueId": 1,
  "payload": {
    "type": "npcActions",
    "npcId": "...",
    "npcName": "...",
    "npcRole": "...",
    "emotion": "...",
    "actions": [
      {
        "type": "speech",
        "content": "..."
      }
    ]
  },
  "createdAt": "2026-09-03T10:00:00.000Z"
}
```

### Создание диалога

- При создании передаётся `scenarioId` и два языка:
    - `sourceLanguageCode` — язык диалога (тот, который практикует ученик; реплики NPC будут на нём);
    - `targetLanguageCode` — язык перевода (родной язык ученика; для текстовых полей LLM добавляет `translation`).
- Сценарий должен существовать (иначе `404` `AI_DIALOGUE_SCENARIO_NOT_FOUND`).
- Начать диалог можно только по **публичному** (`user_id === null`) или **своему** сценарию (иначе
  `403` `USER_IS_NOT_OWNER`).
- Повторные вызовы создают новые диалоги.

Языки берутся из диалога, а не из сценария — сценарий языконейтрален (см.
`aiDocsRus/topics/aiDialogue/aiDialogueScenario.md`). На
клиенте `sourceLanguageCode` пока временно захардкожен как `'en'` (см. `useAiDialogueScenarioClick`).

### Ограничение сложности текста по CEFR

`maxCefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | null` — настройка конкретного диалога, а не оценка
реального владения языком пользователя. Значение задаёт верхнюю границу сложности, более простой текст допустим.
Общая шкала `PROFICIENCY_LEVELS` (A1–C2) и числовой маппинг 1–6 для видео находятся в
`server/src/utils/proficiencyLevel.ts`. Допустимые границы сложности диалогов — `AI_DIALOGUE_CEFR_LEVELS`
(A1–B2) и тип `AiDialogueCefrLevel` — находятся в `server/src/features/aiDialogue/aiDialogueLanguageLevel.ts`.
Имя enum в БД `CefrSimplificationLevel` сохранено; перенос констант не требует миграции.
C1/C2 не принимаются в этой настройке: для свободного владения используется `null`.

При создании `maxCefrLevel` необязателен; отсутствие поля и явный `null` сохраняют `null`.
Все существующие диалоги после миграции также имеют `null`; ограничения автоматически не включаются.
Поле всегда возвращается в `AiDialogueOutModel` (создание, получение одного диалога, обновление)
и `AiDialogueListItemOutModel` (список).

Изменение: `PATCH /api/ai-dialogue/:id` с телом `{"maxCefrLevel":"A2"}`.
`{"maxCefrLevel":null}` отключает адаптацию; `{}` ничего не меняет, включая `updatedAt`.
Маршрут проверяет сессию, существование и владельца диалога; чужой диалог — 403, отсутствующий — 404.
Недопустимые значения, включая C1/C2, числа и неверный регистр, отклоняются валидацией DTO с 400.
Обновление БД дополнительно ограничено `id` и `user_id`.

PATCH можно вызвать при активной генерации. Он не запускает новый ответ, не прерывает текущий и не создаёт
сюжетного сообщения. SSE не нужно закрывать или передавать уровень в его URL.
Каждый ход один раз фиксирует настройку при чтении диалога в `GenerateAiDialogueTurn.generate` перед сборкой
промпта. С этого момента изменение влияет на следующие ходы, а текущий ход и повторные попытки после ошибки
парсинга используют прежний снимок. Если PATCH завершился до чтения настроек, ход увидит новое значение.
Чтобы гарантировать применение к конкретному ответу, PATCH должен завершиться до чтения настроек генератором.
Текущий клиент не блокирует отправку реплики на время сохранения уровня; параллельный ход использует настройку,
актуальную при чтении диалога.
Для первой сцены уровень передаётся сразу при создании, до открытия SSE.

Адаптация применяется ко всем новым видимым `content` на языке `sourceLanguageCode`: реплики и действия NPC,
описания сцен, подсказки, события мира. Имена и идентификаторы NPC сохраняются. Переводы точно передают смысл
на `targetLanguageCode`, без отдельного ограничения CEFR. Скрытые appearance/voice/visual и технический
формат wordMaps не упрощаются; карта строится по фактически сгенерированному тексту.
Озвучка получает уже адаптированный текст из существующего потока.

`buildAiDialogueLanguageLevelRules` задаёт отдельные инструкции по лексике и грамматике для каждого уровня.
Текущая настройка имеет приоритет над противоречащими указаниями сценария и истории, включая summary;
при `null` прежняя адаптация из истории не переносится. NPC сохраняют роль и характер, не исправляют
пользователя и не превращают разговор в урок. Необходимые тематические термины допускаются с простым пояснением.
Общие правила краткой разговорной речи сохраняются и без ограничения CEFR.
История не переписывается, настройка хранится отдельно от summary и заново читается для каждого хода.

Это адаптация через промпт, а не строгий автоматический сертификат CEFR. Дополнительной проверки или
перегенерации по результатам оценки сложности нет; потоковое превью и ранняя озвучка сохраняются.
Художественное качество и соответствие уровням требуют ручной оценки ответов реальной модели.

### Удаление диалога

- Проверяются существование (`404` `AI_DIALOGUE_NOT_FOUND`) и владение (`403` `USER_IS_NOT_OWNER`).
- Возвращает `true` (каскадно удаляются и сообщения).

### Отправка сообщения (действие пользователя)

`POST /ai-dialogue/:id/messages` — единственный канал «клиент → сервер». Клиент может отправить только событие
пользователя (`CreateAiDialogueMessageInput`):

```ts
type CreateAiDialogueMessageInput =
    | { type: 'userActions'; actions: AiDialogueActionItem[] }   // действия и реплики пользователя
    | { type: 'userAvoidsNPC' }                                   // пользователь ушёл от разговора
```

Хендлер проверяет существование и владение диалога, затем:

1. Если для диалога уже идёт генерация (`generationAlreadyActive`) — возвращает
   `400` `AI_DIALOGUE_GENERATION_ALREADY_ACTIVE` (нельзя действовать, пока NPC отвечает).
2. Иначе сохраняет сообщение и **fire-and-forget** запускает генерацию ответа (результат доедет через SSE).

## События диалога

Дискриминированный union `AiDialogueEvent` (в `types/aiDialogueMessage.ts`). `type` — дискриминатор.

| `type`          | Поля                                                | Кто генерирует |
|-----------------|-----------------------------------------------------|----------------|
| `sceneUpdate`   | `content: string`, `translation`                    | LLM            |
| `npcActions`    | `npcId`, `npcName`, `npcRole`, `emotion`, `actions` | LLM            |
| `help`          | `content: string`, `translation`                    | LLM            |
| `worldEvent`    | `content: string`, `translation`                    | LLM            |
| `userActions`   | `actions`                                           | клиент         |
| `userAvoidsNPC` | —                                                   | клиент         |

`actions` — массив `AiDialogueActionItem = { type: 'action' | 'speech'; content: string }` (`action` — невербальное
действие, `speech` — реплика).

`emotion` нормализуется в один из 12 кодов, описанных в `aiDialogueImages.md`; неизвестное значение становится
`neutral`. Внешность нового NPC, визуальное состояние сцены и эмоция пользователя разбираются отдельно от
сюжетных событий и не добавляют строки в `AiDialogueMessage`.

`sceneUpdate` начинает новую встречу: одна непрерывная беседа с основным NPC — одна сцена.
Первую встречу LLM начинает одним sceneUpdate перед npcActions. Внутри встречи вопросы, жесты, проверка/передача
документов, смена эмоций и прощание остаются npcActions; фоновые события — worldEvent.
При явном завершении встречи NPC или пользователем модель в том же ответе начинает следующую встречу:
при необходимости один короткий прощальный npcActions → sceneUpdate следующей встречи → npcActions нового NPC
с понятным вопросом или просьбой. Отдельного действия ухода, подтверждения прощания или help с просьбой уйти не
требуется.
Если предыдущая встреча уже завершилась в истории, модель сразу продолжает следующей, без повторного прощания.
Обычное «спасибо» внутри незавершённой встречи не является завершением, когда остаётся вопрос или задача.
Переход описывает окружение новой встречи, не придумывая реплики, действия, решения или согласие пользователя.
Один ответ открывает только одну следующую встречу. Следующий sceneUpdate появляется при начале
следующей встречи, в том числе при возвращении к прежнему NPC после разговора с другим. Возвращающийся NPC
сохраняет npcId и существующий спрайт; новая встреча получает новую иллюстрацию. Фоновый персонаж или короткая
реплика постороннего не прерывают текущую встречу. Промпт получает npcId последнего собеседника из выведенного
состояния, в том числе после компакции. Эти правила задаются текстовой модели, а не серверным фильтром событий.

Событие `help` — это не перевод и не повторение реплики NPC. LLM создаёт его только тогда, когда пользователю может быть
непонятно, какое действие совершить дальше, и NPC не дал ясную прямую инструкцию. Если NPC уже задал прямой вопрос или
попросил о конкретном действии, дополнительный `help` не создаётся. Например, после стука в дверь можно отправить `help`
с предложением открыть дверь, но после реплики NPC «Какой абонемент вы хотите купить?» такой
`help` будет дублированием и не нужен.

Все видимые описания действий NPC, сцен, подсказок и событий обращаются к участнику во втором лице:
`you`/`your` на английском и естественные эквиваленты на языке диалога. Русский перевод использует
«вы»/«ваш» с нужными падежами. Например: `holds out his hand for your passport and looks at you`.
Обозначения «learner», «student», «user», «ученик» и «пользователь» не используются для участника
в видимом повествовании; изучение языка не подчёркивается. NPC остаётся субъектом описания своих действий.
Правило действует и для существующих сценариев/диалогов; сохранённые сообщения не переписываются.
Внутренние инструкции, сериализация событий и скрытый visual используют обозначение participant.
Скрытый visual описывает ровно момент sceneUpdate и явно сохраняет расположение участника, преграды,
состояние дверей и видимость. В participants входят только видимые участнику NPC; слышимый собеседник
за закрытой дверью остаётся за кадром. Взаимный взгляд требуется только при разговоре лицом к лицу без преграды.
Нельзя ради композиции открывать дверь, перемещать участника или заранее раскрывать посетителя.
Исключение для первого sceneUpdate: действия, явно заданные вступлением сценария, можно описать как исходную
ситуацию; visual показывает конечный момент этого вступления. Например, если вступление включает открытие двери,
иллюстрация показывает уже открытую дверь и видимого посетителя. Дальнейшие действия выбирает участник.
Подробности и пример — в [`aiDialogueImages.md`](aiDialogueImages.md).
Промпт задаёт язык разговора и учитывает `maxCefrLevel`, но не сообщает в видимом тексте, что участник изучает язык.
При `null` ограничения CEFR нет. NPC сохраняют роль и ситуацию, не исправляют грамматику, лексику или написание
и не предлагают улучшенные формулировки. Если смысл понятен — продолжают сцену; иначе переспрашивают в роли.
Общее правило имеет приоритет над прежними учебными инструкциями в сценарии или истории.

Сервер **сам** никогда не генерирует `userActions`/`userAvoidsNPC` от имени пользователя — эти два типа выделены в
отдельный тип `AiDialogueClientEvent`.

Событие `userAvoidsNPC` означает «пользователь ушёл от текущего NPC». LLM должен отреагировать на уход (текущий NPC
прощается или уточняет, не продолжая прежнюю просьбу) и затем представить другого NPC, уместного по сцене, чтобы ученик
мог продолжить практику. Персонажей LLM придумывает сам, исходя из сценария (правила — в
`buildAiDialoguePrompt`).

## SSE-протокол

`GET /api/ai-dialogue/:id/stream` — постоянное соединение (открывается один раз при открытии страницы диалога). Каждый
фрейм — `MessageEvent`, `data` которого — `AiDialogueStreamEvent`:

```
{ "type": "message",  "message": DialogueServerMessage }   // одно сохранённое сообщение
{ "type": "chunk",    "chunk": "..." }                     // сырой фрагмент ответа LLM (превью)
{ "type": "turnStarted" }                                  // началась генерация хода (до первого chunk)
{ "type": "turnReset" }                                    // повторная попытка генерации началась
{ "type": "turnDone" }                                     // ход завершён (успех или ошибка)
{ "type": "turnError","error": "..." }                     // ход не удался
{ "type": "visualsChanged", "dialogueId": 1 }               // перечитать визуальный REST-снимок
```

- `message` — используется и для **replay** истории (при подключении), и для новых событий. Обёртка
  `DialogueServerMessage = { id, dialogueId, createdAt, payload }`.
- `chunk` — сырой фрагмент ответа LLM. Клиент собирает из него превью построчным парсером (`parseAiDialoguePreview`);
  авторитетный разбор делает сервер (`parseAiDialogueEvents`) в конце стрима.
- `turnStarted` — сервер начал генерацию хода (до первого `chunk`). Клиент показывает «ответ готовится».
- `turnReset` — сервер начал повторную попытку генерации после провала парсинга. Клиент сбрасывает накопленное превью
  (`accumulated` и `preview`), но `isGenerating` остаётся `true`.
- `turnDone` — сигнал, что можно снова действовать (после каждого хода, даже при ошибке).
- `visualsChanged` — технический сигнал обновления изображений, без текста и URL. Отправляется при подключении,
  после завершения генерации картинки (ready/failed) через Redis и при восстановлении подписки Redis.
  Не сохраняется в историю и не влияет на turnDone. Визуальный клиент реализуется отдельно.

### Порядок при подключении

Контроллер stream передаёт userId/dialogueId в OpenAiDialogueStreamCommand через CommandBus и возвращает
Promise<Observable<MessageEvent>>. OpenAiDialogueStreamHandler создаёт холодный поток: чтение БД, подписка
на шину и запуск первого хода происходят только при подписке Nest SSE, а не при диспетчеризации команды.
Хендлер отвечает за авторизацию, replay, буферизацию и освобождение подписки при отключении клиента.

1. Клиент открывает SSE-соединение.
2. Сервер подписывается на in-memory шину и временно удерживает события, чтобы не пропустить параллельный коммит.
3. Проверяет существование и владение диалога. До успешной проверки ни одно событие не отправляется клиенту.
4. Отдаёт удержанные события и **replay** сохранённых сообщений с дедупликацией по `id`.
5. Отправляет visualsChanged для восстановления визуального состояния через REST.
6. Если диалог «ждёт хода» (см. ниже) — запускает генерацию первого ответа.

Методы AiDialogueSseHub имеют явное назначение: getDialogueEventSubject возвращает локальный Subject диалога,
publishDialogueEvent отправляет событие одному диалогу без хранения/replay,
notifyActiveDialoguesOfVisualChanges отправляет технический сигнал обновления активным потокам.
Сама шина не проверяет авторизацию; до успешной проверки хендлер удерживает события в буфере.

Соединение не закрывается по завершении хода — оно живёт, пока открыта страница.

## Схема обработки (CQRS)

`AiDialogueController` вызывает через `CommandBus`:

- `CreateAiDialogueCommand` → проверка сценария → `AiDialogueRepository.createDialogue` →
  `AiDialogueQueryRepository.getDialogueById`.
- `GetUserDialoguesCommand` → `AiDialogueListQueryRepository.getUserDialogues(userId, pagination)`.
- `DeleteAiDialogueCommand` → проверка владения → `AiDialogueRepository.deleteDialogueById`.
- `CreateAiDialogueMessageCommand` → проверка существования/владения → запрет при активной генерации →
  `AiDialogueMessageRepository.createMessage` → `AiDialogueQueryRepository.getMessageById` → fire-and-forget запуск
  `GenerateAiDialogueTurn`.

SSE-эндпоинт использует `OpenAiDialogueStreamCommand`: хендлер проверяет доступ, подписывается на
`AiDialogueSseHub`, отдаёт историю и вызывает `GenerateAiDialogueTurn.triggerIfNeeded`.

`UpdateAiDialogueCommand` проверяет владельца и сохраняет настройку через `AiDialogueRepository.updateDialogue`,
затем возвращает свежий `AiDialogueOutModel` из QueryRepository. Метод репозитория принимает объект
`Prisma.AiDialogueUpdateManyMutationInput` и позволяет обновлять несколько скалярных полей за одну запись
с условием `id`/`user_id`; разрешённые клиенту поля по-прежнему определяются DTO и командой.
Registry генерации и шину SSE команда не использует.

## Генерация хода (`GenerateAiDialogueTurn`)

Сервис `features/aiDialogue/GenerateAiDialogueTurn.service.ts`. Один «ход» = один вызов LLM, который может вернуть
**несколько** событий (плоским построчным текстом, см. «Стриминг и формат ответа»).

### Когда генерировать («ждёт ли диалог хода»)

Детерминированное правило в `shouldGenerateTurn`:

- сообщений нет → генерировать;
- последнее сообщение — событие пользователя (`userActions`/`userAvoidsNPC`) → генерировать;
- иначе (последнее — событие LLM) → ждать действия пользователя.

### Процесс `generate(dialogueId)`

1. Guard: если для диалога уже идёт генерация — выход (идемпотентно). Иначе регистрирует
   `AbortController` в `ActiveAiDialogueGenerationRegistry` (лимит — **1 активная генерация на диалог**).
2. Читает диалог (нужны `summary`, `summary_up_to`, `scenario_id`, `max_cefr_level`) и сценарий.
   Уровень сложности фиксируется этим чтением на весь ход, включая повторные попытки парсинга.
3. Читает все сообщения; «свежие» события = сообщения с `id > summary_up_to`.
4. Собирает промпт через `buildAiDialoguePrompt` (system = `system_prompt` сценария + строгий построчный контракт
   ответа + реестр NPC + правила языка; user = текущая сцена + сжатая история + свежие события). Язык диалога берётся из
   `source_language_code`, язык перевода/подсказок — из `target_language_code`.
5. Стримит ответ: `LlmAdapterService.stream({ responseFormat: 'text' })`, накапливает текст и рассылает сырые `chunk`
   -события в шину.
6. В конце парсит накопленный текст через `parseAiDialogueEvents` («спасающий» построчный разбор — недостающий
   `translation` хвостового блока подставляется как `''`, битые блоки отбрасываются). Если не удалось спасти ни одного
   события — повторный вызов LLM (до `MAX_PARSE_ATTEMPTS` = 2) с корректирующей подсказкой; между попытками клиенту
   шлётся `turnReset`. Если и повтор не удался — ошибка `cannotParseLlmResponse`.
7. Подтверждённый ход сохраняется одной транзакцией: сюжетные сообщения, новые NPC, эмоции и данные сцены в payload,
   задания изображений и outbox. Сообщения NPC связываются с AiDialogueCharacter через character_id. После коммита
   каждое сюжетное сообщение рассылается как `message`.
8. В `finally`: снимает регистрацию в registry и рассылает `turnDone`.
9. После хода (уже вне registry) fire-and-forget вызывает `SummarizeAiDialogue.summarizeIfNeeded`.

Ошибки не роняют поток: в `catch` рассылается `turnError`, затем всё равно `turnDone`.

### Стриминг и формат ответа

LLM отвечает **плоским построчным текстом** (`responseFormat: 'text'`), а не JSON — так контент реплики стримится
обычными строками и рисуется на клиенте посимвольно. Один ход = один или несколько блоков, разделённых **ровно одной
пустой строкой**; блок = строка-заголовок + поля по одной строке.

```
npcActions|<npcId>|<npcName>|<npcRole>|<emotion>
action:
<описание действия>
<перевод>
speech:
<реплика>
<перевод>
```

```
sceneUpdate
<описание новой сцены>
<перевод>
```

Заголовки текстовых событий — `sceneUpdate`, `help`, `worldEvent` (без полей, затем `content` и
`translation`). Внутри `npcActions` повторяются тройки `метка:` / `content` / `translation`, где метка —
`action:` или `speech:`. `translation` присутствует **всегда** (`targetLanguageCode` обязателен). «Ничего не говорить» →
пустой ответ.

Сырые чанки отдаются клиенту для превью (толерантный построчный разбор `parseAiDialoguePreview`), а **авторитетный
разбор** событий делает сервер на полном накопленном тексте (`parseAiDialogueEvents`). По умолчанию используется
DeepSeek (`DEFAULT_FLASH_AI_MODEL`) — выбор модели клиентом не реализован.

### Реестр активных генераций

`ActiveAiDialogueGenerationRegistry` — `Map<dialogueId, AbortController>`. В отличие от SentenceChat (лимит на
пользователя), здесь лимит **на диалог**. `AbortController` зарезервирован под будущую отмену: сейчас генерация не
привязана к жизни SSE-соединения (она продолжается и при отключении клиента, т.к. результат пишется в БД).

### In-memory шина (`AiDialogueSseHub`)

`Map<dialogueId, Subject<MessageEvent>>`. SSE-эндпоинт подписывается на `Subject` своего диалога, а генерация пушит
события в него. Благодаря этому события, порождённые POST-запросом (в другом HTTP-запросе), доезжают до уже открытого
SSE-соединения. Субъекты не вычищаются (диалогов немного, `Subject` пустой).

## Карта словарных выражений

Карта генерируется в техническом разделе wordMaps: в конце того же ответа модели после всех сюжетных блоков.
Текст показывается через chunk, подтверждённый message и replay содержат payload.wordMap. Отдельного запроса анализа
нет.
Клик сразу передаёт готовую фразу из карты или само слово; ожидания и подсветки нет.
Поддерживаются пересечения, несоседние связанные слова и независимый выбор для каждого вхождения.
Все серверные тексты получают карту; пользовательские сообщения передают отдельное слово.
Контракт и проверки: [`aiDialogueWordMaps.md`](aiDialogueWordMaps.md).

## Компакция истории (`SummarizeAiDialogue`)

Чтобы не переполнять контекст LLM, давние события сжимаются в `AiDialogue.summary`. Сводка — **append-only**
массив блоков, сериализованный в JSON-строку (колонка `TEXT`):

```json
[
  {
    "state": {
      "scene": "...",
      "activeNpcId": "...",
      "roster": [
        {
          "npcId": "...",
          "npcName": "...",
          "npcRole": "..."
        }
      ]
    },
    "history": "краткий пересказ"
  }
]
```

### Правила

- **Триггер**: когда несжатых сообщений (`id > summary_up_to`) набралось больше `SUMMARIZE_WHEN_UNCOMPRESSED_GT`
  (= 20) — сжать всё, кроме последних `KEEP_UNCOMPRESSED` (= 5).
- **`history`** (текст пересказа) генерирует LLM через `buildSummaryPrompt` + `LlmAdapterService.generate`
  (обычный текст, не JSON).
- **`state`** (сцена / активный NPC / реестр NPC) сервер выводит **детерминированно** через
  `deriveAiDialogueState` — не полагаясь на LLM. `roster` собирается из `npcActions`, `scene` — из последнего
  `sceneUpdate`, `activeNpcId` — `npcId` последнего `npcActions`.
- **Новый блок** добавляется только при изменении `state` (`sameAiDialogueState`); иначе новый `history`
  дописывается в `history` последнего блока.
- `summary_up_to` сдвигается на `id` последнего сжатого сообщения.

Выполняется в фоне после завершения хода (не блокирует клиента и не занимает registry), защита от параллельного
запуска — `Set` `inFlight`. Ошибки компакции только логируются.

## База данных

### Таблица AiDialogue

| Поле                   | Тип                        | Описание                                                   |
|------------------------|----------------------------|------------------------------------------------------------|
| `id`                   | `Int`                      | Первичный ключ (autoincrement)                             |
| `scenario_id`          | `Int`                      | FK → `AiDialogueScenario.id`, `onDelete: Cascade`          |
| `user_id`              | `Int`                      | FK → `User.id`, `onDelete: Cascade`                        |
| `source_language_code` | `LanguageCode`             | Язык диалога (практикуемый язык, реплики NPC)              |
| `target_language_code` | `LanguageCode`             | Язык перевода (родной язык, поле `translation`)            |
| `max_cefr_level`       | `CefrSimplificationLevel?` | A1/A2/B1/B2 или `null` (без ограничения)                   |
| `summary`              | `String?`                  | Сводка истории (JSON-строка, см. «Компакция»)              |
| `summary_up_to`        | `Int`                      | `id` последнего сообщения, покрытого сводкой (default `0`) |
| `created_at`           | `DateTime`                 | Дата создания                                              |
| `updated_at`           | `DateTime`                 | Дата последнего изменения                                  |

- Индексы: `@@index([user_id])`, `@@index([scenario_id])`, `@@index([user_id, created_at, id])`.
- Обратные связи: `User.AiDialogue`, `AiDialogueScenario.AiDialogue`, `AiDialogue.AiDialogueMessage`
  (`oneToMany`).

Миграция `20261019120000_add_ai_dialogue_max_cefr_level` добавляет nullable enum-поле без изменения истории.
Схема и Prisma Client перегенерируются из `bdConfig`; миграцию перед запуском обновлённого сервера нужно применить
обычной командой `cd server && npm run migrate:deploy`.

### Таблица AiDialogueMessage

| Поле          | Тип                          | Описание                                                                     |
|---------------|------------------------------|------------------------------------------------------------------------------|
| `id`          | `Int`                        | Первичный ключ (autoincrement)                                               |
| `dialogue_id` | `Int`                        | FK → `AiDialogue.id`, `onDelete: Cascade`                                    |
| `type`        | enum `AiDialogueMessageType` | `sceneUpdate`/`help`/`npcActions`/`userActions`/`userAvoidsNPC`/`worldEvent` |
| `payload`     | `String`                     | JSON-тело события (без `type`, ключи camelCase)                              |
| `created_at`  | `DateTime`                   | Дата создания                                                                |

- Индексы: `@@index([dialogue_id])`, `@@index([character_id])`, `@@index([dialogue_id, id])`,
  `@@index([dialogue_id, type, id])`.

## Ключевые файлы

### Схема БД

- `server/src/db/dbConfig/dbConfig.ts` — таблицы `AiDialogue` (с `summary`/`summary_up_to`) и
  `AiDialogueMessage`, обратные `oneToMany`.
- `server/prisma/schema.prisma` — генерируется из `bdConfig` командой `npm run generatePrismaFile`.
- `server/prisma/migrations/20260903151732_add_ai_dialogue_message/` — миграция сообщений.
- `server/prisma/migrations/20260905120000_add_ai_dialogue_source_language/` — миграция: добавляет
  `AiDialogue.source_language_code`, удаляет `AiDialogueScenario.language_code`.

### Доменные типы

- `server/src/types/aiDialogueMessage.ts` — `AiDialogueEvent` (union), `AiDialogueClientEvent`,
  `DialogueServerMessage`, `AiDialogueStreamEvent`.
- `server/src/types/aiDialogueSummary.ts` — `AiDialogueSummary`/`AiDialogueSummaryState` +
  `parseAiDialogueSummary`.

### CQRS-команды и сервисы генерации

- `server/src/features/aiDialogue/CreateAiDialogue.command.ts` — создание диалога.
- `server/src/features/aiDialogue/UpdateAiDialogue.command.ts` — изменение ограничения сложности владельцем.
- `server/src/features/aiDialogue/GetUserDialogues.command.ts` — список диалогов пользователя.
- `server/src/features/aiDialogue/DeleteAiDialogue.command.ts` — удаление диалога.
- `server/src/features/aiDialogue/CreateAiDialogueMessage.command.ts` — приём действия пользователя + триггер генерации.
- `server/src/features/aiDialogue/GenerateAiDialogueTurn.service.ts` — генерация хода (стрим → парс → сохранение →
  шина).
- `server/src/features/aiDialogue/SummarizeAiDialogue.service.ts` — фоновая компакция истории.
- `server/src/features/aiDialogue/ActiveAiDialogueGenerationRegistry.service.ts` — лимит 1 генерация/диалог.
- `server/src/features/aiDialogue/AiDialogueSseHub.service.ts` — in-memory шина SSE-событий.

### Промпты и парсинг

- `server/src/utils/proficiencyLevel.ts` — общая шкала CEFR и числовой маппинг для видео.
- `server/src/features/aiDialogue/aiDialogueLanguageLevel.ts` — допустимые уровни сложности диалогов.
- `server/src/features/aiDialogue/buildAiDialogueLanguageLevelRules.ts` — правила сложности видимых текстов.
- `server/src/features/aiDialogue/buildAiDialoguePrompt.ts` — промпт генерации хода (язык из
  `source_language_code`/`target_language_code`).
- `server/src/features/aiDialogue/buildSummaryPrompt.ts` — промпт сжатия истории.
- `server/src/features/aiDialogue/parseAiDialogueEvents.ts` — «спасающий» построчный разбор ответа LLM.
- `server/src/features/aiDialogue/aiDialogueVisualConfig.ts` — стиль, раскладка, модель OpenAI, качество и размеры новых
  заданий.
- `server/src/features/aiDialogue/deriveAiDialogueState.ts` — детерминированный вывод `state` +
  `sameAiDialogueState`.
- `server/src/features/aiDialogue/serializeAiDialogueEvent.ts` — сериализация события в текст промпта.

### REST-маршрут

- `server/src/routes/aiDialogue/aiDialogue.controller.ts` — контроллер (`POST/GET/PATCH/DELETE /ai-dialogue`,
  `POST :id/messages`, `@Sse :id/stream`).
- `server/src/routes/aiDialogue/inputs/createAiDialogue.input.ts` — DTO создания (сценарий, языки, `maxCefrLevel`).
- `server/src/routes/aiDialogue/inputs/updateAiDialogue.input.ts` — DTO изменения `maxCefrLevel`.
- `server/src/routes/aiDialogue/inputs/createAiDialogueMessage.input.ts` — DTO действия пользователя.
- `server/src/routes/aiDialogue/openAPI.decorators.ts` — композитные декораторы OpenAPI.
- `server/src/routes/aiDialogue/aiDialogue.module.ts` — NestJS-модуль.

### Репозитории и модели

- `server/src/repo/aiDialogue/aiDialogue.repository.ts` — `createDialogue`, `getDialogueById`, `updateDialogue`,
  `deleteDialogueById`, `updateSummary`.
- `server/src/repo/aiDialogue/aiDialogue.queryRepository.ts` — `getDialogueById`,
  `getMessagesByDialogueId`, `getMessageById`, маппинг в OutModel (`mapDbMessageToOutModel` +
  `deserializeEvent`).
- `server/src/repo/aiDialogue/aiDialogueMessage.repository.ts` — `createMessage` (type в колонку, тело в JSON`payload`).
- `server/src/repo/aiDialogue/aiDialogueTurn.repository.ts` — транзакционное сохранение подтверждённого хода
  вместе с визуальными сущностями и заданиями.
- `server/src/models/aiDialogue/aiDialogue.out.model.ts` — `AiDialogueOutModel` с вложенным `scenario`.
- `server/src/models/aiDialogue/aiDialogueMessage.out.model.ts` — `AiDialogueMessageOutModel`.

### Инфраструктура

- `server/src/app.module.ts` — регистрация `AiDialogueModule`.
- `server/src/infrastructure/exceptions/errorMessage.ts` — секция `aiUserDialogues` (`notFound`,
  `scenarioNotFound`, `generationAlreadyActive`, `cannotParseLlmResponse`).
- `server/src/infrastructure/llmProviderAdapter/LlmProvider.interface.ts` — `responseFormat`
  (`'text' | 'json_object'`) в `LlmStreamInput`.

### Клиент

- `face/entities/aiDialogue/repository/AiDialogueRepository.ts` — тип `AiDialogueModel` + интерфейс репозитория.
- `face/entities/aiDialogue/repository/AiDialogueApi.ts` — реализация через REST + маппинг.
- `face/entities/aiDialogue/AiDialogueService.ts` — сервис.
- `face/entities/aiDialogue/AiDialogueQueryFacade.ts` — TanStack Query фасад.
- `face/widgets/aiDialogueScenario/PublicAiDialogueScenariosList/fn/useAiDialogueScenarioClick.ts` — клик по сценарию
  (создаёт диалог; `sourceLanguageCode` пока `'en'`).
- `face/shared/utils/pickLocalized.ts` — резолв JSON-строки переводов под локаль.
- `face/shared/api/generated/ai-dialogue/ai-dialogue.ts` — сгенерированные функции (Orval).

## Как работает клиент

### Entity-слой

Повторяет структуру `entities/aiDialogueScenario`:

- `AiDialogueRepository` — тип `AiDialogueModel` (`id`, вложенный `scenario`, `sourceLanguageCode`,
  `targetLanguageCode`, `maxCefrLevel`, `createdAt`, `updatedAt`) и интерфейс репозитория.
- `AiDialogueApi` — реализация через сгенерированные Orval-функции; маппит `AiDialogueOutModel` в
  `AiDialogueModel`, вложенный сценарий — через `mapToAiDialogueScenario`.
- `AiDialogueService` — прослойка между компонентами и репозиторием.
- `AiDialogueQueryFacade` — TanStack Query `queryOptions` (`aiDialogueQueries`).

`scenario.title`/`scenario.description` — сырые JSON-строки,
резолв под локаль — через `pickLocalized` (см. `aiDocsRus/topics/aiDialogue/aiDialogueScenario.md`).

### Изменение сложности на клиенте

`AiDialogueService.updateDialogue(id, input)` и одноимённый метод Repository/API вызывают сгенерированный
PATCH и возвращают обновлённую entity-модель. `AiDialogueQueryFacade.updateDialogue` обновляет кэш detail/list
после подтверждения сервера. Панель настроек на странице показывает сохранённый уровень;
Any передаёт `null`. На время сохранения заблокирован только переключатель; форма ответа остаётся доступной,
ошибки показываются уведомлением без изменения прежнего выбора. SSE остаётся подключённым.
Подробнее о хуке, UI и проверках — в `aiDialoguePage.md`.

### Создание диалога по клику на сценарий

1. Если пользователь не вошёл (`useUser()` → `null`) — `LoginPromptModal`.
2. Иначе `aiDialogueService.createDialogue({ scenarioId, sourceLanguageCode, targetLanguageCode })`.
    - `sourceLanguageCode` — пока временно `'en'` (захардкожено, с TODO);
    - `targetLanguageCode` — текущая локаль интерфейса (`locale`).
3. При успехе инвалидируется кэш списка и выполняется `router.push` на `pageUrls.aiDialogues.dialog(dialog.id)`.

Список диалогов и состояние его клиентской реализации: [aiDialogueList.md](aiDialogueList.md).

## Ошибки

Ключи из `errorMessage.aiDialogue`:

- `notFound` — диалог не найден (`404`).
- `scenarioNotFound` — сценарий не найден при создании диалога (`404`).
- `generationAlreadyActive` — для диалога уже идёт генерация (`400`), нельзя отправить действие пользователя.
- `cannotParseLlmResponse` — не удалось разобрать ответ LLM в события (`500`, уходит в `turnError`, а не роняет SSE).

Плюс `user.isNotOwner` (`403`) при доступе к чужому диалогу.

## Вне объёма (следующие шаги)

- Отмена генерации пользователем (задействовать `AbortController` в registry) и выбор LLM-модели клиентом.
- Выбор языка практики пользователем: сейчас `sourceLanguageCode` при создании диалога захардкожен как `'en'`.

## Изображения в диалогах

План аватаров участников и иллюстраций сцен вынесен в отдельный документ:
[`aiDialogueImages.md`](aiDialogueImages.md). Серверная генерация, авторизованный визуальный REST-снимок
и межпроцессные уведомления реализованы. Клиентское отображение подключено (см. `aiDialoguePage.md`);
картинки не блокируют текст.

Генератор подключён к отдельному универсальному
[`imageGenerationProviderAdapter`](../imageGenerationProviderAdapter.md). Диалоги используют OpenAI Images API:
`gpt-image-2`, с `quality: low`, PNG, спрайт 960×720 и сцена 1152×576.
Настройки фиксируются в снимке задания; их смена влияет только на новые задания. Исходники сохраняются без уменьшения.
Старых BFL-заданий нет по сообщению пользователя; feature не содержит BFL polling или перенаправления старых моделей.
Ключ результата R2 резервируется в JSON задания атомарно до платного запроса, без новой миграции.
После сбоя worker может завершить публикацию уже загруженного оригинала, но не восстановить потерянный ответ OpenAI.
Если файла нет после резервирования, требуется ручная проверка; повторная платная генерация автоматически не
запускается.

Удаление диалога через CQRS собирает ключи изображений и каскадно удаляет записи в одной owner-scoped транзакции.
После коммита сервер пытается удалить исходники R2; ошибка очистки не отменяет успешное удаление диалога.
HTTP-процесс периодически убирает новые осиротевшие объекты старше суток, проверяя ссылки и активные задания.
Новые ключи разделены по REGION/MODE; эталон стиля сохраняется, фотографии профиля лежат вне generated-префикса.
Ограничения старых ключей без namespace
и требования к бакету описаны в разделе очистки документа об изображениях.

Перед включением генерации доступность и формат эталона стиля можно проверить из `server/` командой
`npm run check:ai-dialogue-image-assets` с полным серверным окружением. Команда не запускает worker и ничего
не записывает. Контракт отчёта и ограничения описаны в документе об изображениях.

## Озвучка диалогов

Серверная озвучка отдельных реплик NPC и описаний сцен, включая ранний запуск по завершённой строке,
постоянные голоса, отдельную очередь, R2 и REST/SSE, описана в [`aiDialogueAudio.md`](aiDialogueAudio.md).
Аудио может быть готово до финального сохранения сообщения; turnDone по-прежнему завершает только текст.
Клиентский проигрыватель подключён: раннее автоматическое воспроизведение, отдельные кнопки и ручное управление.

## Проверки ограничения сложности

Из `server/`: `npm test -- --testPathPatterns='features/aiDialogue/|routes/aiDialogue/|repo/aiDialogue/'`.
Проверяются DTO создания/обновления (включая null, отсутствие и неверные значения), передача уровня при создании,
сохранение и выдача в detail/list, права владельца, пустой PATCH, конкурентное удаление,
все четыре уровня в промпте, отключение прежней адаптации и снимок уровня на ход с повторной попыткой парсинга.
Проверки используют подмены БД/LLM; реальные платные генерации не запускаются.
