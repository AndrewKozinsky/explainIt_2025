import { ConfigSchemaV37Json } from './types/ConfigSchemaV37Json'

const domain = 'explainit.ru'
export enum EnvType {
	'test'= 'test',
	'dev'= 'dev',
	'server' = 'server',
}

/**
 * Возвращает объект конфигурации docker-compose для разработки, проверки развёртывания на сервере и для сервера
 * @param env — тип конфигурации
 * @param serverCheck — конфигурация для проверки собираемости на сервере
 */
export function createDockerConfig(env: EnvType, serverCheck?: boolean): ConfigSchemaV37Json {
	return {
		services: {
			explainnginx: {
				image: 'nginx:1.19.7-alpine',
				container_name: 'explain-nginx',
				depends_on: ['explainface', 'explainserver'],
				ports: env === EnvType.server && !serverCheck  ? undefined : ['80:80'],
				volumes: ['./nginx/nginx.conf.dev:/etc/nginx/nginx.conf'],
				environment: getNginxEnvs(env),
			},
			explainserver: {
				build: {
					context: 'server/',
					dockerfile: [EnvType.test, EnvType.dev].includes(env) ? 'Dockerfile.dev' : 'Dockerfile.server',
				},
				restart: 'unless-stopped',
				volumes: [EnvType.test, EnvType.dev].includes(env) ? ['./server/src:/app/src', './server/e2e:/app/e2e'] : undefined,
				command: [EnvType.test, EnvType.dev].includes(env) ? 'yarn start:dev' : 'yarn start:prod',
				container_name: 'explain-server',
				environment: getServerEnvs(env),
				env_file: ['.env'],
				ports: [EnvType.test, EnvType.dev].includes(env) ? ['3001:3001'] : undefined,
			},
			explainface: {
				build: {
					context: 'face/',
					dockerfile: env === 'dev' ? 'Dockerfile.dev' : 'Dockerfile.server',
				},
				restart: 'unless-stopped',
				volumes: [EnvType.test, EnvType.dev].includes(env) ? ['./face:/app', './face:/public'] : undefined,
				command: [EnvType.test, EnvType.dev].includes(env) ? 'yarn run dev' : 'yarn run start',
				container_name: 'explain-face',
				depends_on: ['explainserver'],
				environment: getFaceEnvs(env),
			},
		},
		networks: env === EnvType.server && !serverCheck ? getServerNetworks() : undefined,
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
 * @param env — тип конфигурации
 * @param serverCheck — конфигурация для проверки собираемости на сервере
 */
function getNginxEnvs(env: EnvType, serverCheck?: boolean) {
	if (env !== EnvType.server || serverCheck) return undefined

	return {
		VIRTUAL_HOST: `${domain},www.${domain}`,
		LETSENCRYPT_HOST: `${domain},www.${domain}`,
	}
}

/**
 * Возвращает переменные окружения для Api
 * @param env — тип конфигурации
 */
function getServerEnvs(env: EnvType) {
	return {
		MODE: env,
		PORT: 3001,
	}
}

/**
 * Возвращает переменные окружения для Face
 * @param env — тип конфигурации
 */
function getFaceEnvs(env: EnvType) {
	return { MODE: env }
}
