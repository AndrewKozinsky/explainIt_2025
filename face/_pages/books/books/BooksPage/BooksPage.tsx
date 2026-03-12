'use client'

import MediaItemsGrid from '_pages/bookAndVideoCommon/MediaItemsGrid/MediaItemsGrid'
import MediaPageContentWrapper from '_pages/bookAndVideoCommon/MediaPageContentWrapper/MediaPageContentWrapper'
import { useGetContentConfig } from '_pages/books/books/BooksPage/fn/getContentConfig'
import { useGetAddBookConfig } from '_pages/books/books/BooksPage/fn/getOnAddBookClick'
import { bookConfig } from '../../common/bookConfig'
import BooksBreadCrumbs from '../root/BooksBreadCrumbs/BooksBreadCrumbs'
import { usePopulateBooksStore } from './fn/populateBooksStore'
import { pageUrls } from 'сonsts/pageUrls'

function BooksPage() {
	usePopulateBooksStore()

	const contentConfig = useGetContentConfig()
	const addBookConfig = useGetAddBookConfig()

	return (
		<MediaPageContentWrapper breadCrumbs={<BooksBreadCrumbs />} header={pageUrls.books.name}>
			<MediaItemsGrid
				loading={contentConfig.loading}
				error={contentConfig.error}
				config={contentConfig.config}
				addMediaButtonConfig={addBookConfig}
				defaultMediaName={bookConfig.emptyBookName}
			/>
		</MediaPageContentWrapper>
	)
}

export default BooksPage
