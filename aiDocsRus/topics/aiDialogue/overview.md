# Диалоги с ИИ: обзор

Точка входа для любой задачи про диалоги. Здесь — устройство системы целиком и где искать подробности.
Подробные документы лежат рядом; ссылки на них в конце.

## Что это для пользователя

Ролевая сценка на изучаемом языке. На странице `/{locale}/dialogues` пользователь видит «Мои диалоги»
и публичные сценарии, сгруппированные по темам. Карточка сценария открывает окно запуска: язык практики
(все языки из `face/shared/utils/languages.ts`, кроме языка интерфейса (`useLanguagesToLearn`)), максимальная сложность (A1/A2/B1/B2/Any) и стиль иллюстраций. После создания — страница
`/{locale}/dialogues/{id}`.

На странице диалога LLM играет NPC и ведёт сцену. Пользователь пишет или диктует реплику и/или действие,
проверяет их на ошибки и отправляет. Ответ NPC приходит потоком. У NPC есть спрайт с 12 эмоциями,
у каждой встречи — иллюстрация сцены, у реплик NPC и описаний сцен — озвучка. Клик по слову передаёт
слово или связанное выражение в словарь правой панели и раскрывает перевод блока.

## Модель данных

- `AiDialogueScenarioGroup` → `AiDialogueScenario` → `AiDialogue` → `AiDialogueMessage`.
- Сценарий языконейтрален: `title`/`description` (у групп тоже) хранятся JSON-строками переводов, API отдаёт их
  на языке из `Accept-Language`; `system_prompt` — английский,
  клиенту не отдаётся. Публичный сценарий (`user_id IS NULL`) обязан иметь группу и обложку.
  Публичные группы и сценарии синхронизируются сидом при старте сервера.
- `AiDialogue`: владелец, сценарий, `source_language_code` (практика), `target_language_code` (перевод),
  `max_cefr_level` (null — без ограничения, меняется PATCH), `illustration_style_id` (фиксируется при создании),
  `summary`/`summary_up_to` (сжатая история).
- `AiDialogueMessage`: одно событие — одна строка; `type` + JSON `payload`. Типы: `sceneUpdate`, `npcActions`,
  `help`, `worldEvent` (от LLM), `userActions`, `userAvoidsNPC` (от пользователя).
  `npcActions.actions` — массив `{ type: 'speech' | 'action', content, translation }`.
- Побочные сущности, не являющиеся сообщениями:
  - `AiDialogueCharacter` — NPC, уникален по `(dialogue_id, npc_id)`, хранит внешность;
  - `AiDialogueImage`, `ImageGenerationJob`, `ImageGenerationOutbox` — изображения;
  - `AiDialogueVoice` (голос NPC, уникален по `(dialogue_id, npc_id)`), `AiDialogueAudioAttempt`,
    `AiDialogueAudioJob` — озвучка.

Источник схемы — `server/src/db/dbConfig/dbConfig.ts`; Prisma-схема генерируется из него.

## Жизненный цикл хода

Каналы: клиент → сервер только REST, сервер → клиент — один постоянный SSE `GET /api/ai-dialogue/:id/stream`.

1. Клиент открывает SSE. Сервер проверяет владельца, отдаёт replay сохранённых сообщений и, если диалог
   «ждёт хода» (сообщений нет или последнее — от пользователя), запускает генерацию.
2. Действие пользователя — `POST /api/ai-dialogue/:id/messages`; при активной генерации — 400.
   Сообщение сохраняется, генерация запускается fire-and-forget. Не больше одной генерации на диалог.
3. `GenerateAiDialogueTurn` собирает промпт (`buildAiDialoguePrompt`): промпт сценария, построчный
   контракт ответа, правила уровня CEFR, реестр NPC; в user-сообщении — текущая сцена, summary и свежие события.
