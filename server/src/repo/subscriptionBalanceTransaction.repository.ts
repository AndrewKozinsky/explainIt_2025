import { Injectable } from '@nestjs/common'
import { DBRepository } from 'repo/db.repository'
import { PrismaService } from 'db/prisma.service'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { BalanceTransactionType } from 'prisma/generated/enums'

@Injectable()
export class SubscriptionBalanceTransactionRepository {
	constructor(
		private prisma: PrismaService,
		private dbRepository: DBRepository,
	) {}

	async ensureCanTranslatePrivateMediaOrThrow(dto: { userId: number; minBalanceInKopecks: number }) {
		const subscription = await this.prisma.userSubscription.findFirst({
			where: {
				user_id: dto.userId,
				ends_at: {
					gt: new Date(),
				},
			},
			orderBy: {
				ends_at: 'desc',
			},
			include: {
				tariff: true,
			},
		})

		if (!subscription) {
			throw new CustomGraphQLError(errorMessage.userHasNoActiveSubscription, ErrorCode.BadRequest_400)
		}

		if (!subscription.tariff?.is_private_media_included) {
			throw new CustomGraphQLError(
				errorMessage.privateMediaIsNotIncludedInSubscriptionTariff,
				ErrorCode.BadRequest_400,
			)
		}

		if (subscription.balance < dto.minBalanceInKopecks) {
			throw new CustomGraphQLError(
				errorMessage.insufficientSubscriptionBalanceForPrivateMediaTranslation,
				ErrorCode.BadRequest_400,
			)
		}
	}

	async createChargeForActiveSubscription(dto: {
		userId: number
		amountInKopecks: number
		type: BalanceTransactionType
	}) {
		if (dto.type === BalanceTransactionType.CHARGE && dto.amountInKopecks > 0) {
			throw new CustomGraphQLError(
				errorMessage.cannotWriteOffAmountGreaterThanZero,
				ErrorCode.BadRequest_400,
			)
		}

		return await this.dbRepository.wrapIntoPrismaTransaction({
			executableCode: async () => {
				const subscription = await this.prisma.userSubscription.findFirst({
					where: {
						user_id: dto.userId,
						ends_at: {
							gt: new Date(),
						},
					},
					orderBy: {
						ends_at: 'desc',
					},
				})

				if (!subscription) {
					throw new CustomGraphQLError(errorMessage.userHasNoActiveSubscription, ErrorCode.BadRequest_400)
				}

				await this.prisma.subscriptionBalanceTransaction.create({
					data: {
						user_subscription_id: subscription.id,
						amount: dto.amountInKopecks,
						type: dto.type,
					},
				})

				const balanceChangeObj =
					dto.amountInKopecks > 0 ? { increment: dto.amountInKopecks } : { decrement: -dto.amountInKopecks }

				await this.prisma.userSubscription.update({
					where: {
						id: subscription.id,
					},
					data: {
						balance: balanceChangeObj,
					},
				})
			},
		})
	}
}
