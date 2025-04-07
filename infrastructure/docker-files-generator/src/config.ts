import { ConfigSchemaV37Json } from './types/ConfigSchemaV37Json'

const domain = 'explainit.ru'
type EnvType = 'dev' | 'serverCheck' | 'server'

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
				depends_on: ['site'],
				ports: env === 'server' ? undefined : ['80:80'],
				volumes: ['./nginx/nginx.conf.dev:/etc/nginx/nginx.conf'],
				environment: getNginxEnvs(env),
			},
			/*api: {
				build: {
					context: 'api/',
					dockerfile: env === 'dev' ? 'Dockerfile.dev' : 'Dockerfile.server',
				},
				restart: 'unless-stopped',
				volumes: ['./api/src:/app/src'],
				command: env === 'dev' ? 'npm run start:dev' : 'npm run start:prod',
				container_name: 'explain-api',
				environment: getApiEnvs(env),
			},*/
			face: {
				build: {
					context: 'face/',
					dockerfile: env === 'dev' ? 'Dockerfile.dev' : 'Dockerfile.server',
				},
				restart: 'unless-stopped',
				volumes: env === 'dev' ? ['./face:/app', './face:/public'] : undefined,
				command: env === 'dev' ? 'yarn run dev' : 'yarn run start',
				container_name: 'explain-face',
				environment: getSiteEnvs(env),
			},
		},
		networks: env === 'server' ? getServerNetworks() : undefined,
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
	if (env !== 'server') return undefined

	return {
		VIRTUAL_HOST: `${domain},www.${domain}`,
		LETSENCRYPT_HOST: `${domain},www.${domain}`,
	}
}

/**
 * Возвращает переменные окружения для Api
 * @param env — тип конфигурации
 */
/*function getApiEnvs(env: EnvType) {
	return commonEnvVars
}*/

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
