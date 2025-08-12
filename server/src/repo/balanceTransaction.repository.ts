import { Injectable } from '@nestjs/common'
import { BalanceTransaction } from '@prisma/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { CustomGraphQLError } from '../infrastructure/exceptions/customErrors'
import { ErrorCode } from '../infrastructure/exceptions/errorCode'
import { errorMessage } from '../infrastructure/exceptions/errorMessage'
import { TransactionServiceModel } from '../models/transaction/transaction.service.model'
import { UserRepository } from './user.repository'

type TransactionDto = {
	userId: number
	amount: number
	paymentId?: number
	type: 'PAYMENT' | 'ACCOUNT_CONFIRMATION_WELCOME_BONUS'
}

@Injectable()
export class BalanceTransactionRepository {
	constructor(
		private prisma: PrismaService,
		private userRepository: UserRepository,
	) {}

	@CatchDbError()
	async createTransaction(dto: TransactionDto) {
		if (dto.type === 'PAYMENT' && !dto.paymentId) {
			throw new CustomGraphQLError('Payment ID is required for payment transactions', ErrorCode.BadRequest_400)
		}

		const data = {
			amount: dto.amount,
			user_id: dto.userId,
			payment_id: dto.paymentId,
			type: dto.type,
		}

		const createdTransaction = await this.prisma.balanceTransaction.create({
			data,
		})

		if (!createdTransaction) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		await this.userRepository.updateBalance(dto.userId, dto.amount)

		return this.mapDbTransactionToServiceTransaction(createdTransaction)
	}

	mapDbTransactionToServiceTransaction(dbTransaction: BalanceTransaction): TransactionServiceModel {
		return {
			id: dbTransaction.id,
		}
	}
}
