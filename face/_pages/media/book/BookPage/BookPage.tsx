import { booksService } from '@/entities/book/BooksService'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import MediaPageContentWrapper from '@/shared/ui/media/MediaPageContentWrapper/MediaPageContentWrapper'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { pageUrls } from '@/shared/utils/pageUrls'
import PrivateBook from '@/widgets/privateBook/ui/PrivateBook/PrivateBook'
import PublicBook from '@/widgets/PublicBook/PublicBook'
import { getHeaderAndSubHeader } from './fn/getHeaderAndSubHeader'
import '../../../../widgets/PublicBook/PublicBook.scss'

type Props = {
	bookId: string
}

export default async function BookPage({ bookId }: Props) {
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
			<PublicBook book={book} />
			<PrivateBook book={book} />
		</MediaPageContentWrapper>
	)
}
