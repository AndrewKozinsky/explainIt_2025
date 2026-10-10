# Страница диалога с ИИ (AiDialoguePage)

## Что делает функционал

Страница `/dialogues/{dialogId}` (`_pages/aiDialogue/AiDialoguePage`), на которой пользователь общается с LLM-«NPC» в
рамках выбранного сценария. Это **клиентская** часть фичи AiDialogue — серверная часть (доменная модель, REST,
SSE-протокол, генерация хода, компакция) описана в
`aiDocsRus/topics/aiDialogue/aiDialogue.md`.

Страница полностью клиентская (`'use client'`). Взаимодействие:

- диалог загружается по REST (`GET /ai-dialogue/:id`) через TanStack Query;
- обмен сообщениями — через постоянный SSE-поток (`EventSource`), открытый хуком `useAiDialogueStream`;
- пользователь отправляет действие/реплику и «завершает» диалог через REST (`POST /ai-dialogue/:id/messages`);
- клик по слову в сообщении показывает перевод блока и передаёт слово в правую панель (словарь + выбранное предложение).

Языки: `dialogue.sourceLanguageCode` — изучаемый язык (реплики NPC), `dialogue.targetLanguageCode` — родной язык (поле
`translation`). Словарь в правой панели строится по `sourceLanguageCode`.

## Разметка страницы

Двухколоночная композиция:

- `AiDialoguePagePartsWrapper` — горизонтальный flex (левая колонка 60 %, правая 40 %). Принимает ровно 2 ребёнка
  `[left, right]`.
- `AiDialogueLeftWrapper` — левая колонка, принимает ровно 2 ребёнка `[messages, input]`: первый — список сообщений (+
  ошибка хода), второй — форма ввода.
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
- `AiDialogueStreamEvent` — события SSE-потока (`message` / `chunk` / `turnStarted` / `turnReset` / `turnDone` /
  `turnError` / `visualsChanged`).

`types/aiDialoguePreview.ts` — «ленивое» превью события, собранное из частичного построчного текста: все поля
опциональны, `type` может отсутствовать. `types/aiDialogueUi.ts` — `AiDialogueWordSelection` (`word`, `sentence`) и
`AiDialogueWordSelectHandler`.

## SSE-клиент

`ui/fn/openAiDialogueStream.ts` открывает `EventSource('/api/ai-dialogue/:id/stream')` и разбирает события в стор:

- `message` → `upsertMessage(message)` + очистить превью (финализированное сообщение заменяет превью);
- `turnStarted` → сбросить превью и ошибку + `setGenerating(true)` (плейсхолдер «ответ готовится» до первого `chunk`);
- `chunk` → накопить текст; на первом чанке `setGenerating(true)` и сбросить ошибку; затем
  `parseAiDialoguePreview(accumulated)`;
- `turnError` → `setTurnError(error)`;
- `turnReset` → сбросить накопленный текст и превью (повторная попытка генерации), `isGenerating`
  остаётся `true`;
- `turnDone` → очистить превью + `setGenerating(false)`;
- `visualsChanged` → запросить свежий REST-снимок изображений; сообщения, превью и `isGenerating` не меняются;
- `onopen` → запросить визуальный снимок после подключения или переподключения;
- `onerror` → сбросить превью и `setGenerating(false)` (EventSource переподключится сам и сервер отдаст replay).

`ui/fn/useAiDialogueStream.ts` — хук-обёртка: открывает соединение в `useEffect` (и закрывает при unmount), при старте
вызывает `clearStore()`, возвращает `{ messages, preview, isGenerating, turnError }`. Сообщения возвращает
отсортированными по `id`. Второй параметр `enabled` (страница передаёт `Boolean(dialogue)`) — SSE открывается только
после загрузки диалога.

## Zustand-стор (aiDialogueStore)

`entities/aiDialogue/ui/aiDialogueStore.ts` — глобальный стор страницы:

| Поле           | Тип                                  | Описание                                              |
|----------------|--------------------------------------|-------------------------------------------------------|
| `messages`     | `Map<number, DialogueServerMessage>` | сохранённые сообщения (ключ — `id`, дедуп при replay) |
| `preview`      | `AiDialoguePreviewEvent[]`           | частичные события текущего хода                       |
| `isGenerating` | `boolean`                            | идёт ли генерация ответа NPC                          |
| `turnError`    | `null \| string`                     | текст ошибки последнего хода                          |

Методы: `upsertMessage`, `setPreview`, `setGenerating`, `setTurnError`, `clearStore`.

## Рендер сообщений

`AiDialogMessageRouter` выбирает компонент по `event.type` (цепочка `if/else`, не `switch` — `switch` даёт циклический
конфликт `eslint indent` ↔ `prettier`). Неизвестный/отсутствующий `type` →
`PendingAnswerMessage` («Ответ от ИИ готовится…»).

Компоненты (`ui/messages/`):

