git pull

# Останавливаем и удаляем существующие контейнеры
docker compose -f docker-compose.server.develop.ru.yml --project-directory .. --env-file .env.serverdevelop down 2>/dev/null || true

# Запускаем контейнеры
docker compose -f docker-compose.server.develop.ru.yml --project-directory .. --env-file .env.serverdevelop up --build
