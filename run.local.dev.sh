(docker compose -f docker-compose.local.dev.yml --env-file .env.localdevelop up --build) &
sleep 10
cd server || exit
npm run migrate:dev
