import Paragraph from '@/ui/Paragraph/Paragraph'
import ContentLinkWrapper from '_pages/bookAndVideoCommon/ContentLinkWrapper/ContentLinkWrapper'
import { bookConfig } from '../../common/bookConfig'
import { useGetChapterLinkStatus } from './fn/isPageCurrent'
import './ChapterLink.scss'
import { createBookIdUrl, pageUrls } from 'сonsts/pageUrls'

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
				{chapterName && <Paragraph fontSize='16'>{chapterName}</Paragraph>}
			</div>
		</ContentLinkWrapper>
	)
}

export default ChapterLink
