/**
 * Перемешивает массив на месте алгоритмом Fisher–Yates.
 *
 * Функция изменяет исходный массив и не создаёт его копию.
 */
export function shuffle<T>(items: T[]): void {
	for (let index = items.length - 1; index > 0; index -= 1) {
		const randomIndex = Math.floor(Math.random() * (index + 1))
		;[items[index], items[randomIndex]] = [items[randomIndex], items[index]]
	}
}
