import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { PrismaService } from '../../db/prisma.service'
import { SetPaymentResultWithYooKassaHandler } from '../../features/payment/SetPaymentResultWithYooKassa.command'
import { DBRepository } from 'src/repo/db.repository'
import { PaymentRepository } from 'src/repo/payment.repository'
import { BalanceTransactionRepository } from 'src/repo/balanceTransaction.repository'
import { UserRepository } from 'src/repo/user.repository'
import { WebhookController } from './webhook.controller'
import { WebhookService } from './webhook.service'

const services = [WebhookService, PrismaService]
const repositories = [PaymentRepository, BalanceTransactionRepository, DBRepository, UserRepository]

const commandHandlers = [SetPaymentResultWithYooKassaHandler]

@Module({
	imports: [CqrsModule],
	controllers: [WebhookController],
	providers: [...services, ...services, ...commandHandlers, ...repositories],
})
export class WebhookModule {}
