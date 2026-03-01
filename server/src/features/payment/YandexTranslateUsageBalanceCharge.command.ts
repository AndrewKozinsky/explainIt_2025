import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { SubscriptionBalanceTransactionRepository } from 'repo/subscriptionBalanceTransaction.repository'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { BalanceTransactionType } from 'prisma/generated/enums'

export class YandexTranslateUsageBalanceChargeCommand implements ICommand {
	constructor(
		public dto: {
			userId: number
			symbolsCount: number
		},
	) {}
}

// Этот командный обработчик получает количество входящих и исходящих токенов, высчитывает стоимость и создает транзакцию
@CommandHandler(YandexTranslateUsageBalanceChargeCommand)
export class YandexTranslateUsageBalanceChargeHandler
	implements ICommandHandler<YandexTranslateUsageBalanceChargeCommand>
{
	constructor(
		private mainConfig: MainConfigService,
		private subscriptionBalanceTransactionRepository: SubscriptionBalanceTransactionRepository,
	) {}

	async execute(command: YandexTranslateUsageBalanceChargeCommand) {
		const { userId } = command.dto

		const amountInKopecks = this.calculateAmountInKopeckDependsOnTokens(command.dto.symbolsCount)

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

	/**
	 * Получает количество символов и умножает на цену поставщика.
	 * В конце умножается на мою наценку.
	 */
	calculateAmountInKopeckDependsOnTokens(translatedSymbolsCount: number): number {
		// Так как Переводчик минимум берёт 1 копейку, то значит я должен брать минимум 2 копейки
		// Вернуть стоимость в копейках
		return Math.max(this.mainConfig.get().yandexCloud.translate.priceForSymbolInKopecks * translatedSymbolsCount, 2)
	}
}
