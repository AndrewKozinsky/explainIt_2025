import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { PaymentRepository } from 'repo/payment.repository'
import { UserQueryRepository } from 'repo/user.queryRepository'
import { UserRepository } from 'repo/user.repository'
import { TopUpBalanceWithYooKassaHandler } from 'features/payment/TopUpBalanceWithYooKassa.command'
import { PrismaService } from '../../db/prisma.service'
import { PaymentResolver } from './payment.resolver'

const services = [PrismaService]
const commandHandlers = [TopUpBalanceWithYooKassaHandler]
const resolvers = [PaymentResolver]
const repositories = [UserRepository, UserQueryRepository, PaymentRepository]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories],
})
export class PaymentModule {}
