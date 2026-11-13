# PostHog: аналитика и запись сессий

PostHog (облако EU) собирает события продукта и записи сессий международной версии сайта (immersia.site).
На explainit.ru, develop-сервере и локально PostHog выключен.

## Где включён

PostHog работает, только если одновременно выполняются три условия:

- окружение `servermaster`;
- регион `intl`;
- задан токен проекта.

Условия проверяют:

- клиент — `face/shared/posthog/fn/getPosthogSettings.ts` (вызывается в `app/[locale]/layout.tsx`);
- сервер — `server/src/infrastructure/posthog/posthog.module.ts`.

Регион передаёт docker-compose при запуске контейнера, поэтому на клиенте он читается при запросе
(`face/shared/utils/getRuntimeRegion.ts`), а не через `process.env.NEXT_PUBLIC_REGION`: Next.js подставил бы такое
обращение значением на момент сборки.

## Переменные окружения

| Переменная | Где используется |
|---|---|
| `NEXT_PUBLIC_POSTHOG_KEY` | face |
| `POSTHOG_KEY` | server |

Обе содержат один и тот же публичный Project token (`phc_…`) из настроек проекта PostHog. Они задаются в
`docker/.env.*`; на сервере GitHub Actions копирует env-файл в `face/.env`. Локальный контейнер face читает
`face/.env`.

## Клиент (face)

Файлы лежат в `face/shared/posthog/`:

| Файл | Назначение |
|---|---|
| `posthogConfig.ts` | адреса PostHog EU, путь прокси, атрибут открытого поля ввода |
| `PosthogProvider.tsx` | запуск PostHog, `identify(user.id)` при входе, `reset()` при выходе |
| `posthogEvents.ts` | типы событий и `capturePosthogEvent` |
| `CookieBannerIntl/` | баннер про cookies |

### Прокси

Браузер отправляет запросы на `/ingest` своего домена, а Next.js пересылает их в PostHog (`rewrites` в
`face/next.config.ts`). Так запросы не режут блокировщики рекламы. `/ingest` исключён из `matcher` в `face/proxy.ts`,
чтобы next-intl не добавлял к нему локаль.

### Запись сессий

Значения полей ввода в записях скрыты. Видно только поле с атрибутом `data-posthog-unmask`: сейчас это поле ответа
в диалоге (`AiDialogueInput.tsx`).

### События

Событие отправляется через `capturePosthogEvent` из `posthogEvents.ts`. Новое событие сначала описывается там
отдельным типом и добавляется в объединение `PosthogEvent`. Если PostHog выключен, событие не отправляется, а при
локальной разработке выводится в консоль браузера как `[PostHog] имя {свойства}`.

| Событие | Когда | Свойства |
|---|---|---|
| `scenario_opened` | открыто окно запуска сценария | `scenario_id` |
| `dialogue_started` | создан диалог | `dialogue_id`, `scenario_id`, `practice_language`, `max_cefr_level`, `illustration_style_id`, `has_scenario_amendment` |
| `first_message_sent` | первое отправленное сообщение пользователя в диалоге (реплика и/или действие; уход от NPC не считается) | `dialogue_id` |
| `dialogue_help_used` | проверка черновика (`check`) или нажатие на слово — перевод предложения и словарь (`translation`) | `dialogue_id`, `kind` |

## Сервер

`PosthogService` (`server/src/infrastructure/posthog/posthog.service.ts`) отправляет события, которые надёжно видны
только на сервере. `distinctId` — id пользователя строкой, как в `identify` на клиенте, поэтому серверные и клиентские
события попадают в один профиль. Там, где PostHog выключен, используется `PosthogServiceMock`: он пишет событие в лог.
Ошибка отправки не прерывает основной сценарий.

| Событие | Когда | Свойства |
|---|---|---|
| `user_registered` | подтверждена почта (`ConfirmEmail.command.ts`); впервые создан пользователь через OAuth или неподтверждённый пользователь вошёл через OAuth (`LoginWithOAuth.command.ts`) | `method`: `email`, `google`, `yandex`, `github` |
| `balance_exhausted` | списание за запрос к ИИ перевело баланс из плюса в ноль или минус ([billing.md](billing.md)) | `feature` |
| `ai_request_blocked_by_balance` | запрос к ИИ отклонён, потому что баланс не больше нуля | `feature` |

## Баннер про cookies

`CookieBannerIntl` показывается на immersia.site во всех окружениях. PostHog работает сразу, баннер только сообщает
об этом и ссылается на политику конфиденциальности:

- «Принять» скрывает баннер;
- «Отклонить» скрывает баннер и вызывает `posthog.opt_out_capturing()`: PostHog сам запоминает отказ для этого браузера.

Выбор хранится в localStorage (`localStorageManager.cookieBannerIntl`). Тексты — `messages/{locale}/cookieBannerIntl.json`.
Google Tag Manager баннер не выключает.

## Политика конфиденциальности

По адресу `/docs/privacy-policy` immersia.site показывает `PrivacyPolicyIntlPage` (английский, GDPR), а explainit.ru —
`PrivacyPolicyPage` (российская). При изменении собираемых данных, событий или сервисов, которым передаются данные,
нужно обновить `PrivacyPolicyIntlPage`.
