import { Global, Module } from '@nestjs/common'
import { MainConfigService } from '../mainConfig/mainConfig.service'
import { PosthogService, PosthogServiceMock } from './posthog.service'

/**
 * События отправляются в PostHog только с рабочего сервера immersia.site (servermaster, регион intl).
 * В остальных окружениях и на explainit.ru используется заглушка.
 */
const posthogServiceProvider = {
	provide: PosthogService,
	useFactory: (mainConfigService: MainConfigService) => {
		const { mode, region, posthog } = mainConfigService.get()

		if (mode !== 'servermaster' || region !== 'intl' || !posthog.projectToken) {
			return new PosthogServiceMock()
		}

		return new PosthogService(posthog.projectToken)
	},
	inject: [MainConfigService],
}

@Global()
@Module({
	providers: [posthogServiceProvider],
	exports: [PosthogService],
})
export class PosthogModule {}
