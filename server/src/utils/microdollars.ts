/**
 * Деньги внутри сервера хранятся в микродолларах: целых миллионных долях доллара.
 * Цент слишком крупный (запрос к LLM стоит доли цента), а дробные доллары в JS накапливают ошибки округления.
 */
export const MICRODOLLARS_IN_DOLLAR = 1_000_000

/** Переводит доллары в микродоллары с округлением до ближайшего целого: для сумм из конфигурации. */
export function dollarsToMicrodollars(dollars: number): number {
	return Math.round(dollars * MICRODOLLARS_IN_DOLLAR)
}

/** Переводит микродоллары в доллары. */
export function microdollarsToDollars(microdollars: number): number {
	return microdollars / MICRODOLLARS_IN_DOLLAR
}

/**
 * Переводит стоимость запроса в микродоллары для списания: округляет вверх,
 * чтобы списание не было меньше реальных расходов.
 */
export function costInDollarsToMicrodollarsCharge(costInDollars: number): number {
	if (costInDollars <= 0) return 0

	// Допуск убирает погрешность float: 0.000002 * 1e6 может дать 2.0000000000000004, а это всё ещё 2.
	return Math.ceil(costInDollars * MICRODOLLARS_IN_DOLLAR - 1e-9)
}
