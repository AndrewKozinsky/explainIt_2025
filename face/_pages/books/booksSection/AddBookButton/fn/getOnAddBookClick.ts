import { useCallback, useState } from 'react'

export function useGetOnAddBookClick() {
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

	const onAddBookClick = useCallback(function () {
		setStatus('loading')
	}, [])

	return {
		status,
		onAddBookClick,
	}
}
