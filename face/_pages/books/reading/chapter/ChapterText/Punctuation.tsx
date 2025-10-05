import React from 'react'

type PunctuationProps = {
	value: string
}

function Punctuation(props: PunctuationProps) {
	const { value } = props

	return <span>{value}</span>
}

export default Punctuation
