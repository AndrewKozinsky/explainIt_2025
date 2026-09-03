import { bookConfig } from '@/entities/book/lib/bookConfig'
import type { BookModel } from '@/entities/book/repository/BooksRepository'
import MediaCardButton from '@/entities/mediaCard/MediaCard/MediaCardButton'
import MediaCardWrapper from '@/entities/mediaCard/MediaCardWrapper/MediaCardWrapper'
import { MediaGridAddButton } from '@/entities/mediaCard/MediaGridAddButton/MediaGridAddButton'
import { EditButtonIcon } from '@/shared/ui/icons/buttonIcons/EditButtonIcon'
import ItemsGrid from '@/shared/ui/media/ItemsGrid/ItemsGrid'
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
					<MediaCardWrapper
						key={book.id}
						actionUrl={pageUrls.books.book(book.id).path}
						actionIcon={<EditButtonIcon />}
					>
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
			{addBook && <MediaGridAddButton addAction={addBook} />}
		</ItemsGrid>
	)
}

export default PrivateBooksList
