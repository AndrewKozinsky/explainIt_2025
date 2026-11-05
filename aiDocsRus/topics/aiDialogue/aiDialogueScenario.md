# Общедоступные группы сценариев и пользовательские сценарии

Сценарий AiDialogueScenario задаёт начальную ситуацию для ролевого диалога с ИИ.
Он языконейтрален: язык практики и перевода задаётся при создании AiDialogue.
В БД `title` и `description` — JSON-строки переводов на en/es/fr/de/it/tr/ru.
API возвращает их уже на языке интерфейса из заголовка `Accept-Language` (по умолчанию en), выбор перевода —
`server/src/utils/pickLocalized.ts`; общий механизм описан в [internationalization.md](../internationalization.md).
`system_prompt` — английская инструкция только для сервера.
Создание и работа диалога описаны в [aiDialogue.md](aiDialogue.md), история — в [aiDialogueList.md](aiDialogueList.md).

## Состояние реализации

Сервер возвращает все непустые общедоступные группы со всеми их сценариями и подписанными ссылками обложек.
Один публичный сценарий входит ровно в одну группу. Пользовательские сценарии хранятся в той же таблице,
принадлежат пользователю и не могут входить в группы. Их создание через интерфейс и REST пока не реализовано.

Клиентский список использует GET /api/ai-dialogue-scenario-group через новый entity-слой групп.
Страница показывает секции с названием группы, количеством карточек, описанием группы и обложками из R2.
Модель сценария внутри GET/POST/PATCH отдельного диалога не содержит группы и обложки.

## База данных

Источник схемы — `server/src/db/dbConfig/dbConfig.ts`. Prisma-схема и типы генерируются из него.

AiDialogueScenarioGroup содержит только публичные группы:

| Поле        | Назначение                                                    |
|-------------|---------------------------------------------------------------|
| id          | Int, первичный ключ                                           |
| slug        | Обязательный уникальный стабильный ключ                       |
| title       | JSON-строка переводов названия                                |
| description | JSON-строка переводов: почему стоит выбрать сценарий группы   |
| position    | Порядок вывода; сид пишет его при каждом запуске              |
| created_at  | Дата добавления                                               |

AiDialogueScenario:

| Поле          | Назначение                                                                                     |
|---------------|------------------------------------------------------------------------------------------------|
| id            | Int, первичный ключ                                                                            |
| slug          | Уникальный стабильный ключ; обязателен для публичного сценария, nullable для пользовательского |
| title         | JSON-строка переводов названия                                                                 |
| description   | JSON-строка переводов короткого описания                                                       |
| system_prompt | Промпт начальной ситуации, не отдаётся клиенту                                                 |
| user_scenario_amendment_hint | Nullable JSON-строка переводов примера пожеланий к сцене (плейсхолдер в окне запуска)      |
| conversation_ideas | «Куда может повернуть»: JSON-строка переводов списков `{"en":["…","…"],…}`, 2–4 идеи как действия пользователя |
| trained_skills | «Что тренирует»: JSON-строка переводов одной строки |
| position      | Порядок вывода публичного сценария; у пользовательского 0                                      |
| user_id       | FK → User, null означает публичный сценарий                                                    |
| group_id      | Nullable FK → AiDialogueScenarioGroup                                                          |
| cover_s3_key  | Nullable ключ файла R2, а не URL                                                               |
| created_at    | Дата добавления                                                                                |

SQL CHECK `AiDialogueScenario_public_group_cover_check` требует:

- публичный сценарий (`user_id IS NULL`) имеет группу, непустой slug, непустой ключ обложки,
  `conversation_ideas` и `trained_skills`;
- пользовательский сценарий (`user_id IS NOT NULL`) имеет `group_id IS NULL`; обложка необязательна.

Условная обязательность задана в SQL-миграции, поскольку Prisma и текущий dbConfig её не выражают.
Nullable-поля схемы сами по себе не означают, что публичный сценарий можно создать без группы или обложки.
`createScenario` также различает эти варианты на уровне TypeScript.

