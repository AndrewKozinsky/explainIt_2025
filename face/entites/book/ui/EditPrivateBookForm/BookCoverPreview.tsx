import LabelWithField from '@/shared/ui/formRelated/LabelWithField/LabelWithField'
import DeleteBookCoverButton from './DeleteBookCoverButton/DeleteBookCoverButton'
import './BookCoverPreview.scss'

type BookCoverPreviewProps = {
	coverUrl?: string | null
	bookId: number
}

function BookCoverPreview(props: BookCoverPreviewProps) {
	const { coverUrl, bookId } = props

	const style = coverUrl ? { backgroundImage: `url(${coverUrl})` } : undefined

	return (
		<LabelWithField label='Обложка'>
			<div className='book-cover-preview' style={style}>
				<DeleteBookCoverButton bookId={bookId} />
			</div>
		</LabelWithField>
	)
}

export default BookCoverPreview
