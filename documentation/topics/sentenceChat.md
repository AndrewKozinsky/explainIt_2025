# Чат с ИИ по выделенному предложению

## Что делает функционал
Пользователь выделяет предложение в книге или субтитрах фильма и открывает рядом с ним чат с ИИ. В этом чате он задаёт свободные вопросы про это предложение (грамматика, лексика, перевод, культурный контекст и т. п.). Ответ ИИ приходит **потоково**, чанк за чанком, и постепенно появляется на экране.

Для каждого пользователя на каждое предложение есть **не более одного треда** (модель `SentenceChatThread` с unique-индексом по `(user_id, sentence_id)`). Вся история диалога сохраняется в БД в `SentenceChatMessage`.

## Доменная модель

### `SentenceChatThread`
- `(user_id, sentence_id)` — уникальная пара.
- Содержит упорядоченный список `SentenceChatMessage`.

### `SentenceChatMessage`
- `role`: `user` | `assistant`.
- `status`: `streaming` | `completed` | `canceled` | `failed`.
- `content`: текст сообщения (для streaming-заготовки ассистента изначально пуст и дописывается в момент финализации).
- `error_message`: заполняется, если `status === 'failed'`.

## Как работает сервер

### API
- **GraphQL Query** `sentence_chat_get_thread(input: { sentenceId })` → `SentenceChatThreadOutModel | null`. Только чтение: возвращает тред с сообщениями или `null`, если его ещё нет.
- **GraphQL Mutation** `sentence_chat_create_thread(input: { sentenceId })` → `SentenceChatThreadOutModel`. Создаёт **новый** пустой тред. Если тред для этой пары `(user, sentence)` уже существует, возвращает ошибку `threadAlreadyExists`.
- **GraphQL Mutation** `sentence_chat_create_user_message(input: { threadId, question })` → `SentenceChatMessageOutModel`. Добавляет сообщение пользователя в существующий тред. Возвращает созданное user-сообщение.
- **REST SSE** `GET /api/sentence-chat/threads/:threadId/assistant-stream?provider=gemini` — запускает генерацию ответа ассистента и стримит чанки клиенту. Query-параметр `provider` выбирает LLM-провайдера: `gemini`, `chatgpt` или `deepseek`. По умолчанию — `gemini`.

### Разделение ответственности
Каждая ручка делает **ровно одно** действие (принцип SRP), логика не размазана по нескольким запросам:
- получение треда — query;
- создание пустого треда — отдельная мутация;
- создание вопроса пользователя — отдельная мутация;
- генерация ответа ИИ — отдельный SSE-endpoint, который сам создаёт streaming-заготовку `assistant`-сообщения и заполняет её по мере генерации.

### CQRS handlers
- `GetSentenceChatThreadHandler` — читает тред через `SentenceChatThreadQueryRepository.getThreadWithMessagesByUserAndSentence`.
- `CreateSentenceChatThreadHandler` — проверяет существование `sentence`, проверяет отсутствие уже существующего треда, создаёт запись, возвращает тред через `SentenceChatThreadQueryRepository.getThreadById`.
- `CreateSentenceChatUserMessageHandler` — проверяет ownership треда и что предыдущий ответ уже завершён (последнее сообщение либо отсутствует, либо это `assistant` со статусом не `streaming`), создаёт user-сообщение, возвращает его через `SentenceChatThreadQueryRepository.getMessageById`.
- `StreamSentenceChatAssistantCommand` — основной Observable-процесс генерации (см. ниже).

### Процесс генерации ответа (SSE)

`StreamSentenceChatAssistantCommand` работает как `Observable<MessageEvent>`:

