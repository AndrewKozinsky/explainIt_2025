import { Global, Module } from '@nestjs/common'
import { MainConfigService } from '../mainConfig/mainConfig.service'
import { GoogleTtsService } from './googleTts.service'

const googleTtsServiceProvider = {
	provide: GoogleTtsService,
	useFactory: (mainConfigService: MainConfigService) => {
		return new GoogleTtsService(mainConfigService)
	},
	inject: [MainConfigService],
}

@Global()
@Module({
	providers: [googleTtsServiceProvider],
	exports: [GoogleTtsService],
})
export class GoogleTtsModule {}
