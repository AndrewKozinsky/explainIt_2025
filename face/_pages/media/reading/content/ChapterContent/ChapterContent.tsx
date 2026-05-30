import { LanguageCode } from 'utils/utils'
import { useReadingStore } from '_pages/media/reading/readingStore'
import ChapterSentenceBlock from '../ChapterSentenceBlock/ChapterSentenceBlock'
import './ChapterContent.scss'

function ChapterContent() {
	const populatedChapter = useReadingStore((state) => state.populatedChapter)
	const selection = useReadingStore((state) => state.selection)
	const selectWord = useReadingStore((state) => state.selectWord)
	const book = useReadingStore((state) => state.book.data)

	return (
		<div className='chapter-content'>
			{populatedChapter.sentences.map((sentence) => {
				return (
					<ChapterSentenceBlock
						key={sentence.id}
						sentence={sentence}
						selectedSentenceId={selection.sentenceId}
						selectedWordId={selection.wordId}
						selectWord={selectWord}
						languageCode={book?.languageCode! as LanguageCode}
					/>
				)
			})}
		</div>
	)
}

export default ChapterContent
