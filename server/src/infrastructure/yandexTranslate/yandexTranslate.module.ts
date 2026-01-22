import { Global, Module } from '@nestjs/common'
import { MainConfigService } from '../mainConfig/mainConfig.service'
import { YandexTranslateService, YandexTranslateServiceMock } from './yandexTranslate.service'

const yandexTranslateServiceProvider = {
	provide: YandexTranslateService,
	useFactory: (mainConfigService: MainConfigService) => {
		/*return mainConfigService.get().mode === 'localtest'
			? new YandexTranslateServiceMock()
			: new YandexTranslateService(mainConfigService)*/

		return new YandexTranslateService(mainConfigService)
	},
	inject: [MainConfigService],
}

@Global()
@Module({
	providers: [yandexTranslateServiceProvider],
	exports: [YandexTranslateService],
})
export class YandexTranslateModule {}
