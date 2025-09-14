import React from 'react'
import { useSetCorrectHeightToMainContainer } from '_pages/books/reading/analysis/Analysis/fn/setCorrectHeightToMainContainer'
import WordsAnalysis from '../wordsAnalysis/WordsAnalysis/WordsAnalysis'
import { useSetSelectedSentenceToStore } from './fn/setSelectedSentenceToStore'
import './Analysis.scss'

function Analysis() {
	useSetSelectedSentenceToStore()

	const containerRef = React.useRef<HTMLDivElement | null>(null)

	useSetCorrectHeightToMainContainer(containerRef)

	return (
		<div className='reading-analysis' ref={containerRef}>
			<WordsAnalysis />
		</div>
	)
}

export default Analysis
