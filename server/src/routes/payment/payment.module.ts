import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TopUpBalanceWithYooKassaHandler } from '../../features/payment/TopUpBalanceWithYooKassa.command'
import { PaymentRepository } from 'src/repo/payment.repository'
import { PaymentResolver } from './payment.resolver'
import { PrismaService } from '../../db/prisma.service'
import { UserQueryRepository } from 'src/repo/user.queryRepository'
import { UserRepository } from 'src/repo/user.repository'

const services = [PrismaService]
const commandHandlers = [TopUpBalanceWithYooKassaHandler]
const resolvers = [PaymentResolver]
const repositories = [UserRepository, UserQueryRepository, PaymentRepository]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories],
})
export class PaymentModule {}
