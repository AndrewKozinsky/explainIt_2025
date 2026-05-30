import { useEffect } from 'react'
import { useWatchingStore } from '../../watchingStore'

export function useClearWatchingStoreOnUnmount() {
	const clearStoreData = useWatchingStore((s) => s.clearStoreData)

	useEffect(() => {
		return () => {
			clearStoreData()
		}
	}, [clearStoreData])
}
