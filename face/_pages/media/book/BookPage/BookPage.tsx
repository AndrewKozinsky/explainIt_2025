'use client'

import MediaPageContentWrapper from '_pages/media/commonComponents/MediaPageContentWrapper/MediaPageContentWrapper'
import BooksBreadCrumbs from '../BooksBreadCrumbs/BooksBreadCrumbs'
import PrivateBookInfo from '../PrivateBookInfo/PrivateBookInfo'
import PublicBookInfo from '../PublicBookContentInfo/PublicBookContentInfo'
import { useGetHeaderAndSubHeader } from './fn/getHeaderAndSubHeader'
import { usePopulateBookStore } from './fn/populateBooksStore'

function BookPage() {
	usePopulateBookStore()
	const { header, subHeader } = useGetHeaderAndSubHeader()

	return (
		<MediaPageContentWrapper breadCrumbs={<BooksBreadCrumbs />} header={header} subHeader={subHeader}>
			<PublicBookInfo />
			<PrivateBookInfo />
		</MediaPageContentWrapper>
	)
}

export default BookPage
