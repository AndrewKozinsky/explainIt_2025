# Перевод предложений из книг и фильмов

## Что делает функционал
Пользователь выделяет слово в предложении книги или субтитров и получает:
- перевод всего предложения;
- перевод фразы, в которую входит выделение;
- короткие примеры для этой фразы.

Цель — учить лексику в контексте конкретного предложения и материала.

## Как работает сервер

### REST API
Контроллер `server/src/routes/translate/translate.controller.ts`, префикс `/translate`. Все маршруты — `POST`
с телом-DTO из `routes/translate/inputs/`, ответ `200`, guard `OptionalSessionUserGuard` (анонимный доступ
разрешён, права решает `SentenceTranslationAccessService`). OpenAPI-описания — в `routes/translate/openAPI.decorators.ts`.

| Маршрут | Назначение |
|---|---|
| `POST /translate/get-sentence-translation` | сохранённый перевод предложения по `sentenceId` и `targetLanguageCode`; `null`, если его нет |
| `POST /translate/get-phrase-translations-by-sentence` | все готовые фразовые переводы предложения (для прогрева кеша) |
| `POST /translate/get-phrase-translation` | сохранённый фразовый перевод, покрывающий диапазон выделенного слова; `null`, если его нет |
| `POST /translate/translate-sentence` | перевод предложения: вернуть сохранённый или сгенерировать |
| `POST /translate/translate-phrase` | сгенерировать фразовый перевод |

Клиентские функции генерируются Orval в `face/shared/api/generated/translate/translate.ts`
(`translateControllerTranslateSentence`, `translateControllerGetPhraseTranslation` и т.д.).

### Общая схема обработки
Маршруты чтения обращаются к репозиториям напрямую из контроллера. Маршруты генерации передают работу в CQRS:
- `translate-sentence` → `TranslateSentenceCommand` / `TranslateSentenceHandler`;
- `translate-phrase` → `TranslatePhraseCommand` / `TranslatePhraseHandler`.

`TranslateSentenceHandler` сначала ищет сохранённый перевод и возвращает его без обращения к LLM; иначе создаёт
черновую запись, генерирует перевод и сохраняет результат.

Для фразы сервер:
1. Проверяет корректность offset-диапазона выделенного слова.
2. Создаёт `pending` запись в `SentencePhraseTranslation`.
3. Запрашивает генерацию у LLM.
4. Парсит ответ, резолвит итоговую фразу как подстроку исходного предложения (LLM может вернуть фразу, покрывающую несколько слов вокруг выделенного).
5. Обновляет запись в `ready` или `error`.

Важно: `translate-phrase` всегда генерирует. Для переиспользования сохранённых переводов клиент сначала ходит в `get-phrase-translation` / `get-phrase-translations-by-sentence`.

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
- В режиме `chargeBalance` (личная книга или видео владельца) перед генерацией проверяется баланс, после неё
  списываются токены ([billing.md](../topics/billing.md)). Публичные материалы переводятся бесплатно.

## Как работает клиент

### Слои
- `face/entities/translate/repository/TranslateApi.ts` — реализация `TranslateRepository` поверх сгенерированных Orval-функций; маппит ответы в клиентские модели.
- `face/entities/translate/TranslateService.ts` — сервис `translateService` с методами `translateSentence`, `getPhraseTranslationsBySentence`, `getPhraseTranslation`, `translatePhrase`.
- `face/entities/media/store/createBaseMediaStore.ts` — zustand-стор переводов текущего материала. Каждая страница создаёт свой экземпляр (`ChapterRoot/fn/setupDeps.ts`, `VideoPage/fn/setupDeps.ts`) и раздаёт его через `MediaStoreContext`.
- `face/entities/media/model/` — загрузка переводов:
  - `useMediaTranslations.ts` — точка входа для `ChapterPage` и `VideoPage`: кладёт в стор предложения и `languageCode`, подключает загрузку предложения и фразы, обрабатывает очереди повторов, очищает стор при уходе со страницы;
  - `useFetchSentence.ts` / `fetchSentence.ts` — перевод предложения;
  - `useFetchPhrase.ts` / `fetchPhrase.ts` — перевод фразы;
  - `prepareData.ts` — `mapPhrase` и утилиты `Intl.Segmenter` (`segmentSentence`, `offsetsFromWordIds`, `wordIdsFromOffsets`). Единственное место, где живёт сегментер; используется только на границе с сервером.

Клиент не вызывает `get-sentence-translation`: сохранённый перевод приходит вместе с предложениями материала (`SentenceModel.sentenceTranslation`), а `translate-sentence` сам возвращает сохранённый перевод, если он есть.

