import { Global, Module } from '@nestjs/common'
import { MainConfigService } from '../mainConfig/mainConfig.service'
import { YandexCloudS3Service } from 'src/infrastructure/yandexCloudS3/yandexCloudS3.service'

const yandexCloudS3ServiceProvider = {
	provide: YandexCloudS3Service,
	useFactory: (mainConfigService: MainConfigService) => {
		/*return mainConfigService.get().mode === 'localtest'
			? new OpenAIServiceMock()
			: new OpenAIService(mainConfigService)*/

		return new YandexCloudS3Service(mainConfigService)
	},
	inject: [MainConfigService],
}

@Global()
@Module({
	providers: [yandexCloudS3ServiceProvider],
	exports: [YandexCloudS3Service],
})
export class YandexCloudS3Module {}
