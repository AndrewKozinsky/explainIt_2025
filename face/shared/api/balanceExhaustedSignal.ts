type BalanceExhaustedListener = () => void

const listeners = new Set<BalanceExhaustedListener>()

/**
 * Сигнал «сервер отклонил запрос к ИИ из-за баланса» (402 BALANCE_EXHAUSTED).
 * Обычно клиент уже знает баланс из потока `/api/user/events`; сигнал нужен на случай,
 * если поток отстал, чтобы интерфейс сразу показал исчерпанный лимит.
 */
export function subscribeToBalanceExhausted(listener: BalanceExhaustedListener): () => void {
	listeners.add(listener)

	return function () {
		listeners.delete(listener)
	}
}

export function notifyBalanceExhausted(): void {
	for (const listener of listeners) listener()
}
