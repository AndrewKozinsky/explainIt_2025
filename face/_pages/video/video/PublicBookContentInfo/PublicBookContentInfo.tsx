// import { useRouter } from 'next/navigation'
// import { publicFolderFilesUrls } from 'utils/publicFolderFilesUrls'
// import Button from '@/ui/formRelated/buttons/Button/Button'
// import { useBookStore } from '_pages/books/book/bookStore'
// import { createMediaIdUrl, pageUrls } from 'сonsts/pageUrls'
// import './PublicBookContentInfo.scss'

/*export default function PublicBookInfo() {
	const publicBook = useBookStore((s) => s.publicBook)

	if (!publicBook.data) {
		return null
	}

	const firstCoverImgUrl = publicBook.data?.covers?.[0]

	const bookId = createMediaIdUrl(publicBook.data.id, 'public')
	const firstChapterUrl = pageUrls.books.book(bookId).chapter(publicBook.data.chapters[0].id).reading.path

	return (
		<div className='public-book-info'>
			{firstCoverImgUrl && <img className='public-book-info__cover' src={firstCoverImgUrl} alt='book cover' />}
			<PublicBookInfoText text={publicBook.data.note} />
			<PublicBookInfoActions bookUrl={firstChapterUrl} />
		</div>
	)
}*/

/*type PublicBookInfoTextProps = {
	text: string
}*/

/*function PublicBookInfoText(props: PublicBookInfoTextProps) {
	const { text } = props
	const paragraphs = text.split(/\r?\n+/).filter((paragraph) => paragraph.trim().length)

	return (
		<div className='public-book-info__text'>
			{paragraphs.map((paragraph, index) => (
				<p key={index}>{paragraph}</p>
			))}
		</div>
	)
}*/

/*type PublicBookInfoActionsProps = {
	bookUrl: string
}*/

/*function PublicBookInfoActions(props: PublicBookInfoActionsProps) {
	const { bookUrl } = props

	const router = useRouter()
	const actionLabel = 'Читать'

	function handleActionClick() {
		router.push(bookUrl)
	}

	return (
		<div className='public-book-info__actions'>
			<Button onClick={handleActionClick} icon={publicFolderFilesUrls.icons.actionButtonIcon}>
				{actionLabel}
			</Button>
		</div>
	)
}*/
