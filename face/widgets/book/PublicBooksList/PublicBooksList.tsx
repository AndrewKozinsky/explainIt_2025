// 'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { bookConfig } from '@/entities/book/lib/bookConfig'
import { BookModel } from '@/entities/book/repository/BooksRepository'
import LanguageSwitch from '@/shared/ui/LanguageSwitch/LanguageSwitch'
import ItemsGrid from '@/shared/ui/media/ItemsGrid/ItemsGrid'
import { LanguageCode } from '@/shared/utils/languages'
import { localStorageManager } from '@/shared/utils/localStorageManager'
import MediaCardButton from '@/widgets/media/MediaCard/MediaCardButton'
import MediaCardWrapper from '@/widgets/media/MediaCardWrapper/MediaCardWrapper'
import { getConfig } from './fn/getConfig'
import './PublicBooksList.scss'

type PublicBooksList = {
	books: BookModel[]
}

function PublicBooksList(props: PublicBooksList) {
	const { books } = props

	const languages = books.map((item) => item.languageCode)
	const languagesSet = new Set(languages)
	const [currentLang, setCurrentLang] = useState(() => localStorageManager.lastLanguage.get() ?? languages[0])

	useEffect(() => {
		if (!currentLang && languages.length > 0) {
			setCurrentLang(languages[0])
		}
	}, [languages, currentLang])

	const handleLanguageChange = useCallback((lang: LanguageCode) => {
		setCurrentLang(lang)
		localStorageManager.lastLanguage.set(lang)
	}, [])

	const config = getConfig(books, currentLang)

	return (
		<div className='public-books-list'>
			<LanguageSwitch
				languages={Array.from(languagesSet)}
				currentLang={currentLang}
				onChange={handleLanguageChange}
			/>
			<ItemsGrid>
				{config.map((book) => {
					return (
						<MediaCardWrapper type='info' key={book.id} actionUrl={book.actionUrl}>
							<MediaCardButton
								title={book.name}
								subTitle={book.subName}
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
