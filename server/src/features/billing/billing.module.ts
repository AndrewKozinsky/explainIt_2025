import { Global, Module } from '@nestjs/common'
import { UserRepository } from 'repo/user.repository'
import { PrismaService } from 'db/prisma.service'
import { HashAdapterModule } from 'infrastructure/hashAdapter/hash-adapter.module'
import { UserBalanceService } from './UserBalance.service'

/**
 * Проверка и списание баланса за запросы к ИИ. Глобальный: подключается один раз
 * в AppModule и в WorkerModule, а UserBalanceService доступен во всех модулях.
 */
@Global()
@Module({
	imports: [HashAdapterModule],
	providers: [PrismaService, UserRepository, UserBalanceService],
	exports: [UserBalanceService],
})
export class BillingModule {}
