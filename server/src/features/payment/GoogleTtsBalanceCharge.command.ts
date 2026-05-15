import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UserBalanceTransactionRepository } from 'repo/userBalanceTransaction.repository'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'

export class GoogleTtsBalanceChargeCommand implements ICommand {
	constructor(
		public dto: {
			userId: number
			charsCount: number
		},
	) {}
}

@CommandHandler(GoogleTtsBalanceChargeCommand)
export class GoogleTtsBalanceChargeHandler implements ICommandHandler<GoogleTtsBalanceChargeCommand> {
	constructor(
		private mainConfig: MainConfigService,
		private userBalanceTransactionRepository: UserBalanceTransactionRepository,
	) {}

	async execute(command: GoogleTtsBalanceChargeCommand) {
		const { userId, charsCount } = command.dto

		const amountInKopecks = this.calculateAmountInKopecks(charsCount)

		try {
			await this.userBalanceTransactionRepository.createCharge({ userId, amountInKopecks })
		} catch (error) {
			if (error instanceof CustomError) {
				throw error
			}

			throw new CustomError(errorMessage.unknownError, ErrorCode.InternalServerError_500)
		}
	}

	calculateAmountInKopecks(charsCount: number): number {
		const pricePerChar = this.mainConfig.get().googleTts.pricePerCharInKopecks
		return Math.max(1, Math.ceil(pricePerChar * charsCount))
	}
}
