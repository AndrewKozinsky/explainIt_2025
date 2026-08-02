'use client'

import React from 'react'
import { bookConfig } from '@/entites/books/lib/bookConfig'
import type { BookModel } from '@/entites/books/repository/BooksRepository'
import MediaCardButton from '@/entites/media/ui/MediaCard/MediaCardButton'
import MediaCardWrapper from '@/entites/media/ui/MediaCardWrapper/MediaCardWrapper'
import { MediaGridAddButton } from '@/entites/media/ui/MediaGridAddButton/MediaGridAddButton'
import ItemsGrid from '@/shared/ui/ItemsGrid/ItemsGrid'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import { pageUrls } from '@/shared/utils/pageUrls'
import { getConfig } from './fn/getConfig'

type PrivateBooksListProps = {
	books: BookModel[]
	addBook?: () => Promise<ApiResult<BookModel>>
}

function PrivateBooksList(props: PrivateBooksListProps) {
	const { books, addBook } = props

	const config = getConfig(books)

	return (
		<ItemsGrid>
			{config.map((book) => {
				return (
					<MediaCardWrapper type='edit' key={book.id} actionUrl={pageUrls.books.book(book.id).path}>
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
			{addBook && <MediaGridAddButton addAction={addBook} />}
		</ItemsGrid>
	)
}

export default PrivateBooksList
