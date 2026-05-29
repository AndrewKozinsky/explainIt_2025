import LabelWithField from 'ui/formRelated/LabelWithField/LabelWithField'
import { useBookStore } from '_pages/media/book/bookStore'
import DeleteBookCoverButton from './DeleteBookCoverButton/DeleteBookCoverButton'
import './BookCoverPreview.scss'

function BookCoverPreview() {
	const book = useBookStore((s) => s.privateBook.data)

	if (!book || !book.isFileUploaded || !book.coverUrl) {
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
