import { Global, Module } from '@nestjs/common'
import { GigaChatService } from './gigaChat.service'

@Global()
@Module({
	providers: [GigaChatService],
	exports: [GigaChatService],
})
export class GigaChatModule {}
