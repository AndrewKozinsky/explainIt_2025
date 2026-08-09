import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UserBalanceTransactionRepository } from 'repo/userBalanceTransaction.repository'
import { AiModel, DeepSeekModels, GoogleGeminiModels, OpenAIModels } from 'types/AIModels'
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
		const { userId, aiModelName, inputTokens, outputTokens, lowPriority } = command.dto

		const amountInKopecks = this.calculateAmountInKopeckDependsOnTokens({
			aiModelName,
			inputTokens,
			outputTokens,
			lowPriority: lowPriority ?? false,
		})

		if (amountInKopecks <= 0) return

		try {
			await this.userBalanceTransactionRepository.createCharge({ userId, amountInKopecks })
		} catch (error) {
			if (error instanceof CustomError) {
				throw error
			}

			throw new CustomError(errorMessage.unknownError, ErrorStatusCode.InternalServerError_500)
		}
	}

	calculateAmountInKopeckDependsOnTokens(input: {
		aiModelName: AiModel
		inputTokens: number
		outputTokens: number
		lowPriority: boolean
	}): number {
		const priceMap: Record<AiModel, { input: number; output: number }> = {
			// OpenAI
			[OpenAIModels.Nano]: this.mainConfig.get().openAI.priceInRub.nano,
			[OpenAIModels.Mini]: this.mainConfig.get().openAI.priceInRub.mini,
			[OpenAIModels.Standard]: this.mainConfig.get().openAI.priceInRub.standard,
			// DeepSeek
			[DeepSeekModels.Flash]: this.mainConfig.get().deepSeek.priceInRub.flash,
			[DeepSeekModels.Pro]: this.mainConfig.get().deepSeek.priceInRub.pro,
			// Gemini
			[GoogleGeminiModels.FlashLite]: this.mainConfig.get().gemini.priceInRub.flashLite,
			[GoogleGeminiModels.Flash]: this.mainConfig.get().gemini.priceInRub.flash,
			[GoogleGeminiModels.Pro]: this.mainConfig.get().gemini.priceInRub.pro,
		}

		const prices = priceMap[input.aiModelName]

		let totalPriceInRub = input.inputTokens * prices.input + input.outputTokens * prices.output

		if (input.lowPriority && Object.values(OpenAIModels).includes(input.aiModelName as OpenAIModels)) {
			totalPriceInRub /= 2
		}

		const baseAmountInKopecks = Math.ceil(totalPriceInRub * 100)
		const markupMultiplier = this.mainConfig.get().billing.translationMarkupMultiplier

		return baseAmountInKopecks * markupMultiplier
	}
}
