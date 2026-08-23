# Перевод фраз из UniversalPhrase через LLM

## Что делает функционал

Позволяет получить перевод и разбор фразы на заданный язык с помощью LLM. Фраза может быть словом, выражением или целым
предложением на любом поддерживаемом языке.

Поддерживает два режима входа:

- **По `universalPhraseId`** — если фраза уже существует в `UniversalPhrase`
- **По `phraseText` + `sourceLanguageCode`** — сервер сам найдёт или создаст `UniversalPhrase`

Если LLM определяет, что такого слова не существует в языке — возвращается флаг `nonExistentWord: true`.

Результат перевода — массив типизированных блоков (`TranslationBlock[]`). LLM сама решает, какие блоки использовать для
конкретного слова. Клиент рендерит каждый блок через соответствующий компонент.

Доступные типы блоков:

- **block** — секция с заголовком и вложенными блоками
- **paper** — визуальная обёртка-карточка
- **example** — пример предложения с переводом
- **phrasesButtons** — кнопки фраз/конструкций (только текст, клиент отправляет по клику)
- **text** — Markdown-текст

## Как работает сервер

### REST API

```
POST /universal-phrase-translation
```

Тело запроса:

```json
{
  "universalPhraseId": 1,
  "phraseText": "life",
  "sourceLanguageCode": "en",
  "targetLanguageCode": "ru",
  "model": "gemini"
}
```

Параметры:

- `universalPhraseId` — ID фразы в `UniversalPhrase` (опциональный, если переданы `phraseText` + `sourceLanguageCode`)
- `phraseText` — текст фразы для автоматического поиска/создания `UniversalPhrase` (опциональный)
- `sourceLanguageCode` — язык исходной фразы (опциональный, нужен вместе с `phraseText`)
- `targetLanguageCode` — язык, на который нужно перевести (из enum `LanguageCode`: `ru`, `en`, `es`, `fr`, `de`, `it`,
  `tr`)
- `model` — LLM-провайдер: `deepseek`, `chatgpt` или `gemini`

Пример ответа:

```json
{
  "id": 1,
  "universalPhraseId": 42,
  "targetLanguageCode": "ru",
  "translation": [
    {
      "type": "block",
      "header": "Ключевая идея",
      "children": [
        {
          "type": "text",
          "text": "Drinking — это ing-форма глагола to drink (пить)..."
        }
      ]
    },
    {
      "type": "block",
      "header": "Сценарии употребления",
      "children": [
        {
          "type": "useCase",
          "header": "Процесс употребления жидкости",
          "children": [
            {
              "type": "text",
              "text": "Здесь drinking переводится как «питьё»..."
            },
            {
              "type": "paper",
              "children": [
                {
                  "type": "example",
                  "sentence": "Drinking enough water is important.",
                  "translation": "Употребление достаточного количества воды важно."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "block",
      "header": "Похожие слова",
      "children": [
        {
          "type": "text",
          "text": "drink — глагол «пить» и существительное «напиток»..."
        }
      ]
    },
    {
      "type": "block",
      "header": "Типовые конструкции",
      "children": [
        {
          "type": "phrasesButtons",
          "labels": [
            "be drinking",
            "go drinking"
          ]
        }
      ]
    }
  ],
  "status": "ready",
  "errorCode": null,
  "nonExistentWord": false,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "transcription": null
}
```

### Схема обработки (CQRS)

`UniversalPhraseTranslationController` вызывает `GetOrCreateUniversalPhraseTranslationCommand`:

1. **Определение universalPhraseId**:
    - Если передан `universalPhraseId` → получение фразы через `findByIdWithRelations`. Если не найдена →
      `UNIVERSAL_PHRASE_NOT_FOUND`.
    - Если переданы `phraseText` + `sourceLanguageCode` → поиск через `findBySentenceTextAndLang` (с нормализацией
      текста). Если не найдена → создание через `CommandBus.execute(new GetOrCreateUniversalPhraseCommand(...))`.
    - Если ни то, ни другое → `UNIVERSAL_PHRASE_NOT_FOUND`.
2. **Поиск существующего перевода** — по `(universalPhraseId, targetLanguageCode)`. Если найден со статусом `ready` —
   сразу возвращает.
