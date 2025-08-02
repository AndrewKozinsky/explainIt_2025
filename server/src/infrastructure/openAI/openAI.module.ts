import { Global, Module } from '@nestjs/common'
import { MainConfigService } from '../mainConfig/mainConfig.service'
import { OpenAIService, OpenAIServiceMock } from './openAI.service'

const openAIServiceProvider = {
	provide: OpenAIService,
	useFactory: (mainConfigService: MainConfigService) => {
		return mainConfigService.get().mode === 'localtest'
			? new OpenAIServiceMock()
			: new OpenAIService(mainConfigService)
	},
	inject: [MainConfigService],
}

@Global()
@Module({
	providers: [openAIServiceProvider],
	exports: [OpenAIService],
})
export class OpenAIModule {}
