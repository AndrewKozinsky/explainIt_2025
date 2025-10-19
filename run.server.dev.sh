git pull

# Останавливаем и удаляем существующие контейнеры
docker compose -f docker-compose.server.develop.yml --env-file .env.serverdevelop down 2>/dev/null || true

# Запускаем контейнеры
(docker compose -f docker-compose.server.develop.yml --env-file .env.serverdevelop up --build) &
sleep 10
cd server || exit
npm run migrate:dev
