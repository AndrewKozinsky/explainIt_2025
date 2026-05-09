# Карточки для заучивания фраз (Flashcards)

## Что делает функционал
Пользователь во время разбора предложения (в книге или в субтитрах фильма) может добавить любую разобранную фразу в свою коллекцию карточек. Карточка — это **снапшот** данных разбора на момент добавления: предложение, его перевод, сама фраза с оффсетами, перевод фразы, примеры употребления и ссылка на материал-источник. В будущем поверх этой коллекции планируется интервальное повторение.

Имя `Flashcard` выбрано намеренно: это не «словарь языка», а именно карточки конкретного пользователя.

## Принципы хранения

### Снапшот, а не FK на разбор
Карточка **копирует** нужные поля из `SentencePhraseTranslation` и связанных сущностей. Так она переживает удаление главы книги или видео (которое каскадно убивает `Sentence` и `SentencePhraseTranslation`).

Дополнительно на карточке хранится nullable `sentence_phrase_translation_id` (FK с `onDelete: SetNull`). Он нужен только для показа индикатора «добавлено» рядом с разбором фразы — по нему query-репозиторий SPT вычисляет `flashcardId` текущего пользователя. При удалении исходного разбора ссылка обнуляется, сама карточка остаётся.

### Опциональная ссылка на источник
В карточке есть 4 nullable FK — `book_private_id`, `book_public_id`, `video_private_id`, `video_public_id` — все с `onDelete: SetNull`. Пока материал жив, по ним можно навигировать на страницу книги/видео. После удаления материала связь обнуляется, а сама карточка остаётся у пользователя.

### Транскрипция не дублируется
Транскрипция (`ipa` или `pinyin`) лежит в `UniversalTranscription`, привязанной к `UniversalPhrase` по `(language_code, phrase)`. Эти таблицы не каскадятся от книг/видео, поэтому дублировать их в снапшоте не нужно. Query-репозиторий подтягивает транскрипции пакетным запросом при чтении списка.

### Повторное добавление одного разбора запрещено
Уникальный индекс `@@unique([user_id, sentence_phrase_translation_id])` гарантирует, что один и тот же разбор фразы (`SentencePhraseTranslation`) у пользователя может быть добавлен в карточки только один раз. Попытка повторного `flashcard_add` возвращает ошибку `flashcard.alreadyExists`.

При этом одно и то же слово в разных предложениях может иметь разные `SentencePhraseTranslation` (с разными переводами/контекстами) — и такие карточки сосуществуют как отдельные записи. В PostgreSQL несколько `NULL` в уникальном индексе не конфликтуют, поэтому осиротевшие карточки (у которых `sentence_phrase_translation_id = NULL` после удаления источника) тоже не мешают друг другу.

## Доменная модель

### `Flashcard`
Ключевые поля:
- `user_id` — владелец карточки, каскадное удаление с пользователем.
- `language_code` — язык фразы (дублируется для быстрой фильтрации и чтобы не зависеть от живого источника).
- `sentence_text` — снапшот текста предложения.
- `sentence_translation` — снапшот перевода предложения (nullable).
- `sentence_phrase_translation_id` — nullable FK на `SentencePhraseTranslation` (`onDelete: SetNull`). Используется только для индикатора «добавлено» на UI разбора фразы.
- `phrase`, `phrase_translation` — снапшот фразы и её перевода.
- `phrase_start_offset`, `phrase_end_offset` — оффсеты фразы **внутри `sentence_text`** (не внутри всей главы). Нужны для подсветки фразы в предложении на UI.
- `examples` — массив строк в формате `[text1, translate1, text2, translate2, ...]` (как в `SentencePhraseTranslation`).
- `book_private_id` | `book_public_id` | `video_private_id` | `video_public_id` — опциональные FK на источник, `onDelete: SetNull`.
- `created_at`.

Индексы: `[user_id]`, `[user_id, language_code]`.

