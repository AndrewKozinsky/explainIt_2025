import { useSetCorrectHeightToMainContainer } from '_pages/books/reading/analysis/Analysis/fn/setCorrectHeightToMainContainer'
import AnalysisSentence from '_pages/books/reading/analysis/AnalysisSentence/AnalysisSentence'
import { PhraseStatus, Sentence, useChapterStore } from '_pages/books/reading/chapterStore'
import React from 'react'
import './Analysis.scss'

function Analysis() {
	const containerRef = React.useRef<HTMLDivElement | null>(null)

	useSetCorrectHeightToMainContainer(containerRef)

	const selectedSentence: Sentence = {
		parts: [
			{
				id: 1,
				type: 'word',
				value: 'I',
			},
			{
				id: 2,
				type: 'word',
				value: 'joined',
			},
			{
				id: 3,
				type: 'word',
				value: 'the',
			},
			{
				id: 4,
				type: 'word',
				value: 'fencing',
			},
			{
				id: 5,
				type: 'word',
				value: 'team',
			},
			{
				id: 6,
				type: 'word',
				value: 'in',
			},
			{
				id: 7,
				type: 'word',
				value: 'high',
			},
			{
				id: 8,
				type: 'word',
				value: 'school',
			},
			{
				id: 9,
				type: 'word',
				value: 'in',
			},
			{
				id: 10,
				type: 'word',
				value: 'order',
			},
			{
				id: 11,
				type: 'word',
				value: 'to',
			},
			{
				id: 12,
				type: 'word',
				value: 'get',
			},
			{
				id: 13,
				type: 'word',
				value: 'out',
			},
			{
				id: 14,
				type: 'word',
				value: 'of',
			},
			{
				id: 15,
				type: 'word',
				value: 'gym',
			},
			{
				id: 16,
				type: 'word',
				value: 'class',
			},
			{
				id: 17,
				type: 'punctuation',
				value: '.',
			},
		],
		phrases: [
			/*{
				id: 1,
				status: PhraseStatus.collectingWords,
				wordIds: [1, 2, 3, 4, 5, 6, 7, 8, 9],
			},*/
			{
				id: 2,
				status: PhraseStatus.readyAnalysis,
				wordIds: [12, 13],
			},
			{
				id: 3,
				status: PhraseStatus.readyAnalysis,
				wordIds: [10],
			},
		],
		currentPhraseId: 2,
	}

	useChapterStore.setState({ sentence: selectedSentence })

	if (!useChapterStore.getState().sentence) {
		return null
	}

	return (
		<div className='reading-analysis' ref={containerRef}>
			<div className='reading-analysis__top'>
				<AnalysisSentence />
			</div>
			<div className='reading-analysis__bottom'>
				<p style={{ width: 100, height: 2000, background: 'red' }}>123</p>
			</div>
		</div>
	)
}

export default Analysis