1. Проверяет, что тред существует и принадлежит пользователю.
2. Проверяет, что у пользователя нет другой активной генерации: и в памяти (`ActiveSentenceChatGenerationRegistry`), и в БД (сообщение со `status='streaming'`).
3. Читает последнее сообщение треда — оно должно быть `role='user'` (иначе `lastMessageIsNotUserQuestion`).
4. Проверяет баланс пользователя. Если `balance <= 0` — создаёт assistant-сообщение со `status='failed'` и `error_message=insufficientBalance`, отдаёт единственное SSE-событие `{ type: 'done', status: 'failed', errorMessage }` и завершает поток. LLM не вызывается, токены не списываются.
5. Собирает контекст предложения через `SentenceChatContextBuilder` (оригинальное предложение + `NEIGHBORS_RADIUS` соседей до и после) и историю диалога (`HISTORY_LIMIT` последних сообщений).
6. **Только после** успешного построения контекста создаёт пустую streaming-заготовку `assistant`-сообщения — чтобы при ранней ошибке в БД не оставалось зависших `streaming`-записей.
7. Регистрирует `AbortController` в `ActiveSentenceChatGenerationRegistry`.
8. Вызывает `LlmAdapterService.stream({ provider, messages, abortSignal, onUsage })`. Сервис сам выбирает нужного провайдера (`GeminiLlmProvider`, `ChatGptLlmProvider` или `DeepSeekLlmProvider`) и делегирует ему стриминг. Для каждого чанка отправляет SSE-событие `{ type: 'chunk', chunk }`.
9. По завершении вызывает `finalize(...)`:
    - обновляет assistant-сообщение (`content`, `status`, `error_message`);
    - списывает токены через `chargeAfterTranslationIfNeeded` (роутинг на `GeminiTokenUsageBalanceChargeCommand`, `OpenAiTokenUsageBalanceChargeCommand` или `DeepSeekTokenUsageBalanceChargeCommand` в зависимости от провайдера);
    - снимает регистрацию в registry;
    - отправляет финальное SSE-событие `{ type: 'done', status, content, errorMessage }`.

#### Отмена
Когда клиент отключается от SSE (разрывает соединение `EventSource.close()` или уходит со страницы), RxJS вызывает `teardown` нашего Observable. Он вызывает `abortController.abort()`, стрим LLM обрывается, `finalize` записывает сообщение со `status='canceled'` и сохраняет уже сгенерированную часть контента.

#### Строгая проверка одной активной генерации
`ActiveSentenceChatGenerationRegistry` хранит `Map<userId, { assistantMessageId, abortController }>`. Лимит — **1 активная генерация на пользователя**. Проверка дублируется в БД, чтобы выдержать рестарт процесса.

### System prompt и контекст
`buildSentenceChatSystemInstruction` формирует system-prompt с самим предложением и соседними, а `buildSentenceChatMessages` собирает массив `LlmMessage[]` (история + новый вопрос) в нейтральном формате. Вызывающий код добавляет system-prompt первым сообщением с `role: 'system'`, а `LlmAdapterService` и его провайдеры конвертируют `LlmMessage[]` в формат конкретного LLM (`Content[]` для Gemini, `ChatCompletionMessageParam[]` для OpenAI/DeepSeek).

### Списание баланса
После завершения генерации (любой статус, если получен `usage`) вызывается `chargeAfterTranslationIfNeeded` из модуля перевода. Она роутит списание на нужную команду в зависимости от провайдера:
- `gemini` → `GeminiTokenUsageBalanceChargeCommand`
- `chatgpt` → `OpenAiTokenUsageBalanceChargeCommand`
- `deepseek` → `DeepSeekTokenUsageBalanceChargeCommand`

Ошибка списания не роняет SSE — она только логируется.

## Архитектура LLM-провайдеров

### Универсальный адаптер (`server/src/infrastructure/llmProviderAdapter/`)
Все вызовы LLM в проекте проходят через единый фасад `LlmAdapterService` с двумя методами:
- `generate({ provider, messages, responseFormat?, ... })` — синхронный ответ
- `stream({ provider, messages, abortSignal?, ... })` — потоковый ответ

Параметр `provider` (`'gemini' | 'chatgpt' | 'deepseek'`) определяет, какой адаптер будет использован. Каждый адаптер реализует интерфейс `LlmProvider` и конвертирует нейтральный формат `LlmMessage[]` в формат своего LLM:

