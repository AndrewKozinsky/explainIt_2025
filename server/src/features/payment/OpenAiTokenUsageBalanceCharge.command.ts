import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UserBalanceTransactionRepository } from 'repo/userBalanceTransaction.repository'
import { OpenAIModels } from 'types/openAIModels'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'

export class OpenAiTokenUsageBalanceChargeCommand implements ICommand {
	constructor(
		public dto: {
			userId: number
			aiModelName: OpenAIModels
			inputTokens: number
			outputTokens: number
			lowPriority: boolean // Specific for OpenAI
		},
	) {}
}

// Этот командный обработчик получает количество входящих и исходящих токенов, высчитывает стоимость и создает транзакцию
@CommandHandler(OpenAiTokenUsageBalanceChargeCommand)
export class OpenAiTokenUsageBalanceChargeHandler implements ICommandHandler<OpenAiTokenUsageBalanceChargeCommand> {
	constructor(
		private mainConfig: MainConfigService,
		private userBalanceTransactionRepository: UserBalanceTransactionRepository,
	) {}

	async execute(command: OpenAiTokenUsageBalanceChargeCommand) {
		const { userId } = command.dto

		const amountInKopecks = this.calculateAmountInKopeckDependsOnTokens(command.dto)

		try {
			await this.userBalanceTransactionRepository.createCharge({ userId, amountInKopecks })
		} catch (error) {
			if (error instanceof CustomError) {
				throw error
			}

			throw new CustomError(errorMessage.unknownError, ErrorCode.InternalServerError_500)
		}
	}

	/**
	 * Получает количество израсходованных токенов и умножает на цену поставщика.
	 * В конце умножается на мою наценку.
	 * @param input
	 */
	calculateAmountInKopeckDependsOnTokens(input: {
		aiModelName: OpenAIModels
		inputTokens: number
		outputTokens: number
		lowPriority: boolean
	}): number {
		const providerPricesMapper: Record<OpenAIModels, { input: number; output: number }> = {
			[OpenAIModels.Nano]: this.mainConfig.get().openAI.priceInRub.nano,
			[OpenAIModels.Mini]: this.mainConfig.get().openAI.priceInRub.mini,
			[OpenAIModels.Standard]: this.mainConfig.get().openAI.priceInRub.standard,
		}

		let providerPricesForOneToken = providerPricesMapper[input.aiModelName]

		let totalPriceInRub =
			input.inputTokens * providerPricesForOneToken.input + input.outputTokens * providerPricesForOneToken.output
		if (input.lowPriority) totalPriceInRub /= 2

		const baseAmountInKopecks = Math.ceil(totalPriceInRub * 100)
		const markupMultiplier = this.mainConfig.get().billing.translationMarkupMultiplier

		return baseAmountInKopecks * markupMultiplier
	}
}