Удаление непустой группы запрещено (`onDelete: Restrict`). Связь AiDialogue → AiDialogueScenario
не менялась: удаление сценария каскадно удаляет его диалоги, поэтому синхронизация сидов сценарии не удаляет.
Индексы: группы `(position, id)`; сценарии `(user_id)` и `(group_id, position, id)`.
`conversation_ideas` и `trained_skills` видит только пользователь, в промпт LLM они не попадают.
Таблицы связи многие-ко-многим нет.

## REST API

```http
GET /api/ai-dialogue-scenario-group
```

Не требует авторизации. Тексты возвращаются на языке из `Accept-Language`
(первый поддерживаемый язык с наибольшим весом, иначе en; при отсутствии перевода — en). Возвращает массив
AiDialogueScenarioGroupOutModel:

```json
[
  {
    "id": 1,
    "slug": "travel-abroad",
    "title": "Поездка за границу",
    "description": "Пригодится в поездке: пройдёте паспортный контроль, заселитесь в отель…",
    "scenarios": [
      {
        "id": 2,
        "slug": "passport-control",
        "title": "Паспортный контроль",
        "description": "...",
        "userScenarioAmendmentHint": "Например: аэропорт Токио, пограничник строгий и придирчивый",
        "conversationIdeas": ["Рассказать о цели поездки", "Показать бронь отеля и обратный билет"],
        "trainedSkills": "Отвечать пограничнику коротко и уверенно: цель поездки, срок, где будете жить",
        "coverUrl": "https://r2.example/passport-control.webp?signature=temporary"
      }
    ]
  }
]
```

Группы и сценарии в каждой группе сортируются `position ASC, id ASC`, то есть в порядке `getScenariosData()`.
`conversationIdeas` выбирается тем же правилом языка, что и строки (`pickLocalizedList`).
Пустые группы и пользовательские сценарии исключаются. При отсутствии публичных сценариев возвращается `[]`.
Пагинации, счётчиков, обёртки groups и urlsExpireAt нет. Количество — scenarios.length на клиенте.
Отдельных маршрутов группы по ID или плоского списка сценариев нет.

Контроллер → GetAiDialogueScenarioGroupsCommand → AiDialogueScenarioGroupQueryRepository.
Репозиторий выбирает только поля карточек, без system_prompt и переписки. R2-ключ используется только для
подписания и не входит в ответ. Ошибка БД/подписания не превращается в успешный пустой список.
При отсутствующем slug, ключе обложки, `conversation_ideas` или `trained_skills` возвращается CustomError
`AI_DIALOGUE_INVALID_PUBLIC_SCENARIO` со статусом 500; обработчик ошибок БД не подменяет этот код.
Ссылки формируются существующим CloudflareS3Service на шесть часов, `Cache-Control: no-store`.
Таймеры обновления URL не предусмотрены. Загруженная картинка остаётся на странице после истечения ссылки;
первая загрузка по уже истёкшей ссылке может завершиться ошибкой.
Чтение списка не проверяет наличие файлов в R2 и ничего не генерирует.

## Сиды при запуске

StartServerTasksRunner сначала применяет миграции, затем вызывает CreateAiDialogueScenariosCommand.
До начала прослушивания HTTP команда синхронизирует все группы и сценарии сида одной транзакцией.
Группы upsert по slug; сценарии upsert по slug с предварительной проверкой, что существующая запись публичная.
Конфликт slug с пользовательским сценарием отменяет транзакцию, не меняет владельца и не обновляет его сценарий.

Обновляются названия и описания групп и сценариев, подсказки пожеланий (`userScenarioAmendmentHint`),
`conversationIdeas`, `trainedSkills`, промпты, группы, ключи обложек и позиции. ID и created_at не переписываются,
поэтому повторный запуск не создаёт дубликаты.

