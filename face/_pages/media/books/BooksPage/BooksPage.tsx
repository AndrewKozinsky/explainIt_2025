import { BooksApi } from '@/entites/books/repository/BooksApi'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { fetchData } from '@/shared/utils/fetchData'
import { pageUrls } from '@/shared/utils/pageUrls'
import { bookConfig } from '_pages/media/commonComponents/bookConfig'
import MediaPageContentWrapper from '_pages/media/commonComponents/MediaPageContentWrapper/MediaPageContentWrapper'
import MediaItemsGrid from '../../commonComponents/mediaItemsGrid/MediaItemsGrid/MediaItemsGrid'
import { AddBookButtonWrapper } from '../AddBookButtonWrapper/AddBookButtonWrapper'
import { getContentConfig } from './fn/getContentConfig'

export default async function BooksPage() {
	const api = new BooksApi()
	const { error, data } = await fetchData(() => api.getBooks())

	const config = data ? getContentConfig(data) : null

	return (
		<MediaPageContentWrapper breadCrumbs={<BreadCrumbs items={[]} />} header={pageUrls.books.name}>
			<MediaItemsGrid
				loading={false}
				error={error}
				config={config}
				addButton={<AddBookButtonWrapper />}
				defaultMediaName={bookConfig.emptyBookName}
			/>
		</MediaPageContentWrapper>
	)
}
