import React from 'react'
import { useReadingStore } from '_pages/books/reading/readingStore'
import { useSetCorrectHeightToMainContainer } from './fn/setCorrectHeightToMainContainer'
import SentenceAnalysisRoot from '_pages/books/reading/sentenceAnalysis/SentenceAnalysisRoot/SentenceAnalysis'
import '_pages/books/reading/RightPart/RightPart.scss'

function RightPart() {
	const containerRef = React.useRef<HTMLDivElement | null>(null)
	useSetCorrectHeightToMainContainer(containerRef)

	const sentenceId = useReadingStore((s) => s.selectedSentence.sentenceId)
	if (!sentenceId) return null

	return (
		<div className='reading-analysis' ref={containerRef}>
			<SentenceAnalysisRoot />
		</div>
	)
}

export default RightPart
