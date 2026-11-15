import { useSyncExternalStore } from 'react'
import { type BalanceRefill, getNextBalanceRefill } from './getNextBalanceRefill'

let lastBalanceRefill: BalanceRefill | null = null

/**
 * Ближайшее начисление баланса по часовому поясу браузера.
 * При серверном рендере и гидратации — null: часовой пояс сервера не совпадает с часовым поясом пользователя.
 */
export function useNextBalanceRefill(): BalanceRefill | null {
	return useSyncExternalStore(subscribeToNothing, getBrowserBalanceRefill, getServerBalanceRefill)
}

/** Время начисления меняется раз в сутки; к этому моменту исчерпанный лимит уже снимет событие баланса. */
function subscribeToNothing(): () => void {
	return function () {}
}

/** Возвращает тот же объект, пока значение не изменилось: useSyncExternalStore сравнивает снимки по ссылке. */
function getBrowserBalanceRefill(): BalanceRefill {
	const balanceRefill = getNextBalanceRefill(new Date())

	if (
		lastBalanceRefill?.refillTime !== balanceRefill.refillTime ||
		lastBalanceRefill.isToday !== balanceRefill.isToday
	) {
		lastBalanceRefill = balanceRefill
	}

	return lastBalanceRefill
}

function getServerBalanceRefill(): null {
	return null
}
