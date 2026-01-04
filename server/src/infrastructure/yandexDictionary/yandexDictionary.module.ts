import { Global, Module } from '@nestjs/common'
import { MainConfigService } from '../mainConfig/mainConfig.service'
import { YandexDictionaryService, YandexDictionaryServiceMock } from './yandexDictionary.service'

const yandexDictionaryServiceProvider = {
	provide: YandexDictionaryService,
	useFactory: (mainConfigService: MainConfigService) => {
		/*return mainConfigService.get().mode === 'localtest'
			? new YandexDictionaryServiceMock()
			: new YandexDictionaryService(mainConfigService)*/

		return new YandexDictionaryService(mainConfigService)
	},
	inject: [MainConfigService],
}

@Global()
@Module({
	providers: [yandexDictionaryServiceProvider],
	exports: [YandexDictionaryService],
})
export class YandexDictionaryModule {}
