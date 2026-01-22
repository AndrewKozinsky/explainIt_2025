import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { BalanceTransactionRepository } from 'repo/balanceTransaction.repository'
import { DBRepository } from 'repo/db.repository'
import { PaymentRepository } from 'repo/payment.repository'
import { UserRepository } from 'repo/user.repository'
import { SetPaymentResultWithYooKassaHandler } from 'features/payment/SetPaymentResultWithYooKassa.command'
import { PrismaService } from '../../db/prisma.service'
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
