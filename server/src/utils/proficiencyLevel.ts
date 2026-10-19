/**
 * Уровни владения языком по шкале CEFR (Common European Framework of Reference).
 * Метаданные видео хранят числа 1–6; настройки адаптации текста используют CEFR-коды.
 */
export const PROFICIENCY_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const
export type ProficiencyLevel = (typeof PROFICIENCY_LEVELS)[number]

/** Уровни, для которых приложение поддерживает упрощение текста. null отключает ограничение. */
export const CEFR_SIMPLIFICATION_LEVELS = ['A1', 'A2', 'B1', 'B2'] as const satisfies readonly ProficiencyLevel[]
export type CefrSimplificationLevel = (typeof CEFR_SIMPLIFICATION_LEVELS)[number]

/** Маппинг серверных чисел (1–6) → CEFR-лейблы */
export const PROFICIENCY_LEVEL_MAP: Record<number, ProficiencyLevel> = {
	1: 'A1',
	2: 'A2',
	3: 'B1',
	4: 'B2',
	5: 'C1',
	6: 'C2',
}

/** Преобразует число с сервера в CEFR-лейбл. Возвращает null для некорректных значений. */
export function mapNumberToProficiencyLevel(raw: unknown): null | ProficiencyLevel {
	if (typeof raw !== 'number' || raw < 1 || raw > 6) return null
	return PROFICIENCY_LEVEL_MAP[raw] ?? null
}
