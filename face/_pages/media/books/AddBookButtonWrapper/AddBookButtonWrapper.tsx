'use client'

import { MediaGridAddButton } from '_pages/media/commonComponents/mediaItemsGrid/MediaGridAddButton/MediaGridAddButton'
import { useAddBook } from './fn/useAddBook'

/**
 * Клиентская обёртка над MediaGridAddButton.
 * Связывает кнопку с BooksApi.createBook() через useAsyncMutation,
 * обрабатывает ошибки уведомлениями.
 */
export function AddBookButtonWrapper() {
	const { handleClick, loading, error } = useAddBook()

	return <MediaGridAddButton onClick={handleClick} loading={loading} errorMessage={error} />
}
