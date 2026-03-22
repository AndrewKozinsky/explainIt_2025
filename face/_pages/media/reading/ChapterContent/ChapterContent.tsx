import { useReadingStore } from '../readingStore'
import ChapterSentence from './ChapterSentence'
import './ChapterContent.scss'

function ChapterContent() {
	const populatedChapter = useReadingStore((state) => state.populatedChapter)
	const selection = useReadingStore((state) => state.selection)
	const selectWord = useReadingStore((state) => state.selectWord)

	return (
		<div className='chapter-content'>
			{populatedChapter.sentences.map((sentence) => {
				return (
					<ChapterSentence
						key={sentence.id}
						sentence={sentence}
						selectedSentenceId={selection.sentenceId}
						selectedWordIds={selection.wordIds}
						selectWord={selectWord}
					/>
				)
			})}
		</div>
	)
}

export default ChapterContent
