import React from 'react'
import cn from 'classnames'
import './StatusBlock.scss'

interface InfoBlockProps {
	type: 'error' | 'warning' | 'info' | 'success'
	extraClass?: string
	children: string | React.ReactNode
}

function StatusBlock(props: InfoBlockProps) {
	const { type, extraClass, children } = props

	return <div className={cn('status-block', `status-block--${type}`, extraClass)}>{children}</div>
}

export default StatusBlock
