## Запуск в режиме разработки
В корне проекта запустите:
```docker compose -f docker-compose.dev.yml up --build```

## Разворачивание на сервере
Перед запуском на сервере можно сделать проверку на то, соберётся ли там проект:
```docker compose -f docker-compose.server-check.yml up --build -d```

### Подключение VPN
Так как сервер обращается к API OpenAI, то необходимо подключиться к VPN. Я буду использовать FastLine VPN. Они дают ссылку (subscription link) для V2Ray/VLESS, а не сам ключ в чистом виде:
**https://fastlanehosting.ru/sub/Be6jXgfxLkQ6YvQNM**
Такие ссылки содержат список серверов в формате JSON или Base64. Такие программы типа V2Box, Shadowrocket, Clash, V2RayN могут  автоматически загружать и обновлять.

Чтобы подключиться на Ubuntu через CLI, нужно посмотреть содержимое ссылки через команду:
```curl -s https://fastlanehosting.ru/sub/Be6jXgfxLkQ6YvQNM```

Будет выведен список серверов вида:
vless://5933a6fa-d163-4392-9e8b-a435b44ba493@de15.fastlanehosting.ru:443?type=tcp&security=reality&fp=chrome&sni=store.steampowered.com&pbk=ZA_1U_jyptsFj3_858e_Cdoj4yecvxYPH7qRwwl-sE8&sid=183257bda6&spx=%2F&flow=xtls-rprx-vision#🇩🇪Germany_fastlane_pw2qa2acq

Это конфигурация VLESS. Например возьму такой:
vless://e6077b86-25f3-4efa-923b-2cc5b6616b37@nl6.fastlanehosting.ru:443?type=tcp&security=reality&fp=chrome&sni=yahoo.com&pbk=WQ0y6e1Kk1cH4gZuMOh7p2-cTubX_pJ402vy7HMwZks&sid=92&spx=%2F&flow=xtls-rprx-vision#🇳🇱Netherlands_fastlane_s86kczejq

Затем установлю Xray:
```
bash <(curl -L https://github.com/XTLS/Xray-install/raw/main/install-release.sh)
```
он установит /usr/local/bin/xray и создаст systemd-сервис

В файл /usr/local/etc/xray/config.json нужно записать детали подключения к серверу:
```json
{
  "log": {
    "loglevel": "warning"
  },
  "inbounds": [
    {
      "port": 10808,
      "listen": "127.0.0.1",
      "protocol": "socks",
      "settings": {
        "udp": true
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "vless",
      "settings": {
        "vnext": [
          {
            "address": "nl6.fastlanehosting.ru",
            "port": 443,
            "users": [
              {
                "id": "e6077b86-25f3-4efa-923b-2cc5b6616b37",
                "flow": "xtls-rprx-vision",
                "encryption": "none"
              }
            ]
          }
        ]
      },
      "streamSettings": {
        "network": "tcp",
        "security": "reality",
        "realitySettings": {
          "serverName": "yahoo.com",
          "fingerprint": "chrome",
          "publicKey": "WQ0y6e1Kk1cH4gZuMOh7p2-cTubX_pJ402vy7HMwZks",
          "shortId": "92",
          "spiderX": "/"
        }
      }
    }
  ]
}
```

Запустить Xray:
```
sudo systemctl restart xray
```
```
sudo systemctl enable xray
```

Проверить статус:
```
sudo systemctl status xray
```

Если всё работает — Xray теперь создаёт локальный SOCKS5-прокси на 127.0.0.1:10808.

Проверка соединения
```
curl --proxy socks5://127.0.0.1:10808 https://api.ipify.org
```
должен показать IP из Нидерландов (NL) или другой страны, в зависимости от сервера.

Теперь сделаю автоматический перезапуск если VPN перестанет работать.

Для этого создай файл:
**sudo nano /usr/local/bin/check-xray.sh**

с кодом:
```
#!/bin/bash

PROXY="socks5h://127.0.0.1:10808"
TARGET="https://api.openai.com/v1/models"
LOGFILE="/var/log/xray-monitor.log"

# Проверяем доступность через Xray
if ! curl -x "$PROXY" -s --max-time 10 "$TARGET" > /dev/null; then
echo "$(date '+%Y-%m-%d %H:%M:%S') VPN down, restarting Xray..." >> "$LOGFILE"
systemctl restart xray
else
echo "$(date '+%Y-%m-%d %H:%M:%S') VPN OK" >> "$LOGFILE"
fi
```

Сделать исполняемым:
```bash
sudo chmod +x /usr/local/bin/check-xray.sh
```

Добавь systemd-таймер для проверки
Создай службу 
```
sudo nano /etc/systemd/system/xray-monitor.service
```

