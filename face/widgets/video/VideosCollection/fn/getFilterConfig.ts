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
