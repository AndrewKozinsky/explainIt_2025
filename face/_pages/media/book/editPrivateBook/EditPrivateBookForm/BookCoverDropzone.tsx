// import { useBook_Update, Book_GetUserBooksDocument, Book_GetDocument } from '@/graphql'
// import FileDropzone from '@/ui/formRelated/FileDropzone/FileDropzone'
// import { useBookStore } from '_pages/media/book/bookStore'

// const supportedFormatsStr = 'JPG, JPEG, PNG, WebP, AVIF'

/*function BookCoverDropzone() {
	const book = useBookStore((s) => s.privateBook.data)

	const [updateBook] = useBook_Update({
		refetchQueries: [
			Book_GetUserBooksDocument,
			{ query: Book_GetDocument, variables: { input: { id: book?.id } } },
		],
	})

	const onGetUploadUrl = async (file: File): Promise<string | null> => {
		if (!book) return null

		const res = await updateBook({
			variables: {
				input: {
					id: book.id,
					fileName: file.name,
					fileMimeType: file.type,
					languageCode: book.languageCode,
				},
			},
		})

		return res.data?.book_update.uploadUrl ?? null
	}

	const onUploadComplete = async (): Promise<void> => {
		if (!book) return

		await updateBook({
			variables: {
				input: {
					id: book.id,
					isFileUploaded: true,
					languageCode: book.languageCode,
				},
			},
		})
	}

	return (
		<FileDropzone
			accept={{
				'image/jpeg': ['.jpg', '.jpeg'],
				'image/png': ['.png'],
				'image/webp': ['.webp'],
				'image/avif': ['.avif'],
			}}
			supportedFormatsStr={supportedFormatsStr}
			idleText='Перетащите обложку сюда'
			visible={!!(book && !book.isFileUploaded)}
			onGetUploadUrl={onGetUploadUrl}
			onUploadComplete={onUploadComplete}
		/>
	)
}*/

// export default BookCoverDropzone
