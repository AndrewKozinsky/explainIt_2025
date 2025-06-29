import { INestApplication } from '@nestjs/common'
import { RedisService } from '../../src/infrastructure/redis/redis.service'
import { clearAllDB } from './clearDB'

export async function beforeEachTest(app: INestApplication) {
	// await redisService.connect()
	await clearAllDB(app)
	jest.clearAllMocks()
}

export async function afterEachTest(app: INestApplication) {
	const redisService = await app.resolve(RedisService)
	await redisService.disconnect()
}
