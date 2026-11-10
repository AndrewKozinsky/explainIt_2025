import { Global, Module } from '@nestjs/common'
import { MainConfigService } from '../mainConfig/mainConfig.service'
import { MimoService } from './mimo.service'

const mimoServiceProvider = {
	provide: MimoService,
	useFactory: (mainConfigService: MainConfigService) => {
		return new MimoService(mainConfigService)
	},
	inject: [MainConfigService],
}

@Global()
@Module({
	providers: [mimoServiceProvider],
	exports: [MimoService],
})
export class MimoModule {}
