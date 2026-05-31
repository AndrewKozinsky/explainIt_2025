import Sentence from '_pages/media/commonComponents/sentenceBlock/Sentence/Sentence'
import { useWatchingStore } from '_pages/media/watching/watchingStore'
import './PlainTextContent.scss'

function PlainTextContent() {
	const populatedPlainText = useWatchingStore((s) => s.populatedPlainText)
	const selection = useWatchingStore((s) => s.selection)
	const selectWord = useWatchingStore((s) => s.selectWord)

	return (
		<div className='plain-text-content'>
			{populatedPlainText.sentences.map((sentence) => {
				return (
					<Sentence
						sentenceId={sentence.id}
						sentenceText={sentence.text}
						selectedSentenceId={selection.sentenceId}
						selectedWordId={selection.wordId}
						key={sentence.id}
						selectWord={selectWord}
					/>
				)
			})}
		</div>
	)
}

export default PlainTextContent
