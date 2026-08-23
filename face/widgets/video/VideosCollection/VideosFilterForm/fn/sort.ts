import { type DropdownOption } from '@/shared/ui/formRelated/Select/Select'

export type SortKey = '' | 'created_at' | 'learnability_score'

export const SORT_OPTIONS: DropdownOption[] = [
	{ value: '', label: 'Без сортировки' },
	{ value: 'created_at', label: 'По дате' },
	{ value: 'learnability_score', label: 'По полезности' },
]
