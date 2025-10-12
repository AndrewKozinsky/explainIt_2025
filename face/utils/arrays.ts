export function areArraysEqualIgnoringOrder(arr1: any[], arr2: any[]) {
	if (arr1.length !== arr2.length) {
		return false
	}

	// Создаём Map для подсчёта частоты элементов в первом массиве
	const frequency = new Map<any, number>()
	for (const item of arr1) {
		frequency.set(item, (frequency.get(item) || 0) + 1)
	}

	// Проверяем второй массив на соответствие частотам
	for (const item of arr2) {
		const count = frequency.get(item)
		if (count === undefined || count <= 0) {
			return false
		}
		frequency.set(item, count - 1)
	}

	return true
}
