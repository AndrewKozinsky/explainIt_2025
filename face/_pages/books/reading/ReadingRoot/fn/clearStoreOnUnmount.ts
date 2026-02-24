import { useEffect } from 'react'
import { useReadingStore } from '../../readingStore'

export function useClearReadingStoreOnUnmount() {
	const clearStoreData = useReadingStore((s) => s.clearStoreData)

	useEffect(() => {
		return () => {
			clearStoreData()
		}
	}, [clearStoreData])
}
