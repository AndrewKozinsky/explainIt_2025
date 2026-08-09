# UniversalPhraseService — план реализации

## Что делаем

Класс `UniversalPhraseService` в `../../face/entities/phraseTranslation/` — единственная точка входа для операций с универсальными фразами (создание, транскрипция, озвучка, анализ).

После реализации `face/stores/phraseStore/` **удаляется полностью**.

## Возвращаемый тип

```ts
type ServiceResult<T> = { ok: true; data: T } | { ok: false; errorMessage: string }
```

`loading` не нужен — метод возвращает Promise, ждёшь и получаешь финальный результат.

## retry

Вызов `get*` при статусе `error` делает новый запрос автоматически. Повторный вызов того же метода — это и есть retry.

## Модель данных (внутренний кеш класса)

Фраза — родитель, транскрипция/озвучка/перевод — дети:

```ts
type PhraseEntry = {
    phrase: string
    languageCode: LanguageCode
    phraseId: number | null
    phraseStatus: EntryStatus
    phraseErrorMessage: string | null

    // Транскрипция (ребёнок)
    transcription: { ipa: string | null; pinyin: string | null } | null
    transcriptionStatus: EntryStatus
    transcriptionErrorMessage: string | null

    // Озвучка (ребёнок)
    audioUrl: string | null
    audioStatus: EntryStatus
    audioErrorMessage: string | null

    // Переводы (дети, ключ — targetLanguageCode)
    translations: Record<string, {
        data: PhraseTranslationDataModel | null
        status: EntryStatus
        errorMessage: string | null
    }>
}
```

## Публичные методы

```ts
class UniversalPhraseService {
    // Создать/получить фразу
    getPhrase(phrase: string, languageCode: LanguageCode): Promise<ServiceResult<PhraseData>>

    // Получить транскрипцию (сначала убеждается, что фраза существует)
    getTranscription(phrase: string, languageCode: LanguageCode): Promise<ServiceResult<TranscriptionData>>

    // Получить озвучку (сначала убеждается, что фраза существует)
    getAudio(phrase: string, languageCode: LanguageCode): Promise<ServiceResult<AudioData>>

    // Получить анализ фразы (сначала убеждается, что фраза существует)
    getTranslation(phrase: string, sourceLanguageCode: LanguageCode, targetLanguageCode: string): Promise<ServiceResult<PhraseTranslationDataModel>>

    // Синхронное чтение кеша — без запросов
    getState(phrase: string, languageCode: LanguageCode): PhraseEntry | undefined
    getAllStates(): ReadonlyMap<string, PhraseEntry>

    // Массовая предзагрузка из ответа сервера (глава книги, видео)
    preload(items: PreloadItem[]): void
}

export const universalPhraseService = new UniversalPhraseService()
```

## Внутреннее устройство

```ts
class UniversalPhraseService {
    #entries = new Map<string, PhraseEntry>()
    #phraseRequests = new Map<string, Promise<ServiceResult<PhraseData>>>()
    #transcriptionRequests = new Map<string, Promise<ServiceResult<TranscriptionData>>>()
    #audioRequests = new Map<string, Promise<ServiceResult<AudioData>>>()
    #translationRequests = new Map<string, Promise<ServiceResult<PhraseTranslationDataModel>>>()

    #phraseApi = new PhraseApi()
    #translationApi = new PhraseTranslationApi()
}
```

Ключ кеша: `makePhraseKey(phrase, languageCode)` → `"en:hello"`. Для переводов: `"en:hello:ru"`.

Дедупликация: перед запросом проверяется соответствующий `#*Requests.get(key)`. Если промис уже есть — возвращается он. После выполнения (успех/ошибка) промис удаляется из мапы, чтобы следующий вызов мог сделать новый запрос (это и есть retry).

## Без Zustand — как компоненты узнают об изменениях

Компоненты управляют своим состоянием через `useState`:

