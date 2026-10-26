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
- клик по слову в сохранённом сообщении показывает перевод блока, выбирает связанные слова по серверной карте и передаёт
  фразу в правую панель. Подробности: `aiDialogueWordMaps.md`.

Языки: `dialogue.sourceLanguageCode` — изучаемый язык (реплики NPC), `dialogue.targetLanguageCode` — родной язык (поле
`translation`). Словарь в правой панели строится по `sourceLanguageCode`.

## Выбор сложности текста

`AiDialogueModel.maxCefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | null` содержит сохранённую сервером границу сложности.
`entities/aiDialogue/ui/TextLevelSwitcher.tsx` в панели `AiDialogueSettings` показывает A1/A2/B1/B2/Any; `Any` соответствует `null`.
При загрузке и возвращении к диалогу выбранный уровень берётся из REST-модели, без локального значения A1 по умолчанию.

Нажатие вызывает `AiDialogueService.updateDialogue(id, input)` через хук `useAiDialogueTextLevel`.
Цепочка: Repository → AiDialogueApi → сгенерированный `aiDialogueControllerUpdateAiDialogue` →
`PATCH /api/ai-dialogue/:id`. В теле передаётся `{"maxCefrLevel":"A2"}` или `{"maxCefrLevel":null}`.
Поле необязательно: отсутствие оставляет прежнее значение. Компоненты не вызывают Orval напрямую.

`AiDialogueQueryFacade.updateDialogue` предоставляет mutation options. Успешный ответ заменяет снимок
конкретного диалога в TanStack Query и соответствующую запись списка; незавершённые чтения этих снимков отменяются,
чтобы старый ответ не затёр сохранённую настройку. Ключи отмены точные: аудио и изображения не затрагиваются.
При ошибке через `NotificationContext` показывается читаемый текст; прежний выбранный уровень сохраняется.
Подсветка переключается только после подтверждения сервера. Повторный выбор текущего уровня запрос не отправляет.

Пока PATCH выполняется, заблокированы только кнопки переключателя, чтобы не отправлять параллельные изменения.
Форма ответа остаётся доступной: сохранение уровня не блокирует ввод, отправку или завершение диалога.
Если реплика отправлена до завершения PATCH, генератор использует настройку, актуальную на момент чтения диалога.
Изменение уровня разрешено во время генерации NPC: текущий ход после фиксации настроек завершится с прежним уровнем,
следующий использует новый. SSE не переподключается, его формат, сообщения и превью не меняются.
Подробная серверная семантика и ограничения адаптации описаны в `aiDialogue.md`.

При создании entity-метод также принимает необязательный `maxCefrLevel`; интерфейс выбора до создания пока не добавлен,
поэтому новые диалоги из существующего списка сценариев начинаются с `null` (Any).
Сервер адаптирует все новые видимые тексты на изучаемом языке; переводы сохраняют смысл, озвучка получает адаптированный
текст.

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
- `NpcMessage` — аватар, заголовок NPC (имя/роль) + реплики и действия в свойстве `speechAndActions`;
- Внутри всего сообщения NPC сначала показываются все `speech`, затем все `action`, независимо от порядка
  в `payload.actions`. Порядок внутри каждого типа сохраняется. `groupNpcDialogueSpeechAndActions` меняет только порядок
  отображения: ключи React, адреса озвучки и `wordMap.blocks['action:N']` используют исходный индекс `N`.
  Правило общее для превью, подтверждённых сообщений и replay. Пока речь ещё не пришла в стриме, видны только
  доступные действия; появившаяся речь располагается над ними. Порядок пользовательских сообщений не меняется.
- У NPC каждый блок имеет аватар 80×80 слева, справа имя/роль и текст; название эмоции не выводится.
  Аватар есть у каждого сообщения, без группировки. Ячейка 240×240 из спрайта обеспечивает запас для Retina.
  Пользовательские `userActions` имеют текущий выбранный аватар профиля и подпись «Вы».
  Изменение профиля обновляет аватар у всех сообщений без истории прежнего выбора.
- `UserMessage` — действия пользователя (без перевода);
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

