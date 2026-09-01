import { useEffect, useState } from 'react'
import { localStorageManager } from '@/shared/utils/localStorageManager'
import { SortKey } from '../../VideosFilterForm/fn/sort'

function useSortFilter() {
	const [sortKey, setSortKey] = useState<SortKey>(function () {
		return localStorageManager.lastSort.get() as SortKey
	})

	useEffect(
		function () {
			localStorageManager.lastSort.set(sortKey)
		},
		[sortKey],
	)

	return { sortKey, setSortKey }
}

export default useSortFilter
