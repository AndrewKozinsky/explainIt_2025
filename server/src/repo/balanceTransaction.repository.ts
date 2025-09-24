import { Injectable } from '@nestjs/common'
import { BalanceTransaction, BalanceTransactionType } from '@prisma/client'
import { DBRepository } from 'src/repo/db.repository'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { CustomGraphQLError } from '../infrastructure/exceptions/customErrors'
import { ErrorCode } from '../infrastructure/exceptions/errorCode'
import { errorMessage } from '../infrastructure/exceptions/errorMessage'
import { TransactionServiceModel } from '../models/transaction/transaction.service.model'
import { UserRepository } from './user.repository'

type TransactionDto = {
	userId: number
	// Стоимость указывается в копейках
	amount: number
	paymentId?: number
	type: BalanceTransactionType
}

@Injectable()
export class BalanceTransactionRepository {
	constructor(
		private prisma: PrismaService,
		private userRepository: UserRepository,
		private dbRepository: DBRepository,
	) {}

	@CatchDbError()
	async createTransaction(dto: TransactionDto) {
		if (dto.type === BalanceTransactionType.TOP_UP && !dto.paymentId) {
			throw new CustomGraphQLError('Payment ID is required for payment transactions', ErrorCode.BadRequest_400)
		}

		if (dto.type === BalanceTransactionType.TOP_UP && dto.amount < 0) {
			throw new CustomGraphQLError(
				'You cannot deposit an amount less than zero into your balance.',
				ErrorCode.BadRequest_400,
			)
		}

		if (dto.type === BalanceTransactionType.CHARGE && dto.amount > 0) {
			throw new CustomGraphQLError(
				'You cannot write off an amount greater than zero from your balance.',
				ErrorCode.BadRequest_400,
			)
		}

		try {
			await this.dbRepository.wrapIntoPrismaTransaction({
				executableCode: async () => {
					const createdTransaction = await this.prisma.balanceTransaction.create({
						data: {
							amount: dto.amount,
							user_id: dto.userId,
							type: dto.type,
							...(dto.type === BalanceTransactionType.TOP_UP && { payment_id: dto.paymentId }),
						},
					})

					if (!createdTransaction) {
						throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
					}

					await this.userRepository.updateBalance(dto.userId, dto.amount)

					return this.mapDbTransactionToServiceTransaction(createdTransaction)
				},
			})
		} catch (error) {
			throw new CustomGraphQLError(errorMessage.unknownError, ErrorCode.InternalServerError_500)
		}
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