## Как работает сервер

### GraphQL API
- **Query** `flashcard_get_my(input: { languageCode? })` → `FlashcardOutModel[]`. Возвращает карточки текущего пользователя, опционально фильтрует по языку. Сортировка — по `created_at desc`. В ответе к каждой карточке добавляется поле `phraseTranscription` (подтянутое из `UniversalTranscription`).
- **Mutation** `flashcard_add(input: { sentencePhraseTranslationId })` → `FlashcardOutModel`. Создаёт карточку из существующего разбора фразы. Если у пользователя уже есть карточка для этой SPT — бросает `flashcard.alreadyExists`.
- **Mutation** `flashcard_remove(input: { flashcardId })` → `Boolean`.

Все ручки защищены гардом `CheckSessionCookieGuard`.

### CQRS handlers

#### `AddFlashcardHandler`
Последовательность в `execute`:
1. Загружает `SentencePhraseTranslation` по `id`; если нет — `sourcePhraseNotFound`.
2. Проверяет, что у пользователя ещё нет карточки с таким `sentence_phrase_translation_id`; иначе — `alreadyExists`.
3. Загружает `Sentence` со связями (`bookChapter` + `book`/`book_public`, `videoPrivate`, `videoPublic`).
4. Вызывает приватный `resolveSentenceSource(sentence, userId)`, который:
    - определяет, к какому материалу относится предложение;
    - для приватных (`BookPrivate`, `VideoPrivate`) проверяет владельца (`userIsNotOwner`);
    - выбирает `sourceFullText = processed_content ?? original_content ?? ''` (полный текст главы/субтитров);
    - возвращает `languageCode`, `sourceFullText` и ровно один установленный FK источника;
    - если источник не удалось определить — бросает `sourceLanguageNotFound`.
5. Нарезает `sentenceText = sourceFullText.slice(sentence.start_offset, sentence.start_offset + sentence.length)`.
6. Пересчитывает оффсеты фразы: `phrase_offset_in_sentence = phrase_offset_in_chapter - sentence.start_offset`.
7. Загружает первый доступный перевод предложения (`SentenceTranslationRepository.getFirstSentenceTranslationBySentenceId`).
8. Создаёт `Flashcard` (в том числе сохраняет `sentence_phrase_translation_id`) и возвращает её через `FlashcardQueryRepository.getFlashcardById` (чтобы сразу получить и `phraseTranscription`).

#### `RemoveFlashcardHandler`
- Грузит карточку по `id`, проверяет, что владелец — текущий пользователь (`userIsNotOwner`).
- Удаляет запись.

#### `GetMyFlashcardsHandler`
- Делегирует в `FlashcardQueryRepository.getMyFlashcards({ userId, languageCode? })`.

### Подтягивание транскрипций в query-репозитории
`FlashcardQueryRepository.getMyFlashcards`:
1. Достаёт карточки пользователя.
2. Собирает уникальные пары `(language_code, phrase)`.
3. Делает один `findMany` по `UniversalPhrase` с `include: { UniversalTranscription: true }`.
4. Для каждой карточки подставляет `phraseTranscription = ipa ?? pinyin ?? null` по ключу `${language_code}::${phrase}`.

Это даёт O(N) запросов независимо от числа карточек.

### Ownership-проверки
- При `add`: владелец приватной книги/видео должен совпадать с `userId`; публичные материалы доступны всем.
- При `remove`: `flashcard.user_id === userId`.
- Гард сессии обязателен для всех трёх ручек.

## Как работает клиент

На момент написания документа клиентская часть ещё не реализована. Предполагаемый поток:

### Индикатор «добавлено» у разбора фразы
В ответе `SentencePhraseTranslationOutModel` есть поле `flashcardId: Int?` — оно вычисляется на лету для текущего пользователя: `null`, если пользователь не авторизован или карточки ещё нет. Клиент показывает значок «в карточках», если `flashcardId !== null`, и в этом случае не даёт нажать «В карточки» повторно.

