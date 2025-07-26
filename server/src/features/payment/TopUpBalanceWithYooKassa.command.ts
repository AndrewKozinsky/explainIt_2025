import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { YooKassaService } from '../../infrastructure/yooKassa/yooKassa.service'
import { PaymentRepository } from '../../repo/payment.repository'
import { TopUpBalanceWithYooKassaInput } from '../../routes/payment/inputs/topUpBalanceWithYooKassa.input'

export class TopUpBalanceWithYooKassaCommand implements ICommand {
	constructor(
		public userId: number,
		public createPaymentWithYooKassaInput: TopUpBalanceWithYooKassaInput,
	) {}
}

@CommandHandler(TopUpBalanceWithYooKassaCommand)
export class TopUpBalanceWithYooKassaHandler implements ICommandHandler<TopUpBalanceWithYooKassaCommand> {
	constructor(
		private paymentRepository: PaymentRepository,
		private yooKassaService: YooKassaService,
	) {}

	async execute(command: TopUpBalanceWithYooKassaCommand) {
		const { userId, createPaymentWithYooKassaInput } = command

		const { yooKassaPaymentId, confirmationUrl } = await this.yooKassaService.createPayment(
			createPaymentWithYooKassaInput.amount,
		)

		// Create a payment in database
		await this.paymentRepository.createPayment({
			userId,
			// Amount in rubles, but the DB store amount in kopecks
			amount: Math.round(createPaymentWithYooKassaInput.amount * 100),
			externalId: yooKassaPaymentId,
		})

		return { confirmationUrl }
	}
}
