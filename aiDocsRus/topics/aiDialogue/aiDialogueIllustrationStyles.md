# Выбор стиля иллюстраций диалога

## Этапы

1. Готовы три квадратных эталона 1254×1254: фотореализм, рисунок, акварель.
   WebP-файлы и исходные промпты — server/assets/aiDialogue/illustration-styles/.
2. Реализованы серверный каталог, публичный REST, сохранение выбора при создании,
   выдача сохранённого id и назначение прежним диалогам первого стиля realism.
3. Следующий этап: подключить стиль к заданиям NPC и сцен и убрать конфликтующие
   фиксированные инструкции рисованного стиля из промпта NPC.
4. Затем: квадратный переключатель в StartDialogueModal, сохранение последнего выбора,
   загрузка каталога через клиентский entity-слой, обновление подписанных ссылок.
5. После подключения — визуальная проверка настоящих сцен и листов эмоций.

Генератор на этапе 2 ещё использует прежний style-scene.jpg и промпт.
Сохранённый illustrationStyleId пока не влияет на изображения.
Модальное окно пока не изменено. Стиль выбирается один раз; PATCH его не принимает.

## Источник каталога

server/src/features/aiDialogue/illustrationStyles/catalog.ts — единственный
источник рабочего каталога. assets.json рядом с картинками — метаданные подготовки,
приложение его не читает.

Каждый стиль содержит:

- id — стабильная строка до 64 символов, например realism;
- titleKey — ключ next-intl, например aiDialogue.illustrationStyles.realism;
- file — имя эталона и превью; в текущем наборе WebP;
- stylePrompt — инструкция для будущего подключения генератора.

defaultStyleId задаёт первоначальный выбор; сейчас realism.
Порядок styles задаёт порядок переключателя. Фиксированного enum или отдельной
таблицы стилей нет. Добавление варианта — запись в этом файле и загрузка ресурса R2,
затем обычная пересборка/перезапуск сервера. Клиентский список должен строиться из API.
Названия переводятся на клиенте: face/messages/{locale}.json, раздел aiDialogue.illustrationStyles.
При добавлении стиля нужно также добавить его перевод. В UI используется useTranslations()
и t(style.titleKey), без pickLocalized и серверного JSON с переводами.
Новая миграция, изменение DTO и компонентов для каждого варианта не требуются.

Каталог проверяет уникальность id, наличие default, обязательные en/ru названия,
непустые промпты и titleKey, допустимость имён файлов.
Ошибка конфигурации — CustomError AI_DIALOGUE_INVALID_ILLUSTRATION_STYLE_CATALOG (500).

## R2

Бакет существующий, приватный. Префикс без версий:

```text
ai-dialogue-images/shared/styles/<mode>/<file>
```

mode берётся из MainConfigService.get().mode. Поддерживаются localtest, localdev,
localcheckserver, serverdevelop, servermaster; рабочего значения productionserver нет.

Например:

- ai-dialogue-images/shared/styles/localdev/realism.webp;
- ai-dialogue-images/shared/styles/servermaster/realism.webp.

Один квадратный файл используется как превью и как эталон для сцен 2:1 / спрайтов 4:3.
Отдельных горизонтальных эталонов нет. Общие ресурсы находятся вне generated/,
не привязаны к диалогу и не удаляются вместе с ним.

Версии не хранятся: замена означает перезапись того же файла внутри нужного MODE.
Задания фиксируют ключ, а не байты эталона: ещё не обработанное задание прочитает
новый файл после замены; готовые изображения сохраняются.
При подключении UI нужно учитывать кэш изображения и обновление подписанных URL.

26 октября 2026 выполнена настоящая read-only проверка всех трёх localdev-ресурсов:
доступны, полностью декодируются, 1254×1254, image/webp.
Доступность остальных MODE этим этапом не подтверждалась.

## Публичный REST

```http
GET /api/ai-dialogue/illustration-styles
```

