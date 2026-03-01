import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { SubscriptionBalanceTransactionRepository } from 'repo/subscriptionBalanceTransaction.repository'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { BalanceTransactionType } from 'prisma/generated/enums'

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
export class DeepSeekTokenUsageBalanceChargeHandler
	implements ICommandHandler<DeepSeekTokenUsageBalanceChargeCommand>
{
	constructor(
		private mainConfig: MainConfigService,
		private subscriptionBalanceTransactionRepository: SubscriptionBalanceTransactionRepository,
	) {}

	async execute(command: DeepSeekTokenUsageBalanceChargeCommand) {
		const { userId, inputTokens, outputTokens } = command.dto

		const amountInKopecks = this.calculateAmountInKopeckDependsOnTokens({ inputTokens, outputTokens })

		try {
			await this.subscriptionBalanceTransactionRepository.createChargeForActiveSubscription({
				userId,
				amountInKopecks: -amountInKopecks,
				type: BalanceTransactionType.CHARGE,
			})
		} catch (error) {
			throw new CustomGraphQLError(errorMessage.unknownError, ErrorCode.InternalServerError_500)
		}
	}

	calculateAmountInKopeckDependsOnTokens(input: { inputTokens: number; outputTokens: number }): number {
		const prices = this.mainConfig.get().deepSeek.priceInRub

		const totalPriceInRub = input.inputTokens * prices.input + input.outputTokens * prices.output

		return Math.ceil(totalPriceInRub * 100)
	}
}
