import { BooksService } from '@/entities/book/BooksService'
import type { BookModel } from '@/entities/book/repository/BooksRepository'
import FileDropzone from '@/shared/ui/formRelated/FileDropzone/FileDropzone'
import { useCoverUpload } from './fn/useCoverUpload'

type BookCoverDropzoneProps = {
	bookId: number
	languageCode: string | null
	isCoverFileUploaded: boolean | null
	onCoverUpdated: (book: BookModel) => void
}

function BookCoverDropzone(props: BookCoverDropzoneProps) {
	const { bookId, languageCode, isCoverFileUploaded, onCoverUpdated } = props

	const { onGetUploadUrl, onUploadComplete } = useCoverUpload(bookId, languageCode, onCoverUpdated)

	return (
		<FileDropzone
			block
			label='Обложка'
			accept={BooksService.supportedCoverFormats.accept}
			supportedFormatsStr={BooksService.supportedCoverFormats.description}
			visible={isCoverFileUploaded !== true}
			onGetUploadUrl={onGetUploadUrl}
			onUploadComplete={onUploadComplete}
		/>
	)
}

export default BookCoverDropzone
