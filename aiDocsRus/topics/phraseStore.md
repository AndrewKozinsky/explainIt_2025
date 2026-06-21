# PhraseStore — централизованное хранилище фраз, транскрипций и озвучки

## Что делает функционал

`usePhraseStore` — это Zustand-стор, который является единственным источником данных для универсальных фраз (`UniversalPhrase`), их транскрипций и озвучки. Он берёт на себя всю работу по взаимодействию с сервером: поиск или создание фразы, получение транскрипции, получение аудио. Внешние компоненты только запрашивают данные или отдают команду «загрузи», а стор сам решает, что и в каком порядке запрашивать у сервера.

### Возможности

- **Get-or-create фразы** — если фраза не найдена на сервере, она создаётся автоматически
- **Кэширование и дедупликация** — повторные запросы за одной фразой не уходят на сервер; одновременные запросы разделяют один промис
- **Транскрипция** — загружается автоматически при необходимости (eager loading) или лениво по клику
- **Озвучка** — загружается по клику на кнопку воспроизведения
- **Preload** — возможность предзагрузить данные из ответа сервера (например, при загрузке главы книги)
- **Гарантия существования фразы** — перед запросом транскрипции или озвучки стор убеждается, что фраза существует на сервере

## Архитектура

```
face/stores/phraseStore/
├── index.ts          — barrel, реэкспортирует публичное API
├── types.ts          — все типы
├── helpers.ts        — утилита makePhraseKey
└── phraseStore.ts    — Zustand-стор: resolvePhrase, ensureTranscription, ensureAudio, preload + все dedup-мапы
```

## Что хранится в entries

Каждая запись в `entries` — это объект `EntryData`, ключом является `makePhraseKey(phrase, languageCode)` (формат: `"en:hello"`).

```ts
type EntryData = {
    phrase: string              // текст фразы
    languageCode: LanguageCode  // код языка
    phraseId: number | null     // id в таблице UniversalPhrase (null — ещё не получен)
    phraseStatus: EntryStatus   // статус самой фразы: idle | loading | ready | error
    transcription: string | null     // строка транскрипции (IPA или pinyin)
    transcriptionStatus: EntryStatus
    audioUrl: string | null          // URL аудиофайла
    audioStatus: EntryStatus
}
```

## Публичное API

### `usePhraseStore` — Zustand-стор

Хук, возвращающий стор. Используется как хук (в компонентах) и как `getState()` (вне React).

```ts
type PhraseResult = { ok: true; data: PhraseData } | { ok: false }

type PhraseData = {
    id: number
    text: string
    sourceLanguageCode: string
    transcription?: { id: number; universalPhraseId: number; ipa?: string | null; pinyin?: string | null } | null
    audioPronunciation?: { id: number; universalPhraseId: number; audioUrl: string } | null
}
```

**Методы:**

| Метод | Описание |
|---|---|
| `resolvePhrase(phrase, languageCode)` | Get-or-create фразы на сервере. Результат **сохраняется в entries**: `phraseId`, `phraseStatus`, `transcription`, `audioUrl`. Имеет модульный кэш `phraseRequestCache` для дедупликации одновременных запросов |
| `preload(items)` | Предзагружает данные из массива `PreloadItem[]`. Только заполняет отсутствующие поля — никогда не перезаписывает уже загруженные данные |
| `ensureTranscription(phrase, languageCode)` | Загружает транскрипцию. Если `phraseId` ещё нет — вызывает `resolvePhrase`. Затем читает `transcription` из entries (уже сохранена вызовом `resolvePhrase`). Если нет — создаёт через `universal_phrase_transcription_get_or_create` |
| `ensureAudio(phrase, languageCode)` | Загружает озвучку. Если `phraseId` ещё нет — вызывает `resolvePhrase`. Затем читает `audioUrl` из entries. Если нет — создаёт через `universal_phrase_audio_get_or_create` |
| `get(phrase, languageCode)` | Синхронно возвращает `EntryData \| undefined` из стора |

**Дедупликация запросов (модульные мапы):**
- `phraseRequestCache` — мапа `key → Promise<PhraseResult>` для `resolvePhrase`
- `transcriptionRequests` — мапа `key → Promise<void>` для `ensureTranscription`
- `audioRequests` — мапа `key → Promise<void>` для `ensureAudio`

## Как это работает изнутри

### resolvePhrase — get-or-create фразы

Ключевое отличие: `resolvePhrase` **сохраняет результат в entries стора**. После его вызова `entries[key]` содержит `phraseId`, `transcription` и `audioUrl` (если они пришли в ответе сервера).

```
resolvePhrase("hello", "en")
  ├─ entries["en:hello"].phraseStatus === 'ready'? → return cached { ok: true, data }
  ├─ phraseRequestCache.get(key) есть? → return in-flight промис (дедупликация)
  └─ Новый промис:
       ├─ ensureEntry → создаёт запись { phraseStatus: 'loading' }
       ├─ universal_phrase_get → найдена?
       │   └─ Да → savePhraseToEntry (phraseId, transcription, audioUrl), return { ok: true }
       ├─ universal_phrase_create → создана?
       │   └─ Да → savePhraseToEntry, return { ok: true }
       └─ Нет → phraseStatus: 'error', return { ok: false }
```