- `SceneUpdateMessage` — «Смена сцены»;
- `HelpMessage` — «Подсказка»;
- `WorldEventMessage` — «Событие»;
- `NpcActionsMessage` — аватар, заголовок NPC (имя/роль) + действия;
- У NPC каждый блок имеет аватар 60×60 слева, справа имя/роль и текст; название эмоции не выводится.
  Аватар есть у каждого сообщения, без группировки. Ячейка 240×240 из спрайта обеспечивает запас для Retina.
  Пользовательские `userActions` имеют общий статичный аватар и подпись «Вы».
- `UserActionsMessage` — действия пользователя (без перевода);
- `UserAvoidsNpcMessage` — «Вы отошли от разговора»;
- `PendingAnswerMessage` — плейсхолдер, пока ответ не готов.

У компонентов сообщений поля превью-типа опциональны, поэтому они подставляют пустые значения по умолчанию
(`content = ''`, `actions = []` и т. д.).

`AiDialogueMessageList` рисует сохранённые сообщения, затем (при `isGenerating` и пустом превью) плейсхолдер, затем
превью. Сохранённые сообщения ключуются по `message.id`, превью — по `preview-${index}`.

## Изображения на клиенте

`useAiDialogueVisuals` получает авторизованный `/visuals` через существующие Repository → Service → QueryFacade
и сгенерированную Orval-функцию. Снимок хранится отдельно от текстового Zustand в TanStack Query под ключом
`['ai-dialogue', 'detail', dialogueId, 'visuals']`. При обновлении предыдущие данные остаются на экране.

Обновление происходит при открытии страницы, подключении/переподключении SSE, `visualsChanged`, сохранённых
NPC/сценах, возвращении фокуса и восстановлении сети. Сигналы объединяются в окно 250 мс; если запрос уже идёт,
после его завершения выполняется свежее чтение, чтобы не потерять изменения во время получения старого снимка.
При смене диалога снимаются таймеры; старое обновление не затрагивает новую страницу.

Для queued/waitingDependencies/generating снимок проверяется каждые 15 с, после двух минут — 30 с,
после пяти минут — 60 с. Длительный generating не становится failed на клиенте. В скрытой вкладке polling
приостановлен. Подписанные URL обновляются за минуту до urlsExpireAt; ошибки REST повторно проверяются через минуту.
Текстовый ход и доступность формы не зависят от загрузки изображений.

`DialogueVisualsProvider` индексирует NPC по npcId, сцены по messageId. `DialogueAvatar` вырезает нужную ячейку
раскладки emotion-grid-4x3-v1; неизвестная эмоция использует neutral. Неизвестная или неподходящая геометрия
спрайта оставляет серую заглушку. Файл спрайта общий для всех реплик NPC, параллельные загрузки объединяются.

В `SceneUpdateMessage` иллюстрация находится **над текстом**, занимает всю ширину и сохраняет пропорции 2:1.
Увеличения по нажатию нет. Серый слот без надписей резервируется в превью и для подтверждённых новых сцен
с visualDescription. У старой сцены без задания/изображения слот отсутствует; уже показанный слот не схлопывается.
Сцены загружаются при приближении к видимой области. Подготовка аватаров также показывает только серую область.

Новый подписанный URL сначала загружается/декодируется, затем заменяет отображаемый. Ошибка скачивания вызывает
не больше одного автоматического обновления ссылок на ассет за время открытия диалога. Ошибка сцены оставляет
слот и показывает «Иллюстрация недоступна»; при ошибке скачивания доступна «Повторить загрузку».
Кнопка повторяет только чтение снимка/скачивание, не генерацию. Ошибка аватара оставляет серую заглушку.
Изображения не вызывают программную прокрутку или перемонтирование текстовых блоков с раскрытым переводом.
Мобильная компоновка в этом этапе не менялась.

Парсер превью пропускает participants:/visual: и завершает чтение текстового события после translation,
поэтому даже частичные строки визуальных метаданных не заменяют видимое описание сцены.

Изолированные проверки клиента: `cd face && npm run test:ai-dialogue`. Используются подменённые EventSource/Image,
без API диалога, R2 или генерации. Реальные изображения и художественное качество требуют отдельной проверки.

## Разбивка текста на слова (SegmentedText)

`SegmentedText` делит контент на слова через `Intl.Segmenter({ granularity: 'word' })` (один сегментатор на модуль).
Слово (`segment.isWordLike`) оборачивается в `<button>`, знаки препинания и пробелы — обычный текст. Клик по слову
вызывает `onWordClick(word)`; в `AiDialogueContentBlock` это показывает перевод блока (`translation`) и пробрасывает
`{ word, sentence: content }` наверх — в правую панель (словарь + выбранное предложение).

## Частичное превью (построчный разбор)

`lib/parseAiDialoguePreview.ts` разбирает накопленный частичный текст ответа LLM (плоский построчный формат, см.
«Стриминг и формат ответа» в `aiDialogue.md`) в `AiDialoguePreviewEvent[]`. Последняя строка без завершающего `\n`
трактуется как «дописываемый» `content`/`translation` текущего блока — поэтому реплика растёт посимвольно по мере
генерации. Недостающие поля не роняют парсер — они просто отсутствуют. Возвращает `null`, если пока нечего показать —
вызывающий код оставляет предыдущее превью без изменений (без мерцания). Авторитетный разбор делает сервер; превью —
только для UX.

