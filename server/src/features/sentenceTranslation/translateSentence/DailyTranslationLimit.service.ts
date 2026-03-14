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

		// Redis stores a set of sentence ids that were already counted for this user today.
		// If the same sentence is requested again on the same day, we do not spend the limit twice.
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

		// We count the attempt immediately, before the full translation is completed.
		// This keeps the daily-limit logic simple and prevents repeated parallel requests
		// from effectively bypassing the limit.
		await redis.sAdd(key, sentenceId)

		// The key lives only until the end of the current day, then Redis removes it automatically.
		await redis.expire(key, this.getSecondsUntilEndOfDay())

		return {
			allowed: true,
			alreadyCounted: false,
			remainingToday: Math.max(dailyLimit - countBeforeCheck - 1, 0),
		}
	}

	private getDailyTranslationsKey(userId: number) {
		// One Redis key per user per day.
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
		// TTL is calculated in seconds because Redis expire works with seconds.
		const tomorrow = new Date()
		tomorrow.setHours(24, 0, 0, 0)

		return Math.max(Math.ceil((tomorrow.getTime() - Date.now()) / 1000), 1)
	}
}