Порядок на странице задаёт `getScenariosData()` в `CreateAiDialogueScenarios.command.ts`: позиция сценария — его индекс
в этом массиве. Позиция группы — место её первого сценария там же (`getGroupsData()`); группы без сценариев идут
в конце в порядке `groups.ts`. Сценарии одной группы должны идти в массиве подряд, это проверяет unit-тест.
Перестановка сценариев или групп меняет позиции в БД при следующем запуске. Неназванные в сиде записи не удаляются.
Неверный MODE отклоняется до записи в БД. Обновление промпта влияет на последующие ходы существующих диалогов;
сохранённые сообщения и изображения не переписываются.

| Группа                 | Сценарии (slug)                                                                               |
|------------------------|-----------------------------------------------------------------------------------------------|
| travel-abroad          | passport-control, lost-luggage, hotel-check-in, hotel-room-problem, chatty-taxi-driver, overbooked-flight, lost-with-map, airbnb-host, travel-agency, bus-tour |
| food-and-shopping      | ordering-at-a-cafe, dish-ingredients, buying-clothes, returning-an-item, shopping-at-a-market, flea-market, at-the-restaurant, music-store, wine-shop |
| city-and-services      | at-the-dentist, pool-membership, post-office                                                  |
| home-and-everyday-life | landlord-repair, move-out-inspection, roommate-candidate, dorm-roommate-rules                 |
| door-knocks            | knock-at-the-door, plumber-visit, neighbors-cat-on-balcony, leak-from-upstairs, noise-complaint, police-looking-for-witnesses |
| immigration            | visa-interview, airport-check-in, departure-passport-control, plane-seatmate-emigration, arrival-passport-control, airport-taxi-to-city, immigration-hotel-check-in, buying-a-sim-card, opening-a-bank-account, apartment-viewing, government-office, enrolling-child-in-school, fast-food-job-interview, doctor-appointment, meeting-the-neighbors, first-day-at-new-job |
| relationships          | street-acquaintance, first-date, morning-after, anniversary-dinner, forgotten-anniversary, chores-argument, jealousy, meeting-partners-parents, planning-a-vacation, moving-in-together, job-offer-abroad, partner-is-sick, partner-wants-dog, ex-in-supermarket, friend-asks-loan |
| misunderstandings-and-conflicts | celebrity-lookalike, tourist-trap, misunderstood-gesture |
| unexpected-encounters  | stuck-in-elevator, last-bus-gone, nervous-flyer, street-interview, on-the-bus, shared-umbrella |
| work                   | client-at-work, job-offer-meeting, ask-day-off, salary-negotiation, performance-review, office-party, payroll-error, colleague-quits |
| health-emergency       | pharmacy-symptoms, pharmacy-prescription, allergy-reaction, car-accident-witness, er-triage, insurance-claim, blood-donor, phone-stolen-police |
| transport-car          | car-rental-upsell, rental-car-check, car-towed, traffic-stop, bike-rental, flat-tire, public-transport-delay, parking-scratch |
| money-banking          | wrong-transfer, loan-application, currency-exchange, missed-payment, pawn-shop, split-the-bill |
| study                  | placement-interview, missed-class, tutor-first-lesson |
| kids-family            | teacher-meeting, nanny-interview, babysitter-first-day, gift-for-nephew, family-dinner, lost-child-mall |
| tech-services          | phone-repair, damaged-delivery, courier-lost |
| local-services         | at-the-hairdresser, shoe-repair, dry-cleaning, car-wash, id-photo |
| sports-leisure         | gym-trainer, sports-injury, theater-tickets |

В `groups.ts` 18 групп, у всех есть сценарии.

