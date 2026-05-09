import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'

/**
 * Build a BullMQ connection config from the shared Redis URL defined in MainConfigService.
 * BullMQ requires `maxRetriesPerRequest: null` on its ioredis connection.
 */
export function buildBullmqConnection(mainConfig: MainConfigService) {
	const url = mainConfig.get().redis.url

	// BullMQ accepts an ioredis options object. Pass the URL via the `host`/`port` pair
	// derived from the standard redis://host:port[/db] form used in env files.
	const parsed = new URL(url)
	const host = parsed.hostname
	const port = parsed.port ? Number(parsed.port) : 6379
	const password = parsed.password || undefined
	const db = parsed.pathname && parsed.pathname !== '/' ? Number(parsed.pathname.slice(1)) : undefined

	return {
		host,
		port,
		password,
		db,
		maxRetriesPerRequest: null as null,
		enableReadyCheck: false,
	}
}
