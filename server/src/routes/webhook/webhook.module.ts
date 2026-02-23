import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { DBRepository } from 'repo/db.repository'
import { PaymentRepository } from 'repo/payment.repository'
import { TariffRepository } from 'repo/tariff.repository'
import { UserRepository } from 'repo/user.repository'
import { UserSubscriptionRepository } from 'repo/userSubscription.repository'
import { SetPaymentResultWithYooKassaHandler } from 'features/payment/SetPaymentResultWithYooKassa.command'
import { PrismaService } from '../../db/prisma.service'
import { WebhookController } from './webhook.controller'
import { WebhookService } from './webhook.service'

const services = [WebhookService, PrismaService]
const repositories = [
	PaymentRepository,
	DBRepository,
	UserRepository,
	UserSubscriptionRepository,
	TariffRepository,
]

const commandHandlers = [SetPaymentResultWithYooKassaHandler]

@Module({
	imports: [CqrsModule],
	controllers: [WebhookController],
	providers: [...services, ...commandHandlers, ...repositories],
})
export class WebhookModule {}
