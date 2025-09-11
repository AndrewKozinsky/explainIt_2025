import React from 'react'
import { useGetContentStructure } from './fn/getContentStructure'
import './ChapterText.scss'

function ChapterText() {
	const contentStructure = useGetContentStructure()
	if (!contentStructure) return null

	return (
		<div className='chapter-text'>
			{contentStructure.map((paragraph, index) => {
				return (
					<p key={index}>
						{paragraph.map((sentence, sentenceIndex) => {
							console.log(sentence)
							return sentence.sentenceParts.map((sentencePart) => {
								if (sentencePart.type === 'word') {
									return <span className='chapter-text__word'>{sentencePart.value}</span>
								} else if (sentencePart.type === 'punctuation') {
									return <span>{sentencePart.value}</span>
								}
							})
						})}
					</p>
				)
			})}
		</div>
	)
}

export default ChapterText
