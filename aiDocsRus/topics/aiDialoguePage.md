# Страница диалога с ИИ (AiDialoguePage)

## Что делает функционал

Страница `/dialogues/{dialogId}` (`_pages/aiDialogue/AiDialoguePage`), на которой пользователь общается с
LLM-«NPC» в рамках выбранного сценария. Это **клиентская** часть фичи AiDialogue — серверная часть
(доменная модель, REST, SSE-протокол, генерация хода, компакция) описана в
`aiDocsRus/topics/aiDialogue.md`.

Страница полностью клиентская (`'use client'`). Взаимодействие:

- диалог загружается по REST (`GET /ai-dialogue/:id`) через TanStack Query;
- обмен сообщениями — через постоянный SSE-поток (`EventSource`), открытый хуком `useAiDialogueStream`;
- пользователь отправляет действие/реплику и «завершает» диалог через REST (`POST /ai-dialogue/:id/messages`);
- клик по слову в сообщении показывает перевод блока и передаёт слово в правую панель (словарь + выбранное
  предложение).

Языки: `dialogue.sourceLanguageCode` — изучаемый язык (реплики NPC), `dialogue.targetLanguageCode` — родной
язык (поле `translation`). Словарь в правой панели строится по `sourceLanguageCode`.

## Разметка страницы

Двухколоночная композиция:

- `AiDialoguePagePartsWrapper` — горизонтальный flex (левая колонка 60 %, правая 40 %). Принимает ровно
  2 ребёнка `[left, right]`.
- `AiDialogueLeftWrapper` — левая колонка, принимает ровно 2 ребёнка `[messages, input]`: первый — список
  сообщений (+ ошибка хода), второй — форма ввода.
- Правая панель — `DetailsBlock` с вкладками «Словарь» (`PhraseDictionary` с `languageCode` и `currentWord`)
  и «Диалог» (выбранное предложение).

Заголовок страницы резолвится из `dialogue.scenario.title` через `pickLocalized` (см.
`getHeaderAndSubHeader`).

## Клиентские типы (зеркало серверных)

`entities/aiDialogue/types/aiDialogueMessage.ts` — клиентское зеркало
`server/src/types/aiDialogueMessage.ts`:

- `AiDialogueEvent` — union из 6 событий (дискриминатор `type`);
- `AiDialogueClientEvent` — то, что клиент может отправить серверу (`userActions` | `userAvoidsNPC`);
- `DialogueServerMessage` — обёртка сообщения (`id`, `dialogueId`, `createdAt`, `payload`);
- `AiDialogueStreamEvent` — события SSE-потока (`message` / `chunk` / `turnDone` / `turnError`).

`types/aiDialoguePreview.ts` — «ленивое» превью события, собранное из частичного построчного текста: все
поля опциональны, `type` может отсутствовать. `types/aiDialogueUi.ts` — `AiDialogueWordSelection` (`word`, `sentence`) и
`AiDialogueWordSelectHandler`.

## SSE-клиент

`ui/fn/openAiDialogueStream.ts` открывает `EventSource('/api/ai-dialogue/:id/stream')` и разбирает события
в стор:

- `message` → `upsertMessage(message)` + очистить превью (финализированное сообщение заменяет превью);
- `chunk` → накопить текст; на первом чанке `setGenerating(true)` и сбросить ошибку; затем
  `parseAiDialoguePreview(accumulated)`;
- `turnError` → `setTurnError(error)`;
- `turnDone` → очистить превью + `setGenerating(false)`;
- `onerror` → сбросить превью и `setGenerating(false)` (EventSource переподключится сам и сервер отдаст
  replay).

`ui/fn/useAiDialogueStream.ts` — хук-обёртка: открывает соединение в `useEffect` (и закрывает при unmount),
при старте вызывает `clearStore()`, возвращает `{ messages, preview, isGenerating, turnError }`. Сообщения
возвращает отсортированными по `id`. Второй параметр `enabled` (страница передаёт `Boolean(dialogue)`) —
SSE открывается только после загрузки диалога.

