import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UserBalanceTransactionRepository } from 'repo/userBalanceTransaction.repository'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'

export class GeminiTokenUsageBalanceChargeCommand implements ICommand {
	constructor(
		public dto: {
			userId: number
			inputTokens: number
			outputTokens: number
		},
	) {}
}

@CommandHandler(GeminiTokenUsageBalanceChargeCommand)
export class GeminiTokenUsageBalanceChargeHandler implements ICommandHandler<GeminiTokenUsageBalanceChargeCommand> {
	constructor(
		private mainConfig: MainConfigService,
		private userBalanceTransactionRepository: UserBalanceTransactionRepository,
	) {}

	async execute(command: GeminiTokenUsageBalanceChargeCommand) {
		const { userId, inputTokens, outputTokens } = command.dto

		const amountInKopecks = this.calculateAmountInKopeckDependsOnTokens({ inputTokens, outputTokens })
		if (amountInKopecks <= 0) return

		try {
			await this.userBalanceTransactionRepository.createCharge({
				userId,
				amountInKopecks,
			})
		} catch (error) {
			if (error instanceof CustomGraphQLError) {
				throw error
			}

			throw new CustomGraphQLError(errorMessage.unknownError, ErrorCode.InternalServerError_500)
		}
	}

	calculateAmountInKopeckDependsOnTokens(input: { inputTokens: number; outputTokens: number }): number {
		const prices = this.mainConfig.get().gemini.priceInRub

		const totalPriceInRub = input.inputTokens * prices.input + input.outputTokens * prices.output
		const markupInKopecks = this.mainConfig.get().billing.translationChargeMarkupInKopecks

		return Math.ceil(totalPriceInRub * 100) + markupInKopecks
	}
}
