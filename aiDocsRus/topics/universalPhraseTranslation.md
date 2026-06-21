# Перевод фраз из UniversalPhrase через LLM

## Что делает функционал

Позволяет получить перевод и разбор фразы на заданный язык с помощью LLM. Фраза может быть словом, выражением или целым предложением на любом поддерживаемом языке.

Поддерживает два режима входа:
- **По `universalPhraseId`** — если фраза уже существует в `UniversalPhrase`
- **По `phraseText` + `sourceLanguageCode`** — сервер сам найдёт или создаст `UniversalPhrase`

Если LLM определяет, что такого слова не существует в языке — возвращается флаг `nonExistentWord: true`.

Результат перевода — структурированный JSON с:
- **coreIdea** — главная идея и назначение слова/фразы
- **usageGroups** — сценарии употребления с примерами
- **similarWords** — похожие слова (если помогают понять оттенок)
- **commonMistakes** — типичные ошибки (если есть)
- **patterns** — типовые конструкции с этим словом (если нужно)

## Как работает сервер

### GraphQL API

```graphql
mutation {
  universal_phrase_translation_get_or_create(input: {
    universalPhraseId: 1       # опционально — если фраза уже есть
    phraseText: "life"         # опционально — текст фразы для авто-создания
    sourceLanguageCode: "en"   # опционально — язык фразы для авто-создания
    targetLanguageCode: "ru"
    provider: "gemini"
  }) {
    id
    universalPhraseId
    targetLanguageCode
    translation {
      coreIdea
      usageGroups {
        title
        explain
        examples {
          sentence
          translate
        }
      }
      similarWords
      commonMistakes
      patterns {
        phrase
        translate
      }
    }
    status
    errorMessage
    nonExistentWord
    createdAt
  }
}
```

Параметры:
- `universalPhraseId` — ID фразы в `UniversalPhrase` (опциональный, если переданы `phraseText` + `sourceLanguageCode`)
- `phraseText` — текст фразы для автоматического поиска/создания `UniversalPhrase` (опциональный)
- `sourceLanguageCode` — язык исходной фразы (опциональный, нужен вместе с `phraseText`)
- `targetLanguageCode` — язык, на который нужно перевести (из enum `LanguageCode`: `ru`, `en`, `es`, `fr`, `de`, `it`, `tr`)
- `provider` — LLM-провайдер: `deepseek`, `chatgpt` или `gemini`

### Схема обработки (CQRS)

`UniversalPhraseTranslationResolver` вызывает `GetOrCreateUniversalPhraseTranslationCommand`:

1. **Определение universalPhraseId**:
   - Если передан `universalPhraseId` → получение фразы через `findByIdWithRelations`. Если не найдена → `UNIVERSAL_PHRASE_NOT_FOUND`.
   - Если переданы `phraseText` + `sourceLanguageCode` → поиск через `findBySentenceTextAndLang` (с нормализацией текста). Если не найдена → создание через `CommandBus.execute(new GetOrCreateUniversalPhraseCommand(...))`.
   - Если ни то, ни другое → `UNIVERSAL_PHRASE_NOT_FOUND`.
2. **Поиск существующего перевода** — по `(universalPhraseId, targetLanguageCode)`. Если найден со статусом `ready` — сразу возвращает.
3. **Создание pending-записи** — в `UniversalPhraseTranslation`.
4. **Запрос к LLM** — через `LlmAdapterService.generate()`:
   - Промпт строится функцией `buildUniversalPhraseTranslationPrompt` — адаптируется под языковую пару (source → target)
   - Промпт инструктирует LLM быть учителем языка, объяснять значение ясно и доступно
   - **Запрещено**: транскрипция, произношение, фонетическая нотация (IPA, пиньинь и т.д.)
   - **Несуществующие слова**: если слово не существует в языке → вернуть `{"nonExistentWord": true}`
   - Ответ ожидается строго в JSON (без markdown-обёрток)
