// import type { SwitcherItem } from '@/shared/ui/Switcher/Switcher'

// ─── Длительность ──────────────────────────────────────────────────────────

/*export type DurationFilter = {
	minDurationSec?: number
	maxDurationSec?: number
}*/

// export type DurationKey = '' | 'lt5' | '5-15' | '15-30' | '30-60'

/*const DURATION_ENTRIES: { key: DurationKey; text: string }[] = [
	{ key: '', text: 'Любая' },
	{ key: 'lt5', text: '5 мин.' },
	{ key: '5-15', text: '15 мин.' },
	{ key: '15-30', text: '30 мин.' },
	{ key: '30-60', text: '60 мин.' },
]*/

/*const DURATION_MAP: Record<DurationKey, DurationFilter> = {
	'': {},
	lt1: { maxDurationSec: 60 },
	'1-5': { minDurationSec: 60, maxDurationSec: 300 },
	'5-15': { minDurationSec: 300, maxDurationSec: 900 },
	'15-30': { minDurationSec: 900, maxDurationSec: 1800 },
	'30-60': { minDurationSec: 1800, maxDurationSec: 3600 },
	gt60: { minDurationSec: 3600 },
}*/

// ─── Уровень владения (CEFR) ───────────────────────────────────────────────

/*type ProficiencyFilter = {
	proficiencyLevel?: number
}*/

// export type ProficiencyKey = '' | '1' | '2' | '3' | '4' | '5' | '6'

/*const PROFICIENCY_ENTRIES: { key: ProficiencyKey; text: string }[] = [
	{ key: '', text: 'Любой' },
	{ key: '1', text: 'A1' },
	{ key: '2', text: 'A2' },
	{ key: '3', text: 'B1' },
	{ key: '4', text: 'B2' },
	{ key: '5', text: 'C1' },
	{ key: '6', text: 'C2' },
]*/

/*const PROFICIENCY_MAP: Record<ProficiencyKey, ProficiencyFilter> = {
	'': {},
	'1': { proficiencyLevel: 1 },
	'2': { proficiencyLevel: 2 },
	'3': { proficiencyLevel: 3 },
	'4': { proficiencyLevel: 4 },
	'5': { proficiencyLevel: 5 },
	'6': { proficiencyLevel: 6 },
}*/

// ─── Экспорты ──────────────────────────────────────────────────────────────

/*export function getDurationSwitcherItems(current: DurationKey, onSelect: (key: DurationKey) => void): SwitcherItem[] {
	return DURATION_ENTRIES.map(function (entry) {
		return {
			text: entry.text,
			onClick: function () {
				onSelect(entry.key)
			},
			isCurrent: current === entry.key,
		}
	})
}*/

/*export function getDurationFilter(value: DurationKey): DurationFilter {
	return DURATION_MAP[value] ?? {}
}*/

/*export function getProficiencySwitcherItems(
	current: ProficiencyKey,
	onSelect: (key: ProficiencyKey) => void,
): SwitcherItem[] {
	return PROFICIENCY_ENTRIES.map(function (entry) {
		return {
			text: entry.text,
			onClick: function () {
				onSelect(entry.key)
			},
			isCurrent: current === entry.key,
		}
	})
}*/

/*export function getProficiencyFilter(value: ProficiencyKey): ProficiencyFilter {
	return PROFICIENCY_MAP[value] ?? {}
}*/