Данные групп — `features/aiDialogueScenario/groups.ts`: slug, название и описание на семи языках. Описание объясняет, чем полезны сценарии группы, а не пересказывает название. В папке `scenarios` у каждой группы
свой файл (`travelScenarios.ts`, `immigrationScenarios.ts`, `relationshipsScenarios.ts` и т. д.), а
`getScenariosData()` собирает их в порядке вывода на странице. Сценарии «Иммиграции» идут в порядке переезда; их промпты дополняет общее правило
`withImmigrationCountryRule`: страна — из пожеланий, иначе страна языка практики; все говорят с участником на языке
практики; визовые требования типовые, без точных сумм и сроков. В `relationshipsScenarios.ts` романтические сценарии
дополняет правило `withRomanticPartnerRule`: партнёр, свидание или бывший по умолчанию противоположного пола
(пожелания могут это изменить), романтика без откровенного содержания. Общее прошлое пары складывается в разговоре,
участник может дополнять и поправлять детали. «Друг просит в долг» правило не получает.
В `doorKnocksScenarios.ts` новые сценарии, где стучат к участнику, начинаются с общей завязки `withDoorOpening`
(та же, что у `knock-at-the-door`). В `leak-from-upstairs` наоборот: участник поднимается к соседу сверху и стучит,
кадр показывает его на площадке у открытой двери.
В `misunderstandingsAndConflictsScenarios.ts` `tourist-trap` зашит на Египет и ведёт цепочку встреч с разными
местными; `misunderstood-gesture` описывает в первой сцене безобидное действие участника, вызвавшее недоразумение
(повод выбирает модель), конфликт остаётся словесным.
В `healthEmergencyScenarios.ts` травмы и симптомы описываются реалистично, но без натурализма; симптомы, травму
и обстоятельства описывает участник. В `car-accident-witness` скорую уже вызвал прохожий, затем приезжают медики
и полиция и расспрашивают участника.
В `studyScenarios.ts` общее правило диалога «не исправлять язык участника и не превращать разговор в урок» сильнее
сценария: репетитор в `tutor-first-lesson` говорит об учёбе, а письменную работу оценивает только в общих словах. Сценарии языконейтральны;
у каждого один английский промпт, семь переводов карточки, обязательные `conversationIdeas` (`localizedList`)
и `trainedSkills` (`localized`) и необязательная подсказка пожеланий `userScenarioAmendmentHint` на семи языках. Подсказка — короткий пример вида «Например: …», показывающий, что можно настроить в этом сценарии;
сейчас она задана у всех сценариев.
Новый сценарий добавляется с уникальным slug и groupSlug, затем создаётся и вручную загружается его обложка.
Новая группа требует записи в groups.ts и расширения AiDialogueScenarioGroupSlug.

Основные правила промпта диалога сохраняются: NPC естественно играет свою роль, не исправляет язык участника,
не задаёт уровень сложности; ограничение CEFR задаётся на AiDialogue.
Пол участника общий промпт сообщает сам. Если роль NPC или завязка зависит от пола, промпт сценария задаёт её
условием: «if the participant is a man, …; if the participant is a woman, …».
В «Стуке в дверь» первое описание включает открытие двери и показывает видимого посетителя снаружи,
но дальнейшие действия выбирает участник. Посетителя выбирает ИИ; обложка не фиксирует его личность.
После завершения встречи общий промпт диалога может вводить следующего NPC.

## Как писать сценарии

- Сценарий задаёт только начальную сценку и тренирует то, с чем человек сталкивается в реальной жизни.
  Сцена уже идёт: первый NPC виден и обращается к участнику, а у участника есть выбор.
- Разговор идёт лицом к лицу, без телефонных звонков и чатов поддержки.
- Не берём сюжеты, где участнику нужно выдавать сведения, которых он не может знать (доклад о работе неизвестной
  компании, экскурсия по месту, где он не был). Ограничение «NPC спрашивает только то, что участник может знать»
  в промпт не пишем.
- Повороты сюжета в промпт не пишем, их придумывает модель. Если поворот нужен для смысла сцены, промпт говорит,
  что модель выбирает его сама («You decide…»), и приводит варианты только как примеры.
- Промпт не придумывает за участника ответы, документы, симптомы, чувства и решения. Заданное начальное действие
  участника (открыть дверь, упасть на тренировке) явно называется единственным таким действием.
