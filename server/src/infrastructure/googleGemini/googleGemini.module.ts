import { Global, Module } from '@nestjs/common'
import { MainConfigService } from '../mainConfig/mainConfig.service'
import { GoogleGeminiService } from './googleGemini.service'

const googleGeminiServiceProvider = {
	provide: GoogleGeminiService,
	useFactory: (mainConfigService: MainConfigService) => {
		return new GoogleGeminiService(mainConfigService)
	},
	inject: [MainConfigService],
}

@Global()
@Module({
	providers: [googleGeminiServiceProvider],
	exports: [GoogleGeminiService],
})
export class GoogleGeminiModule {}
