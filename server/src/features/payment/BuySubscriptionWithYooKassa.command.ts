import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { PaymentRepository } from 'repo/payment.repository'
import { TariffRepository } from 'repo/tariff.repository'
import { UserRepository } from 'repo/user.repository'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { YooKassaService } from 'infrastructure/yooKassa/yooKassa.service'

type BuySubscriptionWithYooKassaInput = {
	tariffId: number
}

export class BuySubscriptionWithYooKassaCommand implements ICommand {
	constructor(
		public userId: number,
		public input: BuySubscriptionWithYooKassaInput,
	) {}
}

@CommandHandler(BuySubscriptionWithYooKassaCommand)
export class BuySubscriptionWithYooKassaHandler implements ICommandHandler<BuySubscriptionWithYooKassaCommand> {
	constructor(
		private paymentRepository: PaymentRepository,
		private yooKassaService: YooKassaService,
		private userRepository: UserRepository,
		private tariffRepository: TariffRepository,
	) {}

	async execute(command: BuySubscriptionWithYooKassaCommand) {
		const { userId, input } = command

		const user = await this.userRepository.getUserById(userId)
		if (!user) {
			throw new CustomGraphQLError(errorMessage.userNotFound, ErrorCode.BadRequest_400)
		}

		const tariff = await this.tariffRepository.getTariffById(input.tariffId)
		if (!tariff) {
			throw new CustomGraphQLError(errorMessage.tariffNotFound, ErrorCode.BadRequest_400)
		}

		const amountInKopecks = tariff.price

		const { yooKassaPaymentId, confirmationUrl } = await this.yooKassaService.createPayment(
			amountInKopecks,
			user.email,
			{
				description: `Подписка: ${tariff.name}`,
				receiptItemDescription: `Подписка: ${tariff.name}`,
				metadata: {
					purpose: 'SUBSCRIPTION',
					userId,
					tariffId: tariff.id,
				},
			},
		)

		await this.paymentRepository.createPayment({
			userId,
			amount: amountInKopecks,
			externalPaymentId: yooKassaPaymentId,
		})

		return { confirmationUrl }
	}
}
