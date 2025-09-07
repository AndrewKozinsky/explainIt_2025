import { useChapterStore } from '_pages/books/reading/chapterStore'
import React from 'react'
import PhraseHighlights from '_pages/books/reading/analysis/PhraseHighlights/PhraseHighlights'
import './AnalysisSentence.scss'

function AnalysisSentence() {
	const { sentence } = useChapterStore.getState()

	return (
		<div className='analysis-sentence'>
			<p className='analysis-sentence_sentence'>
				{sentence.parts.map((part) => {
					const { value } = part

					if (part.type === 'word') {
						return (
							<span className='analysis-sentence__word' key={part.id} data-word-id={part.id}>
								{value}
							</span>
						)
					} else {
						return (
							<span className='analysis-sentence__punctuation' key={part.id}>
								{value}
							</span>
						)
					}
				})}
			</p>
			<PhraseHighlights />
		</div>
	)
}

export default AnalysisSentence