3. **Создание pending-записи** — в `UniversalPhraseTranslation`.
4. **Запрос к LLM** — через `LlmAdapterService.generate()`:
    - Промпт строится функцией `buildUniversalPhraseTranslationPrompt` — описывает типы блоков и семантические гайдлайны
    - Промпт инструктирует LLM быть учителем языка, самостоятельно выбирать подходящие блоки
    - **Запрещено**: транскрипция, произношение, фонетическая нотация (IPA, пиньинь и т.д.)
    - **Несуществующие слова**: если слово не существует в языке → вернуть `{"nonExistentWord": true}`
    - Ответ ожидается строго в JSON-массиве блоков (без markdown-обёрток)
5. **Парсинг ответа** — `parseUniversalPhraseTranslationResult` с рекурсивной валидацией блоков:
    - `{ type: 'translation', data: TranslationBlock[] }` — успешный перевод
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

Нормализация применяется при создании фразы, при поиске в репозитории (`findBySentenceTextAndLang`) и в
query-репозитории (`getUniversalPhraseByTextAndLang`). Это гарантирует, что запрос `"catch her breath"` найдёт фразу,
созданную как `"catch her breath"`.

### Ответ возвращается через QueryRepository

После выполнения команды результат перечитывается через `UniversalPhraseTranslationQueryRepository.getById()`, который
маппит `UniversalPhraseTranslation` → `UniversalPhraseTranslationOutModel` (JSON-строка парсится обратно в объект).

## База данных

### Таблица UniversalPhraseTranslation

| Поле                   | Тип                                | Описание                                                               |
|------------------------|------------------------------------|------------------------------------------------------------------------|
| `id`                   | `Int`                              | Первичный ключ                                                         |
| `universal_phrase_id`  | `Int`                              | Связь с `UniversalPhrase` (Cascade)                                    |
| `target_language_code` | `LanguageCode`                     | Язык перевода                                                          |
| `translation`          | `String?`                          | JSON с массивом блоков                                                 |
| `status`               | `UniversalPhraseTranslationStatus` | `pending` / `ready` / `error`                                          |
| `error_message`        | `String?`                          | Текст ошибки при статусе `error`                                       |
| `non_existent_word`    | `Boolean`                          | Флаг: LLM определила, что такого слова не существует (default `false`) |
| `created_at`           | `DateTime`                         | Дата создания                                                          |

Уникальный constraint: `@@unique([universal_phrase_id, target_language_code])` — для одной фразы на каждом языке только
один перевод.

### Enum UniversalPhraseTranslationStatus

```
pending | ready | error
```

## Структура ответа (JSON в поле translation)

`translation` — это `TranslationBlock[] | null`. Массив на верхнем уровне, может содержать любые типы блоков.

```ts
type TranslationBlock = BlockBlock | UseCaseBlock | PaperBlock | ExampleBlock | PhrasesButtonsBlock | TextBlock

type BlockBlock = {
    type: 'block'
    header: string
    children: TranslationBlock[]
}

type PaperBlock = {
    type: 'paper'
    children: TranslationBlock[]
}

type ExampleBlock = {
    type: 'example'
    sentence: string
    translation: string
}

type PhrasesButtonsBlock = {
    type: 'phrasesButtons'
    labels: string[]
}

type TextBlock = {
    type: 'text'
    text: string  // Markdown allowed
}
```

При `nonExistentWord: true` поле `translation` будет `null`.

## Клиентская часть

### Компонент PhraseTranslationResult

Расположение: `face/_pages/media/dictionary/PhraseTranslationResult/`

```
PhraseTranslationResult/
├── PhraseTranslationResult.tsx  # компонентный реестр + BlockTree
└── PhraseTranslationResult.scss # стили блоков
```

**Компонентный реестр** — каждому типу блока соответствует свой React-компонент:

- `BlockRenderer` — секция с заголовком + рекурсивный рендеринг детей
- `UseCaseRenderer` — нумерованный сценарий употребления
- `PaperRenderer` — визуальная обёртка-карточка
- `ExampleRenderer` — предложение + перевод
- `PhrasesButtonsRenderer` — кнопки фраз (по клику устанавливают текст в поле ввода)
- `TextRenderer` — `<StyledMarkdown content={block.text} />`

**BlockTree** — рекурсивная точка входа. Итерирует по массиву блоков и для каждого вызывает соответствующий компонент из
реестра по `block.type`.

**Логика работы:**

