import { Injectable } from '@nestjs/common'
import IORedis from 'ioredis'
import RedisMock from 'ioredis-mock'
import { MainConfigService } from '../mainConfig/mainConfig.service'

@Injectable()
export class RedisService {
	redis: IORedis

	constructor(private mainConfig: MainConfigService) {
		this.redis =
			this.mainConfig.get().mode === 'localtest'
				? (this.redis = new RedisMock())
				: new IORedis(this.mainConfig.get().redis.url)
	}

	get() {
		return this.redis
	}

	/*connect() {
		return this.redis.connect()
	}*/

	/*disconnect() {
		this.redis.disconnect()
	}*/

	/*async quit() {
		await this.redis.quit()
	}*/
}
