# Чат с ИИ по выделенному предложению

## Что делает функционал

Пользователь выделяет предложение в субтитрах или тексте видео и открывает на правой панели вкладку «Диалог» — чат с ИИ
об этом предложении. В чате он задаёт свободные вопросы (грамматика, лексика, перевод, культурный контекст и т. п.).
Ответ ИИ приходит **потоково**, чанк за чанком, и постепенно появляется на экране.

Чат есть только на странице видео (`VideoPage`); на странице главы книги вкладки «Диалог» нет.

Для каждого пользователя на каждое предложение есть **не более одного треда** (модель `SentenceChatThread` с
`@@unique([user_id, sentence_id])`). Вся история диалога сохраняется в БД в `SentenceChatMessage`.

## Доменная модель

### `SentenceChatThread`

- `(user_id, sentence_id)` — уникальная пара.
- Содержит упорядоченный список `SentenceChatMessage`.

### `SentenceChatMessage`

- `role` (`SentenceChatMessageRole`): `user` | `assistant`.
- `status` (`SentenceChatMessageStatus`): `streaming` | `completed` | `canceled` | `failed`.
- `content`: текст сообщения (у streaming-заготовки ассистента изначально пуст и записывается при финализации).
- `error_message`: заполняется, если `status === 'failed'`.

## Как работает сервер

### REST API

Контроллер `server/src/routes/sentenceChat/sentenceChat.controller.ts`, префикс `/sentence-chat`. Все маршруты
требуют сессию (`CheckSessionCookieGuard`).

| Маршрут                                                                          | Назначение                                                              |
|----------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| `GET /sentence-chat/threads?sentenceId=`                                         | тред с сообщениями или `null`, если его ещё нет                         |
| `POST /sentence-chat/threads` (тело `{ sentenceId }`)                            | создать **новый** пустой тред; если он уже есть — `threadAlreadyExists` |
| `POST /sentence-chat/threads/:threadId/messages` (тело `{ threadId, question }`) | добавить вопрос пользователя, вернуть созданное сообщение               |
| `GET /sentence-chat/threads/:threadId/assistant-stream?model=` (SSE)             | сгенерировать ответ ассистента и стримить чанки                         |

Query-параметр `model` — идентификатор модели из `AiModel` (`server/src/types/AIModels.ts`). По нему
`LlmAdapterService` выбирает провайдера. Если `model` не передан, используется `DEFAULT_FLASH_AI_MODEL` (MiMo Flash).

Первые три маршрута описаны в OpenAPI (`openAPI.decorators.ts`); клиентские функции для них генерирует Orval.
SSE-маршрут в OpenAPI не описан, клиент открывает его через `EventSource`.

Каждый маршрут делает одно действие: получение треда, создание треда, создание вопроса и генерация ответа разделены.
SSE-маршрут сам создаёт streaming-заготовку `assistant`-сообщения и заполняет её по мере генерации.

### CQRS handlers

- `GetSentenceChatThreadHandler` (`GetSentenceChatThread.query.ts`) — читает тред через
  `SentenceChatThreadQueryRepository.getThreadWithMessagesByUserAndSentence`.
- `CreateSentenceChatThreadHandler` — проверяет существование предложения (`sentence.notFound`) и отсутствие треда,
  создаёт запись, возвращает тред через `SentenceChatThreadQueryRepository.getThreadById`.
- `CreateSentenceChatUserMessageHandler` — проверяет, что вопрос не пустой (`questionIsEmpty`), что тред существует и
  принадлежит пользователю, и что предыдущий ответ завершён: последнее сообщение либо отсутствует, либо это `assistant`
  со статусом не `streaming` (иначе `previousAnswerNotReady`). Создаёт user-сообщение со статусом `completed`,
  обновляет тред (`touchThread`), возвращает сообщение через `getMessageById`.
- `StreamSentenceChatAssistantCommand` — Observable-процесс генерации (см. ниже). Это не CQRS-команда, а
  `@Injectable`-сервис, который контроллер вызывает напрямую.

### Процесс генерации ответа (SSE)

`StreamSentenceChatAssistantCommand.execute` возвращает `Observable<MessageEvent>`:

1. Проверяет, что тред существует (`threadNotFound`) и принадлежит пользователю (`user.isNotOwner`).
2. Проверяет, что у пользователя нет другой активной генерации: и в памяти (`ActiveSentenceChatGenerationRegistry`),
   и в БД (сообщение со `status='streaming'`). Иначе — `generationAlreadyActive`.
3. Проверяет, что последнее сообщение треда — `role='user'` (иначе `lastMessageIsNotUserQuestion`).
4. Собирает контекст через `SentenceChatContextBuilder.buildForSentence`: само предложение и 5 предыдущих
   (`SENTENCES_BEFORE = 5`, `SENTENCES_AFTER = 0`), и историю — до 10 последних сообщений треда (`HISTORY_LIMIT`),
   последнее из них — новый вопрос.
