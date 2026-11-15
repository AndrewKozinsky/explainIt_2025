import { Module } from '@nestjs/common'
import { UserRepository } from 'repo/user.repository'
import { PrismaService } from 'db/prisma.service'
import { UserBalanceNotificationsModule } from 'infrastructure/redis/userBalanceNotifications.module'
import { RefillFreeDailyBalance } from './RefillFreeDailyBalance.service'

/** Расписание ежедневного начисления баланса. Подключается только в AppModule. */
@Module({
	imports: [UserBalanceNotificationsModule],
	providers: [PrismaService, UserRepository, RefillFreeDailyBalance],
})
export class DailyBalanceRefillModule {}
