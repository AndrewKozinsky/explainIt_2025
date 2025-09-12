import React from 'react'

type PunctiationProps = {
	value: string
}

function Punctiation(props: PunctiationProps) {
	const { value } = props

	return <span>{value}</span>
}

export default Punctiation
