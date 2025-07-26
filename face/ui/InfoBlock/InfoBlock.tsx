import React from 'react'
import './InfoBlock.scss'

interface InfoBlockProps {
	children: string | React.ReactNode
	dataTestId?: string
}

function InfoBlock(props: InfoBlockProps) {
	const { children, dataTestId } = props

	return (
		<div className='error-block' data-testid={dataTestId}>
			{children}
		</div>
	)
}

export default InfoBlock
