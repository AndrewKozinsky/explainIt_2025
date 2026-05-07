import React from 'react'
import { publicFolderFilesUrls } from 'utils/publicFolderFilesUrls'
import { LanguageCode, languages } from 'utils/utils'
import { BookData, useGetBooksData } from './fn/getBooks'
import './BooksGrid.scss'

type BooksGridProps = {
	currentLanguage: LanguageCode
}

function BooksGrid(props: BooksGridProps) {
	const { currentLanguage } = props

	const booksData = useGetBooksData(currentLanguage)

	if (!booksData.data || !booksData.data.length) {
		return null
	}

	return (
		<div className='books-grid'>
			<div className='books-grid__row-1'>
				<Book bookData={booksData.data[0]} />
				<SignCell sign='&' />
			</div>
			<div className='books-grid__row-2'>
				<Book bookData={booksData.data[1]} />
				<SignCell sign='✦' />
				<Book bookData={booksData.data[2]} />
			</div>
			<div className='books-grid__row-3'>
				<SignCell sign='⌘' />
				<Book bookData={booksData.data[3]} />
				<SignCell sign='§' />
			</div>
			<div className='books-grid__row-4'>
				<SignCell sign='¶' />
				<Book bookData={booksData.data[4]} />
			</div>
		</div>
	)
}

export default BooksGrid

type BookProps = {
	bookData: BookData
}

function Book(props: BookProps) {
	const { bookData } = props

	const langName = languages[bookData.languageCode].nameRus

	return (
		<div className='books-grid__book'>
			<a
				href={bookData.url}
				className='books-grid__book-cover'
				style={{ backgroundImage: `url("${bookData.cover}")` }}
			>
				<div className='books-grid__book-link-mark'>
					<img src={publicFolderFilesUrls.mainPage.roundArrowWhite} alt='' />
					Открыть
				</div>
			</a>
			<p className='books-grid__book-lang'>{langName}</p>
			<p className='books-grid__book-author'>{bookData.author}</p>
			<p className='books-grid__book-name'>{bookData.name}</p>
		</div>
	)
}

type SignCellProps = {
	sign: string
}

function SignCell(props: SignCellProps) {
	const { sign } = props

	return (
		<div className='books-grid__sign-cell'>
			<div className='books-grid__sign-cell-sign'>{sign}</div>
		</div>
	)
}
