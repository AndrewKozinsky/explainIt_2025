import { Injectable } from '@nestjs/common'
import { createClient, RedisClientType } from 'redis'
import RedisMock from 'ioredis-mock'
import { MainConfigService } from '../mainConfig/mainConfig.service'

@Injectable()
export class RedisService {
	redis: RedisClientType

	constructor(private mainConfig: MainConfigService) {
		if (this.mainConfig.get().mode === 'localtest') {
			this.redis = new RedisMock() as any
		} else {
			this.redis = createClient({ url: this.mainConfig.get().redis.url })
		}
	}

	async connect() {
		if (this.mainConfig.get().mode !== 'localtest') {
			await this.redis.connect()
		}
	}

	get() {
		return this.redis
	}
}
