// 'use client'

// import React from 'react'
// import { bookConfig } from '@/entities/book/lib/bookConfig'
// import type { BookModel } from '@/entities/book/repository/BooksRepository'
// import MediaCardButton from '@/entities/media/ui/MediaCard/MediaCardButton'
// import MediaCardWrapper from '@/entities/media/ui/MediaCardWrapper/MediaCardWrapper'
// import { MediaGridAddButton } from '@/entities/media/ui/MediaGridAddButton/MediaGridAddButton'
// import ItemsGrid from '@/shared/ui/ItemsGrid/ItemsGrid'
// import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
// import { pageUrls } from '@/shared/utils/pageUrls'
// import { getConfig } from './fn/getConfig'

/*type PrivateBooksListProps = {
	books: BookModel[]
	addBook?: () => Promise<ApiResult<BookModel>>
}*/

/*function PrivateBooksList(props: PrivateBooksListProps) {
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
}*/

// export default PrivateBooksList
