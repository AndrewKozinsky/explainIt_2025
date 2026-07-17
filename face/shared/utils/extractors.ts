/**
 * Достаёт строку из Orval-обёртки.
 *
 * Проблема: Orval генерирует для строковых полей тип
 * `{ [key: string]: unknown } | null`, хотя сервер возвращает
 * обычный JSON, где эти поля — string | null | undefined.
 *
 * @returns Строка или null, если значение не является строкой.
 */
export function extractString(value: unknown): null | string {
	if (typeof value === 'string') return value
	return null
}

/**
 * Достаёт число из Orval-обёртки.
 * @returns Число или null, если значение не является числом.
 */
export function extractNumber(value: unknown): null | number {
	if (typeof value === 'number') return value
	return null
}

/**
 * Достаёт булево значение из Orval-обёртки.
 * @returns Булево значение или null, если значение не является булевым.
 */
export function extractBoolean(value: unknown): null | boolean {
	if (typeof value === 'boolean') return value
	return null
}