1. Пользователь вводит фразу и нажимает Enter
2. Либо кликает по слову в режиме чтения — `currentWordId` из `useDetailsStore` → извлечение текста → авто-запрос
3. Сначала вызывается `resolvePhrase` (общий кэш с транскрипцией/озвучкой) — получает `universalPhraseId`
4. Затем запрос `POST /universal-phrase-translation` с `universalPhraseId`
5. Результат:
    - `translation` (массив блоков) → `PhraseTranslationResult` рендерит через `BlockTree`
    - `nonExistentWord` → сообщение "Такого слова не существует"
    - `error` → `ErrorMessage`

**Защита от гонки:** `resolvePhrase` находится в общем модуле `face/stores/phraseStore/resolvePhrase.ts` с модульным
кэшем промисов. `PhraseDictionary`, `TranscriptionAndAudio` и `useAudioPlayback` используют один и тот же кэш —
дублирующие запросы на создание фразы исключены.

## Ключевые файлы

### Команда и бизнес-логика

- `server/src/features/universalPhraseTranslation/GetOrCreateUniversalPhraseTranslation.command.ts` — CQRS-команда
  get-or-create (с авто-созданием UniversalPhrase и обработкой nonExistentWord)
- `server/src/features/universalPhraseTranslation/buildUniversalPhraseTranslationPrompt.ts` — построение промпта с
  описанием блоков и семантическими гайдлайнами
- `server/src/features/universalPhraseTranslation/parseUniversalPhraseTranslationResult.ts` — парсинг и рекурсивная
  валидация блоков (discriminated union: translation | nonExistentWord | invalid)

### Маршрут

- `server/src/routes/universalPhraseTranslation/universalPhraseTranslation.controller.ts` — REST-контроллер
- `server/src/routes/universalPhraseTranslation/universalPhraseTranslation.module.ts` — NestJS-модуль
- `server/src/routes/universalPhraseTranslation/inputs/getOrCreateUniversalPhraseTranslation.input.ts` — входной DTO
  (universalPhraseId опциональный, phraseText/sourceLanguageCode опциональные)

### Репозитории

- `server/src/repo/universalPhrase/universalPhraseTranslation.repository.ts` — бизнес-операции (createPending,
  updateToReady, updateToNonExistentWord, updateToError, findByPhraseIdAndTargetLang)
- `server/src/repo/universalPhrase/universalPhraseTranslation.queryRepository.ts` — запросы для клиента (getById с
  маппингом в OutModel)
- `server/src/repo/universalPhrase/universalPhrase.repository.ts` — операции с UniversalPhrase (createUniversalPhrase,
  findOrCreate, findBySentenceTextAndLang с нормализацией)
- `server/src/repo/universalPhrase/universalPhrase.queryRepository.ts` — запросы UniversalPhrase
  (getUniversalPhraseByTextAndLang с нормализацией)

### Модели

- `server/src/models/universalPhraseTranslation/universalPhraseTranslation.service.model.ts` — сервисная модель, типы
  `TranslationBlock` и `nonExistentWord: boolean`
- `server/src/models/universalPhraseTranslation/universalPhraseTranslation.out.model.ts` — OpenAPI OutModel с
  `translation` как generic JSON

### Клиент

- `face/_pages/media/dictionary/PhraseTranslationResult/PhraseTranslationResult.tsx` — компонентный реестр + BlockTree
- `../../face/entities/universalPhrase/repository/PhraseTranslationRepository.ts` — клиентские типы блоков
- `../../face/entities/universalPhrase/repository/PhraseTranslationApi.ts` — API-маппер
- `face/_pages/media/dictionary/PhraseDictionaryInput/fn/createFetchTranslation.ts` — логика запроса перевода
- `face/stores/phraseStore/resolvePhrase.ts` — общий модуль get-or-create фразы с кэшем

### Инфраструктура

- `server/src/infrastructure/llmProviderAdapter/LlmAdapter.service.ts` — фасад для вызова LLM-провайдеров
- `server/src/infrastructure/routeNames.ts` — `UNIVERSAL_PHRASE_TRANSLATION.GET_OR_CREATE`
- `server/src/infrastructure/exceptions/errorMessage.ts` — ошибки `universalPhraseTranslation.*`

### Клиентские сообщения об ошибках

- `face/utils/errorMessages.ts` — русские тексты для кодов ошибок

### Схема БД

- `server/src/db/dbConfig/dbConfig.ts` — конфигурация таблицы `UniversalPhraseTranslation`
- `server/src/utils/stringUtils.ts` — `normalizeSentence` для унификации текста фраз