- Модель держит придуманные детали неизменными: цены, курсы, суммы, адреса, меню.
- Реальные бренды и национальные стереотипы допустимы (McDonald’s, туристическая ловушка в Египте).
  Откровенных сексуальных сцен нет.
- Сценарий языконейтрален: страна и язык практики не зашиты в сюжет, кроме случаев, когда место — суть сценария.
- Тексты карточки не выдают пол участника там, где язык это позволяет.
- `conversationIdeas` пишутся как действия участника («Попросить скидку»), а не как события сцены.
  `trainedSkills` — одна строка о том, чему научится участник, без пересказа сюжета.

## Обложки и R2

Бакет — существующий CLOUDFLARE_S3_BUCKET_NAME. Ключ:

```text
ai-dialogue-public-scenarios/covers/<mode>/<slug>.webp
```

MODE берётся из MainConfigService: localtest/localdev/localcheckserver/serverdevelop/servermaster.
Регионы используют одинаковые общие обложки. Разные окружения могут иметь разные изображения одного сценария.
Полный ключ сохраняется в БД при синхронизации; смена MODE при запуске синхронизирует ключи для этого окружения.
Предполагаются отдельные БД окружений. Ключи не зависят от numeric ID или группы.

Обложки — готовые WebP 1152×576 в R2; список файлов и куда их загружать — [aiDialogueScenarioCovers.md](aiDialogueScenarioCovers.md).
Они не создаются сервером/worker и не зависят от аватара пользователя.
Это иллюстрация темы, а не обещание конкретной внешности NPC в диалоге.

Приватный бакет открывать не нужно. Отдельной команды проверки обложек нет. Эти файлы не относятся к AiDialogueImage, не удаляются
при удалении диалога и находятся вне generated-префиксов фоновой очистки.

## Запуск

Обычный запуск HTTP применяет миграции и синхронизирует сиды до начала обслуживания запросов.
Worker для сидов и обложек не нужен.

## Клиентский список

`AiDialogueScenarioGroupRepository → AiDialogueScenarioGroupService → AiDialogueScenarioGroupQueryFacade`
используют сгенерированный Orval-клиент. `AbortSignal` передаётся до fetch. Порядок групп и карточек
сохраняется из ответа сервера; счётчик вычисляется по `scenarios.length`.
Тексты приходят с сервера на языке интерфейса; `getScenarioGroupsConfig` только готовит данные для вывода
и подставляет `emptyScenarioName` вместо пустого названия сценария. `PublicScenarioGroup` выводит описание группы
одной приглушённой строкой под заголовком; пустое описание не выводится.
Модель сценария и маппер `mapToAiDialogueScenario` используются в ответах диалога.
`mapToAiDialogueScenarioGroup` передаёт в модель карточки также `conversationIdeas` и `trainedSkills`.

`PublicAiDialogueScenariosList` показывает загрузку, ошибку с кнопкой повтора или пустое состояние.
Группы выводятся адаптивной сеткой: четыре колонки на широком экране, одна на узком; короткие группы
не растягивают карточки на всю строку. Карточки используют общий `MediaCardButton`: название, описание
и фоновую обложку с соотношением 2:1. Общий компонент управляет состояниями `disabled` и `loading`:
заблокированная карточка приглушается, загрузка автоматически блокирует действие и показывает индикатор
поверх обложки. Доступное имя индикатора задаётся через `loadingLabel` (по умолчанию «Загрузка»).
Список передаёт `loadingLabel="Создаю диалог"` выбранной карточке; локальный SCSS задаёт только вид обложки.
При ошибке изображения сохраняется нейтральное место обложки, название и описание остаются доступны.
Таймеров, обновления при возврате фокуса или восстановлении сети нет.

### Модальное окно создания диалога

