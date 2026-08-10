// 'use client'

import { bookConfig } from '@/entities/book/lib/bookConfig'
import type { BookModel } from '@/entities/book/repository/BooksRepository'
import ItemsGrid from '@/shared/ui/media/ItemsGrid/ItemsGrid'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import { pageUrls } from '@/shared/utils/pageUrls'
import MediaCardButton from '@/widgets/media/MediaCard/MediaCardButton'
import MediaCardWrapper from '@/widgets/media/MediaCardWrapper/MediaCardWrapper'
import { MediaGridAddButton } from '@/widgets/media/MediaGridAddButton/MediaGridAddButton'
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
