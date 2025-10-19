git pull

(docker compose -f docker-compose.server.dev.yml --env-file .env.serverdev up --build) &
sleep 10
cd server || exit
yarn run migrate:dev