4. Ответ LLM стримится плоским текстом; каждый фрагмент уходит клиенту как `chunk` (превью).
   Параллельно аудиопарсер ставит озвучку по завершённым строкам, не дожидаясь конца ответа.
5. В конце сервер разбирает полный текст (`parseAiDialogueEvents`). Если ни одно событие не спасено — одна
   повторная попытка (`turnReset`). Подтверждённый ход сохраняется одной транзакцией: сообщения, новые NPC,
   данные сцен, задания изображений. Затем каждое сообщение уходит как `message`, в конце — `turnDone`.
6. После хода в фоне: компакция истории (больше 20 несжатых сообщений → сжимаются все, кроме последних 5)
   и привязка аудиозаданий к сохранённым сообщениям.

SSE-события: `message`, `chunk`, `turnStarted`, `turnReset`, `turnDone`, `turnError`, `visualsChanged`,
а также технические `audio*`. `turnDone` означает только конец текста: картинки и аудио доезжают позже.

## Протокол ответа LLM

Блоки разделены одной пустой строкой, одно поле на строку, перевод — всегда отдельной строкой после текста.

```text
sceneUpdate
<описание сцены>
<перевод>
participants:<видимые npcId через запятую>
visual:<английское описание кадра>

npcActions|<npcId>|<npcName>|<npcRole>|<emotion>
appearance:
<английская внешность — только для нового NPC>
voice:
{"voice":"<голос OpenAI>","instructions":"<манера>"}
speech:
<реплика>
<перевод>
action:
<действие>
<перевод>

wordMaps:
<по одной JSON-строке на каждую content-строку>
```

Также есть блоки `help` и `worldEvent` (текст + перевод). `sceneUpdate` открывает новую встречу с NPC;
всё внутри встречи — `npcActions`. `appearance`, `voice`, `participants`, `visual` и `wordMaps` скрыты
от пользователя и не становятся сообщениями. Модель иногда пишет `appearance`/`voice` в одну строку —
парсеры это принимают (`readNpcMetadataField`).

## Побочные конвейеры

Все они не блокируют текст; источник истины — БД и REST, а Redis/SSE лишь сигналят «перечитай».

- **Изображения.** Новый NPC → одно задание листа эмоций 4×3; `sceneUpdate` → иллюстрация сцены
  с референсами пользователя, NPC и эталона стиля. Транзакция хода → outbox → BullMQ → worker → OpenAI Images
  (`gpt-image-2`) → R2 → ready. Клиент читает `GET /:id/visuals` (подписанные ссылки на 6 часов) по `visualsChanged`.
- **Озвучка.** Каждая `speech` NPC и текст `sceneUpdate` → отдельный MP3 (OpenAI TTS). Сцену читает фиксированный
  диктор; реплике нужен профиль голоса NPC из `voice:` — без него задание не создаётся, на клиенте кнопка
  показывает «Озвучка недоступна». Задания создаются по превью (до сохранения сообщения) и позже привязываются
  к messageId. Клиент читает `GET /:id/audio`, один проигрыватель на странице, автоочередь по порядку текста.
- **Карта слов.** Раздел `wordMaps:` в том же ответе LLM; сохраняется в `payload.wordMap`. Клик по слову
  передаёт выражение из карты или само слово, без ожидания.
- **Проверка черновика.** `POST /:id/check-message` — отдельный вызов LLM, ничего не сохраняет.
  Клиент разрешает отправку только проверенного текста без критических ошибок; сервер `/messages` этого не требует.
- **Диктовка.** `WS /api/ai-dialogue/:id/dictation` → Soniox, распознавание на двух языках диалога.
- **Компакция.** `summary` — append-only блоки `{ state, history }`; `state` выводится детерминированно
  (`deriveAiDialogueState`), `history` пишет LLM.

## Процессы и инфраструктура

- HTTP-процесс (`server/src/main.ts`): REST, SSE, WebSocket диктовки, генерация текста, publisher'ы outbox,
  фоновые очистки R2.
