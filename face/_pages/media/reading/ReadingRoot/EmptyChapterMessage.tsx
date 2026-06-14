import { useParams } from 'next/navigation'
import { pageUrls } from 'utils/pageUrls'
import { Link } from '@/i18n/routing'
import './EmptyChapterMessage.scss'

function EmptyChapterMessage() {
	const bookIdInUrl = useParams().bookId as string
	const chapterId = useParams().chapterId as string

	const editChapterUrl = pageUrls.books.book(bookIdInUrl).chapter(chapterId).path

	return (
		<div className='empty-chapter-message'>
			<p className='empty-chapter-message__text'>Текст главы не написан</p>
			<Link className='empty-chapter-message__link link' href={editChapterUrl}>
				К редактированию главы
			</Link>
		</div>
	)
}

export default EmptyChapterMessage