### Модель данных в сторе

Типы — в `face/entities/media/store/translationTypes.ts`. Фразы описываются через **индексы слов**, а не offsets:

```ts
SentencePhraseType = {
    randomGeneratedPhraseId: string  // стабильный клиентский id фразы
    sentencePhraseId: null | number  // id записи на сервере
    wordIds: number[]                // индексы слов из Intl.Segmenter (1-based)
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
    sentenceText: string
    selectedPhraseId: string | null   // какая фраза сейчас подсвечена в этом предложении
    data: {
        translation: SentenceTranslation
        phrases: SentencePhraseType[]
    }
}
```

`setTranslationContext` создаёт записи для всех предложений материала сразу, подставляя уже сохранённый перевод.
У каждого предложения своя `selectedPhraseId`, поэтому переключение между предложениями не теряет выбор фразы.
Выделение пользователя хранится в том же сторе: `selectWord` пишет `selectedSentenceId` и `selectedWordId`.

### Смена предложения

Когда меняется `selectedSentenceId`, `useFetchSentenceTranslation`:
1. делает перевод предложения видимым (`visible: true`);
2. если перевод уже есть или загружается — выходит;
3. иначе `fetchSentence` вызывает `translateSentence` (`translate-sentence`), затем `getPhraseTranslationsBySentence` и прогревает `phrases[]` (offsets с сервера переводятся в `wordIds` через `mapPhrase`).

### Смена слова внутри предложения

`useFetchPhraseTranslation` реактивен на `selectedWordId`:
1. Ищет в `entry.data.phrases` фразу, покрывающую текущее слово: `phrase.wordIds.includes(selectedWordId)`. Если нашлась — ставит `selectedPhraseId` и выходит (нет походов на сервер).
2. Если не нашлась — создаёт локальный плейсхолдер со `wordIds: [selectedWordId]` и `loading: true`, ставит его как `selectedPhraseId`.
3. `fetchPhrase` конвертирует `wordId → offsets` через `offsetsFromWordIds`, вызывает `getPhraseTranslation`; если перевода нет — `translatePhrase`.
4. По результату вызывает `finalizePhraseTranslation`, которое заменяет плейсхолдер полноценной фразой с тем же `randomGeneratedPhraseId`. При ошибке плейсхолдер получает `error`.

Язык перевода — текущая локаль интерфейса (`useLocale()`).

### Повтор при ошибке

`retrySentenceTranslation` и `retryPhraseTranslation` кладут элемент в `retryFetchSentenceTranslationQueue` / `retryFetchPhraseQueue`; `useMediaTranslations` разбирает очереди и повторяет `fetchSentence` / `fetchPhrase`.

### Почему wordIds, а не offsets на клиенте

- Матчинг «слово → фраза» становится тривиальным `includes`.
- Совпадает с моделью выделения: `selectedWordId` уже индексный.
- `Intl.Segmenter` инкапсулирован в одном модуле и вызывается только при сериализации в сервер и десериализации из него. Локаль для сегментера — `languageCode` материала из стора, чтобы конвертация туда-обратно была консистентной.

### Слова предложения

Предложение главы и часть предложения в субтитре рисует `Sentence` (`face/entities/sentencesAndSubtitles/ui/Sentence/`)
поверх общего кликабельного текста `ClickableText` (`documentation/topics/clickableText.md`). Связь со стором —
в `fn/useSentenceWordSelection.ts`:

- номер слова в сторе (`wordId`, с 1 во всём предложении) = `wordIdOffset` + порядок слова в тексте. В субтитрах
  предложение бывает разбито на части, `wordIdOffset` — сколько слов предложения стоит до этой части;
- клик вызывает `selectWord({ sentenceId, wordId })`;
- рамка при наведении — фраза из `entry.data.phrases`, покрывающая слово (то же правило, что в
  `useFetchPhraseTranslation`), или одно слово, если такой фразы ещё нет;
- заливка — слова выбранной фразы предложения (`selectedPhraseId`), а пока она не покрывает нажатое слово
  (перевод ещё грузится) — только нажатое слово. Слова фразы из соседних частей субтитра в этой части не рисуются.

### UI-компоненты фраз
Лежат в `face/entities/sentencesAndSubtitles/ui/phrase/`:
- `SentencePhrase` — рисует одну фразу (`phraseAnalysis: SentencePhraseType`).
- `SentencePhraseAnalyses` — список всех фраз выбранного предложения, отсортированных по `wordIds[0]` (порядок в предложении). Подключается через `MediaPhrasesContent` (`face/entities/detailsBlock/ui/mediaSpecific/`) и на странице главы, и на странице видео.
