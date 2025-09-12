import React from 'react'

type WordProps = {
	value: string
}

function Word(props: WordProps) {
	const { value } = props

	return <span className='chapter-text__word'>{value}</span>
}

export default Word
