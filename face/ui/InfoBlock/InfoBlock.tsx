import React from 'react'
import cn from 'classnames'
import { filesUrls } from 'utils/filesUrls'
import './InfoBlock.scss'

interface InfoBlockProps {
	type: 'error' | 'warning' | 'info' | 'success'
	children: string | React.ReactNode
	dataTestId?: string
}

function InfoBlock(props: InfoBlockProps) {
	const { children, dataTestId } = props

	return (
		<div className={cn('info-block', `info-block--${props.type}`)} data-testid={dataTestId}>
			<img src={filesUrls.icons.warningTriangleIcon} alt='Warning triangle' />
			{children}
		</div>
	)
}

export default InfoBlock
