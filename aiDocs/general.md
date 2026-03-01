# General

## What is this app about
Это веб-приложение для изучения иностранных языков через чтение книг и просмотр видео. Сейчас пока все материалы на английском языке и перевод будет на русский.

### How the user interacts with the app
После регистрации пользователю будет доступна загрузка текстов книг и видео.
После загрузки глав книг он может перейти на страницу любой главы и начать читать.
Если какое-то предложение ему не понятно, то он может нажать на кнопку и получить перевод английского предложения на русском языке.
Аналогично и с видео: пользователь загружает видео и субтитры. Затем переход на страницу видео и смотрит видео и полный текст субтитров.
При проигрывании видео подсвечивается текущий субтитр. Он может нажать на слово в субтитре, после показывается предложение, которое относится этому субтитру и он может запросить перевод на русский язык если не понимает его смысл.

## Common rules
- Ask questions if something is unclear
- Follow the existing code style and patterns
- Write clear, concise, and well-documented code
- You cannot make more than 5 indents in the code.

## Root folder structure
- `face` — frontend part
- `server` — backend with Nest.js with PrismaORM (PostgreSQL) and GraphQL (Apollo Server)
— `nginx` — reverse proxy
— `infrastructure` — a tool for creating Docker-compose files
