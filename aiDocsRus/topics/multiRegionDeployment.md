# Мультирегиональное развёртывание

Проект имеет две региональные версии, которые разворачиваются на разных серверах:

| Версия | Домен | Сервер | Регион |
|--------|-------|--------|--------|
| Российская | `explainit.ru` | `185.170.10.212` | `ru` |
| Международная | `immersia.site` | отдельный сервер | `intl` |

Код один и тот же. Разница только в значении переменной окружения `NEXT_PUBLIC_REGION`, которую получает контейнер `face` (Next.js). На её основе клиентский код может включать разную логику для разных регионов.

## Как работает развёртывание

Развёртывание происходит через **GitHub Actions**. Есть две основные ветки:

- `develop` — dev-окружение
- `master` — production-окружение

При пуше в ветку срабатывают **4 воркфлоу** (по региону × окружению):

| Файл воркфлоу | Ветка | Сервер | Docker-compose файл |
|---------------|-------|--------|---------------------|
| `develop_ru_workflow.yml` | `develop` | Россия, dev | `docker-compose.server.develop.ru.yml` |
| `develop_intl_workflow.yml` | `develop` | Международный, dev | `docker-compose.server.develop.intl.yml` |
| `master_ru_workflow.yml` | `master` | Россия, prod | `docker-compose.server.master.ru.yml` |
| `master_intl_workflow.yml` | `master` | Международный, prod | `docker-compose.server.master.intl.yml` |

Каждый воркфлоу:
1. Подключается по SSH к нужному серверу
2. Делает `git pull` соответствующей ветки
3. Создаёт `.env`-файл из GitHub Secrets
4. Запускает docker compose с нужным конфигом

Пример команды внутри воркфлоу (для российского dev-сервера):

```bash
cd ~/sites/explain_dev
docker compose -f docker/docker-compose.server.develop.ru.yml \
  --project-directory . \
  --env-file docker/.env.serverdevelop \
  up --build -d
```

Флаг `--project-directory .` нужен, потому что docker-compose файлы лежат в подпапке `docker/`, а пути внутри них (`context: server/`, `volumes: ./nginx/...`) относительны корня проекта.

## Переменная NEXT_PUBLIC_REGION

Задаётся в docker-compose жёстко, для каждого региона своё значение:

```yaml
# docker-compose.server.develop.ru.yml
explainfaceserverdevelop:
  environment:
    MODE: serverdevelop
    NEXT_PUBLIC_REGION: ru
```

```yaml
# docker-compose.server.develop.intl.yml
explainfaceserverdevelop:
  environment:
    MODE: serverdevelop
    NEXT_PUBLIC_REGION: intl
```

Префикс `NEXT_PUBLIC_` делает переменную доступной как на сервере (SSR), так и в браузере.

### Использование в коде

```typescript
import { mainConfig } from 'face/сonsts/mainConfig'

// mainConfig.region → 'ru' | 'intl'
if (mainConfig.region === 'intl') {
  // Логика для immersia.site
}
```

Значение хранится в `face/сonsts/mainConfig.ts`:

```typescript
export const mainConfig = {
  // ...
  region: process.env.NEXT_PUBLIC_REGION as 'ru' | 'intl',
}
```

## Генератор docker-compose файлов

Docker-compose файлы **не редактируются вручную**. Они генерируются инструментом в `infrastructure/docker-files-generator/`.

Главный файл — `infrastructure/docker-files-generator/src/createDockerConfig.ts`. Функция `createDockerConfig(mode, region)` принимает два параметра:

| Параметр | Тип | Значения |
|----------|-----|----------|
| `mode` | `Mode` | `localTest`, `localDev`, `localCheckServer`, `serverDevelop`, `serverMaster` |
| `region` | `Region` | `'ru'`, `'intl'` |

Регион влияет только на:
- `NEXT_PUBLIC_REGION` в face-контейнере (через `getFaceEnvs`)
- Домены `VIRTUAL_HOST`/`LETSENCRYPT_HOST` в nginx-контейнере (через `getNginxEnvs`)

Всё остальное (порты, имена контейнеров, ссылки на nginx.conf) не зависит от региона — серверы разные, конфликтов нет.

Список генерируемых файлов задаётся в `createFiles.ts`. Сейчас генерируется 10 конфигов (5 режимов × 2 региона).

### Как сгенерировать

```bash
cd infrastructure/docker-files-generator
npm run generate-docker-files
```

Файлы создаются в папку `docker/` в корне проекта.

## Структура папки docker/

```
docker/
├── .env.localtest            # env-файлы (создаются вручную или CI, не в git)
├── .env.localdev
├── .env.serverdevelop
├── .env.servermaster
├── docker-compose.local.test.ru.yml
├── docker-compose.local.test.intl.yml
├── docker-compose.local.dev.ru.yml
├── docker-compose.local.dev.intl.yml
├── docker-compose.local.server-check.ru.yml
├── docker-compose.local.server-check.intl.yml
├── docker-compose.server.develop.ru.yml
├── docker-compose.server.develop.intl.yml
├── docker-compose.server.master.ru.yml
├── docker-compose.server.master.intl.yml
├── run.local.test.sh
├── run.local.dev.sh
├── run.local.checkserver.sh
├── run.server.dev.sh
├── run.server.master.sh
├── stop.local.dev.sh
└── stop.local.checkserver.sh
```

## Добавление нового региона

1. Добавить значение в тип `Region` в `createDockerConfig.ts`:
   ```typescript
   export type Region = 'ru' | 'intl' | 'cn'
   ```

2. Добавить домены в `getNginxEnvs()`:
   ```typescript
   const domain = mode === Mode.serverDevelop
     ? (isCn ? 'dev.explain-cn.cn' : ...)
     : (isCn ? 'explain-cn.cn' : ...)
   ```

3. Добавить новые записи в `createFiles.ts`:
   ```typescript
   { name: 'server.develop.cn', content: createDockerConfig(Mode.serverDevelop, 'cn') },
   { name: 'server.master.cn', content: createDockerConfig(Mode.serverMaster, 'cn') },
   // ... и для local-режимов при необходимости
   ```

4. Создать воркфлоу `develop_cn_workflow.yml` и `master_cn_workflow.yml` для нового сервера.

5. Обновить тип `NEXT_PUBLIC_REGION` в `face/types/env.d.ts`.

6. Перегенерировать docker-compose файлы.

## GitHub Secrets

Для каждого сервера используются секреты:

| Secret | Назначение |
|--------|------------|
| `SSH_PRIVATE_KEY` | SSH-ключ для доступа к российскому серверу |
| `SSH_PRIVATE_KEY_INTL` | SSH-ключ для доступа к международному серверу |
| `ENV_FILE_DEV` | Содержимое `.env`-файла для dev-окружения |
| `ENV_FILE_MASTER` | Содержимое `.env`-файла для production-окружения |
