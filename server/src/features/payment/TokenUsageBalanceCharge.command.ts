import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { BalanceTransactionRepository } from 'repo/balanceTransaction.repository'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { OpenAIModels } from 'infrastructure/openAI/openAI.service'
import { BalanceTransactionType } from 'prisma/generated/enums'

export class TokenUsageBalanceChargeCommand implements ICommand {
	constructor(
		public dto: {
			userId: number
			aiModelName: OpenAIModels
			inputTokens: number
			outputTokens: number
		},
	) {}
}

// Этот командный обработчик будет вызываться при получении ответа от ЮKassa при оплате.
// При положительном ответе от Юкассы создаёт транзакцию в балансе пользователя вместе с увеличением баланса.
@CommandHandler(TokenUsageBalanceChargeCommand)
export class TokenUsageBalanceChargeHandler implements ICommandHandler<TokenUsageBalanceChargeCommand> {
	constructor(
		private mainConfig: MainConfigService,
		private transactionRepository: BalanceTransactionRepository,
	) {}

	async execute(command: TokenUsageBalanceChargeCommand) {
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
	}): number {
		const providerPricesMapper: Record<OpenAIModels, { input: number; output: number }> = {
			[OpenAIModels.Nano]: this.mainConfig.get().providerTokenPriceInRub.openAi.nano,
			[OpenAIModels.Mini]: this.mainConfig.get().providerTokenPriceInRub.openAi.mini,
			[OpenAIModels.Standard]: this.mainConfig.get().providerTokenPriceInRub.openAi.standard,
		}

		const providerPricesForOneToken = providerPricesMapper[input.aiModelName]

		const providerTotalPriceInRub =
			input.inputTokens * providerPricesForOneToken.input + input.outputTokens * providerPricesForOneToken.output

		const myPriceInRub = providerTotalPriceInRub * this.mainConfig.get().myPriceMultiplier

		// Вернуть стоимость в копейках
		return Math.ceil(myPriceInRub * 100)
	}
}
