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
	const postgresServiceName = 'explainpostgres' + mode
	const serverServiceName = 'explainserver' + mode
	const faceServiceName = 'explainface' + mode

	return {
		services: {
			[nginxServiceName]: {
				image: 'nginx:1.19.7-alpine',
				container_name: 'explainnginx' + mode,
				depends_on: [postgresServiceName, serverServiceName, faceServiceName],
				ports: [Mode.localTest, Mode.localDev, Mode.localCheckServer].includes(mode) ? ['80:80'] : undefined,
				volumes: [`./nginx/nginx.conf.${mode}:/etc/nginx/nginx.conf`],
				environment: getNginxEnvs(mode),
			},
			[postgresServiceName]: {
				image: 'postgres:16.2',
				restart: 'unless-stopped',
				container_name: 'explainpostgres',
				ports: ['5432:5432'],
				environment: getPostgresEnvs(),
				env_file: ['.env'],
				volumes: ['pgdata:/var/lib/postgresql/data'],
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
				depends_on: [postgresServiceName],
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
				depends_on: [postgresServiceName, serverServiceName],
				environment: getFaceEnvs(mode),
			},
		},
		networks: mode === Mode.serverDevelop || mode === Mode.serverMaster
			? getServerNetworks()
			: undefined,
		volumes: {
			pgdata: {}
		}
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
 * Returns environment variables for Nginx
 * @param mode — тип конфигурации
 */
function getNginxEnvs(mode: Mode) {
	if (mode === Mode.serverDevelop || mode === Mode.serverMaster) {
		const domain = mode === Mode.serverDevelop
			? 'dev.explainit.ru'
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
 * Returns environment variables for Api
 * @param mode — тип конфигурации
 */
function getServerEnvs(mode: Mode) {
	return {
		MODE: mode,
		PORT: 3001,
	}
}

/**
 * Returns environment variables for Face
 * @param mode — тип конфигурации
 */
function getFaceEnvs(mode: Mode) {
	return { MODE: mode }
}

/** Returns environment variables for Postgres  */
function getPostgresEnvs() {
	return {
		POSTGRES_DB: '${POSTGRES_DB}',
		POSTGRES_USER: '${POSTGRES_USER}',
		POSTGRES_PASSWORD: '${POSTGRES_PASSWORD}',
	}
}
