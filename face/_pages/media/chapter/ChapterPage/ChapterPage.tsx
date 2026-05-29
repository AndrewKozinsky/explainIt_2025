'use client'

import MediaPageContentWrapper from '_pages/media/commonComponents/MediaPageContentWrapper/MediaPageContentWrapper'
import BooksBreadCrumbs from '../BooksBreadCrumbs/BooksBreadCrumbs'
import PrivateChapterInfo from '../PrivateBookInfo/PrivateBookInfo'
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
