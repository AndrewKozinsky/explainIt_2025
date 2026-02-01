import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BalanceTransactionRepository } from 'repo/balanceTransaction.repository'
import { OpenAIModels } from 'types/openAIModels'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { BalanceTransactionType } from 'prisma/generated/enums'

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
		private transactionRepository: BalanceTransactionRepository,
	) {}

	async execute(command: OpenAiTokenUsageBalanceChargeCommand) {
		const { userId } = command.dto

		const amountInKopecks = this.calculateAmountInKopeckDependsOnTokens(command.dto)

		try {
			await this.transactionRepository.createTransaction({
				amount: -amountInKopecks,
				userId,
				type: BalanceTransactionType.CHARGE,
			})
		} catch (error) {
			throw new CustomGraphQLError(errorMessage.unknownError, ErrorCode.InternalServerError_500)
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

		// Вернуть стоимость в копейках
		return Math.ceil(totalPriceInRub * 100)
	}
}
