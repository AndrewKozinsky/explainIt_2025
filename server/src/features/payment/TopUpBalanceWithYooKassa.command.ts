import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { PaymentRepository } from 'repo/payment.repository'
import { UserRepository } from 'repo/user.repository'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { YooKassaService } from 'infrastructure/yooKassa/yooKassa.service'

type TopUpBalanceWithYooKassaInput = {
	// Amount in kopecks
	amount: number
}

export class TopUpBalanceWithYooKassaCommand implements ICommand {
	constructor(
		public userId: number,
		public createPaymentWithYooKassaInput: TopUpBalanceWithYooKassaInput,
	) {}
}

// Пополнение баланса через ЮКассу. Создаётся оплата в БД, затем идёт обращение в Юкассу для получения ссылки на оплату.
// Возвращает ссылку на оплату.
@CommandHandler(TopUpBalanceWithYooKassaCommand)
export class TopUpBalanceWithYooKassaHandler implements ICommandHandler<TopUpBalanceWithYooKassaCommand> {
	constructor(
		private paymentRepository: PaymentRepository,
		private yooKassaService: YooKassaService,
		private userRepository: UserRepository,
	) {}

	async execute(command: TopUpBalanceWithYooKassaCommand) {
		const { userId, createPaymentWithYooKassaInput } = command

		const user = await this.userRepository.getUserById(userId)
		if (!user) {
			throw new CustomGraphQLError(errorMessage.userNotFound, ErrorCode.BadRequest_400)
		}

		const { yooKassaPaymentId, confirmationUrl } = await this.yooKassaService.createPayment(
			createPaymentWithYooKassaInput.amount,
			user.email,
		)

		// Create a payment in database
		await this.paymentRepository.createPayment({
			userId,
			// Amount in rubles, but the DB store amount in kopecks
			amount: createPaymentWithYooKassaInput.amount,
			externalPaymentId: yooKassaPaymentId,
		})

		return { confirmationUrl }
	}
}
