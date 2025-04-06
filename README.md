## Запуск в режиме разработки
В корне проекта запустите:
```docker compose -f docker-compose.dev.yml up --build```

## Генерирование файлов Докера
Сайт запускается в контейнере Докера. Есть 3 файла для запуска docker compose: для разработки, для проверки что он запустится на сервере и для сервера (опубликованная версия). Так как эти файлы во многом похожи, то они генерируются из файла конфигурации. Для этого нужно зайти в infrastructure/docker-files-generator и запустить
```yarn run generate-docker-files```.