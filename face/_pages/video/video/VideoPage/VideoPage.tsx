'use client'

// import MediaPageContentWrapper from '_pages/bookAndVideoCommon/MediaPageContentWrapper/MediaPageContentWrapper'
// import { useGetHeaderAndSubHeader } from '_pages/books/book/BookPage/fn/getHeaderAndSubHeader'
// import PrivateBookInfo from '_pages/books/book/PrivateBookInfo/PrivateBookInfo'
// import PublicBookInfo from '_pages/books/book/PublicBookInfo/PublicBookInfo'
// import BooksBreadCrumbs from '../root/BooksBreadCrumbs/BooksBreadCrumbs'
import { usePopulateVideoStore } from './fn/populateBooksStore'
// import { pageUrls } from 'сonsts/pageUrls'

function VideoPage() {
	usePopulateVideoStore()
	// const { header, subHeader } = useGetHeaderAndSubHeader()

	/*return (
		<MediaPageContentWrapper breadCrumbs={<BooksBreadCrumbs />} header={header} subHeader={subHeader}>
			<PublicBookInfo />
			<PrivateBookInfo />
		</MediaPageContentWrapper>
	)*/
	return <p>VideoPage</p>
}

export default VideoPage
