import { Injectable } from '@nestjs/common'
import { PostHog } from 'posthog-node'
import { BillableAiFeature } from 'types/billableAiFeature'

/** Способ, которым пользователь зарегистрировался. */
export type RegistrationMethod = 'email' | 'github' | 'google' | 'yandex'

/** Адрес приёма событий PostHog EU. */
const posthogHost = 'https://eu.i.posthog.com'

/**
 * Отправляет события продукта в PostHog.
 * События с клиента отправляет face (`face/shared/posthog`); здесь — те, что надёжно видны только на сервере.
 * `distinctId` — id пользователя строкой, как в `posthog.identify` на клиенте,
 * поэтому серверные и клиентские события попадают в один профиль.
 */
export interface PosthogServiceI {
	/** Пользователь завершил регистрацию: подтвердил почту или впервые вошёл через OAuth. */
	captureUserRegistered(userId: number, method: RegistrationMethod): Promise<void>
	/** Списание за запрос к ИИ перевело баланс из плюса в ноль или минус. */
	captureBalanceExhausted(userId: number, feature: BillableAiFeature): Promise<void>
	/** Запрос к ИИ не выполнен, потому что баланс не больше нуля. */
	captureAiRequestBlockedByBalance(userId: number, feature: BillableAiFeature): Promise<void>
}

@Injectable()
export class PosthogService implements PosthogServiceI {
	private client: PostHog

	constructor(projectToken: string) {
		this.client = new PostHog(projectToken, { host: posthogHost })
	}

	async captureUserRegistered(userId: number, method: RegistrationMethod) {
		await this.capture(userId, 'user_registered', { method })
	}

	async captureBalanceExhausted(userId: number, feature: BillableAiFeature) {
		await this.capture(userId, 'balance_exhausted', { feature })
	}

	async captureAiRequestBlockedByBalance(userId: number, feature: BillableAiFeature) {
		await this.capture(userId, 'ai_request_blocked_by_balance', { feature })
	}

	/** Ошибка аналитики не должна мешать основному действию: она только пишется в лог. */
	private async capture(userId: number, event: string, properties: Record<string, string>) {
		try {
			await this.client.captureImmediate({ distinctId: String(userId), event, properties })
		} catch (error: unknown) {
			console.error(error)
		}
	}
}

/** Заглушка для окружений без PostHog: пишет событие в лог вместо отправки. */
@Injectable()
export class PosthogServiceMock implements PosthogServiceI {
	async captureUserRegistered(userId: number, method: RegistrationMethod) {
		console.info('[PostHog] user_registered', { userId, method })
	}

	async captureBalanceExhausted(userId: number, feature: BillableAiFeature) {
		console.info('[PostHog] balance_exhausted', { userId, feature })
	}

	async captureAiRequestBlockedByBalance(userId: number, feature: BillableAiFeature) {
		console.info('[PostHog] ai_request_blocked_by_balance', { userId, feature })
	}
}
