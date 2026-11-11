# Общее

## О чём это приложение

Веб-приложение для изучения иностранных языков: английского, испанского, французского, немецкого, итальянского,
турецкого и русского (список — `face/shared/utils/languages.ts`). Интерфейс переведён на те же 7 языков. Сервис
бесплатный, работает как адаптивный сайт, мобильного приложения нет.

### Главный раздел — диалоги с ИИ

Ролевая сценка с ИИ на изучаемом языке. Подробности — [aiDialogue/dialogueOverview.md](aiDialogue/dialogueOverview.md).

### Книги и видео

Чтение книг и просмотр видео на изучаемом языке с переводом по клику на слово. Подробности —
[media/mediaOverview.md](media/mediaOverview.md).

## Общие правила

- Если что-то непонятно — задавать вопросы.
- Следовать существующему стилю кода и паттернам.
- Писать понятный, лаконичный и хорошо документированный код.
- Не больше 5 уровней вложенности в коде.

## Структура корневой папки

- `face` — фронтенд: Next.js, next-intl, SCSS, TanStack Query (клиент API генерируется Orval из OpenAPI), Zustand.
- `server` — бэкенд: NestJS + CQRS, REST, Prisma (PostgreSQL), Redis, BullMQ worker (изображения, субтитры),
  файлы в Cloudflare R2.
- `nlp` — сервис деления текста на предложения (Python, FastAPI).
- `help` — справка для пользователей на Docusaurus, отдаётся по `/help` через nginx.
- `docker` — compose-файлы, env-файлы и скрипты запуска.
- `nginx` — reverse proxy.
- `infrastructure` — генератор Docker-compose файлов.
- `documentation` — эта документация.

## Запуск приложения

Все части приложения работают в отдельных контейнерах. Локальная разработка запускается из папки `docker` скриптом
`run.local.dev.sh` в регионе `intl` (письма отправляются через Resend только с подтверждённого домена `immersia.site`):

```bash
docker compose -f docker-compose.local.dev.intl.yml --project-directory .. --env-file .env.localdev up --build
```

## Документация

### Читать всегда

В начале каждой сессии, кроме этого файла, прочитать:

- **Клиент (face)**: `documentation/client.md`
- **Сервер (server)**: `documentation/server.md`

### Тематические документы (читать по необходимости)

Подробная документация по отдельным функциям. Читать нужный файл **только когда задача подходит** под ключевые слова
ниже. Не читать все файлы для каждой задачи.

#### Разделы

У разделов есть свой обзор с таблицей документов и ключевых слов. Для задачи из раздела сначала прочитать его обзор,
затем — нужный документ из таблицы.

| Файл | Когда читать (ключевые слова / темы) |
|---|---|
| `documentation/media/mediaOverview.md` | книги, главы, /books, видео, фильмы, /videos, YouTube, Подборка, Поиск, Мои книги/видео, нажатие на слово, перевод предложения и фразы, правая панель, субтитры, SRT, Deepgram, ffmpeg, UniversalPhrase, GetYoutubeVideos |
| `documentation/aiDialogue/dialogueOverview.md` | диалоги с ИИ, AiDialogue, сценарии и группы сценариев, NPC, сценка, обложки сценариев, Мои диалоги, страница диалога, форма ответа, реплика/действие, проверка черновика, диктовка, Soniox, карта слов, wordMap, озвучка, TTS, изображения, эмоции, стили иллюстраций, SSE, CEFR |

#### Общие темы (`documentation/topics/`)

| Файл | Когда читать (ключевые слова / темы) |
|---|---|
| `documentation/topics/dictionary.md` | Словарь, словарная статья, PhraseDictionary, панель словаря, транскрипция и озвучка слова, клик по слову |
| `documentation/topics/clickableText.md` | кликабельный текст, ClickableText, слова-кнопки, подсветка слов, рамка выражения, заливка выбранных слов, касание и прокрутка, SegmentedText, Sentence |
| `documentation/topics/clientUserData.md` | пользователь, user, getCurrentUser, UserProvider, useUserControllerGetMe, авторизация, текущий пользователь, user data |
| `documentation/topics/userProfile.md` | профиль пользователя, пол, gender, готовые аватары, avatar-presets, загрузка фотографии, ImageProcessingService |
| `documentation/topics/internationalization.md` | i18n, интернационализация, языки, локали, next-intl, перевод интерфейса, locale |
| `documentation/topics/multiRegionDeployment.md` | регионы, деплой, GitHub Actions, explainit.ru, immersia.site, серверы, CI/CD |
| `documentation/topics/sentenceChat.md` | чат с ИИ, sentence chat, диалог, SentenceChat, chat thread |
| `documentation/topics/imageGenerationProviderAdapter.md` | универсальный адаптер изображений, ImageGenerationAdapterService, ImageGenerationProvider, внешний запрос изображений |
| `documentation/topics/ttsProviderAdapter.md` | адаптер озвучки, text to speech, TTS, TtsAdapterService, TtsProviderModule, OpenAI TTS, Google TTS, синтез речи |
| `documentation/topics/restAndDtoDecorators.md` | REST, контроллер, controller, DTO, DtoFieldDecorators, декораторы, bdConfig, OpenAPI, Swagger, миграция с GraphQL, ApiProperty |
| `documentation/topics/emails.md` | письма, email, Resend, подтверждение почты, восстановление пароля, AuthEmailService, EmailAdapterService, шаблоны писем |
| `documentation/topics/openapiCodegen.md` | Orval, генерация клиентских функций, OpenAPI, React Query, orval, codegen, npm run orval, mutator, shared/api |
