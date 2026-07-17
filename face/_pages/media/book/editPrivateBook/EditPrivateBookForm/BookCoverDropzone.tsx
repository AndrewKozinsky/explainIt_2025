import { useMemo } from 'react'
import { BooksApi } from '@/entites/books/repository/BooksApi'
import FileDropzone from '@/shared/ui/formRelated/FileDropzone/FileDropzone'
import { useBookStore } from '_pages/media/book/bookStore'

const supportedFormatsStr = 'JPG, JPEG, PNG, WebP, AVIF'

function BookCoverDropzone() {
	const book = useBookStore((s) => s.book.data)
	const api = useMemo(() => new BooksApi(), [])

	const onGetUploadUrl = async (file: File): Promise<string | null> => {
		if (!book) return null

		const updatedBook = await api.updateBook(book.id, {
			coverFileName: file.name,
			fileMimeType: file.type,
			languageCode: book.languageCode,
		})

		useBookStore.getState().updateBook({
			loading: false,
			errorMessage: null,
			data: updatedBook,
		})

		return updatedBook.uploadUrl
	}

	const onUploadComplete = async (): Promise<void> => {
		if (!book) return

		const updatedBook = await api.updateBook(book.id, {
			isCoverFileUploaded: true,
			languageCode: book.languageCode,
		})

		useBookStore.getState().updateBook({
			loading: false,
			errorMessage: null,
			data: updatedBook,
		})
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
			visible={book ? book.isCoverFileUploaded !== true : false}
			onGetUploadUrl={onGetUploadUrl}
			onUploadComplete={onUploadComplete}
		/>
	)
}

export default BookCoverDropzone