В открывшейся файл вставить такое содержимое:
```
[Unit]
Description=Check Xray VPN connection and restart if needed
After=network-online.target

[Service]
Type=oneshot
ExecStart=/usr/local/bin/check-xray.sh
```

Создай таймер
```
sudo nano /etc/systemd/system/xray-monitor.timer
```

В открывшейся файл вставить такое содержимое:
```
[Unit]
Description=Run Xray VPN check every 2 minutes

[Timer]
OnBootSec=1min
OnUnitActiveSec=2min
Persistent=true

[Install]
WantedBy=timers.target
```

Активируй таймер:
```
sudo systemctl daemon-reload
```
```
sudo systemctl enable --now xray-monitor.timer
```

Посмотреть список таймеров:
```bash
systemctl list-timers | grep xray
```

Посмотреть лог:
```bash
tail -f /var/log/xray-monitor.log
```

Если VPN падает или Reality перестаёт отвечать — система автоматически выполнит:
```bash
systemctl restart xray
```

## Генерирование файлов Докера
Сайт запускается в контейнере Докера. Есть 5 файлов для запуска docker compose: для тестирования (на своём компьютере), разработки (на своём компьютере), для проверки что он запустится на сервере (на своём компьютере), для разворачивания ветки develop и ветки master на сервере (опубликованная версия). Так как эти файлы во многом похожи, то они генерируются из файла конфигурации. Для этого нужно зайти в infrastructure/docker-files-generator и запустить
```npm run generate-docker-files```.

Проект, запущенный для тестирования, имеет моковые данные на сервере и другой набор статей на клиенте. Проект для разработки работает так же как опубликованные. А проекты для сервера имеет команды для предварительной сборки.

## Клиент

### Генерирование блоков с транскрипциями и озвучкой
Перейдите в папку клиента
```cd face```

В файле face/articles/transcriptions/transcriptions.ts находится объект transcriptions откуда берутся транскрипции и озвученные предложения. Ключ — предложение на английском с убранными недопустимыми символами. В значении пишется оригинальное предложение на английском, транскрипция и булево значение есть ли звукозапись.

Чтобы пройти по всем главам курса и сгенерировать блоки транскрипций используйте команду
```npm run generate-transcription-items```
Но сама транскрипция и звукозапись в блоке будут пустыми.

Чтобы в пустые транскрипции записать значение запустите
```generate-transcription-texts```
Это команда обращается к серверу для получения транскрипции в ГигаЧате. Поэтому запуск Докера не должен быть в режиме тестирования.

Как сгенерировать аудио в автоматическом режиме пока не придумал.

### Сквозное тестирование
Перейдите в папку клиента
```cd face```

Запустите Playwright
```npm run test:e2e```

### Запуск в режиме разработки
Перейдите в папку клиента
```cd face```

### Генерирование файлов GraphQL
Перейдите в папку клиента
```cd face```

Создайте в папке graphql недостающие файлы .graphql. Там должны быть описаны названия запросов и мутаций, а также типы данных, которые они возвращают. Под каждую группу запросов есть свою папка. Шаблоны можно получить из http://localhost:3001/graphql.

Запустите генерацию
```npm run codegen```

В graphql/index.ts появится типы данных и хуки для манипулирования данными.

Запросы выполняются сразу при отрисовке компонента. Чтобы выполнять запрос по требованию, нужно написать код по аналогии с face/graphql/ai/graphqlAIQueries.ts. 

## Сервер

### Сквозное тестирование
Перейдите в папку сервера
```cd server```

Запуск тестов
```npm run test:e2e```

### Модульное тестирование
Перейдите в папку сервера
```cd server```

Запустите Jest
```npm run test```
или
```npm run test:watch```

### Генерирование файла Призмы и применение миграции
Если в файле с конфигурацией базы данных (server/src/db/dbConfig/dbConfig.ts) появились изменения, то нужно по ней сгенерировать файл Призмы.

Перейдите в папку сервера
```cd server```

Запустите команду
```npm run generatePrismaFile```

Затем выполните команду для создания файла миграции и применения миграции:
```npm run migrate:dev```

Если нужно стереть все данные:
```npx prisma migrate reset```

После стирания снова попробуйте запустить миграцию:
```npm run migrate:dev```

И сгенерируйте типы данных для клиента:
```npm run migrate:generate-types```

### Логи
Логи отправляются в Grafane Loki. Их можно найти на странице
```https://andkozinskiy.grafana.net/explore```

### Прочее
Деньги считаются и хранятся в БД в копейках.

Для сохранения виде в минимальном размере и максимальном качестве сначала нужно сохранить отредактированное видео в максимальном качестве. Затем применить следующую команду:
```ffmpeg -i output_lossless.mov -vf "scale=1400:-2" -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -movflags +faststart output.mp4```
output_lossless.mov — это имя файла в текущей папке.
scale=1400 — это ширина видео.
output.mp4 — имя нового файла.