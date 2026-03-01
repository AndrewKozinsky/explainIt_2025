import { Global, Module } from '@nestjs/common'
import { MainConfigService } from '../mainConfig/mainConfig.service'
import { DeepSeekService, DeepSeekServiceMock } from './deepSeek.service'

const deepSeekServiceProvider = {
	provide: DeepSeekService,
	useFactory: (mainConfigService: MainConfigService) => {
		/*return mainConfigService.get().mode === 'localtest'
			? new DeepSeekServiceMock()
			: new DeepSeekService(mainConfigService)*/

		return new DeepSeekService(mainConfigService)
	},
	inject: [MainConfigService],
}

@Global()
@Module({
	providers: [deepSeekServiceProvider],
	exports: [DeepSeekService],
})
export class DeepSeekModule {}
