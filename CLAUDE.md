# AI Development Guidelines

This document was split into multiple files for easier navigation.

## Always read these files

These files contain essential project context — read them at the start of every session:

- **General**: `documentation/general.md`
- **Client (face)**: `documentation/client.md`
- **Server (server)**: `documentation/server.md`

## Topic files (read on demand)

Topic files in `documentation/topics/` contain deep-dive documentation on specific features. Read the relevant file (s)
**only when the task matches** the triggers below. Do NOT read all of them for every task.

| File                                                  | Triggers (keywords / topics)                                                                                                   |
|-------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| `documentation/media/booksAndMoviesTranslation.md`       | перевод предложения, перевод фразы в книге/фильме, sentence translation, phrase translation                                    |
| `documentation/topics/clientUserData.md`                  | пользователь, user, getCurrentUser, UserProvider, useUserControllerGetMe, авторизация, текущий пользователь, user data         |
| `documentation/topics/userProfile.md`                     | профиль пользователя, пол, gender, готовые аватары, avatar-presets, загрузка фотографии, ImageProcessingService               |
| `documentation/topics/internationalization.md`            | i18n, интернационализация, языки, локали, next-intl, перевод интерфейса, locale                                                |
| `documentation/topics/multiRegionDeployment.md`           | регионы, деплой, GitHub Actions, explainit.ru, immersia.site, серверы, CI/CD                                                   |
| `documentation/topics/sentenceChat.md`                    | чат с ИИ, sentence chat, диалог, SentenceChat, chat thread                                                                     |
| `documentation/aiDialogue/overview.md`             | любая задача про диалоги с ИИ — читать первым: что такое диалоги и зачем, возможности для пользователя, какой подробный документ открыть |
| `documentation/aiDialogue/aiDialogueScenario.md`   | сценарий диалога, группы сценариев, AiDialogueScenarioGroup, AiDialogueScenario, ai-dialogue-scenario-group, ai-dialogue-scenario, обложки сценариев, сценка с ИИ, NPC, сид сценариев, ролевая сценка, новый сценарий, правила написания сценариев, порядок групп, getScenariosData, conversationIdeas, trainedSkills |
| `documentation/aiDialogue/aiDialogueScenarioCovers.md` | обложки общедоступных сценариев, файлы обложек, загрузка обложек сценариев в R2, префиксы обложек по MODE |
| `documentation/aiDialogue/aiDialogue.md`           | диалог, AiDialogue, ai-dialogue, история диалогов, создать диалог, удалить диалог, сообщения диалога, пожелания к сцене, userScenarioAmendment, user_scenario_amendment                          |
| `documentation/aiDialogue/aiDialogueList.md` | Мои диалоги, список диалогов, история диалогов, карточки диалогов, пагинация диалогов, lastMessage, characters |
| `documentation/aiDialogue/aiDialoguePage.md`       | страница диалога, AiDialoguePage, SegmentedText, partial json, форма ввода, завершить диалог, userAvoidsNPC, aiDialogueStore   |
| `documentation/aiDialogue/aiDialogueMessageCheck.md` | проверка черновика, check-message, грамматика реплики/действия, критические ошибки, рекомендации, диктовка |
| `documentation/aiDialogue/aiDialogueDictation.md` | диктовка, микрофон, dictation, Soniox, WebSocket, распознавание речи, partial/final |
| `documentation/aiDialogue/aiDialogueForm.md` | форма ответа пользователя, вкладки Реплика/Действие, AiDialogueInput, курсор, выделение, клиентская диктовка, проверка перед отправкой |
| `documentation/aiDialogue/aiDialogueWordMaps.md`   | карта выбора словарных фраз в диалогах, wordMap, связанные слова, put away, разрывные выражения                                |
| `documentation/aiDialogue/aiDialogueAudio.md`      | озвучка диалога, голоса NPC, диктор, ранний TTS, audioReady, очередь аудио                                               |
| `documentation/aiDialogue/aiDialogueImages.md`     | изображения диалога, аватары, эмоции, NPC, сцены, image generation, R2, FLUX, GPT Image                                      |
| `documentation/aiDialogue/aiDialogueIllustrationStyles.md` | стили иллюстраций, выбор стиля, каталог стилей, illustrationStyleId, эталоны стиля |
| `documentation/topics/imageGenerationProviderAdapter.md` | универсальный адаптер изображений, ImageGenerationAdapterService, ImageGenerationProvider, внешний запрос изображений |
| `documentation/media/universalPhraseTranslation.md`      | перевод универсальной фразы, universal phrase translation, GetOrCreateUniversalPhraseTranslation                               |
| `documentation/topics/clientRepositories.md`              | репозиторий, repository, BooksRepository, BooksApi, useFetchData, resolveError, extractString, маппинг данных, клиентский API  |
| `documentation/topics/errorHandling.md`                   | ошибки, errorMessageCode, CustomError, extractErrorText, ApolloError, обработка ошибок, error handling                         |
| `documentation/media/videoPrivateSubtitlesGeneration.md` | генерация субтитров, Deepgram, ffmpeg, SRT, speech-to-text, автоматические субтитры                                            |
| `documentation/media/youtube.md`                         | YouTube, ютуб, youtube, YouTube Data API, youtube videos, поиск видео, GetYoutubeVideos                                        |
| `documentation/topics/restAndDtoDecorators.md`            | REST, контроллер, controller, DTO, DtoFieldDecorators, декораторы, bdConfig, OpenAPI, Swagger, миграция с GraphQL, ApiProperty |
| `documentation/topics/openapiCodegen.md`                  | Orval, генерация клиентских функций, OpenAPI, React Query, orval, codegen, npm run orval, mutator, shared/api                  |
