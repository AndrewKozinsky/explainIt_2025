import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UserBalanceTransactionRepository } from 'repo/userBalanceTransaction.repository'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'

export class DeepSeekTokenUsageBalanceChargeCommand implements ICommand {
	constructor(
		public dto: {
			userId: number
			inputTokens: number
			outputTokens: number
		},
	) {}
}

@CommandHandler(DeepSeekTokenUsageBalanceChargeCommand)
export class DeepSeekTokenUsageBalanceChargeHandler implements ICommandHandler<DeepSeekTokenUsageBalanceChargeCommand> {
	constructor(
		private mainConfig: MainConfigService,
		private userBalanceTransactionRepository: UserBalanceTransactionRepository,
	) {}

	async execute(command: DeepSeekTokenUsageBalanceChargeCommand) {
		const { userId, inputTokens, outputTokens } = command.dto

		const amountInKopecks = this.calculateAmountInKopeckDependsOnTokens({ inputTokens, outputTokens })

		try {
			await this.userBalanceTransactionRepository.createCharge({ userId, amountInKopecks })
		} catch (error) {
			if (error instanceof CustomGraphQLError) {
				throw error
			}

			throw new CustomGraphQLError(errorMessage.unknownError, ErrorCode.InternalServerError_500)
		}
	}

	calculateAmountInKopeckDependsOnTokens(input: { inputTokens: number; outputTokens: number }): number {
		const prices = this.mainConfig.get().deepSeek.priceInRub

		const totalPriceInRub = input.inputTokens * prices.input + input.outputTokens * prices.output
		const markupMultiplier = this.mainConfig.get().billing.translationMarkupMultiplier

		return Math.ceil(totalPriceInRub * 100) * markupMultiplier
	}
}
