import { ConfigSchemaV37Json } from './types/ConfigSchemaV37Json'

const domain = 'explainit.ru'
export enum EnvType {
	'dev'= 'dev',
	'serverCheck' = 'serverCheck',
	'server' = 'server',
}

/**
 * Возвращает объект конфигурации docker-compose для разработки, проверки развёртывания на сервере и для сервера
 * @param env — тип конфигурации
 */
export function createDockerConfig(env: EnvType): ConfigSchemaV37Json {
	return {
		services: {
			nginx: {
				image: 'nginx:1.19.7-alpine',
				container_name: 'explain-nginx',
				depends_on: ['face', 'server'],
				ports: env === EnvType.server ? undefined : ['80:80'],
				volumes: ['./nginx/nginx.conf.dev:/etc/nginx/nginx.conf'],
				environment: getNginxEnvs(env),
			},
			server: {
				build: {
					context: 'server/',
					dockerfile: env === EnvType.dev ? 'Dockerfile.dev' : 'Dockerfile.server',
				},
				restart: 'unless-stopped',
				volumes: ['./server/src:/app/src'],
				command: env === EnvType.dev ? 'yarn start:dev' : 'yarn start:prod',
				container_name: 'explain-server',
				environment: getServerEnvs(env),
				ports: env === EnvType.dev ? ['3001:3001'] : undefined,
			},
			face: {
				build: {
					context: 'face/',
					dockerfile: env === 'dev' ? 'Dockerfile.dev' : 'Dockerfile.server',
				},
				restart: 'unless-stopped',
				volumes: env === EnvType.dev ? ['./face:/app', './face:/public'] : undefined,
				command: env === EnvType.dev ? 'yarn run dev' : 'yarn run start',
				container_name: 'explain-face',
				depends_on: ['server'],
				environment: getSiteEnvs(env),
			},
		},
		networks: env === EnvType.server ? getServerNetworks() : undefined,
	}
}

function getServerNetworks() {
	return {
		default: {
			external: {
				name: 'nginx-proxy',
			},
		},
	}
}

// Общие переменные окружения для всех сервисов
/*const commonEnvVars = {
	ADMIN_LOGIN: 'thnadz45$%',
	ADMIN_PASSWORD: 'kwcGT09%$#',
}*/

/**
 * Возвращает переменные окружения для Nginx
 * @param env — тип конфигурации
 */
function getNginxEnvs(env: EnvType) {
	if (env !== EnvType.server) return undefined

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
	// return commonEnvVars

	return {
		MODE: env === EnvType.dev ? 'dev' : 'server',
		PORT: 3001,
	}
}

/**
 * Возвращает переменные окружения для Face
 * @param env — тип конфигурации
 */
function getSiteEnvs(env: EnvType) {
	return {}

	/*let envMode = 'dev'
	if (env !== 'dev') {
		envMode = 'server'
	}

	return { ...commonEnvVars, ENV_MODE: envMode }*/
}
