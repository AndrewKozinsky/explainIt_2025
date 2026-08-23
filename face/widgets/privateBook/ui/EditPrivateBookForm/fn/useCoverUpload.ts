import { useCallback } from 'react'
import { booksService } from '@/entities/book/BooksService'
import type { BookModel } from '@/entities/book/repository/BooksRepository'

export function useCoverUpload(bookId: number, languageCode: string | null, onCoverUpdated: (book: BookModel) => void) {
	const onGetUploadUrl = useCallback(
		async function (file: File): Promise<string | null> {
			const result = await booksService.requestCoverUploadUrl(bookId, file.name, file.type, languageCode)

			if (result.error || result.errors || !result.data) {
				return null
			}

			onCoverUpdated(result.data)

			return result.data.uploadUrl
		},
		[bookId, languageCode, onCoverUpdated],
	)

	const onUploadComplete = useCallback(
		async function (): Promise<void> {
			const result = await booksService.confirmCoverUpload(bookId, languageCode)

			if (result.data) {
				onCoverUpdated(result.data)
			}
		},
		[bookId, languageCode, onCoverUpdated],
	)

	return { onGetUploadUrl, onUploadComplete }
}
