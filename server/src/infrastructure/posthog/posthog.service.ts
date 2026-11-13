import { Injectable } from '@nestjs/common'
import { PostHog } from 'posthog-node'

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
}

@Injectable()
export class PosthogService implements PosthogServiceI {
	private client: PostHog

	constructor(projectToken: string) {
		this.client = new PostHog(projectToken, { host: posthogHost })
	}

	async captureUserRegistered(userId: number, method: RegistrationMethod) {
		// Ошибка аналитики не должна мешать регистрации.
		try {
			await this.client.captureImmediate({
				distinctId: String(userId),
				event: 'user_registered',
				properties: { method },
			})
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
}
