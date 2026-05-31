# Использование прокси

Пример кода чтобы запросы с сервера шли через прокси-сервер:
```typescript
import { HttpsProxyAgent } from 'https-proxy-agent'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import axios from 'axios'

export class MyService {
    private readonly httpsAgent: HttpsProxyAgent<string>

    constructor(private readonly mainConfig: MainConfigService) {
        this.httpsAgent = new HttpsProxyAgent(this.mainConfig.get().proxyUrl)
    }
    async makeRequest() {
        const response = await axios.post(
            'https://api.example.com/data',
            {
                // ... request body
            },
            {
                headers: {
                   // ... headers
                },
                httpsAgent: this.httpsAgent,
                proxy: false,
	            },
	         )
	        // ...
	    }
	}
	```

	## Docker конфигурация

	Docker-compose файлы не редактируются напрямую. Вместо этого используется генератор:

	`infrastructure/docker-files-generator/src/createDockerConfig.ts`

	Функция `createDockerConfig(mode: Mode)` принимает режим работы (`localtest`, `localdev`, `localcheckserver`, `serverdevelop`, `servermaster`) и возвращает объект конфигурации docker-compose.

	Для добавления нового volume или сервиса нужно редактировать именно эту функцию, а затем сгенерировать docker-compose файл:

	```bash
	cd infrastructure/docker-files-generator
	npm run build && npm run generate
	```

	Готовые docker-compose файлы находятся в корне проекта.

	Если контент (например, `content/` или другие общие директории) должен быть доступен в нескольких контейнерах, volume монтирования нужно добавить в соответствующую секцию сервиса в `createDockerConfig.ts`.
