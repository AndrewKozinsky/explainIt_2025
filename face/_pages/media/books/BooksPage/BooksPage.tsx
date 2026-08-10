'use client'

// import { BooksService } from '@/entities/book/BooksService'
// import { BooksApi } from '@/entities/book/repository/BooksApi'
// import PublicBooksList from '@/entities/book/ui/PublicBooksList/PublicBooksList'
import MediaPageContentTabs from '@/shared/ui/media/MediaPageContentTabs/MediaPageContentTabs'
import MediaPageContentWrapper from '@/shared/ui/media/MediaPageContentWrapper/MediaPageContentWrapper'
// import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
// import { errorMessages } from '@/shared/utils/fetchData/errorMessages'
import { pageUrls } from '@/shared/utils/pageUrls'
// import { PrivateBooksListWithAdd } from '_pages/media/books/PrivateBooksListWithAdd/PrivateBooksListWithAdd'
import { BOOKS_TABS, useBooksPageTabs } from './fn/useBooksPageTabs'

export default function BooksPage() {
	// const booksService = new BooksService(new BooksApi())
	// const { error, errors, data: allBooks } = await booksService.getBooks()

	/*if (error || errors) {
		return <ErrorMessage text={error ?? errorMessages.unknownServerError} />
	}*/

	const { defaultTab, onTabChange } = useBooksPageTabs()

	return (
		<MediaPageContentWrapper breadCrumbs={<BreadCrumbs items={[]} />} header={pageUrls.books.name}>
			<MediaPageContentTabs tabs={BOOKS_TABS} defaultTab={defaultTab} onTabChange={onTabChange} />
			{/*<div className='books-page'>
				<PrivateBooksListWithAdd books={allBooks.private} />
				<PublicBooksList books={allBooks.public} />
			</div>*/}
		</MediaPageContentWrapper>
	)
}
