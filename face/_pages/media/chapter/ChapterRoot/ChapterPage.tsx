'use client'

// import { bookConfig } from '@/entities/book/lib/bookConfig'
// import DetailsBlock from '@/entities/detailsBlock/DetailsBlock/DetailsBlock'
// import MediaRoot from '@/entities/media/ui/MediaRoot/MediaRoot'
// import Sentences from '@/entities/sentencesAndSubtitles/Sentences/Sentences'
import { useMediaTranslations } from '@/entities/media/model/useMediaTranslations'
import { MediaStoreProvider } from '@/entities/media/store/MediaStoreContext'
import MediaNavigation from '@/entities/media/ui/MediaNavigation/MediaNavigation'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import { getChapterBreadCrumbsConfig } from './fn/getChapterBreadCrumbsItems'
import { getHeaderAndSubHeader } from './fn/getHeaderAndSubHeader'
import { getMediaNavigationData } from './fn/getMediaNavigationData'
import { setupDeps } from './fn/setupDeps'
import { useChapterData } from './fn/useChapterData'

const { useMediaStore } = setupDeps()

type ChapterRootProps = {
	chapterId: number | string
	bookId: number | string
}

function ChapterPage(props: ChapterRootProps) {
	const { chapterId, bookId } = props

	const { book, chapter, loading, bookError, chapterError } = useChapterData(Number(bookId), Number(chapterId))

	const { selectedSentenceId, selectedWordId, selectWord } = useMediaStore()

	useMediaTranslations({
		bookName: book?.name,
		bookAuthor: book?.author,
		languageCode: book?.languageCode,
		sentences: chapter?.sentences,
		selectedSentenceId,
		selectedWordId,
		mediaStore: useMediaStore,
	})

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

	return (
		<MediaStoreProvider store={useMediaStore}>
			<MediaRoot
				breadCrumbsConfig={breadCrumbsConfig}
				header={header}
				subHeader={subHeader}
				/*leftBlock={
					<Sentences
						languageCode={book.languageCode}
						sentences={chapter.sentences ?? []}
						selectedSentenceId={selectedSentenceId}
						selectedWordId={selectedWordId}
						selectWord={selectWord}
					/>
				}*/
				// rightBlock={<DetailsBlock />}
				footer={<MediaNavigation {...getMediaNavigationData(book, chapter)} />}
			/>
		</MediaStoreProvider>
	)
}

export default ChapterPage
