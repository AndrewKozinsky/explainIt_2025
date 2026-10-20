import { Global, Module } from '@nestjs/common'
import { MainConfigModule } from '../mainConfig/mainConfig.module'
import { MainConfigService } from '../mainConfig/mainConfig.service'
import { SonioxTtsService } from './sonioxTts.service'

@Global()
@Module({
	imports: [MainConfigModule],
	providers: [
		{
			provide: SonioxTtsService,
			useFactory: (config: MainConfigService) => new SonioxTtsService(config),
			inject: [MainConfigService],
		},
	],
	exports: [SonioxTtsService],
})
export class SonioxTtsModule {}
