import Paragraph from '@/ui/Paragraph/Paragraph'
import { useGetChapterLinkStatus } from '_pages/books/books/chaptersSection/ChapterLink/fn/isPageCurrent'
import { createBookIdUrl, pageUrls } from 'сonsts/pageUrls'
import ContentLinkWrapper from '../../common/ContentLinkWrapper/ContentLinkWrapper'
import { bookConfig } from '../../common/bookConfig'
import './ChapterLink.scss'

type BookLinkProps = {
	bookId: number | string
	bookType: 'public' | 'private'
	chapterData: {
		id: number
		name?: null | string
		header?: null | string
	}
}

function ChapterLink(props: BookLinkProps) {
	const { bookId, bookType, chapterData } = props
	const { id, header, name } = chapterData

	const chapterLinkStatus = useGetChapterLinkStatus(bookId, bookType, chapterData.id)

	const chapterName = header ? header : bookType === 'private' ? bookConfig.emptyChapterName : ''
	const bookIdInUrl = createBookIdUrl(bookId, bookType)

	const chapterUrl =
		bookType === 'private'
			? pageUrls.books.book(bookIdInUrl).chapter(id).path
			: pageUrls.books.book(bookIdInUrl).chapter(id).reading.path

	return (
		<ContentLinkWrapper href={chapterUrl} status={chapterLinkStatus}>
			<div className='chapter-link'>
				{name && (
					<Paragraph fontSize='14' extraClass='chapter-link__author'>
						{name}
					</Paragraph>
				)}
				{chapterName && <Paragraph fontSize='15'>{chapterName}</Paragraph>}
			</div>
		</ContentLinkWrapper>
	)
}

export default ChapterLink
