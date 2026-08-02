import { Global, Module } from '@nestjs/common'
import { MainConfigModule } from 'infrastructure/mainConfig/mainConfig.module'
import { YoutubeService } from './youtube.service'

@Global()
@Module({
	imports: [MainConfigModule],
	providers: [YoutubeService],
	exports: [YoutubeService],
})
export class YoutubeModule {}
