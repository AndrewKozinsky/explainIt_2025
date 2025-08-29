import { useCallback } from 'react'

export function useGetDeleteEntity(onDeleteButtonClick: () => Promise<void>, closeModal: () => void) {
	return useCallback(async function () {
		try {
			await onDeleteButtonClick()
			closeModal()
		} catch (error) {
			// handle error
		}
	}, [])
}