| Адаптер | Формат сообщений | System prompt |
|---|---|---|
| `GeminiLlmProvider` | `Content[]` (@google/genai) | Отдельный параметр `systemInstruction` |
| `ChatGptLlmProvider` | `ChatCompletionMessageParam[]` (OpenAI SDK) | Первое сообщение с `role: 'system'` |
| `DeepSeekLlmProvider` | `ChatCompletionMessageParam[]` (OpenAI SDK) | Первое сообщение с `role: 'system'` |

Модуль `LlmProviderModule` — глобальный, экспортирует только `LlmAdapterService`. Все модули проекта (`SentenceChatModule`, `TranslateRouteModule`, `GrammarConceptModule`, `UniversalTranscriptionModule`) используют его через импорт.

### SSE vs REST
Для стриминга используется `@Sse` из NestJS (на основе `rxjs.Observable`). GET-метод здесь используется по соглашению, хотя и создаёт запись в БД: это стандартный паттерн для LLM-стримов, который позволяет клиенту использовать родной `EventSource`.

## Как работает клиент

### Открытие чата по предложению
Когда пользователь выделяет предложение и открывает чат:
1. Клиент вызывает `sentence_chat_get_thread({ sentenceId })`.
2. Если вернулся тред — рисует все его сообщения. Сохраняет `threadId` в локальный state.
3. Если вернулся `null` — чат пуст, `threadId` ещё нет.

### Отправка первого вопроса
Если `threadId` в state отсутствует (тред ещё не создавался):
1. Клиент вызывает `sentence_chat_create_thread({ sentenceId })` → получает `SentenceChatThreadOutModel` с `id`.
2. Сохраняет `thread.id` в state.
3. Вызывает `sentence_chat_create_user_message({ threadId, question })` → получает созданное user-сообщение и добавляет его в UI.
4. Открывает `new EventSource('/api/sentence-chat/threads/' + threadId + '/assistant-stream?provider=' + llmProvider)`.

### Отправка последующих вопросов
`threadId` уже есть, поэтому клиент сразу:
1. Вызывает `sentence_chat_create_user_message({ threadId, question })`.
2. Открывает SSE-стрим по тому же URL с текущим `llmProvider` из стора.

### Обработка SSE-событий

Клиент заводит в UI «пустое» assistant-сообщение со `status='streaming'` сразу после отправки вопроса (визуальный плейсхолдер — сервер в этот момент тоже его создаёт у себя).

Приходящие события:
- `{ type: 'chunk', chunk }` — конкатенирует `chunk` к `content` текущего assistant-сообщения и обновляет UI.
- `{ type: 'done', status, content, errorMessage }` — фиксирует финальный контент и статус, закрывает `EventSource`.

### Отмена генерации пользователем
Чтобы отменить ответ, клиент просто вызывает `eventSource.close()`. Сервер через `teardown` Observable сам обнаруживает разрыв и записывает сообщение со `status='canceled'`. Отдельной серверной ручки отмены **нет** и не нужно.

### Выбор LLM-провайдера
В интерфейсе чата (под полем ввода) расположен `LlmProviderSwitch` — три кнопки: **Gemini**, **ChatGPT**, **DeepSeek**.

При клике вызывается `useSentenceChatStore.getState().setLlmProvider(provider)`. Текущий провайдер хранится в `sentenceChatStore.llmProvider` и передаётся query-параметром в SSE URL: `?provider=chatgpt`.

Ключевые файлы клиента:
- `face/_pages/media/sentenceChat/sentenceChatStore.ts` — поле `llmProvider` и метод `setLlmProvider`
- `face/_pages/media/sentenceChat/ChatInput/LlmProviderSwitch.tsx` — компонент переключателя
- `face/_pages/media/sentenceChat/SentenceChat/fn/openAssistantStream.ts` — добавляет `?provider=` в SSE URL

### Восстановление после перезагрузки страницы
Если пользователь отправил вопрос и закрыл вкладку до получения ответа:
- При возврате клиент снова делает `sentence_chat_get_thread({ sentenceId })`.
- Если последнее сообщение — `user`, значит ответа ещё нет. Клиент может сразу переподключиться к SSE (с текущим `?provider=`), чтобы сервер сгенерировал ответ (при условии, что активной генерации сейчас нет).
- Если последнее сообщение — `assistant` со статусом `streaming`, это «висяк» после падения процесса. На данный момент клиент может отобразить его как `failed` и позволить пользователю попросить перегенерацию (отправив вопрос повторно).

