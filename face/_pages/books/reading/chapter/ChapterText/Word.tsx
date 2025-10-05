import React from 'react'

type WordProps = {
	value: string
	onClick: () => void
}

function Word(props: WordProps) {
	const { value, onClick } = props

	return (
		<span className='chapter-text__word' onClick={onClick}>
			{value}
		</span>
	)
}

export default Word
