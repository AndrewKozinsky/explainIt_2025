import React from 'react'
import { useSetCorrectHeightToMainContainer } from './fn/setCorrectHeightToMainContainer'
import WordsAnalysis from '../wordsAnalysis/WordsAnalysis/WordsAnalysis'
import './Analysis.scss'

function Analysis() {
	const containerRef = React.useRef<HTMLDivElement | null>(null)

	useSetCorrectHeightToMainContainer(containerRef)

	return (
		<div className='reading-analysis' ref={containerRef}>
			<WordsAnalysis />
		</div>
	)
}

export default Analysis
