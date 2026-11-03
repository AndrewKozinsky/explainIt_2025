# Обложки общедоступных сценариев

12 готовых WebP-файлов 1152×576 (2:1), по одному на публичный сценарий. Сервер их не генерирует и не загружает:
файлы кладутся в R2 вручную, сервер только хранит ключ в `AiDialogueScenario.cover_s3_key` и подписывает ссылки.

## Куда загружать

В существующий R2-бакет из CLOUDFLARE_S3_BUCKET_NAME, с Content-Type: image/webp.
WebP-файлы нужно загрузить с исходными именами в префикс:

```text
ai-dialogue-public-scenarios/covers/<mode>/
```

Примеры:

- Локальная разработка: `ai-dialogue-public-scenarios/covers/localdev/`
- Сервер разработки: `ai-dialogue-public-scenarios/covers/serverdevelop/`
- Рабочее приложение: `ai-dialogue-public-scenarios/covers/servermaster/`

Например, ключ паспортного контроля в рабочем приложении:
`ai-dialogue-public-scenarios/covers/servermaster/passport-control.webp`.
Другие поддерживаемые MODE: localtest, localcheckserver.
Региональной папки нет: ru и intl могут использовать одни обложки.
Один и тот же набор файлов можно загрузить в несколько префиксов окружений.
Бакет остаётся приватным: API выдаёт подписанные ссылки через существующий CloudflareS3Service.

| Сценарий | Имя файла |
|---|---|
| У стоматолога | `at-the-dentist.webp` |
| Паспортный контроль | `passport-control.webp` |
| В бассейне | `pool-membership.webp` |
| Стук в дверь | `knock-at-the-door.webp` |
| Потерянный багаж | `lost-luggage.webp` |
| Заселение в отель | `hotel-check-in.webp` |
| Проблема с номером | `hotel-room-problem.webp` |
| Заказ в кафе | `ordering-at-a-cafe.webp` |
| Уточнение состава блюда | `dish-ingredients.webp` |
| Покупка одежды | `buying-clothes.webp` |
| Возврат товара | `returning-an-item.webp` |
| Покупка на рынке | `shopping-at-a-market.webp` |

## Подключение

HTTP-сервер при запуске синхронизирует группы, сценарии и ключи обложек для своего MODE.
Наличие файлов в R2 он не проверяет. Обложка иллюстрирует тему; внешность участников конкретного диалога
генерируется отдельно. Ключи обложек лежат вне generated-префиксов и не удаляются очисткой изображений диалогов.
