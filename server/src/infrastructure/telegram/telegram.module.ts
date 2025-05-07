import { Global, Module } from '@nestjs/common'
import { MainConfigService } from '../mainConfig/mainConfig.service'
import { TelegramService, TelegramServiceMock } from './telegram.service'

const telegramServiceProvider = {
	provide: TelegramService,
	useFactory: (mainConfigService: MainConfigService) => {
		return mainConfigService.get().mode === 'test'
			? new TelegramServiceMock()
			: new TelegramService(mainConfigService)
	},
	inject: [MainConfigService],
}

@Global()
@Module({
	providers: [telegramServiceProvider],
	exports: [TelegramService],
})
export class TelegramModule {}
