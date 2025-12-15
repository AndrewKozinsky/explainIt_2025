import { useBooksStore } from '_pages/books/books/booksStore'
import { publicFolderFilesUrls } from 'utils/publicFolderFilesUrls'
import './PublicBookInfo.scss'

export default function PublicBookInfo() {
	const publicBook = useBooksStore((s) => s.publicBook)

	if (!publicBook) {
		return null
	}

	return (
		<div className='public-book-info'>
			<p className='public-book-info__author'>{publicBook.author}</p>
			<h3 className='public-book-info__header'>{publicBook.name}</h3>
			<p className='public-book-info__description'>
				<img
					src={publicFolderFilesUrls.books.covers + publicBook.cover}
					className='public-book-info__cover'
					alt={publicBook.name}
				/>
				{publicBook.note}
			</p>
		</div>
	)
}
