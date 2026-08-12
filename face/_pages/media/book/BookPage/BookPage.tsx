// import { BooksService } from '@/entities/book/BooksService'
// import { BooksApi } from '@/entities/book/repository/BooksApi'
// import MediaPageContentWrapper from '@/entities/media/ui/MediaPageContentWrapper/MediaPageContentWrapper'
// import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
// import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
// import { pageUrls } from '@/shared/utils/pageUrls'
// import PublicBookPart from '_pages/media/book/BookPage/PublicBookPart'
// import { getHeaderAndSubHeader } from './fn/getHeaderAndSubHeader'
// import PrivateBookPart from './PrivateBookPart'
// import './BookPage.scss'

type Props = {
	bookId: string
}

export default async function BookPage({ bookId }: Props) {
	/*const booksService = new BooksService(new BooksApi())
	const { error, data: book } = await booksService.getBook(Number(bookId))

	if (error) {
		return <ErrorMessage text={error} />
	}

	if (!book) {
		return <ErrorMessage text='Книга не найдена' />
	}

	const { header, subHeader } = getHeaderAndSubHeader(book)

	return (
		<MediaPageContentWrapper
			breadCrumbs={<BreadCrumbs items={[pageUrls.books]} />}
			header={header}
			subHeader={subHeader}
		>
			<PublicBookPart book={book} />
			<PrivateBookPart book={book} />
		</MediaPageContentWrapper>
	)*/
	return null
}
