import React from 'react'
import Paragraph from 'ui/Paragraph/Paragraph'
import './NoteText.scss'

type NoteTextProps = {
	children: React.ReactNode
}

function NoteText(props: NoteTextProps) {
	const { children } = props

	return (
		<Paragraph fontSize={15} extraClass='videos-note-text'>
			{children}
		</Paragraph>
	)
}

export default NoteText
