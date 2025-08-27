import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CustomGraphQLError } from '../../infrastructure/exceptions/customErrors'
import { ErrorCode } from '../../infrastructure/exceptions/errorCode'
import { errorMessage } from '../../infrastructure/exceptions/errorMessage'
import { DBRepository } from '../../repo/db.repository'
import { PaymentRepository } from '../../repo/payment.repository'
import { BalanceTransactionRepository } from '../../repo/balanceTransaction.repository'
import { UserRepository } from '../../repo/user.repository'
import { BalanceTransactionType } from '.prisma/client'

export class SetPaymentResultWithYooKassaCommand implements ICommand {
	constructor(
		public dto: {
			yooKassaPaymentId: string
			paymentResult: 'payment.succeeded' | 'payment.canceled'
		},
	) {}
}

// Этот командный обработчик будет вызываться при получении ответа от ЮKassa при оплате
@CommandHandler(SetPaymentResultWithYooKassaCommand)
export class SetPaymentResultWithYooKassaHandler implements ICommandHandler<SetPaymentResultWithYooKassaCommand> {
	constructor(
		private paymentRepository: PaymentRepository,
		private transactionRepository: BalanceTransactionRepository,
		private dbRepository: DBRepository,
	) {}

	async execute(command: SetPaymentResultWithYooKassaCommand) {
		const { yooKassaPaymentId, paymentResult } = command.dto

		if (paymentResult === 'payment.succeeded') {
			try {
				await this.dbRepository.wrapIntoPrismaTransaction({
					executableCode: async () => {
						const {
							amount,
							userId,
							id: paymentId,
						} = await this.paymentRepository.makePaymentSuccessful(yooKassaPaymentId)

						await Promise.all([
							this.transactionRepository.createTransaction({
								paymentId,
								amount,
								userId,
								type: BalanceTransactionType.PAYMENT,
							}),
						])
					},
				})
			} catch (error) {
				throw new CustomGraphQLError(errorMessage.unknownError, ErrorCode.InternalServerError_500)
			}
		} else if (paymentResult === 'payment.canceled') {
			await this.paymentRepository.makePaymentCancelled(yooKassaPaymentId)
		}
	}
}
