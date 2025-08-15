import { Injectable } from '@nestjs/common'
import { BalanceTransaction, BalanceTransactionType } from '@prisma/client'
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
	type: BalanceTransactionType
}

@Injectable()
export class BalanceTransactionRepository {
	constructor(
		private prisma: PrismaService,
		private userRepository: UserRepository,
	) {}

	@CatchDbError()
	async createTransaction(dto: TransactionDto) {
		if (dto.type === BalanceTransactionType.PAYMENT && !dto.paymentId) {
			throw new CustomGraphQLError('Payment ID is required for payment transactions', ErrorCode.BadRequest_400)
		}

		const createdTransaction = await this.prisma.balanceTransaction.create({
			data: {
				amount: dto.amount,
				user_id: dto.userId,
				type: dto.type,
				...(dto.type === BalanceTransactionType.PAYMENT && { payment_id: dto.paymentId }),
			},
		})

		if (!createdTransaction) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		await this.userRepository.updateBalance(dto.userId, dto.amount)

		return this.mapDbTransactionToServiceTransaction(createdTransaction)
	}
	@CatchDbError()
	async getTransactionByUserIdAndType(userId: number, transactionType: BalanceTransactionType) {
		const transactions = await this.prisma.balanceTransaction.findMany({
			where: {
				user_id: userId,
				type: transactionType,
			},
		})

		return transactions.map(this.mapDbTransactionToServiceTransaction)
	}

	mapDbTransactionToServiceTransaction(dbTransaction: BalanceTransaction): TransactionServiceModel {
		return {
			id: dbTransaction.id,
		}
	}
}