### Добавление карточки
Пользователь выделил слово, увидел разбор фразы (см. `booksAndMoviesTranslation.md`). Рядом с разбором — кнопка «В карточки». По клику:
1. Клиент вызывает `flashcard_add({ sentencePhraseTranslationId })`. Этот id уже есть в локальном кэше разборов.
2. Получает готовую `FlashcardOutModel` (в ней есть `sentencePhraseTranslationId`) и добавляет её в локальный список карточек / обновляет кэш SPT, чтобы у соответствующего разбора `flashcardId` стал равен `id` созданной карточки.

### Просмотр коллекции
На странице «Мои карточки»:
1. Клиент вызывает `flashcard_get_my({ languageCode? })`.
2. Каждую карточку отображает так:
    - предложение с подсветкой фразы по `phraseStartOffset`/`phraseEndOffset`;
    - перевод предложения;
    - фраза и её перевод;
    - транскрипция (`phraseTranscription`);
    - примеры (`examples`);
    - опциональная ссылка на источник, если один из `bookPrivateId` / `bookPublicId` / `videoPrivateId` / `videoPublicId` не `null`.

### Удаление карточки
Кнопка «Удалить» → `flashcard_remove({ flashcardId })` → убрать из локального списка и обнулить `flashcardId` у соответствующей SPT в кэше разборов (если он там есть).

## Ошибки

Ключи из `errorMessage.flashcard`:
- `notFound` — карточка не найдена.
- `sourcePhraseNotFound` — указанный `SentencePhraseTranslation` не существует.
- `sourceSentenceNotFound` — предложение, к которому привязан разбор, не найдено.
- `sourceLanguageNotFound` — у предложения не удалось определить источник/язык.
- `alreadyExists` — у пользователя уже есть карточка для указанной SPT.

А также общие:
- `userIsNotOwner` — попытка добавить карточку из приватного материала другого пользователя или удалить чужую карточку.
- `userUnauthorized` — нет сессии.

## Как расширить под интервальное повторение
Структура не блокирует дальнейшее развитие. Когда дойдёт до SRS, в `Flashcard` можно добавить поля вроде:
- `next_review_at: DateTime?`;
- `interval_days: Int @default(0)`;
- `ease_factor: Float @default(2.5)`;
- `last_reviewed_at: DateTime?`;
- `review_count: Int @default(0)`.

Плюс отдельный handler `ReviewFlashcardCommand` для обновления SRS-состояния после ответа пользователя.

## Ключевые файлы

### Сервер
- `server/src/db/dbConfig/dbConfig.ts` — секция `Flashcard` + обратные связи `oneToMany` в `User`, `BookPrivate`, `BookPublic`, `VideoPrivate`, `VideoPublic`.
- `server/src/routes/flashcard/flashcard.resolver.ts` — GraphQL-ручки.
- `server/src/routes/flashcard/flashcard.module.ts` — регистрация handlers/repositories/resolver.
- `server/src/routes/flashcard/inputs/*.input.ts` — входные типы.
- `server/src/features/flashcard/AddFlashcard.command.ts` — создание карточки и `resolveSentenceSource`.
- `server/src/features/flashcard/RemoveFlashcard.command.ts` — удаление.
- `server/src/features/flashcard/GetMyFlashcards.query.ts` — чтение списка.
- `server/src/repo/flashcard.repository.ts` — write-операции и кодирование/декодирование `examples`.
- `server/src/repo/flashcard.queryRepository.ts` — чтение в `OutModel` + пакетный подтяг транскрипций.
- `server/src/models/flashcard/flashcard.service.model.ts`
- `server/src/models/flashcard/flashcard.out.model.ts`
- `server/src/infrastructure/routeNames.ts` — блок `FLASHCARD`.
- `server/src/infrastructure/exceptions/errorMessage.ts` — блок `flashcard`.
