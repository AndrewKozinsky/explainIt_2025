import { Global, Module } from '@nestjs/common'
import { CloudRuS3Service } from 'infrastructure/cloudRuS3/cloudRuS3.service'
import { MainConfigService } from '../mainConfig/mainConfig.service'

const cloudRuS3ServiceProvider = {
	provide: CloudRuS3Service,
	useFactory: (mainConfigService: MainConfigService) => {
		return new CloudRuS3Service(mainConfigService)
	},
	inject: [MainConfigService],
}

@Global()
@Module({
	providers: [cloudRuS3ServiceProvider],
	exports: [CloudRuS3Service],
})
export class CloudRuS3Module {}