Клик по карточке открывает `StartDialogueModal`: обычное изображение обложки шириной 100%, локализованные группа,
название и описание, блоки «Что тренирует» и «Куда может повернуть», переключатели языка практики, сложности и стиля иллюстраций, поле «Пожелания к сцене»,
кнопка «Начать диалог».
Поле пожеланий — общий `TextInput` с `textarea` и счётчиком символов. Плейсхолдер — `userScenarioAmendmentHint` сценария,
а без него — `aiDialogueScenarioConfig.defaultUserScenarioAmendmentHint` (подстановка в `getScenarioGroupsConfig`).
Лимит `aiDialogueScenarioConfig.userScenarioAmendmentMaxLength` (400) совпадает с серверным; пока обрезанный текст длиннее,
запуск заблокирован. Значение хранится в `useStartDialogueOptions` без localStorage и передаётся в POST как `userScenarioAmendment`
(пустое — `null`). Как пожелание используется в промпте — [aiDialogue.md](aiDialogue.md).
Закрытие окна до запуска ничего не создаёт. Кнопка запуска проверяет авторизацию: гостю вместо окна запуска
показывается существующее окно входа/регистрации. Для авторизованного пользователя создаётся диалог
с выбранными `sourceLanguageCode`, `maxCefrLevel`, `illustrationStyleId` и языком перевода из локали интерфейса.
В окне доступны все языки из `face/shared/utils/languages.ts`, кроме языка интерфейса (`useLanguagesToLearn`), уровни A1/A2/B1/B2 и Any (`null`).
`useStartDialogueOptions` читает язык из `localStorageManager.lastLanguage.get()` при открытии окна
и сохраняет выбор через `lastLanguage.set()` при изменении. Ключ общий с книгами и видео.
При отсутствии или недоступном в переключателе сохранённом языке используется en; само чтение не перезаписывает ключ.
Сложность восстанавливается и сохраняется через `localStorageManager.lastAiDialogProficiency`
(отдельный ключ `lastAiDialogProficiency`). Допустимы A1/A2/B1/B2/Any; отсутствие или неверное значение
даёт Any. Оба выбора сохраняются между открытиями и перезагрузками страницы.
Фильтр видео использует отдельный ключ `lastVideoProficiency`; значения не смешиваются.
При ошибке POST текущий выбор сохраняется.
Каталог стилей загружается через AiDialogueService/QueryFacade; квадратные превью и
подписи по titleKey показывает IllustrationStyleSwitcher с LabelWithField.
Последний id сохраняется в lastAiDialogueIllustrationStyle, а недоступный вариант
заменяется серверным default. Таймеров обновления ссылок нет.
Пока каталог не даёт доступного стиля, запуск заблокирован; ошибка допускает повтор.
Подробнее: [aiDialogueIllustrationStyles.md](aiDialogueIllustrationStyles.md).
Используются готовый `LanguageSwitch` и общий `entities/aiDialogue/ui/TextLevelSwitcher.tsx`.
Переключатель сложности переиспользуется в окне запуска и настройках диалога, принимает `size`
(small по умолчанию, medium в окне запуска). Подпись Language level и вариант Any сохранены.
Пояснение передаётся через необязательный проп `description` у `TextLevelSwitcher`, который передаёт его
в `LabelWithField` для вывода после поля. Текст «Можно изменить во время разговора» задаётся только
в модальном окне; в настройках диалога описание не передаётся. Сам `Switcher` не менялся.
`StartDialogueModal.tsx` использует базовый `shared/ui/Modal/Modal.tsx`, который выводит произвольные `children`.
Стандартная обёртка с заголовком и контентом `ModalHeaderAndContent` здесь не используется: окно задаёт собственную
разметку с обложкой и блоком содержимого. Описание сценария вынесено в `ScenarioDescription.tsx`.
`LabelWithField` с `LanguageSwitch` и `TextLevelSwitcher` находятся непосредственно в `StartDialogueModal.tsx`;
отдельного компонента `StartDialogueSettings` нет.
Блоки «Что тренирует» (`trainedSkills`) и «Куда может повернуть» (`conversationIdeas`, маркированный список)
выводит `ScenarioPracticeHints.tsx` сразу под описанием, на сером фоне. На широком окне блоки стоят в две колонки,
на узком — друг под другом. Пустой блок не выводится; пустые идеи отбрасывает `getScenarioGroupsConfig`.
Заголовки блоков, как и остальные подписи окна, пока заданы по-русски в коде. Состояние и сохранение настроек остаются в `useStartDialogueOptions`.
Кнопка запуска имеет размер `big`, тему `accent` и иконку `ArrowRightPureButtonIcon`; она передаёт `settings.options`
в `onStart`. `StartDialogueModal.scss` задаёт ширину окна 50rem (не более 100%), ширину обложки 100%
и отступы блока содержимого.
До завершения POST карточки, все переключатели и кнопка запуска блокируются через disabled, выбранная карточка и кнопка показывают индикатор;
окно запуска в этот момент не закрывается. При ошибке выводится уведомление и можно повторить запуск
в том же окне. После успеха окно закрывается, инвалидируется история и выполняется переход
через локализованный router и pageUrls.
История «Мои диалоги» остаётся отдельным блоком страницы.