## Ошибки

Ключи из `errorMessage.sentenceChat`:
- `questionIsEmpty` — пустой текст вопроса.
- `generationAlreadyActive` — у пользователя уже идёт генерация ответа.
- `threadNotFound` — тред не найден (или доступ запрещён).
- `threadAlreadyExists` — попытка создать уже существующий тред через `sentence_chat_create_thread`.
- `lastMessageIsNotUserQuestion` — SSE вызван на тред, где последнее сообщение — не вопрос пользователя.
- `previousAnswerNotReady` — попытка отправить новый вопрос, пока предыдущий ответ ассистента ещё `streaming`.
- `userIsNotOwner` — тред принадлежит другому пользователю.
- `insufficientBalance` — у пользователя недостаточно средств для генерации ответа. Возвращается **не как ошибка ручки**, а как `error_message` на assistant-сообщении со `status='failed'`.

## Ключевые файлы

### Сервер
- `server/src/routes/sentenceChat/sentenceChat.resolver.ts` — GraphQL query и мутации.
- `server/src/routes/sentenceChat/sentenceChat.controller.ts` — REST SSE endpoint (принимает `?provider=` query-параметр).
- `server/src/features/sentenceChat/GetSentenceChatThread.query.ts`
- `server/src/features/sentenceChat/CreateSentenceChatThread.command.ts`
- `server/src/features/sentenceChat/CreateSentenceChatUserMessage.command.ts`
- `server/src/features/sentenceChat/StreamSentenceChatAssistant.command.ts` — использует `LlmAdapterService.stream()` вместо хардкода Gemini.
- `server/src/features/sentenceChat/ActiveSentenceChatGenerationRegistry.service.ts`
- `server/src/features/sentenceChat/SentenceChatContextBuilder.service.ts`
- `server/src/features/sentenceChat/buildSentenceChatPrompt.ts` — возвращает нейтральный `LlmMessage[]` вместо `Content[]`.
- `server/src/repo/sentenceChatThread.repository.ts`
- `server/src/repo/sentenceChatMessage.repository.ts`
- `server/src/repo/sentenceChatThread.queryRepository.ts`
- `server/src/infrastructure/llmProviderAdapter/LlmAdapter.service.ts` — единый фасад для вызова LLM.
- `server/src/infrastructure/llmProviderAdapter/LlmProvider.interface.ts` — типы `LlmMessage`, `LlmProvider`, `LlmGenerateInput`, `LlmStreamInput`.
- `server/src/infrastructure/llmProviderAdapter/GeminiLlmProvider.service.ts` — адаптер для Gemini.
- `server/src/infrastructure/llmProviderAdapter/ChatGptLlmProvider.service.ts` — адаптер для ChatGPT.
- `server/src/infrastructure/llmProviderAdapter/DeepSeekLlmProvider.service.ts` — адаптер для DeepSeek.

### Клиент
- `face/_pages/media/sentenceChat/sentenceChatStore.ts` — Zustand-стор с `llmProvider`.
- `face/_pages/media/sentenceChat/types/sseTypes.ts` — типы SSE-событий и `ChatUiMessage`.
- `face/_pages/media/sentenceChat/SentenceChat/SentenceChat.tsx`
- `face/_pages/media/sentenceChat/SentenceChat/fn/useSentenceChat.ts` — хук-оркестратор.
- `face/_pages/media/sentenceChat/SentenceChat/fn/useLoadChatThread.ts` — загрузка треда.
- `face/_pages/media/sentenceChat/SentenceChat/fn/openAssistantStream.ts` — создание SSE-соединения с `?provider=`.
- `face/_pages/media/sentenceChat/ChatInput/ChatInput.tsx`
- `face/_pages/media/sentenceChat/ChatInput/LlmProviderSwitch.tsx` — переключатель провайдера.
- `face/_pages/media/sentenceChat/Message/Message.tsx`
- `face/_pages/media/sentenceChat/MessageList/MessageList.tsx`
