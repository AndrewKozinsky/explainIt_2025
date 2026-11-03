# Выбор стиля иллюстраций диалога

Пользователь выбирает стиль в окне запуска сценария; он сохраняется в `AiDialogue.illustration_style_id`
один раз при создании (PATCH его не принимает). Новые задания NPC и сцен получают эталон и промпт выбранного
стиля; готовые изображения не перегенерируются. Сейчас три стиля: фотореализм, рисунок, акварель
(квадратные эталоны 1254×1254 в R2; промпты, которыми они созданы, — `server/assets/aiDialogue/illustration-styles/README.md`).

## Источник каталога

`server/src/features/aiDialogue/illustrationStyles/catalog.ts` — единственный источник каталога.

Каждый стиль содержит:

- id — стабильная строка до 64 символов, например realism;
- titleKey — ключ next-intl, например aiDialogue.illustrationStyles.realism;
- file — имя эталона и превью (WebP);
- stylePrompt — художественная инструкция генератора NPC и сцен.

defaultStyleId задаёт первоначальный выбор; сейчас realism.
Порядок styles задаёт порядок переключателя. Фиксированного enum или отдельной
таблицы стилей нет. Добавление варианта — запись в этом файле, загрузка файла в R2
и перевод названия в `face/messages/{locale}.json` (раздел aiDialogue.illustrationStyles),
затем перезапуск сервера. Миграции, DTO и компоненты менять не нужно: клиент строит список из API
и переводит названия через `useTranslations()` и `t(style.titleKey)`.

Каталог проверяет уникальность id и наличие default,
непустые промпты и titleKey, допустимость имён файлов.
Ошибка конфигурации — CustomError AI_DIALOGUE_INVALID_ILLUSTRATION_STYLE_CATALOG (500).

## R2

Бакет существующий, приватный. Префикс без версий:

```text
ai-dialogue-images/shared/styles/<mode>/<file>
```

mode берётся из MainConfigService.get().mode (localtest, localdev, localcheckserver, serverdevelop, servermaster).
Например: `ai-dialogue-images/shared/styles/servermaster/realism.webp`.

Один квадратный файл используется как превью и как эталон для сцен 2:1 и спрайтов 4:3.
Общие ресурсы находятся вне generated/, не привязаны к диалогу и не удаляются вместе с ним.

Версии не хранятся: замена означает перезапись того же файла внутри нужного MODE.
Задания фиксируют ключ, а не байты эталона: ещё не обработанное задание прочитает
новый файл после замены; готовые изображения сохраняются.

## Публичный REST

```http
GET /api/ai-dialogue/illustration-styles
```

Не требует сессии; Cache-Control: no-store. Статический маршрут объявлен перед GET :id.

Ответ AiDialogueIllustrationStylesOutModel:

```json
{
  "defaultStyleId": "realism",
  "urlsExpireAt": "2026-10-26T15:00:00.000Z",
  "styles": [
    {
      "id": "realism",
      "titleKey": "aiDialogue.illustrationStyles.realism",
      "previewUrl": "https://r2.example/realism.webp?signature=temporary"
    }
  ]
}
```

Возвращаются все стили в порядке каталога; R2-ключи и промпты не выдаются.
URL подписываются CloudflareS3Service на шесть часов; urlsExpireAt рекомендует перечитать каталог через пять.
Чтение не проверяет наличие файлов в R2 и ничего не генерирует; ошибка подписания не превращается
в частичный или пустой успешный каталог. Контроллер → GetAiDialogueIllustrationStylesCommand → handler
с MainConfigService и CloudflareS3Service; БД не нужна.

## Создание и хранение

POST /api/ai-dialogue принимает необязательное illustrationStyleId: строку либо null.
Отсутствие/null выбирает default каталога. Неизвестный id отклоняется с
AI_DIALOGUE_ILLUSTRATION_STYLE_NOT_FOUND (400). DTO проверяет тип, длину и формат.

`illustration_style_id` — обязательная строка без enum/FK, default в БД — realism.
AiDialogueOutModel возвращает illustrationStyleId в POST/GET/PATCH отдельного диалога; модель списка его не содержит.
PATCH принимает только maxCefrLevel; illustrationStyleId отклоняется ValidationPipe как неизвестное поле.

## Генератор

AiDialogueTurnRepository в транзакции хода читает illustration_style_id и профиль
пользователя, затем getAiDialogueImageStyleSnapshot фиксирует id, stylePrompt
и два назначения референса (styleAvatarReferenceS3Key / styleSceneReferenceS3Key) с одинаковым
ключом shared/styles/<mode>/<file>. Один снимок используется всеми новыми заданиями NPC/сцен этого хода.
Новый NPC без sceneUpdate также получает выбранный стиль; известный NPC переиспользует свой спрайт.

ImageGenerationJob.input хранит снимок вместе с моделью, качеством, форматом и размером.
Worker не перечитывает каталог/MODE: изменение каталога не меняет сохранённые задания.
Неизвестный id в самом диалоге — ошибка конфигурации (500), без молчаливого выбора другого стиля.

Общий промпт портретов задаёт сетку 4×3, эмоции, внешность и кадрирование, но не художественную технику:
её задаёт только stylePrompt. Промпт сцены использует нейтральное указание visual style.
Порядок референсов: пользователь → NPC → стиль для сцены; для спрайта — только стиль.

## Переключатель в окне запуска

AiDialogueApi.getIllustrationStyles → AiDialogueService → AiDialogueQueryFacade загружают
каталог через Orval (AbortSignal, cache: no-store). Ключ TanStack Query — ['ai-dialogue', 'illustration-styles'].
Запрос выполняется при открытии окна; ошибка допускает ручной повтор. Автообновления (таймеры,
refetch при фокусе/сети) нет; клиентская модель содержит только defaultStyleId и styles.

useStartDialogueIllustrationStyle восстанавливает lastAiDialogueIllustrationStyle из
localStorageManager. Отсутствующий в каталоге id заменяется defaultStyleId без перезаписи
сохранённого предпочтения. В клиенте нет фиксированного списка id; при отсутствии перевода показывается id.

`entities/aiDialogue/ui/IllustrationStyleSwitcher` — radiogroup из обычных radio с квадратными превью
и подписями, три колонки. Ошибка изображения оставляет серый слот, выбор по подписи остаётся.
Без доступного стиля (загрузка, ошибка первого запроса, пустой каталог) запуск недоступен.
Во время POST контролы отключены; после ошибки создания выбор сохраняется для повтора.
useStartDialogueOptions передаёт illustrationStyleId в POST создания.

mapToAiDialogueIllustrationStyles проверяет каталог (isValidIllustrationStylesCatalog, isValidIllustrationStyle):
повреждённые данные, дубли id и отсутствующий default не превращаются в неявный выбор.

## Команды

Из server: `npm run test:ai-dialogue-illustration-styles` — HTTP-тест маршрутов с настоящими Nest/ValidationPipe/Swagger
и подменёнными БД/R2. `npm run check:ai-dialogue-image-assets` (нужно полное окружение с REGION/MODE) — read-only
проверка, что все эталоны каталога в R2 доступны и декодируются тем же декодером, что worker.

Из face: `node --import tsx --test tests/aiDialogue*.test.ts`; браузерные проверки окна —
`tests/browser/aiDialogueScenarios.spec.ts` через `playwright.ai-dialogues.config.ts`.
