import CarriageReturn from '_pages/books/reading/chapter/ChapterText/CarriageReturn'
import Punctiation from '_pages/books/reading/chapter/ChapterText/Punctiation'
import Space from '_pages/books/reading/chapter/ChapterText/Space'
import Word from '_pages/books/reading/chapter/ChapterText/Word'
import React from 'react'
import { useGetContentStructure } from './fn/getContentStructure'
import './ChapterText.scss'

function ChapterText() {
	const contentStructure = useGetContentStructure()
	if (!contentStructure) return null

	return (
		<div className='chapter-text'>
			{contentStructure.map((sentence, index) => {
				if (sentence.type === 'sentence') {
					return (
						<span className='chapter-text__sentence' key={sentence.id}>
							{sentence.sentenceParts.map((part) => {
								const partMapper = {
									word: <Word key={part.id} value={part.value} />,
									punctuation: <Punctiation key={part.id} value={part.value} />,
									space: <Space key={part.id} />,
									carriageReturn: <CarriageReturn key={part.id} />,
								}

								return partMapper[part.type]

								/*if (part.type === 'word') {
									return <Word key={part.id} value={part.value} />
								} else if (part.type === 'punctuation') {
									return <Punctiation key={sentence.id} value={part.value} />
								} else if (part.type === 'space') {
									return <Space key={sentence.id} />
								} else if (part.type === 'carriageReturn') {
									return <CarriageReturn key={sentence.id} />
								}*/
							})}
						</span>
					)
				} else if (sentence.type === 'space') {
					return <Space key={sentence.id} />
				} else if (sentence.type === 'punctuation') {
					return <Punctiation key={sentence.id} value={sentence.value} />
				} else if (sentence.type === 'carriageReturn') {
					return <CarriageReturn key={sentence.id} />
				}
				return null
			})}
		</div>
	)
}

export default ChapterText
