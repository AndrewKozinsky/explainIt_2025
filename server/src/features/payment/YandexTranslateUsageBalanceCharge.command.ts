import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UserBalanceTransactionRepository } from 'repo/userBalanceTransaction.repository'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'

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
export class YandexTranslateUsageBalanceChargeHandler implements ICommandHandler<YandexTranslateUsageBalanceChargeCommand> {
	constructor(
		private mainConfig: MainConfigService,
		private userBalanceTransactionRepository: UserBalanceTransactionRepository,
	) {}

	async execute(command: YandexTranslateUsageBalanceChargeCommand) {
		const { userId } = command.dto

		const amountInKopecks = this.calculateAmountInKopeckDependsOnTokens(command.dto.symbolsCount)

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
	 * Получает количество символов и умножает на цену поставщика.
	 * В конце умножается на мою наценку.
	 */
	calculateAmountInKopeckDependsOnTokens(translatedSymbolsCount: number): number {
		const providerAmount =
			this.mainConfig.get().yandexCloud.translate.priceForSymbolInKopecks * translatedSymbolsCount
		const baseAmountInKopecks = Math.ceil(providerAmount)
		const markupMultiplier = this.mainConfig.get().billing.translationMarkupMultiplier

		return baseAmountInKopecks * markupMultiplier
	}
}
