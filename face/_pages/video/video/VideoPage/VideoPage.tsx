'use client'

import MediaPageContentWrapper from '_pages/bookAndVideoCommon/MediaPageContentWrapper/MediaPageContentWrapper'
import PublicVideoContent from '_pages/video/video/PublicVideoContent/PublicVideoContent'
import VideoBreadCrumbs from '_pages/video/video/root/VideoBreadCrumbs/VideoBreadCrumbs'
// import { useGetHeaderAndSubHeader } from '_pages/books/book/BookPage/fn/getHeaderAndSubHeader'
// import PrivateBookInfo from '_pages/books/book/PrivateBookInfo/PrivateBookInfo'
// import PublicBookInfo from '_pages/books/book/PublicBookInfo/PublicBookInfo'
// import BooksBreadCrumbs from '../root/BooksBreadCrumbs/BooksBreadCrumbs'
import { usePopulateVideoStore } from '_pages/video/video/VideoPage/fn/populateVideoStore'
import { useGetHeaderAndSubHeader } from './fn/getHeaderAndSubHeader'
// import { pageUrls } from 'сonsts/pageUrls'

function VideoPage() {
	usePopulateVideoStore()
	const { header, subHeader } = useGetHeaderAndSubHeader()

	return (
		<MediaPageContentWrapper breadCrumbs={<VideoBreadCrumbs />} header={header} subHeader={subHeader}>
			<PublicVideoContent />
			{/*<PrivateBookInfo />*/}
		</MediaPageContentWrapper>
	)
}

export default VideoPage
