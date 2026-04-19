import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { PaymentRepository } from 'repo/payment.repository'
import { UserRepository } from 'repo/user.repository'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
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
			throw new CustomGraphQLError(errorMessage.userNotFound, ErrorCode.BadRequest_400)
		}

		if (input.amountInKopecks <= 0) {
			throw new CustomGraphQLError(errorMessage.cannotDepositAmountLessThanZero, ErrorCode.BadRequest_400)
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