```tsx
function TranscriptionAndAudio({ phrase, languageCode }) {
    const [trans, setTrans] = useState({ loading: false, data: null, errorMessage: null })
    
    useEffect(() => {
        if (!phrase || !languageCode) return
        setTrans({ loading: true, data: null, errorMessage: null })
        universalPhraseService.getTranscription(phrase, languageCode).then(result => {
            if (result.ok) setTrans({ loading: false, data: result.data, errorMessage: null })
            else setTrans({ loading: false, data: null, errorMessage: result.errorMessage })
        })
    }, [phrase, languageCode])
}
```

Два экземпляра `TranscriptionAndAudio` с одной фразой будут независимо управлять состоянием, но запрос на сервер уйдёт только один (дедупликация в классе).

## Что меняем

### Новый файл
- `../../face/entities/phraseTranslation/UniversalPhraseService.ts` — класс + типы + `makePhraseKey` + синглтон

### Изменяемые файлы

| Файл | Изменение |
|------|-----------|
| `face/_pages/dictionary/DictionaryPageContent/fn/usePopulateDictionaryStore.ts` | `new PhraseApi()` → `universalPhraseService.getPhrase()` |
| `face/_pages/media/dictionary/PhraseDictionaryInput/fn/createFetchTranslation.ts` | `phraseStore.resolvePhrase()` → `universalPhraseService.getPhrase()`; `translationRepository.getOrCreateTranslation()` → `universalPhraseService.getTranslation()` |
| `face/_pages/media/dictionary/PhraseDictionaryInput/fn/usePhraseTranslation.ts` | Убрать `new PhraseTranslationApi()`, репозиторий больше не нужен |
| `face/shared/ui/TranscriptionAndAudio/TranscriptionAndAudio.tsx` | Убрать подписку на Zustand, использовать `useState` + `universalPhraseService.getTranscription/getAudio` |
| `face/shared/ui/TranscriptionAndAudio/fn/useTranscriptionState.ts` | Переписать на `useState` + вызов `universalPhraseService.getTranscription()` |
| `face/shared/ui/TranscriptionAndAudio/fn/useAudioPlayback.ts` | Переписать на `useState` + вызов `universalPhraseService.getAudio()` |
| `../../face/entities/detailsBlock/DetailsBlock/fn/populateStore.ts` | `usePhraseStore.getState().preload()` → `universalPhraseService.preload()` |

### Удаляемые файлы

| Файл | Причина |
|------|---------|
| `face/stores/phraseStore/phraseStore.ts` | Логика переехала в `UniversalPhraseService` |
| `face/stores/phraseStore/types.ts` | Типы переехали |
| `face/stores/phraseStore/helpers.ts` | `makePhraseKey` переехал |
| `face/stores/phraseStore/index.ts` | Не нужен |

### Файлы, которые становятся внутренними (не удаляются, но снаружи не используются)

| Файл | Причина |
|------|---------|
| `../../face/entities/phrase/repository/PhraseApi.ts` | Используется только внутри `UniversalPhraseService` |
| `../../face/entities/phraseTranslation/repository/PhraseTranslationApi.ts` | Используется только внутри `UniversalPhraseService` |

### Не трогаем

- Контекстный перевод фразы в предложении (`translateApi`, `fetchPhraseTranslation.ts`)
- `detailsStore` и его retry-очереди
- Серверную часть

## Порядок шагов

1. **Создать `UniversalPhraseService.ts`** — класс с методами `getPhrase`, `getTranscription`, `getAudio`, `getTranslation`, `getState`, `preload`, внутренняя дедупликация
2. **Перевести `createFetchTranslation.ts` и `usePhraseTranslation.ts`** — убрать `PhraseTranslationApi`, использовать сервис
3. **Перевести `usePopulateDictionaryStore.ts`** — `PhraseApi` → сервис
4. **Перевести `TranscriptionAndAudio` и его хуки** — Zustand → `useState` + сервис
5. **Перевести `populateStore.ts`** — preload через сервис
6. **Удалить `face/stores/phraseStore/`**
7. **Проверить** — нет ли где-то ещё `new PhraseApi()` или `new PhraseTranslationApi()`
