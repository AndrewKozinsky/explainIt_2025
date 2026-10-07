import { Module } from '@nestjs/common'
import { MainConfigModule } from '../mainConfig/mainConfig.module'
import { AiDialogueVisualNotifications } from './aiDialogueVisualNotifications.service'

@Module({
	imports: [MainConfigModule],
	providers: [AiDialogueVisualNotifications],
	exports: [AiDialogueVisualNotifications],
})
export class AiDialogueVisualNotificationsModule {}
