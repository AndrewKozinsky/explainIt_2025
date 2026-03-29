import * as winston from 'winston'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'

export function winstonUseFactory(mainConfigService: MainConfigService) {
	const transports = [
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.ms(),
				winston.format.json(),
				winston.format.colorize({ all: false }),
			),
		}),
	]

	const { mode, loki } = mainConfigService.getEnVariables()
	const isServer = mode?.startsWith('server')

	const LokiTransport = require('winston-loki')

	if (isServer) {
		transports.push(
			new LokiTransport({
				host: loki.url,
				basicAuth: `${loki.userId}:${loki.apiKey}`,
				labels: { app: 'explainit-server', env: mode || 'unknown' },
				json: true,
				batching: true,
				interval: 5,
			}),
		)
	}

	return {
		transports,
	}
}