## Zustand-стор (aiDialogueStore)

`entities/aiDialogue/ui/aiDialogueStore.ts` — глобальный стор страницы:

| Поле          | Тип                                   | Описание                                              |
|---------------|---------------------------------------|-------------------------------------------------------|
| `messages`    | `Map<number, DialogueServerMessage>`   | сохранённые сообщения (ключ — `id`, дедуп при replay) |
| `preview`     | `AiDialoguePreviewEvent[]`             | частичные события текущего хода                       |
| `isGenerating`| `boolean`                              | идёт ли генерация ответа NPC                          |
| `turnError`   | `null \| string`                       | текст ошибки последнего хода                          |

Методы: `upsertMessage`, `setPreview`, `setGenerating`, `setTurnError`, `clearStore`.

## Рендер сообщений

`AiDialogMessageRouter` выбирает компонент по `event.type` (цепочка `if/else`, не `switch` — `switch` даёт
циклический конфликт `eslint indent` ↔ `prettier`). Неизвестный/отсутствующий `type` →
`PendingAnswerMessage` («Ответ от ИИ готовится…»).

Компоненты (`ui/messages/`):

- `SceneUpdateMessage` — «Смена сцены»;
- `HelpMessage` — «Подсказка»;
- `WorldEventMessage` — «Событие»;
- `NpcActionsMessage` — заголовок NPC (имя/роль/эмоция) + действия;
- `UserActionsMessage` — действия пользователя (без перевода);
- `UserAvoidsNpcMessage` — «Вы отошли от разговора»;
- `PendingAnswerMessage` — плейсхолдер, пока ответ не готов.

У компонентов сообщений поля превью-типа опциональны, поэтому они подставляют пустые значения по умолчанию
(`content = ''`, `actions = []` и т. д.).

`AiDialogueMessageList` рисует сохранённые сообщения, затем (при `isGenerating` и пустом превью) плейсхолдер,
затем превью. Сохранённые сообщения ключуются по `message.id`, превью — по `preview-${index}`.

## Разбивка текста на слова (SegmentedText)

`SegmentedText` делит контент на слова через `Intl.Segmenter({ granularity: 'word' })` (один сегментатор на
модуль). Слово (`segment.isWordLike`) оборачивается в `<button>`, знаки препинания и пробелы — обычный
текст. Клик по слову вызывает `onWordClick(word)`; в `AiDialogueContentBlock` это показывает перевод блока
(`translation`) и пробрасывает `{ word, sentence: content }` наверх — в правую панель (словарь +
выбранное предложение).

## Частичное превью (построчный разбор)

`lib/parseAiDialoguePreview.ts` разбирает накопленный частичный текст ответа LLM (плоский построчный формат,
см. «Стриминг и формат ответа» в `aiDialogue.md`) в `AiDialoguePreviewEvent[]`. Последняя строка без
завершающего `\n` трактуется как «дописываемый» `content`/`translation` текущего блока — поэтому реплика
растёт посимвольно по мере генерации. Недостающие поля не роняют парсер — они просто отсутствуют.
Возвращает `null`, если пока нечего показать — вызывающий код оставляет предыдущее превью без изменений
(без мерцания). Авторитетный разбор делает сервер; превью — только для UX.

## Форма ответа пользователя

`ui/AiDialogueInput/AiDialogueInput.tsx` — два поля и две кнопки:

- **Действие** (`type: 'action'`) — что пользователь делает;
- **Реплика** (`type: 'speech'`) — что говорит.

Оба собираются в `userActions` (`actions`), пустые поля отбрасываются — достаточно заполнить хотя бы одно.
`Enter` отправляет, `Shift+Enter` — перенос строки. Кнопка «Завершить диалог» отправляет `userAvoidsNPC`
(это **не** удаление и не закрытие диалога — NPC реагирует на уход пользователя, диалог остаётся открытым).

