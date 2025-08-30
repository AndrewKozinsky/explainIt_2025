import React from 'react'
import Paragraph from '../../../../ui/Paragraph/Paragraph'
import { pageUrls } from '../../../../сonsts/pageUrls'
import ContentLinkWrapper from '../../common/ContentLinkWrapper/ContentLinkWrapper'
import { useGetIsPageCurrent } from './fn/isPageCurrent'
import { bookConfig } from '../../common/bookConfig'
import './ChapterLink.scss'

type BookLinkProps = {
	bookId: number | string
	chapterData: {
		id: number
		name?: null | string
		header?: null | string
	}
}

function ChapterLink(props: BookLinkProps) {
	const { bookId, chapterData } = props
	const { id, header, name } = chapterData

	const isPageCurrent = useGetIsPageCurrent(bookId, id)

	return (
		<ContentLinkWrapper href={pageUrls.books.book(bookId).chapter(id).path} isCurrent={isPageCurrent}>
			<div className='chapter-link'>
				{name && (
					<Paragraph fontSize='14' extraClass='chapter-link__author'>
						{name}
					</Paragraph>
				)}
				<Paragraph fontSize='15'>{header ? header : bookConfig.emptyChapterName}</Paragraph>
			</div>
		</ContentLinkWrapper>
	)
}

export default ChapterLink
