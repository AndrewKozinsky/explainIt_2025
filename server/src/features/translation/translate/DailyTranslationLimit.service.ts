import { Injectable } from '@nestjs/common'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { RedisService } from 'infrastructure/redis/redis.service'

@Injectable()
export class DailyTranslationLimitService {
	constructor(
		private redisService: RedisService,
		private mainConfig: MainConfigService,
	) {}

	async tryCountSentenceToday(input: {
		userId: number
		sentenceId: number
	}): Promise<{ allowed: boolean; alreadyCounted: boolean; remainingToday: number }> {
		const redis = this.redisService.get()
		const key = this.getDailyTranslationsKey(input.userId)
		const sentenceId = String(input.sentenceId)
		const dailyLimit = this.mainConfig.get().dailyTranslationsLimit

		const alreadyCounted = await redis.sIsMember(key, sentenceId)
		const countBeforeCheck = await redis.sCard(key)

		if (alreadyCounted) {
			return {
				allowed: true,
				alreadyCounted: true,
				remainingToday: Math.max(dailyLimit - countBeforeCheck, 0),
			}
		}

		if (countBeforeCheck >= dailyLimit) {
			return {
				allowed: false,
				alreadyCounted: false,
				remainingToday: 0,
			}
		}

		await redis.sAdd(key, sentenceId)
		await redis.expire(key, this.getSecondsUntilEndOfDay())

		return {
			allowed: true,
			alreadyCounted: false,
			remainingToday: Math.max(dailyLimit - countBeforeCheck - 1, 0),
		}
	}

	private getDailyTranslationsKey(userId: number) {
		return `daily-translations:user:${userId}:date:${this.getCurrentDateKey()}`
	}

	private getCurrentDateKey() {
		const now = new Date()
		const year = now.getFullYear()
		const month = String(now.getMonth() + 1).padStart(2, '0')
		const day = String(now.getDate()).padStart(2, '0')

		return `${year}-${month}-${day}`
	}

	private getSecondsUntilEndOfDay() {
		const tomorrow = new Date()
		tomorrow.setHours(24, 0, 0, 0)

		return Math.max(Math.ceil((tomorrow.getTime() - Date.now()) / 1000), 1)
	}
}
