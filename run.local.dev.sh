(docker compose -f docker-compose.local.dev.yml --env-file .env.local.dev up --build) &
sleep 10
cd server || exit
npm run migrate:dev
