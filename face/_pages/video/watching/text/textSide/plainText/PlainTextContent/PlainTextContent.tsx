import SentenceBlock from '_pages/readingAndWatchingCommon/SentenceBlock/SentenceBlock'
import { useWatchingStore } from '_pages/video/watching/watchingStore'
import './PlainTextContent.scss'

function PlainTextContent() {
	const populatedPlainText = useWatchingStore((s) => s.populatedPlainText)
	const selection = useWatchingStore((s) => s.selection)
	const selectWord = useWatchingStore((s) => s.selectWord)

	return (
		<div className='plain-text-content'>
			{populatedPlainText.sentences.map((sentence) => {
				return (
					<SentenceBlock
						sentenceId={sentence.id}
						sentenceText={sentence.text}
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

export default PlainTextContent