- Worker (`server/src/main.worker.ts`, `worker.module.ts`): очереди BullMQ изображений и аудио,
  а также генерация субтитров видео. Если worker упал, задания висят в `queued`.
- Redis — сессии, BullMQ, Pub/Sub уведомлений worker → HTTP. R2 — файлы, ключи разделены по REGION/MODE.
- Текст и проверка — `LlmAdapterService` (модель по умолчанию `DEFAULT_FLASH_AI_MODEL`).
- Удаление диалога каскадно удаляет записи в БД, затем пытается удалить файлы R2.

## Ключевые файлы

Сервер (`server/src/`):

- `routes/aiDialogue/aiDialogue.controller.ts` — все маршруты диалога;
  `routes/aiDialogueScenarioGroup/` — список групп сценариев.
- `features/aiDialogue/GenerateAiDialogueTurn.service.ts` — генерация хода;
  `OpenAiDialogueStream.command.ts` — SSE; `AiDialogueSseHub.service.ts` — in-memory шина.
- `features/aiDialogue/buildAiDialoguePrompt.ts`, `parseAiDialogueEvents.ts` — промпт и разбор.
- `repo/aiDialogue/aiDialogueTurn.repository.ts` — транзакция сохранения хода.
- `features/aiDialogue/audio/`, `imageGeneration/`, `wordMap/`, `messageCheck/`, `dictation/`,
  `illustrationStyles/catalog.ts` — конвейеры.
- `features/aiDialogueScenario/groups.ts`, `scenarios/` — сид групп и сценариев.
- `types/aiDialogueMessage.ts` — доменные типы событий.

Клиент (`face/`):

- `_pages/aiDialogue/AiDialoguePage/` — страница; в `fn/` SSE (`openAiDialogueStream`), превью
  (`parseAiDialoguePreview`), хуки аудио/изображений/отправки; стор — `_pages/aiDialogue/aiDialogueStore.ts`.
- `entities/aiDialogue/` — Repository → Service → QueryFacade, `audio/DialogueAudioPlayer.ts`,
  `dictation/`, `messageCheck/`.
- `widgets/aiDialogueMessages/` — рендер сообщений; `widgets/aiDialogueForm/` — форма ответа;
  `widgets/aiUserDialogues/` — «Мои диалоги»; `widgets/aiDialogueScenario/` — сценарии и окно запуска.
- `tests/aiDialogue*.test.ts` — клиентские тесты (`node --import tsx --test tests/aiDialogue*.test.ts`).

## Подробные документы

| Задача про… | Документ |
|---|---|
| REST, события, SSE, генерация хода, компакция, CEFR | [aiDialogue.md](aiDialogue.md) |
| Сценарии, группы, сид, окно запуска | [aiDialogueScenario.md](aiDialogueScenario.md) |
| Файлы обложек сценариев в R2 | [aiDialogueScenarioCovers.md](aiDialogueScenarioCovers.md) |
| «Мои диалоги», карточки, пагинация | [aiDialogueList.md](aiDialogueList.md) |
| Клиентская страница, стор, превью, рендер | [aiDialoguePage.md](aiDialoguePage.md) |
| Форма ответа: вкладки, проверка, отправка | [aiDialogueForm.md](aiDialogueForm.md) |
| Проверка черновика (сервер) | [aiDialogueMessageCheck.md](aiDialogueMessageCheck.md) |
| Диктовка, Soniox, WebSocket | [aiDialogueDictation.md](aiDialogueDictation.md) |
| Карта слов | [aiDialogueWordMaps.md](aiDialogueWordMaps.md) |
| Озвучка | [aiDialogueAudio.md](aiDialogueAudio.md) |
| Изображения: спрайты, сцены, очередь, R2 | [aiDialogueImages.md](aiDialogueImages.md) |
| Стили иллюстраций | [aiDialogueIllustrationStyles.md](aiDialogueIllustrationStyles.md) |
