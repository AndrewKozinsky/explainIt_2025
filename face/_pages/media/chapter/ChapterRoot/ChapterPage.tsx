'use client'

import { bookConfig } from '@/entities/book/lib/bookConfig'
import DetailsBlock from '@/entities/detailsBlock/DetailsBlock/DetailsBlock'
import MediaNavigation from '@/entities/media/ui/MediaNavigation/MediaNavigation'
import MediaRoot from '@/entities/media/ui/MediaRoot/MediaRoot'
import Sentences from '@/entities/sentencesAndSubtitles/Sentences/Sentences'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import { getChapterBreadCrumbsConfig } from './fn/getChapterBreadCrumbsItems'
import { getHeaderAndSubHeader } from './fn/getHeaderAndSubHeader'
import { getMediaNavigationData } from './fn/getMediaNavigationData'
import { useChapterData } from './fn/useChapterData'
import { setupDeps } from './fn/setupDeps'

const { useMediaStore } = setupDeps()

type ChapterRootProps = {
	chapterId: number | string
	bookId: number | string
}

function ChapterPage(props: ChapterRootProps) {
	const { chapterId, bookId } = props

	const { book, chapter, loading, bookError, chapterError } = useChapterData(Number(bookId), Number(chapterId))

	const { selectedSentenceId, selectedWordId, selectWord } = useMediaStore()

	if (loading) {
		return null
	}

	if (bookError) {
		return <ErrorMessage text={bookError} />
	}

	if (!book) {
		return <ErrorMessage text='Книга не найдена' />
	}

	if (chapterError) {
		return <ErrorMessage text={chapterError} />
	}

	if (!chapter) {
		return <ErrorMessage text='Глава не найдена' />
	}

	const { header, subHeader } = getHeaderAndSubHeader(chapter)
	const breadCrumbsConfig = getChapterBreadCrumbsConfig(bookId.toString(), book.name ?? bookConfig.emptyBookName)
	const footer = <MediaNavigation {...getMediaNavigationData(book, chapter)} />

	return (
		<MediaRoot
			breadCrumbsConfig={breadCrumbsConfig}
			header={header}
			subHeader={subHeader}
			leftBlock={
				<Sentences
					languageCode={book.languageCode}
					sentences={chapter.sentences ?? []}
					selectedSentenceId={selectedSentenceId}
					selectedWordId={selectedWordId}
					selectWord={selectWord}
				/>
			}
			rightBlock={
				<DetailsBlock
					bookName={book.name}
					bookAuthor={book.author}
					chapterId={chapter.id}
					languageCode={book.languageCode}
					sentences={chapter.sentences}
					selectedSentenceId={selectedSentenceId}
					selectedWordId={selectedWordId}
				/>
			}
			footer={footer}
		/>
	)
}

export default ChapterPage
