import { useCallback } from 'react'

export function useGetDeleteEntity(onDeleteButtonClick: () => Promise<void>, closeModal: () => void) {
	return useCallback(async function () {
		await onDeleteButtonClick()
		closeModal()
	}, [])
}
