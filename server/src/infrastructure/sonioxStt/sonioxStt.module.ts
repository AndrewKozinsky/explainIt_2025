import { Global, Module } from '@nestjs/common'
import { MainConfigModule } from '../mainConfig/mainConfig.module'
import { SonioxSttService } from './sonioxStt.service'

@Global()
@Module({
	imports: [MainConfigModule],
	providers: [SonioxSttService],
	exports: [SonioxSttService],
})
export class SonioxSttModule {}
