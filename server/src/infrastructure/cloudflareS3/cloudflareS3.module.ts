import { Global, Module } from '@nestjs/common'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { MainConfigService } from '../mainConfig/mainConfig.service'

const cloudflareR2ServiceProvider = {
	provide: CloudflareS3Service,
	useFactory: (mainConfigService: MainConfigService) => {
		return new CloudflareS3Service(mainConfigService)
	},
	inject: [MainConfigService],
}

@Global()
@Module({
	providers: [cloudflareR2ServiceProvider],
	exports: [CloudflareS3Service],
})
export class CloudflareS3Module {}
