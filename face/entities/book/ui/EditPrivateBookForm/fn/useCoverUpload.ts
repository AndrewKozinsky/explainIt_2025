import { useCallback, useMemo } from 'react'
import { BooksService } from '@/entities/book/BooksService'
import { BooksApi } from '@/entities/book/repository/BooksApi'
import type { BookModel } from '@/entities/book/repository/BooksRepository'

export function useCoverUpload(bookId: number, languageCode: string | null, onCoverUpdated: (book: BookModel) => void) {
	const booksService = useMemo(() => new BooksService(new BooksApi()), [])

	const onGetUploadUrl = useCallback(
		async function (file: File): Promise<string | null> {
			const result = await booksService.requestCoverUploadUrl(bookId, file.name, file.type, languageCode)

			if (result.error || result.errors || !result.data) {
				return null
			}

			onCoverUpdated(result.data)

			return result.data.uploadUrl
		},
		[bookId, languageCode, booksService, onCoverUpdated],
	)

	const onUploadComplete = useCallback(
		async function (): Promise<void> {
			const result = await booksService.confirmCoverUpload(bookId, languageCode)

			if (result.data) {
				onCoverUpdated(result.data)
			}
		},
		[bookId, languageCode, booksService, onCoverUpdated],
	)

	return { onGetUploadUrl, onUploadComplete }
}
