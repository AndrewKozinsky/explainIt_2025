import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { PaymentRepository } from 'repo/payment.repository'
import { TariffRepository } from 'repo/tariff.repository'
import { UserQueryRepository } from 'repo/user.queryRepository'
import { UserRepository } from 'repo/user.repository'
import { UserSubscriptionRepository } from 'repo/userSubscription.repository'
import { BuySubscriptionWithYooKassaHandler } from 'features/payment/BuySubscriptionWithYooKassa.command'
import { TopUpBalanceWithYooKassaHandler } from 'features/payment/TopUpBalanceWithYooKassa.command'
import { PrismaService } from '../../db/prisma.service'
import { PaymentResolver } from './payment.resolver'

const services = [PrismaService]
const commandHandlers = [TopUpBalanceWithYooKassaHandler, BuySubscriptionWithYooKassaHandler]
const resolvers = [PaymentResolver]
const repositories = [
	UserRepository,
	UserQueryRepository,
	PaymentRepository,
	TariffRepository,
	UserSubscriptionRepository,
]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories],
})
export class PaymentModule {}