5. **Только после** успешного построения промпта создаёт пустую streaming-заготовку `assistant`-сообщения — чтобы
   при ранней ошибке в БД не оставалось зависших `streaming`-записей.
6. Регистрирует `AbortController` в `ActiveSentenceChatGenerationRegistry`.
7. Вызывает `LlmAdapterService.stream({ model, messages, abortSignal, onUsage })`. Для каждого чанка отправляет
   SSE-событие `{ type: 'chunk', chunk }`.
8. По завершении вызывает `finalize(...)`:
    - обновляет assistant-сообщение (`content`, `status`, `error_message`);
    - списывает токены (см. «Списание баланса»);
    - снимает регистрацию в registry;
    - отправляет финальное SSE-событие `{ type: 'done', status, content, errorMessage }` и завершает поток.

При ошибке на любом шаге `finalize` вызывается со статусом `failed` и текстом ошибки. Для `CustomError` после события
`done` поток дополнительно завершается ошибкой (`subscriber.error`).

Баланс пользователя перед генерацией не проверяется.

#### Отмена

Когда клиент отключается от SSE (`EventSource.close()` или уход со страницы), RxJS вызывает teardown Observable. Он
вызывает `abortController.abort()`, стрим LLM обрывается, `finalize` записывает сообщение со `status='canceled'` и
сохраняет уже сгенерированную часть контента. Отдельного маршрута отмены нет.

#### Одна активная генерация на пользователя

`ActiveSentenceChatGenerationRegistry` хранит две карты: `userId → { assistantMessageId, abortController }` и
`assistantMessageId → { userId, abortController }`. Лимит — **1 активная генерация на пользователя**. Проверка
дублируется в БД, чтобы выдержать рестарт процесса.

### System prompt и контекст

`buildSentenceChatSystemInstruction` (`buildSentenceChatPrompt.ts`) формирует system-prompt с предложением и соседними,
`buildSentenceChatMessages` собирает массив `LlmMessage[]` (история + новый вопрос) в нейтральном формате.
System-prompt добавляется первым сообщением с `role: 'system'`; провайдеры `LlmAdapterService` сами конвертируют
`LlmMessage[]` в формат своего API.

### Списание баланса

После завершения генерации (любой статус), если получен ненулевой `usage`, вызывается `chargeAfterTranslationIfNeeded`
из модуля перевода. Она выполняет `TokenUsageBalanceChargeCommand` с моделью и числом входных/выходных токенов.
Ошибка списания не роняет SSE — она только логируется.

## LLM-адаптер

Все вызовы LLM идут через `LlmAdapterService` (`server/src/infrastructure/llmProviderAdapter/`):

- `generate({ model, messages, ... })` — обычный ответ;
- `stream({ model, messages, abortSignal, onUsage })` — потоковый ответ.

Провайдер определяется по `model` через `getProviderFromModel`: `GeminiLlmProvider`, `ChatGptLlmProvider`,
`DeepSeekLlmProvider`, `ZaiLlmProvider` или `MimoLlmProvider`. Модуль `LlmProviderModule` экспортирует только
`LlmAdapterService` и
импортируется в модули-потребители (`SentenceChatModule`, `TranslateRouteModule`, `AiDialogueModule` и др.).

### Рассуждение

`reasoningEffort` в `generate` включает рассуждение у моделей, которые его поддерживают. Если параметр не передан (и
всегда в `stream`), DeepSeek и MiMo вызываются с выключенным рассуждением (`thinking: { type: 'disabled' }`): иначе их
API рассуждает по умолчанию, что дороже и медленнее. DeepSeek получает уровень через `reasoning_effort`, MiMo уровни
не поддерживает и только включает рассуждение.

### SSE и GET

Для стриминга используется `@Sse` из NestJS (на основе `rxjs.Observable`). Метод GET, хотя запрос создаёт запись в БД:
так клиент может использовать родной `EventSource`.

## Как работает клиент

Код — `face/entities/sentenceChat/`. На странице видео чат подключается через
`face/entities/detailsBlock/ui/mediaSpecific/MediaDialogContent/` и получает `selectedSentenceId` из медиа-стора.

- `repository/SentenceChatApi.ts` и `SentenceChatService.ts` — `getThread`, `createThread`, `createUserMessage`
  поверх Orval-функций.
- `ui/sentenceChatStore.ts` — zustand-стор: `threadId`, `messages`, `isLoadingThread`, `isGenerating`, `threadError`,
  `llmProvider`, `prompt`.
- `ui/SentenceChat/fn/useSentenceChat.ts` — хук-оркестратор: отправка вопроса, запуск стрима, отмена.
- `ui/SentenceChat/fn/useLoadChatThread.ts` — загрузка треда при смене предложения.
- `ui/SentenceChat/fn/openAssistantStream.ts` — создание `EventSource` и обработка событий.

### Открытие чата по предложению

