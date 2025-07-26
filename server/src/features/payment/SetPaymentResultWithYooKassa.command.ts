import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CustomGraphQLError } from '../../infrastructure/exceptions/customErrors'
import { ErrorCode } from '../../infrastructure/exceptions/errorCode'
import { errorMessage } from '../../infrastructure/exceptions/errorMessage'
import { DBRepository } from '../../repo/db.repository'
import { PaymentRepository } from '../../repo/payment.repository'
import { TransactionRepository } from '../../repo/transaction.repository'
import { UserRepository } from '../../repo/user.repository'

export class SetPaymentResultWithYooKassaCommand implements ICommand {
	constructor(
		public dto: {
			yooKassaPaymentId: string
			paymentResult: 'payment.succeeded' | 'payment.canceled'
		},
	) {}
}

@CommandHandler(SetPaymentResultWithYooKassaCommand)
export class SetPaymentResultWithYooKassaHandler implements ICommandHandler<SetPaymentResultWithYooKassaCommand> {
	constructor(
		private paymentRepository: PaymentRepository,
		private transactionRepository: TransactionRepository,
		private dbRepository: DBRepository,
		private userRepository: UserRepository,
	) {}

	async execute(command: SetPaymentResultWithYooKassaCommand) {
		const { yooKassaPaymentId, paymentResult } = command.dto

		if (paymentResult === 'payment.succeeded') {
			try {
				await this.dbRepository.wrapIntoPrismaTransaction({
					executableCode: async () => {
						const { amount, userId } = await this.paymentRepository.makePaymentSuccessful(yooKassaPaymentId)

						await Promise.all([
							this.transactionRepository.createTransaction({
								paymentId: yooKassaPaymentId,
								amount,
								userId,
								status: 'debit',
							}),

							// Обновить свойство balance у пользователя.
							this.userRepository.relativeUpdateUserBalance(userId, amount),
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
