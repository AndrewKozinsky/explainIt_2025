import { createBookIdUrl, pageUrls } from '@/сonsts/pageUrls'
import MediaLink from '_pages/bookAndVideoCommon/MediaLink/MediaLink'
import { bookConfig } from '../../common/bookConfig'
import { useGetBookLinkStatus } from './fn/isPageCurrent'
import { useGetOnBookLinkClick } from './fn/onClick'

type BookLinkProps = {
	bookData: {
		id: number
		bookType: 'public' | 'private'
		author?: null | string
		name?: null | string
	}
}

function BookLink(props: BookLinkProps) {
	const { id, bookType, author, name } = props.bookData

	const bookLinkStatus = useGetBookLinkStatus(id, bookType)
	const onBookLinkClick = useGetOnBookLinkClick()
	const bookIdInUrl = createBookIdUrl(id, bookType)

	return (
		<MediaLink
			href={pageUrls.books.book(bookIdInUrl).path}
			info={author}
			name={name ? name : bookConfig.emptyBookName}
			onClick={onBookLinkClick}
			linkStatus={bookLinkStatus}
		/>
	)
}

export default BookLink
