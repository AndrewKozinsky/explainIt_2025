import SentenceBlock from '../../commonComponents/SentenceBlock/SentenceBlock'
import { useReadingStore } from '../readingStore'
import './ChapterContent.scss'

function ChapterContent() {
	const populatedChapter = useReadingStore((state) => state.populatedChapter)
	const selection = useReadingStore((state) => state.selection)
	const selectWord = useReadingStore((state) => state.selectWord)

	return (
		<div className='chapter-content'>
			{populatedChapter.sentences.map((sentence) => {
				return (
					<SentenceBlock
						sentenceId={sentence.id}
						sentenceText={sentence.sentence}
						selectedSentenceId={selection.sentenceId}
						selectedWordIds={selection.wordIds}
						key={sentence.id}
						selectWord={selectWord}
					/>
				)
			})}
		</div>
	)
}

export default ChapterContent
