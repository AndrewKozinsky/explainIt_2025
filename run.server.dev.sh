git pull

(docker compose -f docker-compose.server.develop.yml --env-file .env.serverdevelop up --build) &
sleep 10
cd server || exit
npm run migrate:dev
