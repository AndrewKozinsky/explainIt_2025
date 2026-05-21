import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { PaymentRepository } from 'repo/payment.repository'
import { UserRepository } from 'repo/user.repository'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { YooKassaService } from 'infrastructure/yooKassa/yooKassa.service'

type TopUpBalanceWithYooKassaInput = {
	amountInKopecks: number
}

export class TopUpBalanceWithYooKassaCommand implements ICommand {
	constructor(
		public userId: number,
		public input: TopUpBalanceWithYooKassaInput,
	) {}
}

@CommandHandler(TopUpBalanceWithYooKassaCommand)
export class TopUpBalanceWithYooKassaHandler implements ICommandHandler<TopUpBalanceWithYooKassaCommand> {
	constructor(
		private paymentRepository: PaymentRepository,
		private yooKassaService: YooKassaService,
		private userRepository: UserRepository,
	) {}

	async execute(command: TopUpBalanceWithYooKassaCommand) {
		const { userId, input } = command

		const user = await this.userRepository.getUserById(userId)
		if (!user) {
			throw new CustomError(errorMessage.user.notFound, ErrorStatusCode.BadRequest_400)
		}

		if (input.amountInKopecks <= 0) {
			throw new CustomError(errorMessage.cannotDepositAmountLessThanZero, ErrorStatusCode.BadRequest_400)
		}

		const amountInKopecks = input.amountInKopecks

		const { yooKassaPaymentId, confirmationUrl } = await this.yooKassaService.createPayment(
			amountInKopecks,
			user.email,
			{
				description: 'Пополнение баланса',
				receiptItemDescription: 'Пополнение баланса',
				metadata: {
					purpose: 'TOP_UP_BALANCE',
					userId,
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