## Тесты

Сервер (из `server/`):

- `npm test -- --testPathPatterns='aiDialogueScenario|pickLocalized'` — unit-тесты выборки, подписания, ключей окружений,
  состава и порядка сидов (7 языков у всех текстов, 2–4 идеи) и создания пользовательского сценария.
- `npm run test:ai-dialogue-scenario-groups` — интеграционный тест на настоящей PostgreSQL: миграции, CHECK/FK,
  повторный сид, сортировка, HTTP/CQRS и OpenAPI. Требует AI_DIALOGUE_SCENARIO_TEST_DB_URL на пустую БД с точным
  именем `explainit_scenario_groups_test`; другую или непустую БД тест не использует.

Клиент (из `face/`):

```bash
node --import tsx --test tests/aiDialogue*.test.ts
PLAYWRIGHT_CHROMIUM_EXECUTABLE=/path/to/chromium npx playwright test --config playwright.ai-dialogues.config.ts aiDialogueScenarios.spec.ts
```

## Основные файлы

- `server/src/db/dbConfig/dbConfig.ts` — структура БД и метаданные OpenAPI.
- `server/src/features/aiDialogueScenario/` — сиды, генерация ключа и команды.
- `server/src/utils/pickLocalized.ts`, `server/src/infrastructure/requestLocale/` — выбор перевода и язык запроса.
- `server/src/repo/aiDialogueScenario/aiDialogueScenario.repository.ts` — бизнес-чтение, создание и синхронизация.
- `server/src/repo/aiDialogueScenarioGroup/aiDialogueScenarioGroup.queryRepository.ts` — список групп/карточек.
- `server/src/models/aiDialogueScenarioGroup/aiDialogueScenarioGroup.out.model.ts` — OutModel.
- `server/src/routes/aiDialogueScenarioGroup/` — контроллер, OpenAPI и Nest-модуль.
- `server/test/aiDialogueScenarioGroups.integration.ts` — PostgreSQL/HTTP/OpenAPI-проверка.
- `face/entities/aiDialogueScenarioGroup/` — клиентский слой групп.
- `face/widgets/aiDialogueScenario/PublicAiDialogueScenariosList/` — список, группы, карточки и создание диалога.
- `face/widgets/aiDialogueScenario/PublicAiDialogueScenariosList/ui/StartDialogueModal/` — окно создания, описание сценария, блоки «Что тренирует» и «Куда может повернуть», стили.
- `face/widgets/aiDialogueScenario/PublicAiDialogueScenariosList/fn/useStartDialogueOptions.ts` — язык, сложность и сохранение выбора.
- `face/shared/ui/Modal/Modal.tsx`, `face/shared/ui/Modal/ModalHeaderAndContent.tsx` — базовое окно и стандартная разметка заголовка с контентом.
- `face/tests/aiDialogueScenarioGroups.test.ts`, `face/tests/browser/aiDialogueScenarios.spec.ts` — проверки клиента.
