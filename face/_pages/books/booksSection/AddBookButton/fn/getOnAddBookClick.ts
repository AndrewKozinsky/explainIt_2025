import { useCallback, useState } from 'react'
import { Book_GetUserBooksDocument, useBook_Create } from '../../../../../graphql'

export function useGetOnAddBookClick() {
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')
	const [createBook] = useBook_Create({ refetchQueries: [Book_GetUserBooksDocument] })

	const onAddBookClick = useCallback(async function () {
		setStatus('loading')

		const { data, errors } = await createBook({
			variables: { input: { author: null, name: null, note: null } },
		})

		setStatus('loading')

		if (errors || data) {
			setStatus('idle')
			return
		}
	}, [])

	return {
		status,
		onAddBookClick,
	}
}
