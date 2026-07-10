import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { PaymentRepository } from 'repo/payment.repository'
import { UserQueryRepository } from 'repo/user.queryRepository'
import { UserRepository } from 'repo/user.repository'
import { PrismaService } from 'db/prisma.service'
import { TopUpBalanceWithYooKassaHandler } from 'features/payment/TopUpBalanceWithYooKassa.command'
import { PaymentController } from './payment.controller'

const services = [PrismaService]
const commandHandlers = [TopUpBalanceWithYooKassaHandler]
const repositories = [UserRepository, UserQueryRepository, PaymentRepository]

@Module({
	imports: [CqrsModule],
	controllers: [PaymentController],
	providers: [...services, ...commandHandlers, ...repositories],
})
export class PaymentModule {}
