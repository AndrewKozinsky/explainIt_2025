import { Module } from '@nestjs/common'
import { MainConfigModule } from '../mainConfig/mainConfig.module'
import { UserBalanceNotifications } from './userBalanceNotifications.service'

@Module({
	imports: [MainConfigModule],
	providers: [UserBalanceNotifications],
	exports: [UserBalanceNotifications],
})
export class UserBalanceNotificationsModule {}