Не требует сессии; Cache-Control: no-store.
Статический маршрут объявлен перед GET :id.

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

Возвращаются все три стиля в порядке каталога. R2-ключи и промпты не выдаются.
URL подписываются существующим CloudflareS3Service на шесть часов;
urlsExpireAt рекомендует перечитать каталог через пять часов.
Чтение REST не проверяет наличие файлов в R2 и ничего не генерирует.
Ошибка подписания не превращается в частичный или пустой успешный каталог.

Контроллер → GetAiDialogueIllustrationStylesCommand → handler с MainConfigService
и CloudflareS3Service. БД для чтения каталога не нужна.

## Создание и хранение

POST /api/ai-dialogue принимает дополнительное необязательное illustrationStyleId:
строку либо null. Отсутствие/null выбирает default каталога. Неизвестный id
отклоняются с AI_DIALOGUE_ILLUSTRATION_STYLE_NOT_FOUND (400).
DTO дополнительно проверяет тип, длину и формат; произвольный ключ R2 не принимается.

В AiDialogue добавлено обязательное строковое поле illustration_style_id, без enum/FK.
Источник схемы — dbConfig.ts. Создание через команду/репозиторий явно сохраняет
выбранный или стандартный id; AiDialogueOutModel возвращает illustrationStyleId
в POST/GET/PATCH отдельного диалога. Отдельная модель списка истории не менялась.
PATCH продолжает принимать только maxCefrLevel; изменение illustrationStyleId
отклоняется ValidationPipe как неизвестное поле.

Миграция 20261026120000_ai_dialogue_illustration_style добавляет TEXT NOT NULL.
Её исходное содержимое с default legacy сохранено для совместимости применённой истории.
Корректирующая миграция 20261026130000_default_dialogue_illustration_style меняет
default на realism и заменяет legacy в существующих диалогах на realism.
Ранее явно выбранные стили сохраняются. В dbConfig текущий default — realism.
Существующие сообщения, картинки и снимки заданий не переписываются.
Схема сгенерирована из dbConfig, Prisma Client обновлён.

Миграции проверены на одноразовой PostgreSQL 16.2 с полной историей миграций:
прежний диалог становится realism, явно выбранный watercolor сохраняется,
а прямая вставка без illustration_style_id получает realism.
К БД приложения миграции в этом этапе не применялись.
Перед запуском обновлённого сервера выполнить из server с окружением нужной БД:

```bash
npm run migrate:deploy
```

Обычный bootstrap HTTP также применяет подготовленные миграции.

## Проверки

Из server:

```bash
npm run build
npx tsc --noEmit --incremental false
npm test -- --silent
npm run test:ai-dialogue-illustration-styles
npm run check:ai-dialogue-image-assets -- --illustration-styles
```

Последняя команда требует полное серверное окружение, включая REGION/MODE.
Она проверяет каждый стиль текущего каталога тем же декодером, что worker.
Без --illustration-styles сохраняется прежняя проверка avatarStyle/sceneStyle.
Проверка R2 не запускает AppModule, БД, Redis, очереди, worker или генерацию.

HTTP-тест запускает изолированные настоящий Nest HTTP, CQRS, ValidationPipe и Swagger,
с подменами БД/R2. Проверяет публичный доступ, создание, default, ошибки выбора,
запрет PATCH и отсутствие enum во внешнем контракте.
Новый маршрут и модели Orval сгенерированы из этого Swagger-документа,
без запуска приложения/worker. Остальные теги клиента не удалялись.
Настоящих платных генераций не выполнялось.

Итог этапа: серверные build, TypeScript, 688 unit-тестов и git diff --check проходят;
14 прежних тестов пропущены. Интеграционные HTTP/OpenAPI и PostgreSQL-проверки прошли.
Все 81 клиентская проверка диалогов проходит. Общий TypeScript клиента сохраняет
8 прежних ошибок в PhraseApi, TranslateApi, PhraseTranslationApi и CharacterAvatars;
новых ошибок этого этапа нет.

