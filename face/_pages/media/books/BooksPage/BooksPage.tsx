'use client'

// import { BooksService } from '@/entities/book/BooksService'
// import { BooksApi } from '@/entities/book/repository/BooksApi'
import { booksService } from '@/entities/book/BooksService'
import MediaPageContentTabs from '@/shared/ui/media/MediaPageContentTabs/MediaPageContentTabs'
import MediaPageContentWrapper from '@/shared/ui/media/MediaPageContentWrapper/MediaPageContentWrapper'
// import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
// import { errorMessages } from '@/shared/utils/fetchData/errorMessages'
import { pageUrls } from '@/shared/utils/pageUrls'
// import { PrivateBooksListWithAdd } from '_pages/media/books/PrivateBooksListWithAdd/PrivateBooksListWithAdd'
import { PrivateBooksListWithAdd } from '@/widgets/book/PrivateBooksListWithAdd/PrivateBooksListWithAdd'
import PublicBooksList from '@/widgets/book/PublicBooksList/PublicBooksList'
import { useBooksPageTabs } from './fn/useBooksPageTabs'

export default function BooksPage() {
	const { error, errors, data: allBooks } = await booksService.getBooks()

	/*if (error || errors) {
		return <ErrorMessage text={error ?? errorMessages.unknownServerError} />
	}*/

	const { defaultTab, onTabChange } = useBooksPageTabs()

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
