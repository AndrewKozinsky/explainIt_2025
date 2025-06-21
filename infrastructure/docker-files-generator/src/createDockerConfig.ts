import { ConfigSchemaV37Json } from './types/ConfigSchemaV37Json'

export enum Mode {
	test = 'test',
	dev = 'dev',
	publish = 'publish',
}

function getDomain(mode: Mode) {
	return mode === Mode.dev ? 'develop.explainit.ru' : 'explainit.ru'
}

/**
 * Возвращает объект конфигурации docker-compose для разработки, проверки развёртывания на сервере и для сервера
 * @param mode — тип работы
 * @param serverCheck — конфигурация для проверки собираемости на сервере
 */
export function createDockerConfig(mode: Mode, serverCheck?: boolean): ConfigSchemaV37Json {
	const isDev = [Mode.test, Mode.dev].includes(mode)

	return {
		services: {
			explainnginx: {
				image: 'nginx:1.19.7-alpine',
				container_name: 'explain-nginx',
				depends_on: ['explainface', 'explainserver'],
				ports: isDev || serverCheck ? ['80:80'] : undefined,
				volumes: ['./nginx/nginx.conf.dev:/etc/nginx/nginx.conf'],
				environment: getNginxEnvs(mode),
			},
			explainserver: {
				build: {
					context: 'server/',
					dockerfile: isDev ? 'Dockerfile.dev' : 'Dockerfile.server',
				},
				restart: 'unless-stopped',
				volumes: isDev ? ['./server/src:/app/src', './server/e2e:/app/e2e'] : undefined,
				command: isDev ? 'yarn start:dev' : 'yarn start:prod',
				container_name: 'explain-server',
				environment: getServerEnvs(mode),
				env_file: ['.env'],
				ports: isDev ? ['3001:3001'] : undefined,
			},
			explainface: {
				build: {
					context: 'face/',
					dockerfile: isDev ? 'Dockerfile.dev' : 'Dockerfile.server',
				},
				restart: 'unless-stopped',
				volumes: isDev ? ['./face:/app', './face:/public'] : undefined,
				command: isDev ? 'yarn run dev' : 'yarn run start',
				container_name: 'explain-face',
				depends_on: ['explainserver'],
				environment: getFaceEnvs(mode),
			},
		},
		networks: mode === Mode.publish && !serverCheck ? getServerNetworks() : undefined,
	}
}

function getServerNetworks() {
	return {
		default: {
			external: true,
			name: 'nginx-proxy',
		},
	}
}

/**
 * Возвращает переменные окружения для Nginx
 * @param mode — тип конфигурации
 * @param serverCheck — конфигурация для проверки собираемости на сервере
 */
function getNginxEnvs(mode: Mode, serverCheck?: boolean) {
	if (mode !== Mode.publish || serverCheck) return undefined

	const domain = getDomain(mode)
	const domains = `${domain},www.${domain}`

	return {
		VIRTUAL_HOST: domains,
		LETSENCRYPT_HOST: domains,
	}
}

/**
 * Возвращает переменные окружения для Api
 * @param mode — тип конфигурации
 */
function getServerEnvs(mode: Mode) {
	return {
		MODE: mode,
		PORT: 3001,
	}
}

/**
 * Возвращает переменные окружения для Face
 * @param mode — тип конфигурации
 */
function getFaceEnvs(mode: Mode) {
	return { MODE: mode }
}
