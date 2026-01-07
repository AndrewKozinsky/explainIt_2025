import SentenceBlock from '_pages/video/watching/text/textSide/sentenceParts/SentenceBlock/SentenceBlock'
import { useWatchingStore } from '_pages/video/watching/watchingStore'
import React from 'react'
import './PlainTextContent.scss'

function PlainTextContent() {
	const populatedPlainText = useWatchingStore((s) => s.populatedPlainText)

	return (
		<div className='plain-text-content'>
			{populatedPlainText.sentences.map((sentence, index) => {
				return <SentenceBlock sentence={sentence} key={index} />
			})}
		</div>
	)
}

export default PlainTextContent
