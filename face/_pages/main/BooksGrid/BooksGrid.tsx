import React from 'react'
import BaseButton from 'ui/BaseButton/BaseButton'
import { RoundArrowWhiteIcon } from 'ui/icons/RoundArrowWhiteIcon'
import { LanguageCode, languages } from 'utils/languages'
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
			{booksData.data[1] && (
				<div className='books-grid__row-2'>
					<Book bookData={booksData.data[1]} />
					<SignCell sign='✦' />
					{booksData.data[2] && <Book bookData={booksData.data[2]} />}
				</div>
			)}
			{booksData.data[3] && (
				<div className='books-grid__row-3'>
					<SignCell sign='⌘' />
					<Book bookData={booksData.data[3]} />
					<SignCell sign='§' />
				</div>
			)}
			{booksData.data[4] && (
				<div className='books-grid__row-4'>
					<SignCell sign='¶' />
					<Book bookData={booksData.data[4]} />
				</div>
			)}
		</div>
	)
}

export default BooksGrid

type BookProps = {
	bookData: BookData
}

function Book(props: BookProps) {
	const { bookData } = props

	const langName = languages[bookData.languageCode].name

	return (
		<div className='books-grid__book'>
			<BaseButton
				theme='plain'
				extraClass='books-grid__book-cover'
				style={{ backgroundImage: `url("${bookData.cover}")` }}
				href={bookData.url}
			>
				<div className='books-grid__book-link-mark'>
					<RoundArrowWhiteIcon />
					Открыть
				</div>
			</BaseButton>
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
