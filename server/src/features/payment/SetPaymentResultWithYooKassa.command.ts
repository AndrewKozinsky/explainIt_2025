import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BalanceTransactionRepository } from 'repo/balanceTransaction.repository'
import { DBRepository } from 'repo/db.repository'
import { PaymentRepository } from 'repo/payment.repository'
import { TariffRepository } from 'repo/tariff.repository'
import { UserSubscriptionRepository } from 'repo/userSubscription.repository'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { YooKassaPaymentMetadata } from 'infrastructure/yooKassa/yooKassa.service'
import { BalanceTransactionType } from 'prisma/generated/enums'

export class SetPaymentResultWithYooKassaCommand implements ICommand {
	constructor(
		public dto: {
			yooKassaPaymentId: string
			paymentResult: 'payment.succeeded' | 'payment.canceled'
			metadata?: YooKassaPaymentMetadata
		},
	) {}
}

// Этот командный обработчик будет вызываться при получении ответа от ЮKassa при оплате.
// При положительном ответе от Юкассы создаёт транзакцию в балансе пользователя вместе с увеличением баланса.
@CommandHandler(SetPaymentResultWithYooKassaCommand)
export class SetPaymentResultWithYooKassaHandler implements ICommandHandler<SetPaymentResultWithYooKassaCommand> {
	constructor(
		private paymentRepository: PaymentRepository,
		private transactionRepository: BalanceTransactionRepository,
		private dbRepository: DBRepository,
		private userSubscriptionRepository: UserSubscriptionRepository,
		private tariffRepository: TariffRepository,
	) {}

	async execute(command: SetPaymentResultWithYooKassaCommand) {
		const { yooKassaPaymentId, paymentResult, metadata } = command.dto

		if (paymentResult === 'payment.succeeded') {
			try {
				await this.dbRepository.wrapIntoPrismaTransaction({
					executableCode: async () => {
						const purpose = metadata?.purpose

						const {
							amount,
							userId,
							id: paymentId,
						} = await this.paymentRepository.makePaymentSuccessful(yooKassaPaymentId)

						if (purpose === 'SUBSCRIPTION') {
							await this.handleSubscriptionPayment({ amount, userId, paymentId, metadata })
							return
						}

						if (purpose === 'TOP_UP') {
							await this.handleTopUpPayment({ amount, userId, paymentId })
							return
						}
					},
				})
			} catch (error) {
				throw new CustomGraphQLError(errorMessage.unknownError, ErrorCode.InternalServerError_500)
			}
		} else if (paymentResult === 'payment.canceled') {
			await this.paymentRepository.makePaymentCancelled(yooKassaPaymentId)
		}
	}

	private async handleTopUpPayment(dto: { amount: number; userId: number; paymentId: number }) {
		const existingTopUp = await this.transactionRepository.getTopUpByPaymentId(dto.paymentId)
		if (existingTopUp) return

		await this.transactionRepository.createTransaction({
			paymentId: dto.paymentId,
			amount: dto.amount,
			userId: dto.userId,
			type: BalanceTransactionType.TOP_UP,
		})
	}

	private async handleSubscriptionPayment(dto: {
		amount: number
		userId: number
		paymentId: number
		metadata?: YooKassaPaymentMetadata
	}) {
		const tariffId = Number(dto.metadata?.tariffId)
		if (!tariffId) {
			throw new CustomGraphQLError('Tariff id is required', ErrorCode.BadRequest_400)
		}

		const tariff = await this.tariffRepository.getTariffById(tariffId)
		if (!tariff) {
			throw new CustomGraphQLError(errorMessage.tariffNotFound, ErrorCode.BadRequest_400)
		}

		const existingSubscription = await this.userSubscriptionRepository.getSubscriptionByPaymentId(dto.paymentId)

		if (existingSubscription) {
			return
		}

		const startsAt = new Date()
		const endsAt = new Date(startsAt)
		endsAt.setDate(endsAt.getDate() + tariff.durationDays)

		await this.userSubscriptionRepository.createSubscription({
			userId: dto.userId,
			tariffId: tariff.id,
			paymentId: dto.paymentId,
			pricePaid: dto.amount,
			balance: tariff.includedBalance,
			includedFileStorageMb: tariff.includedFileStorageMb,
			startsAt,
			endsAt,
		})
	}
}
