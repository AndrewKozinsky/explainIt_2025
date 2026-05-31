import { useEffect } from 'react'
import { useDetailsStore } from '../../detailsStore'

export function usePopulateStore() {
	const chapterId = useDetailsStore((s) => s.chapterId)

	useEffect(
		function () {
			if (!chapterId) return


		},
		[chapterId],
	)
}
