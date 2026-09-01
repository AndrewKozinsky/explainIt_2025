import { getBookChaptersLinksConfig } from '@/entities/book/lib/getBookChaptersLinksConfig'
import { BookModel } from '@/entities/book/repository/BooksRepository'
import ChaptersList from '@/entities/media/ui/ChaptersList/ChaptersList'
import MediaContentWrapper from '@/entities/media/ui/MediaContentWrapper/MediaContentWrapper'
import MediaFullInfoContent from '@/entities/media/ui/MediaFullInfoContent/MediaFullInfoContent'
import './PublicBook.scss'

type PublicBookPartProps = {
	book: BookModel
}

function PublicBook(props: PublicBookPartProps) {
	const { book } = props

	if (book.type !== 'public') {
		return null
	}

	const chaptersConfig = getBookChaptersLinksConfig(book)
	const firstChapterUrl = chaptersConfig[chaptersConfig.length - 1].href

	return (
		<MediaContentWrapper
			list={
				<div className='public-book__right-menu'>
					<ChaptersList chapters={chaptersConfig} extraClass='public-book__chapters-list' />
				</div>
			}
		>
			<MediaFullInfoContent
				firstChapterUrl={firstChapterUrl}
				textContent={book.about}
				coverUrl={book.coverUrl}
				actionButtonLabel='Читать'
			/>
		</MediaContentWrapper>
	)
}

export default PublicBook
