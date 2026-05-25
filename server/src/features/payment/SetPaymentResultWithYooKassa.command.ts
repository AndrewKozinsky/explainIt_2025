import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { DBRepository } from 'repo/db.repository'
import { PaymentRepository } from 'repo/payment.repository'
import { UserBalanceTransactionRepository } from 'repo/userBalanceTransaction.repository'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { TelegramService } from 'infrastructure/telegram/telegram.service'
import { YooKassaPaymentMetadata } from 'infrastructure/yooKassa/yooKassa.service'

export class SetPaymentResultWithYooKassaCommand implements ICommand {
	constructor(
		public dto: {
			yooKassaPaymentId: string
			paymentResult: 'payment.succeeded' | 'payment.canceled'
			metadata?: YooKassaPaymentMetadata
		},
	) {}
}

// Этот командный обработчик будет вызываться при получении ответа от ЮКассы при оплате.
@CommandHandler(SetPaymentResultWithYooKassaCommand)
export class SetPaymentResultWithYooKassaHandler implements ICommandHandler<SetPaymentResultWithYooKassaCommand> {
	constructor(
		private paymentRepository: PaymentRepository,
		private dbRepository: DBRepository,
		private userBalanceTransactionRepository: UserBalanceTransactionRepository,
		private telegramService: TelegramService,
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

						// Написать в Телеграм про успешную оплату
						const messageToTg = `Была сделана оплата в explainit.ru. Сумма: ${amount / 100} руб.`
						this.telegramService.sendMessageToFromExplainBot(messageToTg)

						if (purpose === 'TOP_UP_BALANCE') {
							await this.handleTopUpBalancePayment({ amount, userId, paymentId })
							return
						}
					},
				})
			} catch (error) {
				throw new CustomError(errorMessage.unknownError, ErrorStatusCode.InternalServerError_500)
			}
		} else if (paymentResult === 'payment.canceled') {
			await this.paymentRepository.makePaymentCancelled(yooKassaPaymentId)
		}
	}

	private async handleTopUpBalancePayment(dto: { amount: number; userId: number; paymentId: number }) {
		await this.userBalanceTransactionRepository.createTopUpByPayment({
			userId: dto.userId,
			paymentId: dto.paymentId,
			amountInKopecks: dto.amount,
		})
	}
}
