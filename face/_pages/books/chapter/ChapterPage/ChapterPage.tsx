'use client'

import MediaPageContentWrapper from '_pages/bookAndVideoCommon/MediaPageContentWrapper/MediaPageContentWrapper'
import PrivateChapterInfo from '_pages/books/chapter/PrivateBookInfo/PrivateBookInfo'
import BooksBreadCrumbs from '../root/BooksBreadCrumbs/BooksBreadCrumbs'
import { useGetHeader } from './fn/getHeaderAndSubHeader'
import { usePopulateChapterStore } from './fn/populateChapterStore'

function ChapterPage() {
	usePopulateChapterStore()
	const header = useGetHeader()

	return (
		<MediaPageContentWrapper breadCrumbs={<BooksBreadCrumbs />} header={header}>
			<PrivateChapterInfo />
		</MediaPageContentWrapper>
	)
}

export default ChapterPage
