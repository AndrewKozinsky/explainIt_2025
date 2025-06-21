import { ConfigSchemaV37Json } from './types/ConfigSchemaV37Json'

export enum Mode {
	localTest = 'localtest',
	localDev = 'localdev',
	localCheckServer = 'localcheckserver',
	serverDevelop = 'serverdevelop',
	serverMaster = 'servermaster',
}

/**
 * Возвращает объект конфигурации docker-compose для разработки, проверки развёртывания на сервере и для сервера
 * @param mode — тип работы
 */
export function createDockerConfig(mode: Mode): ConfigSchemaV37Json {
	const isDev = [Mode.localTest, Mode.localDev].includes(mode)

	const nginxServiceName = 'explainnginx' + mode
	const serverServiceName = 'explainserver' + mode
	const faceServiceName = 'explainface' + mode

	return {
		services: {
			[nginxServiceName]: {
				image: 'nginx:1.19.7-alpine',
				container_name: 'explainnginx' + mode,
				depends_on: [faceServiceName, serverServiceName],
				ports: [Mode.localTest, Mode.localDev, Mode.localCheckServer].includes(mode) ? ['80:80'] : undefined,
				volumes: [`./nginx/nginx.conf.${mode}:/etc/nginx/nginx.conf`],
				environment: getNginxEnvs(mode),
			},
			[serverServiceName]: {
				build: {
					context: 'server/',
					dockerfile: isDev ? 'Dockerfile.dev' : 'Dockerfile.server',
				},
				restart: 'unless-stopped',
				volumes: isDev ? ['./server/src:/app/src', './server/e2e:/app/e2e'] : undefined,
				command: isDev ? 'yarn start:dev' : 'yarn start:prod',
				container_name: 'explainserver' + mode,
				environment: getServerEnvs(mode),
				env_file: ['.env'],
				ports: isDev ? ['3001:3001'] : undefined,
			},
			[faceServiceName]: {
				build: {
					context: 'face/',
					dockerfile: isDev ? 'Dockerfile.dev' : 'Dockerfile.server',
				},
				restart: 'unless-stopped',
				volumes: isDev ? ['./face:/app', './face:/public'] : undefined,
				command: isDev ? 'yarn run dev' : 'yarn run start',
				container_name: 'explainface' + mode,
				depends_on: [serverServiceName],
				environment: getFaceEnvs(mode),
			},
		},
		networks: mode === Mode.serverDevelop || mode === Mode.serverMaster
			? getServerNetworks()
			: undefined,
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
 */
function getNginxEnvs(mode: Mode) {
	if (mode === Mode.serverDevelop || mode === Mode.serverMaster) {
		const domain = mode === Mode.serverDevelop
			? 'develop.explainit.ru'
			: 'explainit.ru'
		const domains = `${domain},www.${domain}`

		return {
			VIRTUAL_HOST: domains,
			LETSENCRYPT_HOST: domains,
		}
	}

	return undefined
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