При смене `sentenceId` `useLoadChatThread` очищает стор и вызывает `getThread`:

- если тред есть — кладёт `threadId` и сообщения в стор;
- если `null` — чат пуст, `threadId` нет;
- при ошибке — `threadError: 'Не удалось загрузить историю чата'`.

При уходе с предложения открытый стрим закрывается.

### Отправка вопроса

1. Если `threadId` нет — `createThread(sentenceId)`, `threadId` сохраняется в стор.
2. `createUserMessage(threadId, question)` — созданное сообщение добавляется в список.
3. В список добавляется локальный плейсхолдер ассистента (`status: 'streaming'`, отрицательный `id`,
   `isLocalPlaceholder: true`), `isGenerating = true`.
4. Открывается `EventSource` на `/api/sentence-chat/threads/{threadId}/assistant-stream`.

Ошибка шагов 1–2 показывается как `threadError: 'Ошибка отправки вопроса'`.

### Обработка SSE-событий

- `{ type: 'chunk', chunk }` — `appendStreamChunk` дописывает текст плейсхолдера.
- `{ type: 'done', status, content, errorMessage }` — `finalizeStreamingMessage` фиксирует контент и статус, стрим
  закрывается.
- `onerror` — `failStreamingMessages('Соединение потеряно')`: полученный текст остаётся, сообщение помечается
  `failed`.

### Отмена генерации

Кнопка отмены закрывает `EventSource` и вызывает `cancelStreamingMessages`. Сервер сам записывает `canceled`.

### Переключатель модели

`ui/LlmProviderSwitch/` — кнопки DeepSeek, Gemini, ChatGPT (`getProviders()`); значение хранится в
`sentenceChatStore.llmProvider` (по умолчанию `deepseek`). Клиент добавляет его в URL стрима как `?provider=...`, а
сервер читает параметр `model`, поэтому выбор сейчас не влияет на генерацию: всегда используется
`DEFAULT_FLASH_AI_MODEL`.

### Голосовой ввод

`ui/VoiceInputButton/` — диктовка вопроса через браузерный Web Speech API (`SpeechRecognition` /
`webkitSpeechRecognition`).

### После перезагрузки страницы

Клиент только загружает тред и показывает сообщения; автоматически к стриму не переподключается. Если последнее
сообщение — вопрос пользователя без ответа, новый вопрос отправить нельзя (`previousAnswerNotReady`).

## Ошибки

Ключи из `errorMessage.sentenceChat`:

- `questionIsEmpty` — пустой текст вопроса.
- `generationAlreadyActive` — у пользователя уже идёт генерация ответа.
- `threadNotFound` — тред не найден.
- `threadAlreadyExists` — тред для этого предложения уже существует.
- `lastMessageIsNotUserQuestion` — стрим запрошен для треда, где последнее сообщение — не вопрос пользователя.
- `previousAnswerNotReady` — новый вопрос, пока последнее сообщение не завершённый ответ ассистента.

Также используются `user.isNotOwner` (тред принадлежит другому пользователю) и `sentence.notFound`. Ключ
`sentenceChat.insufficientBalance` объявлен, но не используется.

## Ключевые файлы

### Сервер

- `server/prisma/schema.prisma` — `SentenceChatThread`, `SentenceChatMessage`, enum `SentenceChatMessageRole` и
  `SentenceChatMessageStatus`.
- `server/src/routes/sentenceChat/sentenceChat.controller.ts` — REST и SSE маршруты.
- `server/src/routes/sentenceChat/openAPI.decorators.ts`, `inputs/` — OpenAPI и DTO.
- `server/src/routes/sentenceChat/sentenceChat.module.ts`.
- `server/src/features/sentenceChat/GetSentenceChatThread.query.ts`
- `server/src/features/sentenceChat/CreateSentenceChatThread.command.ts`
- `server/src/features/sentenceChat/CreateSentenceChatUserMessage.command.ts`
- `server/src/features/sentenceChat/StreamSentenceChatAssistant.command.ts`
- `server/src/features/sentenceChat/ActiveSentenceChatGenerationRegistry.service.ts`
- `server/src/features/sentenceChat/SentenceChatContextBuilder.service.ts`
- `server/src/features/sentenceChat/buildSentenceChatPrompt.ts`
- `server/src/repo/sentenceChatThread.repository.ts`, `sentenceChatMessage.repository.ts`,
  `sentenceChatThread.queryRepository.ts`
- `server/src/infrastructure/llmProviderAdapter/` — `LlmAdapter.service.ts`, `LlmProvider.interface.ts`, провайдеры.
- `server/src/types/AIModels.ts` — `AiModel`, `getProviderFromModel`, модели по умолчанию.

### Клиент

- `face/entities/sentenceChat/` — репозиторий, сервис, стор и UI чата.
- `face/entities/detailsBlock/ui/mediaSpecific/MediaDialogContent/MediaDialogContent.tsx` — подключение на странице
  видео.
