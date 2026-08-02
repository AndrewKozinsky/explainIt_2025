import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'

/** Входные данные для пополнения баланса. */
export type TopUpBalanceInput = {
	/** Сумма в копейках */
	amountInKopecks: number
}

/** Результат создания платежа. */
export type TopUpBalanceResult = {
	/** URL для редиректа на страницу оплаты YooKassa */
	confirmationUrl: string
}

/**
 * Репозиторий платежей — абстракция над серверным API.
 * Компоненты зависят от этого интерфейса, а не от конкретной реализации.
 *
 * Каждый метод возвращает Promise с данными. В случае ошибки
 * выбрасывает исключение, которое {@link resolveError} преобразует
 * в читаемый текст.
 */
export type PaymentRepository = {
	/** Пополнить баланс через YooKassa */
	topUpBalance(input: TopUpBalanceInput): Promise<ApiResult<TopUpBalanceResult>>
}
