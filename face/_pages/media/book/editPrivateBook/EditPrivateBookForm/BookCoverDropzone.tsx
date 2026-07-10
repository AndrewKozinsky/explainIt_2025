import { useQueryClient } from '@tanstack/react-query'
import { useBookPrivateControllerUpdateBook } from '@/shared/api/generated/book-private/book-private'
import {
	getBookPrivateControllerGetUserBooksQueryKey,
	getBookPrivateControllerGetBookQueryKey,
} from '@/shared/api/generated/book-private/book-private'
import type { BookPrivateOutModel, UpdateBookDtoLanguageCode } from '@/shared/api/generated/models'
import FileDropzone from '@/shared/ui/formRelated/FileDropzone/FileDropzone'
import { useBookStore } from '_pages/media/book/bookStore'

const supportedFormatsStr = 'JPG, JPEG, PNG, WebP, AVIF'

function BookCoverDropzone() {
	const book = useBookStore((s) => s.privateBook.data)
	const { mutateAsync: updateBook } = useBookPrivateControllerUpdateBook()
	const queryClient = useQueryClient()

	const onGetUploadUrl = async (file: File): Promise<string | null> => {
		if (!book) return null

		const res = await updateBook({
			id: book.id,
			data: {
				fileName: file.name,
				fileMimeType: file.type,
				languageCode: book.languageCode as unknown as UpdateBookDtoLanguageCode,
			},
		})

		const updatedBook = res as unknown as BookPrivateOutModel
		return (updatedBook.uploadUrl as unknown as string) ?? null
	}

	const onUploadComplete = async (): Promise<void> => {
		if (!book) return

		await updateBook({
			id: book.id,
			data: {
				isFileUploaded: true,
				languageCode: book.languageCode as unknown as UpdateBookDtoLanguageCode,
			},
		})

		queryClient.invalidateQueries({ queryKey: getBookPrivateControllerGetUserBooksQueryKey() })
		queryClient.invalidateQueries({ queryKey: getBookPrivateControllerGetBookQueryKey(book.id) })
	}

	return (
		<FileDropzone
			label='Обложка'
			accept={{
				'image/jpeg': ['.jpg', '.jpeg'],
				'image/png': ['.png'],
				'image/webp': ['.webp'],
				'image/avif': ['.avif'],
			}}
			supportedFormatsStr={supportedFormatsStr}
			visible={book && !book.isFileUploaded}
			onGetUploadUrl={onGetUploadUrl}
			onUploadComplete={onUploadComplete}
		/>
	)
}

export default BookCoverDropzone
