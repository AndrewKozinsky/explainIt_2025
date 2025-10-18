import Link from 'next/link'
import React from 'react'
import { pageUrls } from 'сonsts/pageUrls'
import './GoToReadingButton.scss'

function GoToReadingButton() {
	return (
		<Link href={pageUrls.books.path} className='go-to-reading-button'>
			Войти и начать чтение
		</Link>
	)
}

export default GoToReadingButton
