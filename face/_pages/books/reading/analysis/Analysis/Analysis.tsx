import { useSetCorrectHeightToMainContainer } from '_pages/books/reading/analysis/Analysis/fn/setCorrectHeightToMainContainer'
import WordsAnalysis from '_pages/books/reading/analysis/wordsAnalysis/WordsAnalysis/WordsAnalysis'
import { Sentence, useChapterStore } from '_pages/books/reading/chapterStore'
import React from 'react'
import './Analysis.scss'

function Analysis() {
	const containerRef = React.useRef<HTMLDivElement | null>(null)

	useSetCorrectHeightToMainContainer(containerRef)

	const selectedSentence: Sentence = {
		sentenceParts: [
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
		sentenceTranslation: null,
		translatedPhrases: [
			/*{
				id: 1,
				wordIds: [1, 2, 4],
			},
			{
				id: 2,
				wordIds: [12, 13],
			},
			{
				id: 3,
				wordIds: [10],
			},*/
		],
		selectedWordIds: [6],
		fetchTranslation: {
			isLoading: false,
			error: null,
		},
	}

	useChapterStore.setState({ selectedSentence: selectedSentence })

	if (!useChapterStore.getState().selectedSentence) {
		return null
	}

	return (
		<div className='reading-analysis' ref={containerRef}>
			<WordsAnalysis />
		</div>
	)
}

export default Analysis
