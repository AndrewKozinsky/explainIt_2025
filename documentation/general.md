# General

## О чём это приложение

Веб-приложение для изучения иностранных языков: английского, испанского, французского, немецкого, итальянского,
турецкого и русского (список — `face/shared/utils/languages.ts`). Интерфейс переведён на те же 7 языков. Сервис
бесплатный, работает как адаптивный сайт, мобильного приложения нет.

### Главный раздел — диалоги с ИИ

Ролевая сценка с ИИ на изучаемом языке. Подробности — [aiDialogue/overview.md](aiDialogue/overview.md).

### Книги и видео

Пользователю доступны книги и фильмы на изучаемых языках, можно загрузить свои. Сервер делит тексты и субтитры на
предложения. При чтении или просмотре видео (подсвечивается текущий субтитр) пользователь нажимает на незнакомое слово и
получает перевод предложения и разбор слова или фразы.

## Common rules

- Ask questions if something is unclear
- Follow the existing code style and patterns
- Write clear, concise, and well-documented code
- You cannot make more than 5 indents in the code.

## Root folder structure

- `face` — фронтенд: Next.js, next-intl, SCSS, TanStack Query (клиент API генерируется Orval из OpenAPI), Zustand.
- `server` — бэкенд: NestJS + CQRS, REST, Prisma (PostgreSQL), Redis, BullMQ worker (изображения, озвучка, субтитры),
  файлы в Cloudflare R2.
- `docker` — compose-файлы и скрипты запуска.
- `nginx` — reverse proxy.
- `infrastructure` — генератор Docker-compose файлов.

## Запуск приложения

Все части приложения находятся в отдельных контейнерах. Запуск локальной разработки из папки `docker`
(`run.local.dev.sh`):
```docker compose -f docker-compose.local.dev.ru.yml --project-directory .. --env-file .env.localdev up --build```
