import { Injectable } from '@nestjs/common'
import { DBRepository } from 'repo/db.repository'
import { ErrorStatusCode } from 'src/infrastructure/exceptions/errorStatusCode'
import { PrismaService } from 'db/prisma.service'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { BalanceTransactionType } from 'prisma/generated/enums'

@Injectable()
export class UserBalanceTransactionRepository {
	constructor(
		private prisma: PrismaService,
		private dbRepository: DBRepository,
	) {}

	async ensureCanChargeOrThrow(dto: { userId: number; minBalanceInKopecks: number }) {
		const user = await this.prisma.user.findUnique({
			where: {
				id: dto.userId,
			},
		})

		if (!user) {
			throw new CustomError(errorMessage.user.notFound, ErrorStatusCode.BadRequest_400)
		}

		if (user.balance < dto.minBalanceInKopecks) {
			throw new CustomError(errorMessage.insufficientBalanceForTranslation, ErrorStatusCode.BadRequest_400)
		}
	}

	async createCharge(dto: { userId: number; amountInKopecks: number }) {
		if (dto.amountInKopecks <= 0) {
			throw new CustomError(errorMessage.cannotWriteOffAmountGreaterThanZero, ErrorStatusCode.BadRequest_400)
		}

		return await this.dbRepository.wrapIntoPrismaTransaction({
			executableCode: async () => {
				const user = await this.prisma.user.findUnique({
					where: {
						id: dto.userId,
					},
				})

				if (!user) {
					throw new CustomError(errorMessage.user.notFound, ErrorStatusCode.BadRequest_400)
				}

				await this.prisma.userBalanceTransaction.create({
					data: {
						user_id: dto.userId,
						amount: -dto.amountInKopecks,
						type: BalanceTransactionType.CHARGE,
					},
				})

				await this.prisma.user.update({
					where: {
						id: dto.userId,
					},
					data: {
						balance: {
							decrement: dto.amountInKopecks,
						},
					},
				})
			},
		})
	}

	async createTopUpByPayment(dto: { userId: number; amountInKopecks: number; paymentId: number }) {
		if (dto.amountInKopecks <= 0) {
			throw new CustomError(errorMessage.cannotDepositAmountLessThanZero, ErrorStatusCode.BadRequest_400)
		}

		return await this.dbRepository.wrapIntoPrismaTransaction({
			executableCode: async () => {
				const existingTopUp = await this.prisma.userBalanceTransaction.findUnique({
					where: {
						payment_id: dto.paymentId,
					},
				})

				if (existingTopUp) {
					return
				}

				await this.prisma.userBalanceTransaction.create({
					data: {
						user_id: dto.userId,
						amount: dto.amountInKopecks,
						type: BalanceTransactionType.TOP_UP,
						payment_id: dto.paymentId,
					},
				})

				await this.prisma.user.update({
					where: {
						id: dto.userId,
					},
					data: {
						balance: {
							increment: dto.amountInKopecks,
						},
					},
				})
			},
		})
	}
}
