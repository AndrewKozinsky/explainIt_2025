# YouTube-видео

## Что делает функционал

Получает список видео с YouTube через официальный YouTube Data API v3. Позволяет пользователю искать видео на изучаемом
языке без необходимости хранить видео на сервере.

На текущий момент реализована **только выдача списка видео**.

## Пользовательский поток

1. Пользователь указывает язык (например, `en`, `fr`, `de`).
2. Клиент запрашивает `/api/youtube/videos?languageCode=en&limit=20`.
3. Сервер проксирует запрос к YouTube Data API и возвращает список видео с обложками, названиями, именами каналов,
   логотипами и количеством просмотров.
4. Клиент показывает видео в сетке. Для подгрузки следующей страницы используется `nextPageToken` из ответа (бесконечная
   прокрутка).

## Маршрут

```
GET /api/youtube/videos?languageCode=en&limit=20&pageToken=
```

### Параметры запроса

| Параметр       | Тип    | Обязательный | Описание                                                        |
|----------------|--------|--------------|-----------------------------------------------------------------|
| `languageCode` | string | да           | Код языка (ISO 639-1): `en`, `fr`, `de`, `es`, `it`, `tr`, `ru` |
| `limit`        | number | нет          | Количество видео на странице (1–50, по умолчанию 20)            |
| `pageToken`    | string | нет          | Токен следующей страницы. Для первой страницы не передаётся.    |

### Ответ

```json
{
  "videos": [
    {
      "videoId": "dQw4w9WgXcQ",
      "title": "Video Title",
      "channelName": "Channel Name",
      "channelLogoUrl": "https://yt3.ggpht.com/...",
      "thumbnailUrl": "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      "viewCount": 1542000,
      "duration": "PT2M30S"
    }
  ],
  "nextPageToken": "CAUQAA",
  "totalResults": 1000000
}
```

- `nextPageToken` — `null` если страниц больше нет.
- `duration` — длительность в формате ISO 8601 (`PT2M30S` = 2 минуты 30 секунд).

## Как работает сервер

### Поисковый запрос

YouTube Data API требует параметр `q` (поисковый запрос) для `search.list`. Чтобы не ограничивать выдачу конкретной
темой, используется самое частотное слово языка (`the`, `le`, `der` и т.д.). В сочетании с `relevanceLanguage` это даёт
максимально разнообразные видео на нужном языке.

Список поисковых слов находится в `YoutubeService.SEARCH_QUERIES` и типизирован ключами из `utils/languages` — единого
источника языков.

### Пайплайн запроса

1. **Контроллер** (`youtube.controller.ts`) принимает query-параметры и отправляет `GetYoutubeVideosCommand` в
   CommandBus.
2. **Хендлер** (`GetYoutubeVideos.command.ts`) валидирует язык через `utils/languages` и вызывает
   `YoutubeService.getVideos()`.
3. **Сервис** (`youtube.service.ts`) делает три запроса к YouTube API:
    - `search.list` — поиск видео по языку с пагинацией;
    - `videos.list` — получение статистики (`viewCount`) и длительности (`duration`);
    - `channels.list` — получение логотипов каналов (не критично: при ошибке логирования канала логотип будет `null`).
4. Результаты собираются в `YoutubeVideosOutModel` и возвращаются клиенту.

### CQRS

Используется стандартный CQRS-паттерн проекта:

- **Command:** `GetYoutubeVideosCommand` — `{ languageCode, limit, pageToken? }`
- **Handler:** `GetYoutubeVideosHandler` — вызывает `YoutubeService`, маппит в Out-модели.

## Инфраструктура

### `YoutubeService`

Файл: `server/src/infrastructure/youtube/youtube.service.ts`

Глобальный сервис (модуль `YoutubeModule` — `@Global()`). Содержит:

| Метод                                 | Описание                                                                  |
|---------------------------------------|---------------------------------------------------------------------------|
| `getVideos(params)`                   | Основной метод: поиск → детали → логотипы → сборка                        |
| `downloadAudio(videoId)`              | Скачивает аудиодорожку видео через `yt-dlp` и возвращает `Readable`-поток |
| `getVideoById(videoId)`               | Получает данные одного видео по его ID                                    |
| `searchVideos(apiKey, params)`        | Шаг 1: `GET /youtube/v3/search`                                           |
| `getVideoDetails(apiKey, videoIds)`   | Шаг 2: `GET /youtube/v3/videos`                                           |
| `getChannelLogos(apiKey, channelIds)` | Шаг 3: `GET /youtube/v3/channels`                                         |
| `mergeVideosWithDetails(...)`         | Шаг 4: сборка `YoutubeVideoData[]`                                        |
| `request<T>(url)`                     | HTTP-запрос через `axios` с обработкой ошибок                             |

### Переменные окружения

- `YOUTUBE_API_KEY` — API-ключ из [Google Cloud Console](https://console.cloud.google.com/apis/credentials). Должен быть
  включён YouTube Data API v3.
- Ключ читается в `mainConfig.service.ts` → `youTube.apiKey`.

### Ошибки

Ключи из `errorMessage.youtube`:

- `apiRequestFailed` — не удалось выполнить запрос к YouTube API (сетевые ошибки, 4xx/5xx кроме 403).
- `quotaExceeded` — квота YouTube API исчерпана (HTTP 403). Дневная квота по умолчанию — 10 000 единиц. Один вызов
  `getYouTubeVideos` тратит ~103 единицы (search + videos + channels).
- `languageNotSupported` — переданный `languageCode` отсутствует в `utils/languages`.

## Пагинация

YouTube использует курсорную пагинацию через `pageToken`:

1. Первый запрос: `GET /api/youtube/videos?languageCode=en&limit=20`
2. Ответ содержит `nextPageToken: "CAUQAA"`
3. Следующий запрос: `GET /api/youtube/videos?languageCode=en&limit=20&pageToken=CAUQAA`
4. Когда `nextPageToken` равен `null` — видео закончились.

Для бесконечной прокрутки клиент передаёт `pageToken` из предыдущего ответа.

## Ключевые файлы

### Сервер

- `server/src/infrastructure/youtube/youtube.module.ts` — глобальный модуль.
- `server/src/infrastructure/youtube/youtube.service.ts` — сервис взаимодействия с YouTube Data API.
- `server/src/infrastructure/youtube/youtube.types.ts` — типы ответов YouTube API.
- `server/src/features/youtube/GetYoutubeVideos.command.ts` — CQRS-команда и хендлер.
- `server/src/models/youtube/youtubeVideo.out.model.ts` — `YoutubeVideoOutModel` и `YoutubeVideosOutModel`.
- `server/src/routes/youtube/youtube.controller.ts` — `GET /api/youtube/videos`.
- `server/src/routes/youtube/youtube.module.ts` — модуль маршрута.
- `server/src/routes/youtube/openAPI.decorators.ts` — Swagger-декораторы.
- `server/src/routes/youtube/dto/getYoutubeVideos.input.ts` — DTO для query-параметров.
- `server/src/infrastructure/exceptions/errorMessage.ts` — ошибки `youtube.*`.
- `server/src/infrastructure/mainConfig/mainConfig.service.ts` — конфиг `youTube.apiKey`.
- `server/src/utils/languages.ts` — единый список поддерживаемых языков.
