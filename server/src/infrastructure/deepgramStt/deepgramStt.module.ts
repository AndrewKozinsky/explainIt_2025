import { Global, Module } from '@nestjs/common'
import { DeepgramSttService } from './deepgramStt.service'

@Global()
@Module({
	providers: [DeepgramSttService],
	exports: [DeepgramSttService],
})
export class DeepgramSttModule {}
