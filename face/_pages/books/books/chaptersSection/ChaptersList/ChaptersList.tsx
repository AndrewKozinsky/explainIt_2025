import React from 'react'
import Paragraph from 'ui/Paragraph/Paragraph'
import ChapterLink from '_pages/books/books/chaptersSection/ChapterLink/ChapterLink'
import './ChaptersList.scss'

type ChaptersListProps = {
	chapters: {
		name: string
		subName?: null | string
		href: string
	}[]
}

function ChaptersList(props: ChaptersListProps) {
	const { chapters } = props

	if (!chapters.length) {
		return <Paragraph fontSize={16}>Нет ни одной главы</Paragraph>
	}

	return (
		<div className='chapters-list'>
			{chapters.map((chapter) => {
				return <ChapterLink {...chapter} key={chapter.href} />
			})}
		</div>
	)
}

export default ChaptersList
