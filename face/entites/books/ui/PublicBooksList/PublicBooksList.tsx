'use client'

import React, { useState } from 'react'
import { bookConfig } from '@/entites/books/lib/bookConfig'
import { BookModel } from '@/entites/books/repository/BooksRepository'
import MediaCardButton from '@/entites/media/ui/MediaCard/MediaCardButton'
import MediaCardWrapper from '@/entites/media/ui/MediaCardWrapper/MediaCardWrapper'
import ItemsGrid from '@/shared/ui/ItemsGrid/ItemsGrid'
import LanguageSwitch from '@/shared/ui/LanguageSwitch/LanguageSwitch'
import { getConfig } from './fn/getConfig'
import './PublicBooksList.scss'

type PublicBooksList = {
	books: BookModel[]
}

function PublicBooksList(props: PublicBooksList) {
	const { books } = props

	const languages = books.map((item) => item.languageCode)
	const languagesSet = new Set(languages)
	const [currentLang, setCurrentLang] = useState(languages[0])

	const config = getConfig(books, currentLang)

	return (
		<div className='public-books-list'>
			<LanguageSwitch
				languages={Array.from(languagesSet)}
				currentLang={currentLang}
				onChange={(lang) => setCurrentLang(lang)}
			/>
			<ItemsGrid>
				{config.map((book) => {
					return (
						<MediaCardWrapper type='info' key={book.id} actionUrl={book.actionUrl}>
							<MediaCardButton
								name={book.name}
								subName={book.subName}
								url={book.url}
								coverUrl={book.coverUrl}
								defaultMediaName={bookConfig.emptyBookName}
							/>
						</MediaCardWrapper>
					)
				})}
			</ItemsGrid>
		</div>
	)
}

export default PublicBooksList
