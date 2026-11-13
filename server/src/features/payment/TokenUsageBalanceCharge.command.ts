import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UserBalanceTransactionRepository } from 'repo/userBalanceTransaction.repository'
import { AiModel } from 'types/AIModels'
import { costInDollarsToMicrodollarsCharge } from 'utils/microdollars'
import { calculateLlmCostInDollars, getLlmTokenPrice } from 'features/billing/aiUsageCost'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'

export class TokenUsageBalanceChargeCommand implements ICommand {
	constructor(
		public dto: {
			userId: number
			aiModelName: AiModel
			inputTokens: number
			cachedInputTokens?: number
			outputTokens: number
			/** Только для OpenAI — снижает стоимость вдвое */
			lowPriority?: boolean
		},
	) {}
}

@CommandHandler(TokenUsageBalanceChargeCommand)
export class TokenUsageBalanceChargeHandler implements ICommandHandler<TokenUsageBalanceChargeCommand> {
	constructor(
		private mainConfig: MainConfigService,
		private userBalanceTransactionRepository: UserBalanceTransactionRepository,
	) {}

	async execute(command: TokenUsageBalanceChargeCommand) {
		// Списание баланса полностью отключено — не начисляем стоимость ни одному пользователю.
		if (!this.mainConfig.get().billing.chargingEnabled) return

		const { userId, aiModelName, inputTokens, cachedInputTokens, outputTokens, lowPriority } = command.dto

		const amountInMicrodollars = this.calculateAmountInMicrodollars({
			aiModelName,
			inputTokens,
			cachedInputTokens: cachedInputTokens ?? 0,
			outputTokens,
			lowPriority: lowPriority ?? false,
		})

		if (amountInMicrodollars <= 0) return

		try {
			await this.userBalanceTransactionRepository.createCharge({ userId, amountInKopecks: amountInMicrodollars })
		} catch (error) {
			if (error instanceof CustomError) {
				throw error
			}

			throw new CustomError(errorMessage.unknownError, ErrorStatusCode.InternalServerError_500)
		}
	}

	/** Стоимость запроса в микродолларах по ценам поставщика из mainConfig, без наценки. */
	calculateAmountInMicrodollars(input: {
		aiModelName: AiModel
		inputTokens: number
		cachedInputTokens: number
		outputTokens: number
		lowPriority: boolean
	}): number {
		const costInDollars = calculateLlmCostInDollars({
			model: input.aiModelName,
			price: getLlmTokenPrice(this.mainConfig.get(), input.aiModelName),
			usage: {
				inputTokens: input.inputTokens,
				cachedInputTokens: input.cachedInputTokens,
				outputTokens: input.outputTokens,
			},
			lowPriority: input.lowPriority,
		})

		return costInDollarsToMicrodollarsCharge(costInDollars)
	}
}
