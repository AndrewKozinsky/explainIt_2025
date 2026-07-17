import LabelWithField from '@/shared/ui/formRelated/LabelWithField/LabelWithField'
import { useBookStore } from '_pages/media/book/bookStore'
import DeleteBookCoverButton from './DeleteBookCoverButton/DeleteBookCoverButton'
import './BookCoverPreview.scss'

function BookCoverPreview() {
	const book = useBookStore((s) => s.book.data)

	if (!book || !book.isCoverFileUploaded || !book.coverUrl) {
		return null
	}

	return (
		<LabelWithField label='Обложка'>
			<div className='book-cover-preview' style={{ backgroundImage: `url(${book.coverUrl})` }}>
				<DeleteBookCoverButton />
			</div>
		</LabelWithField>
	)
}

export default BookCoverPreview