5. **Парсинг ответа** — `parseUniversalPhraseTranslationResult` возвращает discriminated union:
   - `{ type: 'translation', data }` — успешный перевод
   - `{ type: 'nonExistentWord' }` — слово не существует
   - `{ type: 'invalid' }` — не удалось разобрать ответ
6. **Сохранение**:
   - Перевод → `updateToReady` с сохранением JSON и `non_existent_word: false`
   - Несуществующее слово → `updateToNonExistentWord` со статусом `ready` и `non_existent_word: true`
   - Ошибка → `updateToError` с текстом ошибки

Плата с пользователя **не взимается**. Перевод синхронный.

### Нормализация текста

Текст фразы нормализуется функцией `normalizeSentence` (в `server/src/utils/stringUtils.ts`):
- Обрезка пробелов по краям
- Замена повторяющихся пробелов на один
- Унификация кавычек (`'` → `'`, `"«»` → `"`)

Нормализация применяется при создании фразы, при поиске в репозитории (`findBySentenceTextAndLang`) и в query-репозитории (`getUniversalPhraseByTextAndLang`). Это гарантирует, что запрос `"catch her breath"` найдёт фразу, созданную как `"catch her breath"`.

### Ответ возвращается через QueryRepository

После выполнения команды результат перечитывается через `UniversalPhraseTranslationQueryRepository.getById()`, который маппит `UniversalPhraseTranslation` → `UniversalPhraseTranslationOutModel` (JSON-строка парсится обратно в объект).

## База данных

### Таблица UniversalPhraseTranslation

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | `Int` | Первичный ключ |
| `universal_phrase_id` | `Int` | Связь с `UniversalPhrase` (Cascade) |
| `target_language_code` | `LanguageCode` | Язык перевода |
| `translation` | `String?` | JSON с результатом перевода |
| `status` | `UniversalPhraseTranslationStatus` | `pending` / `ready` / `error` |
| `error_message` | `String?` | Текст ошибки при статусе `error` |
| `non_existent_word` | `Boolean` | Флаг: LLM определила, что такого слова не существует (default `false`) |
| `created_at` | `DateTime` | Дата создания |

Уникальный constraint: `@@unique([universal_phrase_id, target_language_code])` — для одной фразы на каждом языке только один перевод.

### Enum UniversalPhraseTranslationStatus
```
pending | ready | error
```

## Структура ответа (JSON в поле translation)

```ts
type UniversalPhraseTranslationData = {
    coreIdea: string
    usageGroups: {
        title: string
        explain: string
        examples: {
            sentence: string
            translate: string
        }[]
    }[]
    similarWords: null | string
    commonMistakes: null | string
    patterns: null | {
        phrase: string
        translate: string
    }[]
}
```

При `nonExistentWord: true` поле `translation` будет `null`.

## Клиентская часть

### Компонент PhraseDictionary

Расположение: `face/_pages/media/dictionary/PhraseDictionary/`

```
PhraseDictionary/
├── PhraseDictionary.tsx          # корневой компонент
├── PhraseDictionary.scss         # стили раскладки
├── PhraseInput.tsx               # поле ввода фразы
├── PhraseInput.scss              # стили поля ввода
├── PhraseTranslationResult.tsx   # компонент отображения перевода
├── PhraseTranslationResult.scss  # стили результата
├── phraseDictionaryStore.ts      # Zustand-стор с кэшем
└── fn/
    └── usePhraseTranslation.ts   # логика: resolvePhrase → кэш → API → AbortController
```

**Логика работы:**
1. Пользователь вводит фразу и нажимает Enter
2. Либо кликает по слову в режиме чтения — `currentWordId` из `useDetailsStore` → извлечение текста → авто-запрос
3. Сначала вызывается `resolvePhrase` (общий кэш с транскрипцией/озвучкой) — получает `universalPhraseId`
4. Затем мутация `universal_phrase_translation_get_or_create` с `universalPhraseId`
5. Результат:
   - `translation` → `PhraseTranslationResult` (coreIdea/similarWords/commonMistakes через StyledMarkdown)
   - `nonExistentWord` → сообщение "Такого слова не существует"
   - `error` → `ErrorMessage`

