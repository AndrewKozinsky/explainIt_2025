import { BookModel } from '@/entites/books/repository/BooksRepository'
import ChaptersList from '@/entites/media/ui/ChaptersList/ChaptersList'
import MediaContentWrapper from '@/entites/media/ui/MediaContentWrapper/MediaContentWrapper'
import MediaFullInfoContent from '@/entites/media/ui/MediaFullInfoContent/MediaFullInfoContent'
import { getBookChaptersLinksConfig } from '_pages/media/book/BookPage/fn/getBookChaptersLinksConfig'

type PublicBookPartProps = {
	book: BookModel
}

function PublicBookPart(props: PublicBookPartProps) {
	const { book } = props

	if (book.type !== 'public') {
		return null
	}

	const chaptersConfig = getBookChaptersLinksConfig(book)
	const firstChapterUrl = chaptersConfig[chaptersConfig.length - 1].href

	return (
		<MediaContentWrapper
			list={
				<div className='book-page__right-menu'>
					<ChaptersList chapters={chaptersConfig} extraClass='book-page__chapters-list' />
				</div>
			}
		>
			<MediaFullInfoContent
				firstChapterUrl={firstChapterUrl}
				textContent={book.note}
				coverUrl={book.coverUrl}
				actionButtonLabel='Читать'
			/>
		</MediaContentWrapper>
	)
}

export default PublicBookPart
