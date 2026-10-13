import { Module } from '@nestjs/common'
import { MainConfigModule } from '../mainConfig/mainConfig.module'
import { AiDialogueAudioNotifications } from './aiDialogueAudioNotifications.service'

@Module({
	imports: [MainConfigModule],
	providers: [AiDialogueAudioNotifications],
	exports: [AiDialogueAudioNotifications],
})
export class AiDialogueAudioNotificationsModule {}
