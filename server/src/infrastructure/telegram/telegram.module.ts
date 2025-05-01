import { Global, Module } from '@nestjs/common'
import { TelegramService } from './telegram.service'

@Global()
@Module({
	providers: [TelegramService],
})
export class TelegramModule {}
