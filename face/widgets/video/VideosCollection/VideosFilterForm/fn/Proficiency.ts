export type ProficiencyKey = '' | '1' | '2' | '3' | '4' | '5' | '6'

export const PROFICIENCY_OPTIONS: { value: ProficiencyKey; label: string }[] = [
	{ value: '', label: 'Любой' },
	{ value: '1', label: 'A1' },
	{ value: '2', label: 'A2' },
	{ value: '3', label: 'B1' },
	{ value: '4', label: 'B2' },
	{ value: '5', label: 'C1' },
	{ value: '6', label: 'C2' },
]
