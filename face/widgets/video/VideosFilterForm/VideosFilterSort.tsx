import React from 'react'
import Select, { type DropdownOption } from '@/shared/ui/formRelated/Select/Select'

export type SortKey = '' | 'created_at' | 'learnability_score'

const SORT_OPTIONS: DropdownOption[] = [
	{ value: '', label: 'Без сортировки' },
	{ value: 'created_at', label: 'По дате' },
	{ value: 'learnability_score', label: 'По полезности' },
]

type YouTubeVideosFilterSortProps = {
	sortKey: SortKey
	onChange: (sortKey: SortKey) => void
}

function VideosFilterSort(props: YouTubeVideosFilterSortProps) {
	const { sortKey, onChange } = props

	return (
		<Select
			label='Сортировка'
			options={SORT_OPTIONS}
			selectProps={{
				value: sortKey,
				onChange: function (e) {
					onChange(e.target.value as SortKey)
				},
			}}
		/>
	)
}

export default VideosFilterSort
