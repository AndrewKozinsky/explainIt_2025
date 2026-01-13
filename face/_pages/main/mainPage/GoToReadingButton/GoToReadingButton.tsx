import React from 'react'
import Link from 'next/link'
import { pageUrls } from 'сonsts/pageUrls'
import './GoToReadingButton.scss'

function GoToReadingButton() {
	return (
		<Link href={pageUrls.books.path} className='go-to-reading-button'>
			В библиотеку
		</Link>
	)
}

export default GoToReadingButton
