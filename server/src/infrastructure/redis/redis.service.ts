import { Injectable } from '@nestjs/common'
import IORedis from 'ioredis'
import { MainConfigService } from '../mainConfig/mainConfig.service'

@Injectable()
export class RedisService {
	redis: IORedis

	constructor(private mainConfig: MainConfigService) {
		this.redis = new IORedis(this.mainConfig.get().redis.url)
	}

	get() {
		return this.redis
	}

	connect() {
		return this.redis.connect()
	}

	disconnect() {
		this.redis.disconnect()
	}

	async quit() {
		await this.redis.quit()
	}
}
