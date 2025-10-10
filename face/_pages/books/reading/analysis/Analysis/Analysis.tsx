import React from 'react'
import { useReadingStore } from '_pages/books/reading/readingStore'
import { useSetCorrectHeightToMainContainer } from './fn/setCorrectHeightToMainContainer'
import WordsAnalysis from '../wordsAnalysis/WordsAnalysis/WordsAnalysis'
import './Analysis.scss'

function Analysis() {
	const containerRef = React.useRef<HTMLDivElement | null>(null)
	useSetCorrectHeightToMainContainer(containerRef)

	const sentenceId = useReadingStore((s) => s.selectedSentence.sentenceId)
	if (!sentenceId) return null

	return (
		<div className='reading-analysis' ref={containerRef}>
			<WordsAnalysis />
		</div>
	)
}

export default Analysis
