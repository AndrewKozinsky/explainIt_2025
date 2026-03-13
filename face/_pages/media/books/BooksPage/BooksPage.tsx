'use client'

import { BreadCrumbs } from 'ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { bookConfig } from '_pages/media/commonComponents/bookConfig'
import MediaItemsGrid from '_pages/media/commonComponents/MediaItemsGrid/MediaItemsGrid'
import MediaPageContentWrapper from '_pages/media/commonComponents/MediaPageContentWrapper/MediaPageContentWrapper'
import { useGetContentConfig } from './fn/getContentConfig'
import { useGetAddBookConfig } from './fn/getOnAddBookClick'
import { usePopulateBooksStore } from './fn/populateBooksStore'
import { pageUrls } from 'сonsts/pageUrls'

function BooksPage() {
	usePopulateBooksStore()

	const contentConfig = useGetContentConfig()
	const addBookConfig = useGetAddBookConfig()

	return (
		<MediaPageContentWrapper breadCrumbs={<BreadCrumbs items={[]} />} header={pageUrls.books.name}>
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
