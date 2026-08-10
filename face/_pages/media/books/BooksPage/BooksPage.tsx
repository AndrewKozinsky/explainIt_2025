'use client'

import { useQuery } from '@tanstack/react-query'
import { booksQueries } from '@/entities/book/BooksQueryFacade'
import MediaPageContentTabs from '@/shared/ui/media/MediaPageContentTabs/MediaPageContentTabs'
import MediaPageContentWrapper from '@/shared/ui/media/MediaPageContentWrapper/MediaPageContentWrapper'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { pageUrls } from '@/shared/utils/pageUrls'
import { PrivateBooksListWithAdd } from '@/widgets/book/PrivateBooksListWithAdd/PrivateBooksListWithAdd'
import PublicBooksList from '@/widgets/book/PublicBooksList/PublicBooksList'
import { useBooksPageTabs } from './fn/useBooksPageTabs'

export default function BooksPage() {
	const { data: allBooks, isLoading } = useQuery(booksQueries.getBooks())

	const { defaultTab, onTabChange } = useBooksPageTabs()

	if (isLoading || !allBooks) {
		return (
			<MediaPageContentWrapper breadCrumbs={<BreadCrumbs items={[]} />} header={pageUrls.books.name}>
				<div />
			</MediaPageContentWrapper>
		)
	}

	return (
		<MediaPageContentWrapper breadCrumbs={<BreadCrumbs items={[]} />} header={pageUrls.books.name}>
			<MediaPageContentTabs
				tabs={[
					{ key: 'library', label: 'Библиотека', content: <PublicBooksList books={allBooks.public} /> },
					{
						key: 'private',
						label: 'Мои книги',
						content: <PrivateBooksListWithAdd books={allBooks.private} />,
					},
				]}
				defaultTab={defaultTab}
				onTabChange={onTabChange}
			/>
		</MediaPageContentWrapper>
	)
}
