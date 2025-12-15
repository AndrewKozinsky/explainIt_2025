import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { YooKassaService } from 'infrastructure/yooKassa/yooKassa.service'
import { CustomGraphQLError } from 'src/infrastructure/exceptions/customErrors'
import { ErrorCode } from 'src/infrastructure/exceptions/errorCode'
import { errorMessage } from 'src/infrastructure/exceptions/errorMessage'
import { PaymentRepository } from 'src/repo/payment.repository'
import { UserRepository } from 'src/repo/user.repository'

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
