git pull

(docker compose -f docker-compose.serverdevelop.yml --env-file .env.serverdevelop up --build) &
sleep 10
cd server || exit
npm run migrate:dev
