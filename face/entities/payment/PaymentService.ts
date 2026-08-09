import type { PaymentRepository, TopUpBalanceInput, TopUpBalanceResult } from './repository/PaymentRepository'

export type { PaymentRepository, TopUpBalanceInput, TopUpBalanceResult } from './repository/PaymentRepository'

/**
 * Сервис платежей — прослойка между компонентами и репозиторием.
 *
 * Принимает {@link PaymentRepository} в конструкторе, что позволяет
 * подменять источник данных:
 * - `new PaymentApi()` — реальный API в продакшене
 * - мок-объект — в тестах и Storybook
 *
 * Компоненты зависят от этого сервиса, а не от конкретной реализации API.
 */
export class PaymentService {
	private paymentRepository: PaymentRepository

	constructor(paymentRepository: PaymentRepository) {
		this.paymentRepository = paymentRepository
	}

	/** Пополнить баланс через YooKassa */
	async topUpBalance(input: TopUpBalanceInput) {
		return this.paymentRepository.topUpBalance(input)
	}
}
