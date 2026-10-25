# Обложки общедоступных сценариев

12 готовых WebP-файлов, 1152×576 (2:1). Сгенерированы встроенным image_gen;
PNG-оригиналы конвертированы в WebP с уменьшением до размера карточки (качество 88).
Пользователь перенёс файлы в R2; локальная папка `server/assets/aiDialogue/public-scenario-covers/`
больше не используется. Вспомогательные preview.jpg, generation.json и README для работы приложения не нужны.

25 октября 2026 все 12 обложек загружены в настроенный R2-бакет окружения localdev
с префиксом `ai-dialogue-public-scenarios/covers/localdev/` и Content-Type `image/webp`.
После загрузки проверено совпадение SHA-256 удалённых файлов с локальными.
Для servermaster и остальных MODE загрузка пока не подтверждена. Работающий сервер читает изображения из R2.
При проверке клиентской страницы все 12 обложек localdev успешно загрузились в браузере.

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
Загружать preview.jpg или сам ZIP в папку обложек не нужно.
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

После применения новой миграции обновлённый HTTP-сервер синхронизирует группы, сценарии
и ключи обложек для своего MODE. Сервер сам файлы не загружает и наличие в R2 не проверяет.
При переносе старых четырёх сценариев миграция временно использует `_seed-pending`;
сид при bootstrap заменяет эти ключи до открытия HTTP. В `_seed-pending` загружать ничего не нужно.
Проверка загрузки и содержимого файлов R2 выполняется вручную.

Обложка иллюстрирует тему. Внешность участников конкретного диалога генерируется отдельно.
Ключи обложек лежат вне generated-префиксов и не удаляются очисткой изображений диалогов.
