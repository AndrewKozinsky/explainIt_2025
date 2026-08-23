import { Global, Module } from '@nestjs/common'
import { MainConfigService } from '../mainConfig/mainConfig.service'
import { ZaiService } from './zai.service'

const zaiServiceProvider = {
	provide: ZaiService,
	useFactory: (mainConfigService: MainConfigService) => {
		return new ZaiService(mainConfigService)
	},
	inject: [MainConfigService],
}

@Global()
@Module({
	providers: [zaiServiceProvider],
	exports: [ZaiService],
})
export class ZaiModule {}