`DialogueVisualsProvider` индексирует NPC по npcId, сцены по messageId и перечитывает visuals
при смене avatarUrl в UserProvider. `DialogueAvatar` вырезает нужную ячейку
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

## Выбор словарной фразы (SegmentedText)

Карта генерируется в конце основного ответа LLM (`aiDialogueWordMaps.md`) и приходит внутри SSE message.
SegmentedText использует позиции готовой карты, сохраняя пробелы и пунктуацию текста.
Клик сразу передаёт phrase из записи для нажатого слова или само слово при отсутствии записи/карты.
Ожидания, подсветки и автоматической подмены словарного запроса после появления карты нет.
Для put … away словарь получает put away; для Do you have клик по Do может выбирать всю конструкцию,
а клик по you — только you. Превью также допускает клики с немедленным запасным выбором слова.
Пользовательские сообщения всегда выбирают отдельное слово.
AiDialogueContentBlock раскрывает существующий перевод всего блока, передаёт phrase/слово в поле word
и content в поле sentence. Правая панель не передаёт sentence в словарь.
Технический раздел wordMaps: исключается из построчного превью и не показывается пользователю.

## Частичное превью (построчный разбор)

`lib/parseAiDialoguePreview.ts` разбирает накопленный частичный текст ответа LLM (плоский построчный формат, см.
«Стриминг и формат ответа» в `aiDialogue.md`) в `AiDialoguePreviewEvent[]`. Последняя строка без завершающего `\n`
трактуется как «дописываемый» `content`/`translation` текущего блока — поэтому реплика растёт посимвольно по мере
генерации. Недостающие поля не роняют парсер — они просто отсутствуют. Возвращает `null`, если пока нечего показать —
вызывающий код оставляет предыдущее превью без изменений (без мерцания). Авторитетный разбор делает сервер; превью —
только для UX.

## Форма ответа пользователя

`face/widgets/aiDialogueForm/AiDialogueForm/AiDialogueInput.tsx` показывает вкладки «Реплика» и «Действие»,
один автоматически растущий textarea, кнопку ухода и нижнюю панель с диктовкой, проверкой и отправкой.
Оба черновика сохраняются при переключении; достаточно заполнить один. Каждая непустая часть должна
быть проверена в своей текущей версии и не содержать critical, иначе отправка на клиенте заблокирована.
Рекомендации отправку не блокируют. Любая правка требует новой проверки.

Проверка активной части идёт через Service → Repository/API → Orval на `/check-message`.
Диктовка использует MediaRecorder и отдельный WebSocket `/api/ai-dialogue/:id/dictation`,
сохраняет положение курсора/выделение и вставляет partial/final без изменения окружающего текста.
На время записи редактирование заблокировано, после остановки до done текст серый и readOnly.
Уход от NPC не требует грамматической проверки. Enter выполняет доступную проверку/отправку,
Shift+Enter добавляет перенос. Тексты очищаются только после успешной отправки.

Состояния формы, правила двух вкладок, отмена, доступ к микрофону, тесты и ключевые файлы:
[`aiDialogueForm.md`](aiDialogueForm.md). Серверные контракты:
[`aiDialogueMessageCheck.md`](aiDialogueMessageCheck.md), [`aiDialogueDictation.md`](aiDialogueDictation.md).

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

## Озвучка на клиенте

Страница подключает отдельный аудио REST-снимок и технические события SSE, общий проигрыватель и кнопку
у каждого speech/описания сцены. Автоматическое воспроизведение возможно уже во время превью.
Ручная остановка сохраняет время; выбор другого файла сбрасывает позицию предыдущего.
Ручное управление снимает очередь текущего ответа; следующий ответ снова озвучивается автоматически.
Глобальный переключатель не добавлен. При запрете autoplay показывается «Включить звук».
Подробный контракт, ошибки, порядок и проверки: [`aiDialogueAudio.md`](aiDialogueAudio.md).

## Проверки настроек сложности

`tests/aiDialogueSettings.test.ts` проверяет фактический PATCH через Service/API/Orval с подменой fetch,
передачу всех уровней и null, загрузку сохранённого значения, pending-состояние мутации,
обновление detail/list при успехе, сохранение кэша при ошибке и повторную попытку.
Запуск: `cd face && npm run test:ai-dialogue`.
