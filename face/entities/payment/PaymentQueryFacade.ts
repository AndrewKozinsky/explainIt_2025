import { paymentService } from './PaymentService'
import type { PaymentService, TopUpBalanceInput } from './PaymentService'

/**
 * Адаптер между доменным сервисом платежей и TanStack Query.
 *
 * У {@link PaymentService} нет запросов — только мутация пополнения баланса.
 * Ошибки возвращаются в данных (`ApiResult`), а не выбрасываются.
 */
export class PaymentQueryFacade {
	constructor(private readonly service: PaymentService) {}

	/** Пополнить баланс через YooKassa */
	topUpBalance() {
		return { mutationFn: (input: TopUpBalanceInput) => this.service.topUpBalance(input) }
	}
}

/** Готовый экземпляр фасада */
export const paymentQueries = new PaymentQueryFacade(paymentService)
