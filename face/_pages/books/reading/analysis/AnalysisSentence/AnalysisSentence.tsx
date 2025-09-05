import { useChapterStore } from '_pages/books/reading/chapterStore'
import React from 'react'
import PhraseStamps from '../PhraseStamps/PhraseStamps'
import './AnalysisSentence.scss'

function AnalysisSentence() {
	const { sentence } = useChapterStore.getState()

	return (
		<div className='analysis-sentence'>
			<p>
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
			<PhraseStamps />
		</div>
	)
}

export default AnalysisSentence
