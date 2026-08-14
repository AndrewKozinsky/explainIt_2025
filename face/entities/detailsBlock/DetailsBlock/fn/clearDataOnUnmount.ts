import { useEffect } from 'react'
import { useDetailsStore } from '../../detailsStore'

export function useClearDataOnUnmount() {
	useEffect(function () {
		return () => {
			useDetailsStore.getState().clearStoreData()
		}
	}, [])
}
