import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'src/infrastructure/mainConfig/mainConfig.service'
import { OpenAIModels } from 'src/infrastructure/openAI/openAI.service'
import { DBRepository } from 'src/repo/db.repository'
import { PaymentRepository } from 'src/repo/payment.repository'
import { BalanceTransactionRepository } from 'src/repo/balanceTransaction.repository'
import { BalanceTransactionType } from '.prisma/client'

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
		private dbRepository: DBRepository,
	) {}

	async execute(command: TokenUsageBalanceChargeCommand) {
		const { userId } = command.dto

		const amount = this.calculateAmountInKopeckDependsOnTokens(command.dto)

		try {
			await this.dbRepository.wrapIntoPrismaTransaction({
				executableCode: async () => {
					await this.transactionRepository.createTransaction({
						amount: -amount,
						userId,
						type: BalanceTransactionType.CHARGE,
					})
				},
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

		const providerPrices = providerPricesMapper[input.aiModelName]

		const providerPriceInRub = input.inputTokens * providerPrices.input + input.outputTokens * providerPrices.output

		const myPriceInRub = providerPriceInRub * this.mainConfig.get().myPriceMultiplier

		// Вернуть стоимость в копейках
		return Math.round(myPriceInRub / 100)
	}
}
