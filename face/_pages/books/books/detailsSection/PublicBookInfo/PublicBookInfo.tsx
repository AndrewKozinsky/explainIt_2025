import { useBooksStore } from '_pages/books/books/booksStore'
import Paragraph from 'ui/Paragraph/Paragraph'
import { publicFolderFilesUrls } from 'utils/publicFolderFilesUrls'
import './PublicBookInfo.scss'

export default function PublicBookInfo() {
	const publicBook = useBooksStore((s) => s.publicBook)

	if (!publicBook) {
		return null
	}

	return (
		<div className='public-book-info'>
			<div className='public-book-info__left'>
				<p className='public-book-info__author'>{publicBook.author}</p>
				<h3 className='public-book-info__header'>{publicBook.name}</h3>
				<p className='public-book-info__description'>{publicBook.note}</p>
			</div>
			<div className='public-book-info__right'>
				<img
					src={publicFolderFilesUrls.books.covers + publicBook.cover}
					className='public-book-info__cover'
					alt={publicBook.name}
				/>
			</div>
		</div>
	)
}
