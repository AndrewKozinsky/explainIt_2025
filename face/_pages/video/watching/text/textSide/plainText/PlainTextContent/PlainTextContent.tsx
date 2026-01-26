import SentenceBlock from '_pages/readingAndWatchingCommon/SentenceBlock/SentenceBlock'
import { useWatchingStore } from '_pages/video/watching/watchingStore'
import './PlainTextContent.scss'

function PlainTextContent() {
	const populatedPlainText = useWatchingStore((s) => s.populatedPlainText)

	return (
		<div className='plain-text-content'>
			{populatedPlainText.sentences.map((sentence) => {
				return <SentenceBlock sentenceText={sentence.text} key={sentence.id} />
			})}
		</div>
	)
}

export default PlainTextContent
