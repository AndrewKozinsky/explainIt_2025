import { useCallback, useContext, useState } from 'react'
import { Book_GetUserBooksDocument, useBook_Create } from '../../../../../graphql'
import { NotificationContext } from '../../../../../ui/Notification/context'

export function useGetOnAddBookClick() {
	const { notify } = useContext(NotificationContext)

	const [status, setStatus] = useState<'idle' | 'loading'>('idle')
	const [createBook] = useBook_Create({ refetchQueries: [Book_GetUserBooksDocument] })

	const onAddBookClick = useCallback(async function () {
		setStatus('loading')

		const { errors } = await createBook({
			variables: { input: { author: null, name: null, note: null } },
		})

		if (errors) {
			notify({ type: 'error', message: 'Не удалось получить список книг.' })
		}

		setStatus('idle')
	}, [])

	return {
		status,
		onAddBookClick,
	}
}
