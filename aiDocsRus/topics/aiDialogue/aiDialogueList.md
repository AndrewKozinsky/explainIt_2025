# Мои диалоги

Серверный контракт секции «Мои диалоги» страницы `/dialogues` подготовлен для вывода последних диалогов
текущего пользователя и загрузки более ранних. Адаптация клиентского интерфейса выполняется отдельным этапом.
Модель диалога, создание, сообщения и удаление описаны в [aiDialogue.md](aiDialogue.md).
Сценарии описаны в [aiDialogueScenario.md](aiDialogueScenario.md).

## Границы данных персонажей

Каждый элемент списка относится к одному AiDialogue. Его characters собирается только из связанных
AiDialogueCharacter и старых npcActions с тем же dialogue_id. Объединения персонажей на уровне сценария нет.
Слово «старые» относится к сообщениям до появления реестра AiDialogueCharacter внутри этого же диалога.
Одинаковый npcId в другом диалоге означает другого персонажа, с собственным именем и спрайтом.

## Серверный контракт

`GET /api/ai-dialogue?page=1&pageSize=3` возвращает только диалоги текущего пользователя.
Параметры необязательны: page=1, pageSize=3; принимаются целые числа, page≥1, 1≤pageSize≤100.
Сортировка — `created_at DESC, id DESC`, независимо от даты последнего сообщения или изменения настроек.
Ответ `AiDialoguesPageOutModel`:

```json
{
  "page": 1,
  "pageSize": 3,
  "total": 7,
  "totalPages": 3,
  "urlsExpireAt": "2026-10-24T15:00:00.000Z",
  "items": [{
    "id": 5,
    "scenario": { "id": 2, "title": "{\"ru\":\"Покупка абонемента в бассейн\",\"en\":\"Pool membership\"}" },
    "sourceLanguageCode": "en",
    "maxCefrLevel": null,
    "createdAt": "2026-10-20T10:00:00.000Z",
    "lastMessage": {
      "id": 90,
      "npcId": "anna",
      "name": "Anna",
      "role": "receptionist",
      "text": "Would you like a monthly membership?",
      "textType": "speech",
      "createdAt": "2026-10-23T15:30:00.000Z"
    },
    "sceneImage": null,
    "characters": [{
      "npcId": "anna", "name": "Anna", "role": "receptionist",
      "generationStatus": "generating", "emotionSheet": null
    }]
  }]
}
```

- `scenario` — вложенный объект с id и title; title остаётся JSON-строкой переводов.
- `maxCefrLevel: null` означает «без ограничения». Названия языка, подписи CEFR и относительных дат формирует клиент.
- `lastMessage` — именно последнее сохранённое `npcActions`. Более поздние userActions, userAvoidsNPC,
  help, worldEvent или sceneUpdate его не заменяют. Дата относится к этому же сообщению NPC;
  `updatedAt` контейнера не используется. При отсутствии npcActions — null.
- Внутри последнего npcActions непустые speech соединяются переносом строки в исходном порядке;
  если речи нет — аналогично action. Если нет ни речи, ни действий, text="", textType=null.
  Идентичность NPC берётся из payload и работает в старых сообщениях без character_id.
- `sceneImage` — готовое изображение **последнего sceneUpdate**. Если эта сцена ещё не имеет изображения,
  возвращается null, даже когда у более ранних сцен есть картинки. Генерация при чтении не запускается.
- `characters` содержит всех NPC за всю историю **конкретного диалога** (items[i].id), без пользователя
  и без ограничения количества. NPC других диалогов не включаются, даже если scenario.id и npcId совпадают.
  Идентификатор в этом списке — npcId, уникальный в рамках диалога. Старые NPC без записи AiDialogueCharacter
  восстанавливаются только для ответа из публичных метаданных сообщений, без записи в БД или генерации спрайтов.
  Их emotionSheet/generationStatus равны null. Новые NPC возвращаются и до готовности спрайта.
- `sceneImage` и `emotionSheet` используют AiDialogueImageOutModel: id/url/mimeType/width/height/layoutVersion.
  Для neutral используется верхняя левая ячейка emotion-grid-4x3-v1; обрезка и размеры — задача клиента.