### Загрузка транскрипции (ensureTranscription)

В отличие от старой версии, `ensureTranscription` не разбирает ответ `resolvePhrase` вручную — он читает данные из entries, куда `resolvePhrase` уже всё сохранил.

```
ensureTranscription("hello", "en")
  ├─ Уже loading/ready? → return
  ├─ Уже есть в transcriptionRequests? → return (ждём существующий промис)
  └─ Новый промис:
       ├─ ensureEntry
       ├─ phraseId === null? → resolvePhrase (сохраняет всё в entries)
       ├─ transcriptionStatus = 'loading'
       ├─ entries["en:hello"].transcription уже есть? → ready, return
       ├─ Нет → universal_phrase_transcription_get_or_create(phraseId)
       └─ transcriptionStatus: 'ready' (или 'error')
```

### Загрузка озвучки (ensureAudio)

Аналогично — читает `audioUrl` из entries после `resolvePhrase`.

```
ensureAudio("hello", "en")
  ├─ Уже есть audioUrl и status=ready? → return
  ├─ Уже есть в audioRequests? → return
  └─ Новый промис:
       ├─ ensureEntry
       ├─ phraseId === null? → resolvePhrase (сохраняет всё в entries)
       ├─ entries["en:hello"].audioUrl уже есть? → ready, return
       ├─ audioStatus = 'loading'
       ├─ universal_phrase_audio_get_or_create(phraseId)
       └─ audioStatus: 'ready' (или 'error')
```

### Предзагрузка (preload)

Вызывается из `populateStore` при загрузке главы книги или видео:

```ts
// populateStore.ts
const preloadItems = extractPreloadItems(rawSentences, languageCode)
usePhraseStore.getState().preload(preloadItems)
```

`extractPreloadItems` извлекает из ответа сервера фразы, у которых уже есть транскрипция или озвучка в `universalPhrase`, и формирует `PreloadItem[]`. Стор сохраняет их, не делая лишних запросов.

## Потребители

| Компонент | Как использует |
|---|---|
| `TranscriptionAndAudio` | Вызывает `usePhraseStore` напрямую: получает `storeEntry`, передаёт в `useTranscriptionState` и `useAudioPlayback` |
| `useTranscriptionState` | Читает `transcriptionStatus`/`transcription` из `storeEntry`, вызывает `ensureTranscription` при необходимости |
| `useAudioPlayback` | Читает `audioUrl`/`audioStatus` из `storeEntry`, вызывает `ensureAudio` при клике на Play |
| `populateStore` | Вызывает `preload()` при загрузке глав книг и видео |
| `usePhraseTranslation` | Вызывает `resolvePhrase()` для получения `phraseId` перед запросом перевода |
| `DictionaryPhraseTranscription` | Передаёт `transcription` и `audioUrl` как пропсы в `TranscriptionAndAudio` |
| `DictionaryFlashcard` | Передаёт `phraseTranscription` и `phraseAudioUrl` как пропсы в `TranscriptionAndAudio` |

## Ключевые файлы

### Стор
- `face/stores/phraseStore/index.ts` — barrel: `usePhraseStore`, `makePhraseKey`, типы
- `face/stores/phraseStore/phraseStore.ts` — Zustand-стор: `resolvePhrase`, `preload`, `ensureTranscription`, `ensureAudio`, `get` + dedup-мапы
- `face/stores/phraseStore/types.ts` — `EntryData`, `PreloadItem`, `PhraseData`, `PhraseResult`, `PhraseStore`
- `face/stores/phraseStore/helpers.ts` — `makePhraseKey`

### UI-хуки
- `face/ui/TranscriptionAndAudio/fn/useTranscriptionState.ts` — разрешение транскрипции (prop vs store) + eager-загрузка
- `face/ui/TranscriptionAndAudio/fn/useAudioPlayback.ts` — аудиоплеер: Audio-элемент, play/pause, загрузка по клику

### Компоненты
- `face/ui/TranscriptionAndAudio/TranscriptionAndAudio.tsx` — компонент-кнопка: иконка воспроизведения + текст транскрипции
- `face/_pages/media/dictionary/DictionaryPhraseTranscription/DictionaryPhraseTranscription.tsx`
- `face/_pages/dictionary/DictionaryFlashcard/DictionaryFlashcard.tsx`

### Загрузка данных
- `face/_pages/media/detailsBlock/DetailsBlock/fn/populateStore.ts` — preload из ответа сервера

### Словарь
- `face/_pages/media/dictionary/PhraseDictionaryInput/fn/usePhraseTranslation.ts` — использует `usePhraseStore.getState().resolvePhrase()`

### GraphQL (клиент)
- `face/graphql/universalPhrase/universalPhraseGet.graphql` — запрос фразы
- `face/graphql/universalPhrase/universalPhraseCreate.graphql` — создание фразы
- `face/graphql/universalPhraseTranscription/universalPhaseTranscriptionGetOrCreate.graphql` — транскрипция
- `face/graphql/universalPhraseAudio/universalPhraseAudioGetOrCreate.graphql` — озвучка
- `face/graphql/universalPhraseAudio/universalPhraseAudioGet.graphql` — получение озвучки (read-only)
