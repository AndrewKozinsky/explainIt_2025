import React from 'react'
import Select from '@/shared/ui/formRelated/Select/Select'
import { SORT_OPTIONS, SortKey } from './fn/sort'

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