- Ссылки R2 подписываются после owner-scoped чтения БД, действуют 6 часов;
  urlsExpireAt рекомендует обновить страницу данных через 5 часов. `Cache-Control: private, no-store`.
- Подсчёт, страница, NPC и выбранные сообщения читаются в RepeatableRead. MAX(id) по npcActions/sceneUpdate
  ограничивает загрузку двумя payload на диалог; полная история в приложение не передаётся.
  Старые NPC читаются одним параметризованным SQL-запросом для страницы с дедупликацией в БД.
- Для пустой страницы items=[], totalPages=Math.ceil(total/pageSize); при total=0 — totalPages=0.
  Кнопка следующей страницы нужна при page<totalPages. После создания/удаления клиент должен перечитать
  загруженную часть списка, чтобы смещение offset-пагинации не пропустило элементы.

Контракт списка заменяет прежний массив, отдельного маршрута совместимости нет. Клиентский список и генерация
Orval в этом этапе не менялись: перед использованием нового ответа требуется отдельная адаптация клиента.
Удаление продолжает использовать существующий DELETE и клиентскую DeleteEntityModal.

Миграция `20261024120000_ai_dialogue_list_indexes` добавляет только составные индексы для списка и сообщений.
Схема и Prisma Client перегенерированы из dbConfig; миграцию нужно применить обычным `npm run migrate:deploy`
из server с нужным окружением. Во время реализации миграция к БД не применялась.

Проверки этапа: серверные build, TypeScript и git diff --check проходят. Полный набор — 601 успешный тест,
14 ранее существовавших тестов пропущены; целевой набор диалогов — 369 успешных тестов.
Новые проверки покрывают параметры пагинации, owner-scoped запросы и согласованный снимок, ограниченную загрузку
сообщений, речь/действия последнего NPC, старые payload/NPC, отсутствие картинок и пустые страницы.
БД и R2 подменены; приложение, worker и платные генерации не запускались.

## Текущий клиентский список

Ниже описан прежний клиент. Он ещё не адаптирован к новому AiDialoguesPageOutModel;
изменение клиента и регенерация Orval выполняются отдельным этапом.

Рендерится только для залогиненного пользователя. Пустой список → сообщение-заглушка; непустой →
`UserAiDialoguesList` (карточки `MediaCardButton` с названием сценария, резолвнутым через
`pickLocalized(dialogue.scenario.title, locale)`). У карточки иконка удаления (`TrashButtonIcon`) → модалка
`DeleteEntityModal` → `deleteDialogue` + инвалидация кэша.

Ключ кэша прежнего списка — `['ai-dialogue', 'list']`.

## Ключевые файлы

- `server/src/repo/aiDialogue/aiDialogueList.queryRepository.ts` — пагинированный список с иллюстрацией,
  всеми NPC конкретного диалога и его последним сообщением NPC; без загрузки полной истории.
- `server/src/models/aiDialogue/aiDialogueList.out.model.ts` — отдельные модели страницы/карточки/последнего сообщения/NPC.
- `server/src/routes/aiDialogue/inputs/getUserDialogues.input.ts` — валидация page/pageSize.
- `server/src/features/aiDialogue/getAiDialogueLastMessage.ts` — выбор речи или действий из последнего npcActions.
- `server/src/repo/aiDialogue/aiDialogueList.queryRepository.helpers.ts` — выборки, SQL старых NPC,
  сопоставление по dialogue_id, маппинг карточек и подписание ссылок; в репозитории остаётся управление транзакцией.
- `server/src/repo/aiDialogue/aiDialogueList.queryRepository.spec.ts` — проверки списка, включая изоляцию NPC
  двух диалогов одного сценария с одинаковыми npcId и разными аватарами.
- `face/widgets/aiDialogues/UserAiDialoguesList/UserAiDialoguesList.tsx` — история диалогов пользователя.
- `face/widgets/aiDialogues/UserAiDialoguesList/fn/getDialoguesCardsConfig.ts` — маппинг диалогов в карточки
  (резолвит название через `pickLocalized`).
- `face/widgets/aiDialogues/UserAiDialoguesList/fn/useAiDialogueDelete.ts` — удаление диалога.