## Форма ответа пользователя

`ui/AiDialogueInput/AiDialogueInput.tsx` — два поля и две кнопки:

- **Действие** (`type: 'action'`) — что пользователь делает;
- **Реплика** (`type: 'speech'`) — что говорит.

Оба собираются в `userActions` (`actions`), пустые поля отбрасываются — достаточно заполнить хотя бы одно.
`Enter` отправляет, `Shift+Enter` — перенос строки. Кнопка «Завершить диалог» отправляет `userAvoidsNPC`
(это **не** удаление и не закрытие диалога — NPC реагирует на уход пользователя, диалог остаётся открытым).

Отправка — через `useAiDialogueSendMessage` (`ui/fn/`): вызывает `aiDialogueService.createMessage` и на успехе кладёт
подтверждённое сообщение в стор (`upsertMessage`). Сервер **не** возвращает событие пользователя по SSE (по шине
приходят только события NPC), поэтому сообщение пользователя добавляется из ответа POST. Форма заблокирована, пока
`isGenerating` или идёт отправка; поля очищаются только при успешной отправке.

### Entity-метод createMessage

`createMessage(id, event: AiDialogueClientEvent): Promise<ApiResult<DialogueServerMessage>>` добавлен в
`AiDialogueRepository` → `AiDialogueApi` (через сгенерированный `aiDialogueControllerCreateAiDialogueMessage`
и маппинг `AiDialogueMessageOutModel` → `DialogueServerMessage`) → `AiDialogueService`.

## Ошибки

- Ошибка хода приходит событием `turnError`; читаемый текст резолвится в `lib/resolveTurnError.ts`
  (JSON `{"code": "..."}` → `resolveErrorByCode`, иначе строка как есть). Показывается над списком сообщений
  (`ErrorMessage`).
- Попытка отправить сообщение во время генерации → `400 AI_DIALOGUE_GENERATION_ALREADY_ACTIVE`; клиент упреждающе
  блокирует форму по `isGenerating`.
- Ошибки отправки показываются через `notify` (`NotificationContext`).

## Ключевые файлы

### Типы и логика

- `../../face/widgets/aiDialogueMessages/types/aiDialogueMessage.ts` — зеркало серверных типов.
- `../../face/widgets/aiDialogueMessages/types/aiDialoguePreview.ts` — ленивое превью.
- `../../face/widgets/aiDialogueMessages/types/aiDialogueUi.ts` — выбор слова.
- `../../face/_pages/aiDialogue/AiDialoguePage/fn/parseAiDialoguePreview.ts` — толерантный построчный разбор превью.
- `../../face/_pages/aiDialogue/AiDialoguePage/fn/resolveTurnError.ts` — текст ошибки хода.

### Entity-слой

- `face/entities/aiDialogue/repository/AiDialogueRepository.ts` — интерфейс (+ `createMessage`).
- `face/entities/aiDialogue/repository/AiDialogueApi.ts` — реализация + маппинг.
- `face/entities/aiDialogue/AiDialogueService.ts` — сервис.
- `face/entities/aiDialogue/AiDialogueQueryFacade.ts` — TanStack Query фасад (`getDialogue`).

### Стор и SSE

- `../../face/_pages/aiDialogue/aiDialogueStore.ts` — zustand-стор.
- `../../face/_pages/aiDialogue/AiDialoguePage/fn/openAiDialogueStream.ts` — EventSource + разбор событий.
- `../../face/_pages/aiDialogue/AiDialoguePage/fn/useAiDialogueStream.ts` — хук-подключение.
- `../../face/_pages/aiDialogue/AiDialoguePage/fn/useAiDialogueSendMessage.ts` — отправка действия/реплики и завершение.

### UI

- `../../face/widgets/aiDialogueMessages/ui/AiDialogMessageRouter/AiDialogMessageRouter.tsx` — маршрутизация по `type`.
- `../../face/widgets/aiDialogueMessages/ui/messages/*` — компоненты сообщений.
- `../../face/widgets/aiDialogueMessages/ui/SegmentedText/SegmentedText.tsx` — разбивка на слова.
- `../../face/widgets/aiDialogueMessages/ui/AiDialogueContentBlock/AiDialogueContentBlock.tsx` — контент + перевод.
- `../../face/widgets/aiDialogueMessages/ui/AiDialogueMessageList/AiDialogueMessageList.tsx` — список сообщений.
- `../../face/widgets/aiDialogueForm/AiDialogueForm/AiDialogueInput.tsx` — форма ввода + кнопка завершения.

### Страница

- `face/_pages/aiDialogue/AiDialoguePage/AiDialoguePage.tsx` — страница.
- `face/_pages/aiDialogue/AiDialogueLeftWrapper/AiDialogueLeftWrapper.tsx` — левая колонка (сообщения + ввод).
- `face/_pages/aiDialogue/AiDialoguePage/fn/getHeaderAndSubHeader.ts` — заголовок через `pickLocalized`.
