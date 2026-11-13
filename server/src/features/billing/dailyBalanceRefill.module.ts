import { Module } from '@nestjs/common'
import { UserRepository } from 'repo/user.repository'
import { PrismaService } from 'db/prisma.service'
import { RefillFreeDailyBalance } from './RefillFreeDailyBalance.service'

/** Расписание ежедневного начисления баланса. Подключается только в AppModule. */
@Module({
	providers: [PrismaService, UserRepository, RefillFreeDailyBalance],
})
export class DailyBalanceRefillModule {}