Отправка — через `useAiDialogueSendMessage` (`ui/fn/`): вызывает `aiDialogueService.createMessage` и на
успехе кладёт подтверждённое сообщение в стор (`upsertMessage`). Сервер **не** возвращает событие
пользователя по SSE (по шине приходят только события NPC), поэтому сообщение пользователя добавляется из
ответа POST. Форма заблокирована, пока `isGenerating` или идёт отправка; поля очищаются только при успешной
отправке.

### Entity-метод createMessage

`createMessage(id, event: AiDialogueClientEvent): Promise<ApiResult<DialogueServerMessage>>` добавлен в
`AiDialogueRepository` → `AiDialogueApi` (через сгенерированный `aiDialogueControllerCreateAiDialogueMessage`
и маппинг `AiDialogueMessageOutModel` → `DialogueServerMessage`) → `AiDialogueService`.

## Ошибки

- Ошибка хода приходит событием `turnError`; читаемый текст резолвится в `lib/resolveTurnError.ts`
  (JSON `{"code": "..."}` → `resolveErrorByCode`, иначе строка как есть). Показывается над списком
  сообщений (`ErrorMessage`).
- Попытка отправить сообщение во время генерации → `400 AI_DIALOGUE_GENERATION_ALREADY_ACTIVE`; клиент
  упреждающе блокирует форму по `isGenerating`.
- Ошибки отправки показываются через `notify` (`NotificationContext`).

## Ключевые файлы

### Типы и логика

- `face/entities/aiDialogue/types/aiDialogueMessage.ts` — зеркало серверных типов.
- `face/entities/aiDialogue/types/aiDialoguePreview.ts` — ленивое превью.
- `face/entities/aiDialogue/types/aiDialogueUi.ts` — выбор слова.
- `face/entities/aiDialogue/lib/parseAiDialoguePreview.ts` — толерантный построчный разбор превью.
- `face/entities/aiDialogue/lib/resolveTurnError.ts` — текст ошибки хода.

### Entity-слой

- `face/entities/aiDialogue/repository/AiDialogueRepository.ts` — интерфейс (+ `createMessage`).
- `face/entities/aiDialogue/repository/AiDialogueApi.ts` — реализация + маппинг.
- `face/entities/aiDialogue/AiDialogueService.ts` — сервис.
- `face/entities/aiDialogue/AiDialogueQueryFacade.ts` — TanStack Query фасад (`getDialogue`).

### Стор и SSE

- `face/entities/aiDialogue/ui/aiDialogueStore.ts` — zustand-стор.
- `face/entities/aiDialogue/ui/fn/openAiDialogueStream.ts` — EventSource + разбор событий.
- `face/entities/aiDialogue/ui/fn/useAiDialogueStream.ts` — хук-подключение.
- `face/entities/aiDialogue/ui/fn/useAiDialogueSendMessage.ts` — отправка действия/реплики и завершение.

### UI

- `face/entities/aiDialogue/ui/AiDialogMessageRouter/AiDialogMessageRouter.tsx` — маршрутизация по `type`.
- `face/entities/aiDialogue/ui/messages/*` — компоненты сообщений.
- `face/entities/aiDialogue/ui/SegmentedText/SegmentedText.tsx` — разбивка на слова.
- `face/entities/aiDialogue/ui/AiDialogueContentBlock/AiDialogueContentBlock.tsx` — контент + перевод.
- `face/entities/aiDialogue/ui/AiDialogueMessageList/AiDialogueMessageList.tsx` — список сообщений.
- `face/entities/aiDialogue/ui/AiDialogueInput/AiDialogueInput.tsx` — форма ввода + кнопка завершения.

### Страница

- `face/_pages/aiDialogue/AiDialoguePage/AiDialoguePage.tsx` — страница.
- `face/_pages/aiDialogue/AiDialogueLeftWrapper/AiDialogueLeftWrapper.tsx` — левая колонка (сообщения + ввод).
- `face/_pages/aiDialogue/AiDialoguePage/fn/getHeaderAndSubHeader.ts` — заголовок через `pickLocalized`.
