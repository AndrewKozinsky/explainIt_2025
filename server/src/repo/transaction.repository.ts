import { Injectable } from '@nestjs/common'
import { BalanceTransaction, Payment, PaymentStatus } from '@prisma/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { CustomGraphQLError } from '../infrastructure/exceptions/customErrors'
import { ErrorCode } from '../infrastructure/exceptions/errorCode'
import { errorMessage } from '../infrastructure/exceptions/errorMessage'
import { PaymentServiceModel } from '../models/payment/payment.service.model'
import { TransactionServiceModel } from '../models/transaction/transaction.service.model'

type DebitTransactionDto = {
	status: 'debit'
	userId: number
	amount: number
	paymentId: string
}

type CreditTransactionDto = {
	status: 'credit'
	userId: number
	amount: number
}

@Injectable()
export class TransactionRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createTransaction(dto: DebitTransactionDto | CreditTransactionDto) {
		let createdTransaction: null | BalanceTransaction = null

		try {
			if (dto.status === 'debit') {
				createdTransaction = await this.createDebitTransaction(dto)
			} else if (dto.status === 'credit') {
				createdTransaction = await this.createCreditTransaction(dto)
			}
		} catch (error: unknown) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		if (!createdTransaction) {
			throw new CustomGraphQLError(errorMessage.unknownDbError, ErrorCode.InternalServerError_500)
		}

		return this.mapDbTransactionToServiceTransaction(createdTransaction)
	}

	@CatchDbError()
	private createDebitTransaction(dto: DebitTransactionDto) {
		return this.prisma.balanceTransaction.create({
			data: {
				type: 'DEBIT',
				amount: dto.amount,
				user_id: dto.userId,
				payment_id: dto.paymentId,
			},
		})
	}

	@CatchDbError()
	private createCreditTransaction(dto: CreditTransactionDto) {
		return this.prisma.balanceTransaction.create({
			data: {
				type: 'CREDIT',
				amount: dto.amount,
				user_id: dto.userId,
			},
		})
	}

	mapDbTransactionToServiceTransaction(dbTransaction: BalanceTransaction): TransactionServiceModel {
		return {
			id: dbTransaction.id,
		}
	}
}
