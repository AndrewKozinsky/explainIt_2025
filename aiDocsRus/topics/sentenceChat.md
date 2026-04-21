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
- **REST SSE** `GET /api/sentence-chat/threads/:threadId/assistant-stream` — запускает генерацию ответа ассистента и стримит чанки клиенту.

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
4. Собирает контекст предложения через `SentenceChatContextBuilder` (оригинальное предложение + `NEIGHBORS_RADIUS` соседей до и после) и историю диалога (`HISTORY_LIMIT` последних сообщений).
5. **Только после** успешного построения контекста создаёт пустую streaming-заготовку `assistant`-сообщения — чтобы при ранней ошибке в БД не оставалось зависших `streaming`-записей.
6. Регистрирует `AbortController` в `ActiveSentenceChatGenerationRegistry`.
7. Вызывает `GoogleGeminiService.generateTextStreamChunks({ contents, systemInstruction, abortSignal, onUsage })`. Для каждого чанка отправляет SSE-событие `{ type: 'chunk', chunk }`.
8. По завершении вызывает `finalize(...)`:
    - обновляет assistant-сообщение (`content`, `status`, `error_message`);
    - списывает токены через `GeminiTokenUsageBalanceChargeCommand`;
    - снимает регистрацию в registry;
    - отправляет финальное SSE-событие `{ type: 'done', status, content, errorMessage }`.

#### Отмена
Когда клиент отключается от SSE (разрывает соединение `EventSource.close()` или уходит со страницы), RxJS вызывает `teardown` нашего Observable. Он вызывает `abortController.abort()`, стрим Gemini обрывается, `finalize` записывает сообщение со `status='canceled'` и сохраняет уже сгенерированную часть контента.

#### Строгая проверка одной активной генерации
`ActiveSentenceChatGenerationRegistry` хранит `Map<userId, { assistantMessageId, abortController }>`. Лимит — **1 активная генерация на пользователя**. Проверка дублируется в БД, чтобы выдержать рестарт процесса.

### System prompt и контекст
`buildSentenceChatSystemInstruction` формирует system-prompt с самим предложением и соседними, а `buildSentenceChatContents` собирает массив `Content`-ов (история + новый вопрос) в формате Gemini.

### Списание баланса
После завершения генерации (любой статус, если получен `usage`) вызывается `GeminiTokenUsageBalanceChargeCommand` — списывает стоимость входных и выходных токенов в копейках с баланса пользователя. Ошибка списания не роняет SSE — она только логируется.

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
4. Открывает `new EventSource('/api/sentence-chat/threads/' + threadId + '/assistant-stream')`.

### Отправка последующих вопросов
`threadId` уже есть, поэтому клиент сразу:
1. Вызывает `sentence_chat_create_user_message({ threadId, question })`.
2. Открывает SSE-стрим по тому же `/api/sentence-chat/threads/:threadId/assistant-stream`.

### Обработка SSE-событий

Клиент заводит в UI «пустое» assistant-сообщение со `status='streaming'` сразу после отправки вопроса (визуальный плейсхолдер — сервер в этот момент тоже его создаёт у себя).

Приходящие события:
- `{ type: 'chunk', chunk }` — конкатенирует `chunk` к `content` текущего assistant-сообщения и обновляет UI.
- `{ type: 'done', status, content, errorMessage }` — фиксирует финальный контент и статус, закрывает `EventSource`.

### Отмена генерации пользователем
Чтобы отменить ответ, клиент просто вызывает `eventSource.close()`. Сервер через `teardown` Observable сам обнаруживает разрыв и записывает сообщение со `status='canceled'`. Отдельной серверной ручки отмены **нет** и не нужно.

### Восстановление после перезагрузки страницы
Если пользователь отправил вопрос и закрыл вкладку до получения ответа:
- При возврате клиент снова делает `sentence_chat_get_thread({ sentenceId })`.
- Если последнее сообщение — `user`, значит ответа ещё нет. Клиент может сразу переподключиться к `/api/sentence-chat/threads/:threadId/assistant-stream`, чтобы сервер сгенерировал ответ (при условии, что активной генерации сейчас нет).
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

## Ключевые файлы

### Сервер
- `server/src/routes/sentenceChat/sentenceChat.resolver.ts` — GraphQL query и мутации.
- `server/src/routes/sentenceChat/sentenceChat.controller.ts` — REST SSE endpoint.
- `server/src/features/sentenceChat/GetSentenceChatThread.query.ts`
- `server/src/features/sentenceChat/CreateSentenceChatThread.command.ts`
- `server/src/features/sentenceChat/CreateSentenceChatUserMessage.command.ts`
- `server/src/features/sentenceChat/StreamSentenceChatAssistant.command.ts`
- `server/src/features/sentenceChat/ActiveSentenceChatGenerationRegistry.service.ts`
- `server/src/features/sentenceChat/SentenceChatContextBuilder.service.ts`
- `server/src/features/sentenceChat/buildSentenceChatPrompt.ts`
- `server/src/repo/sentenceChatThread.repository.ts` — write-операции треда.
- `server/src/repo/sentenceChatMessage.repository.ts` — write-операции сообщений, утилиты (`getLastMessageInThread`, `hasActiveStreamingMessageForUser`).
- `server/src/repo/sentenceChatThread.queryRepository.ts` — чтение в формате out-модели.
- `server/src/infrastructure/googleGemini/googleGemini.service.ts` — `generateTextStreamChunks`.
