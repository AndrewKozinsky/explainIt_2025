/** Ближайшее ежедневное начисление баланса: сервер начисляет его в 00:00 UTC. */
export type BalanceRefill = {
	/** Момент начисления, миллисекунды Unix. */
	refillTime: number
	/** Начисление придётся на сегодняшнюю дату по часовому поясу пользователя (иначе — на завтрашнюю). */
	isToday: boolean
}

export function getNextBalanceRefill(now: Date): BalanceRefill {
	const refillTime = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)

	return { refillTime, isToday: isSameLocalDate(new Date(refillTime), now) }
}

function isSameLocalDate(firstDate: Date, secondDate: Date): boolean {
	return (
		firstDate.getFullYear() === secondDate.getFullYear() &&
		firstDate.getMonth() === secondDate.getMonth() &&
		firstDate.getDate() === secondDate.getDate()
	)
}
