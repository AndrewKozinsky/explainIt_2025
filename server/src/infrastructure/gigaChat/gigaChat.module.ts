import { Global, Module } from '@nestjs/common'
import { MainConfigService } from '../mainConfig/mainConfig.service'
import { GigaChatService, GigaChatServiceMock } from './gigaChat.service'

const gigaChatServiceProvider = {
	provide: GigaChatService,
	useFactory: (mainConfigService: MainConfigService) => {
		return mainConfigService.get().mode === 'test'
			? new GigaChatServiceMock()
			: new GigaChatService(mainConfigService)
	},
	inject: [MainConfigService],
}

@Global()
@Module({
	providers: [gigaChatServiceProvider],
	exports: [GigaChatService],
})
export class GigaChatModule {}
