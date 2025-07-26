import React from 'react'
import './ErrorBlock.scss'

interface InfoBlockProps {
	children: string | React.ReactNode
}

function ErrorBlock(props: InfoBlockProps) {
	const { children } = props

	return <div className='error-block'>{children}</div>
}

export default ErrorBlock
