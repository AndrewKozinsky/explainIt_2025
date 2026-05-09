# Перевод предложений из книг и фильмов

## Что делает функционал
Пользователь выделяет слово в предложении книги или субтитров и получает:
- перевод всего предложения;
- перевод фразы, в которую входит выделение;
- короткие примеры для этой фразы.

Цель — учить лексику в контексте конкретного предложения и материала.

## Как работает сервер

### GraphQL API
Клиент использует queries и mutations:
- `translate_get_sentence_translation` — получить сохранённый перевод предложения по `sentenceId`;
- `translate_get_phrase_translations_by_sentence` — получить все готовые фразовые переводы предложения (для прогрева кеша);
- `translate_get_phrase_translation` — получить фразовый перевод по `sentenceId` и диапазону выделения слова;
- `translate_translate_sentence` — сгенерировать перевод предложения;
- `translate_translate_phrase` — сгенерировать фразовый перевод.

### Общая схема обработки
`translate.resolver.ts` передаёт запросы в CQRS handlers:
- `TranslateSentenceHandler`;
- `TranslatePhraseHandler`.

Для фразы сервер:
1. Проверяет корректность offset-диапазона выделенного слова.
2. Создаёт `pending` запись в `SentencePhraseTranslation`.
3. Запрашивает генерацию у LLM.
4. Парсит ответ, резолвит итоговую фразу как подстроку исходного предложения (LLM может вернуть фразу, покрывающую несколько слов вокруг выделенного).
5. Обновляет запись в `ready` или `error`.

Важно: путь `translate_translate_phrase` ориентирован на генерацию. Для переиспользования уже сохранённых переводов клиент ходит в `translate_get_phrase_translation` / `translate_get_phrase_translations_by_sentence`.

### Формат ответа фразового перевода
LLM получает инструкцию вернуть plain text по строкам:
1. фраза на исходном языке;
2. перевод фразы;
3+. пары строк примеров: `пример` / `перевод примера`.

Парсер `parsePhraseTranslationResult`:
- берёт 1-ю и 2-ю строки как `phrase` и `translate`;
- оставшиеся строки читает парами и собирает `examples`;
- отбрасывает неполные пары.

### Хранение примеров в БД
В `sentencePhraseTranslation.repository.ts` примеры хранятся как плоский массив строк:
- формат в БД: `[text1, translate1, text2, translate2, ...]`;
- при чтении массив декодируется обратно в `[{ text, translate }]`.

### Доступ и ограничения
- Доступ к чтению/созданию перевода проверяется через `SentenceTranslationAccessService`.
- Для некоторых режимов действует дневной лимит (учёт в Redis).
- При успешной генерации списываются токены/баланс согласно режиму доступа.

## Как работает клиент

Основная логика лежит в `face/_pages/media/detailsBlock/` и разнесена по нескольким модулям:

- `detailsStore.ts` — единый zustand-стор со всеми данными, нужными панели деталей.
- `DetailsBlock/fn/initStore.ts` — подкладывает в стор метаданные текущего материала (`bookName`/`bookAuthor` или `videoName`/`videoYear`, а также `languageCode`).
- `DetailsBlock/fn/populateStore.ts` — связывает выделение пользователя (`readingStore.selection` / `watchingStore.selection`) со значениями `currentSentenceId`, `currentSentenceText`, `currentWordId` в `detailsStore`.
- `DetailsBlock/fn/fetchSentenceTranslation.ts` — реактивно на смену `currentSentenceId` создаёт запись предложения в сторе и подгружает перевод + кеш фраз.
- `DetailsBlock/fn/fetchPhraseTranslation.ts` — реактивно на смену `currentWordId` выбирает покрывающую фразу либо запрашивает перевод новой.
- `DetailsBlock/fn/wordSegmentation.ts` — утилиты `Intl.Segmenter` для конвертации `offsets ↔ wordIds`. Единственное место, где живёт сегментер; используется только на границе с сервером.

### Модель данных в `detailsStore`

Фразы в сторе описываются через **индексы слов**, а не offsets:

```ts
PhraseTranslationStatus = {
    id: string                 // стабильный клиентский id фразы
    wordIds: number[]          // индексы слов из Intl.Segmenter (1-based)
    phrase: null | string
    translation: null | string
    examples: PhraseExample[]
    loading: boolean
    error: null | string
}
```

Каждое предложение хранится как запись:

```ts
DetailsSentenceEntry = {
    sentenceId: number
    selectedPhraseId: string | null   // какая фраза сейчас подсвечена в этом предложении
    data: {
        sentence: SentenceTranslationStatus
        phrases: PhraseTranslationStatus[]
    }
}
```

У каждого предложения своя `selectedPhraseId`, поэтому переключение между предложениями не теряет выбор фразы.

### Смена предложения

Когда меняется `currentSentenceId`, `useFetchCurrentSentenceTranslation`:
1. вставляет в стор запись предложения с `sentence.loading = true`;
2. параллельно вызывает `translate_get_phrase_translations_by_sentence` и прогревает `phrases[]` (offsets с сервера переводятся в `wordIds` через `wordIdsFromOffsets`);
3. получает перевод предложения через `translate_get_sentence_translation`, а если его нет — генерирует через `translate_translate_sentence`.

### Смена слова внутри предложения

`useFetchCurrentPhraseTranslation` реактивен на `currentWordId`:
1. Ищет в `entry.data.phrases` фразу, покрывающую текущее слово: `phrase.wordIds.includes(currentWordId)`. Если нашлась — просто ставит `selectedPhraseId = phrase.id` и выходит (нет походов на сервер).
2. Если не нашлась — создаёт локальный плейсхолдер со `wordIds: [currentWordId]` и `loading: true`, ставит его как `selectedPhraseId`.
3. Конвертирует `wordId → offsets` через `offsetsFromWordIds` и вызывает `translate_get_phrase_translation`; если перевода нет — `translate_translate_phrase`.
4. По результату вызывает `finalizePhraseTranslation`, которое либо превращает плейсхолдер в полноценную фразу, либо сливает его с уже существующей фразой на тех же `wordIds` (корректируя `selectedPhraseId`).

### Почему wordIds, а не offsets на клиенте

- Матчинг «слово → фраза» становится тривиальным `includes`.
- Совпадает с моделью выделения: `readingStore.selection.wordId` и `watchingStore.selection.wordId` уже индексные.
- `Intl.Segmenter` инкапсулирован в одном модуле и вызывается только при сериализации в сервер и десериализации из него. Локаль для сегментера — `languageCode` материала из `detailsStore`, чтобы конвертация туда-обратно была консистентной.

### UI-компоненты
- `SentencePhraseAnalysis` — рисует одну фразу (`phraseAnalysis: PhraseTranslationStatus`).
- `SentencePhraseAnalyses` (reading) — список всех фраз предложения, отсортированных по `wordIds[0]` (порядок в предложении).
- `WatchingDetailsBlock` (watching) — показывает только текущую выбранную фразу (`entry.selectedPhraseId`).