**Защита от гонки:** `resolvePhrase` находится в общем модуле `face/stores/phraseStore/resolvePhrase.ts` с модульным кэшем промисов. `PhraseDictionary`, `TranscriptionAndAudio` и `useAudioPlayback` используют один и тот же кэш — дублирующие запросы на создание фразы исключены.

## Ключевые файлы

### Команда и бизнес-логика
- `server/src/features/universalPhraseTranslation/GetOrCreateUniversalPhraseTranslation.command.ts` — CQRS-команда get-or-create (с авто-созданием UniversalPhrase и обработкой nonExistentWord)
- `server/src/features/universalPhraseTranslation/buildUniversalPhraseTranslationPrompt.ts` — построение промпта (без транскрипции, с поддержкой nonExistentWord)
- `server/src/features/universalPhraseTranslation/parseUniversalPhraseTranslationResult.ts` — парсинг и валидация JSON-ответа (discriminated union: translation | nonExistentWord | invalid)

### Маршрут
- `server/src/routes/universalPhraseTranslation/universalPhraseTranslation.resolver.ts` — GraphQL-резолвер
- `server/src/routes/universalPhraseTranslation/universalPhraseTranslation.module.ts` — NestJS-модуль
- `server/src/routes/universalPhraseTranslation/inputs/getOrCreateUniversalPhraseTranslation.input.ts` — входной DTO (universalPhraseId опциональный, phraseText/sourceLanguageCode опциональные)
- `server/src/routes/universalPhraseTranslation/resolverDescriptions.ts` — описания резолверов

### Репозитории
- `server/src/repo/universalPhraseTranslation.repository.ts` — бизнес-операции (createPending, updateToReady, updateToNonExistentWord, updateToError, findByPhraseIdAndTargetLang)
- `server/src/repo/universalPhraseTranslation.queryRepository.ts` — запросы для клиента (getById с маппингом в OutModel)
- `server/src/repo/universalPhrase.repository.ts` — операции с UniversalPhrase (createUniversalPhrase, findOrCreate, findBySentenceTextAndLang с нормализацией)
- `server/src/repo/universalPhrase.queryRepository.ts` — запросы UniversalPhrase (getUniversalPhraseByTextAndLang с нормализацией)

### Модели
- `server/src/models/universalPhraseTranslation/universalPhraseTranslation.service.model.ts` — сервисная модель, тип `UniversalPhraseTranslationData` и `nonExistentWord: boolean`
- `server/src/models/universalPhraseTranslation/universalPhraseTranslation.out.model.ts` — GraphQL OutModel с `nonExistentWord: Boolean`

### Клиент
- `face/_pages/media/dictionary/PhraseDictionary/PhraseDictionary.tsx` — корневой компонент
- `face/_pages/media/dictionary/PhraseDictionary/fn/usePhraseTranslation.ts` — хук с логикой запроса
- `face/_pages/media/dictionary/PhraseDictionary/phraseDictionaryStore.ts` — Zustand-стор с кэшем
- `face/stores/phraseStore/resolvePhrase.ts` — общий модуль get-or-create фразы с кэшем
- `face/graphql/universalPhraseTranslation/universalPhraseTranslationGetOrCreate.graphql` — GraphQL-мутация

### Инфраструктура
- `server/src/infrastructure/llmProviderAdapter/LlmAdapter.service.ts` — фасад для вызова LLM-провайдеров
- `server/src/infrastructure/routeNames.ts` — `UNIVERSAL_PHRASE_TRANSLATION.GET_OR_CREATE`
- `server/src/infrastructure/exceptions/errorMessage.ts` — ошибки `universalPhraseTranslation.*`

### Клиентские сообщения об ошибках
- `face/utils/errorMessages.ts` — русские тексты для кодов ошибок

### Схема БД
- `server/src/db/dbConfig/dbConfig.ts` — конфигурация таблицы `UniversalPhraseTranslation`
- `server/src/utils/stringUtils.ts` — `normalizeSentence` для унификации текста фраз
