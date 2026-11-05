# Обложки общедоступных сценариев

WebP-файлы 1152×576 (2:1), по одному на публичный сценарий. Сервер их не генерирует, не загружает и не проверяет: пока файла нет, карточка показывается без картинки;
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
| Собеседование в посольстве | `visa-interview.webp` |
| Регистрация на рейс | `airport-check-in.webp` |
| Паспортный контроль на вылете | `departure-passport-control.webp` |
| Попутчик в самолёте | `plane-seatmate-emigration.webp` |
| Паспортный контроль по прилёте | `arrival-passport-control.webp` |
| Такси из аэропорта | `airport-taxi-to-city.webp` |
| Отель на первое время | `immigration-hotel-check-in.webp` |
| Сим-карта и тариф | `buying-a-sim-card.webp` |
| Открытие банковского счёта | `opening-a-bank-account.webp` |
| Просмотр квартиры | `apartment-viewing.webp` |
| Госучреждение | `government-office.webp` |
| Запись ребёнка в школу | `enrolling-child-in-school.webp` |
| Собеседование в McDonald’s | `fast-food-job-interview.webp` |
| Приём у врача | `doctor-appointment.webp` |
| Знакомство с соседями | `meeting-the-neighbors.webp` |
| Первый день на работе | `first-day-at-new-job.webp` |
| Знакомство на улице | `street-acquaintance.webp` |
| Первое свидание | `first-date.webp` |
| Утро после первой ночи | `morning-after.webp` |
| Ужин в годовщину | `anniversary-dinner.webp` |
| Забыли про годовщину | `forgotten-anniversary.webp` |
| Ссора из-за домашних дел | `chores-argument.webp` |
| Ревность | `jealousy.webp` |
| Знакомство с родителями | `meeting-partners-parents.webp` |
| Планируем отпуск | `planning-a-vacation.webp` |
| Съезжаемся | `moving-in-together.webp` |
| Работа в другой стране | `job-offer-abroad.webp` |
| Партнёр заболел | `partner-is-sick.webp` |
| Партнёр хочет собаку | `partner-wants-dog.webp` |
| Встреча с бывшим | `ex-in-supermarket.webp` |
| Друг просит в долг | `friend-asks-loan.webp` |
| Сантехник по вызову | `plumber-visit.webp` |
| Кошка на балконе | `neighbors-cat-on-balcony.webp` |
| Потоп сверху | `leak-from-upstairs.webp` |
| Жалоба на шум | `noise-complaint.webp` |
| Полиция ищет свидетелей | `police-looking-for-witnesses.webp` |
| Двойник знаменитости | `celebrity-lookalike.webp` |
| Туристическая ловушка | `tourist-trap.webp` |
| Вас неправильно поняли | `misunderstood-gesture.webp` |
| Застряли в лифте | `stuck-in-elevator.webp` |
| Последний автобус ушёл | `last-bus-gone.webp` |
| Соседка в самолёте | `nervous-flyer.webp` |
| Интервью на улице | `street-interview.webp` |
| В автобусе | `on-the-bus.webp` |
| Общий зонт | `shared-umbrella.webp` |
| Клиент на работе | `client-at-work.webp` |
| Предложение о работе | `job-offer-meeting.webp` |
| Отпроситься с работы | `ask-day-off.webp` |
| Разговор о зарплате | `salary-negotiation.webp` |
| Оценка работы | `performance-review.webp` |
| Корпоратив | `office-party.webp` |
| Ошибка в зарплате | `payroll-error.webp` |
| Увольняется лучший коллега | `colleague-quits.webp` |
| В аптеке без рецепта | `pharmacy-symptoms.webp` |
| В аптеке с рецептом | `pharmacy-prescription.webp` |
| Аллергическая реакция | `allergy-reaction.webp` |
| Свидетель аварии | `car-accident-witness.webp` |
| Приёмный покой | `er-triage.webp` |
| Страховой случай | `insurance-claim.webp` |
| Донорский центр | `blood-donor.webp` |
| Украли телефон | `phone-stolen-police.webp` |
| Прокат машины | `car-rental-upsell.webp` |
| Приём арендованной машины | `rental-car-check.webp` |
| Машину эвакуировали | `car-towed.webp` |
| Остановила полиция | `traffic-stop.webp` |
| Прокат велосипеда | `bike-rental.webp` |
| Прокол колеса | `flat-tire.webp` |
| Автобус опаздывает | `public-transport-delay.webp` |
| Царапина на парковке | `parking-scratch.webp` |
| Ошибочный перевод | `wrong-transfer.webp` |
| Заявка на кредит | `loan-application.webp` |
| Обменник | `currency-exchange.webp` |
| Просрочка по кредиту | `missed-payment.webp` |
| Ломбард | `pawn-shop.webp` |
| Делим счёт | `split-the-bill.webp` |
| Тест на уровень языка | `placement-interview.webp` |
| Пропущенные занятия | `missed-class.webp` |
| Первое занятие с репетитором | `tutor-first-lesson.webp` |
| Вызвали к учителю | `teacher-meeting.webp` |
| Собеседование с няней | `nanny-interview.webp` |
| Няня в первый день | `babysitter-first-day.webp` |
| Подарок племяннику | `gift-for-nephew.webp` |
| Семейный ужин | `family-dinner.webp` |
| Потерявшийся ребёнок | `lost-child-mall.webp` |
| Ремонт телефона | `phone-repair.webp` |
| Мятая посылка | `damaged-delivery.webp` |
| Курьер не может найти дом | `courier-lost.webp` |
| В парикмахерской | `at-the-hairdresser.webp` |
| Сапожник | `shoe-repair.webp` |
| Химчистка | `dry-cleaning.webp` |
| Автомойка | `car-wash.webp` |
| Фото на документы | `id-photo.webp` |
| Первый визит в спортзал | `gym-trainer.webp` |
| Травма на тренировке | `sports-injury.webp` |
| Два билета на сегодня | `theater-tickets.webp` |
| Таксист-болтун | `chatty-taxi-driver.webp` |
| Перебронированный рейс | `overbooked-flight.webp` |
| Заблудились в городе | `lost-with-map.webp` |
| Встреча с хозяином жилья | `airbnb-host.webp` |
| В турагентстве | `travel-agency.webp` |
| Автобусная экскурсия | `bus-tour.webp` |
| На почте | `post-office.webp` |
| Хозяйка пришла чинить | `landlord-repair.webp` |
| Выезд и залог | `move-out-inspection.webp` |
| Ищем соседа | `roommate-candidate.webp` |
| Сосед по общежитию | `dorm-roommate-rules.webp` |
| Блошиный рынок | `flea-market.webp` |
| В ресторане | `at-the-restaurant.webp` |
| В музыкальном магазине | `music-store.webp` |
| Винный магазин | `wine-shop.webp` |

## Подключение

HTTP-сервер при запуске синхронизирует группы, сценарии и ключи обложек для своего MODE.
Наличие файлов в R2 он не проверяет. Обложка иллюстрирует тему; внешность участников конкретного диалога
генерируется отдельно. Ключи обложек лежат вне generated-префиксов и не удаляются очисткой изображений диалогов.
