import React from 'react'
import cn from 'classnames'
import { filesUrls } from '@/shared/utils/filesUrls'
import './InfoBlock.scss'

interface InfoBlockProps {
	type: 'error' | 'warning' | 'info' | 'success'
	children: string | React.ReactNode
}

function InfoBlock(props: InfoBlockProps) {
	const { children } = props

	return (
		<div className={cn('info-block', `info-block--${props.type}`)}>
			<img src={filesUrls.icons.warningTriangleIcon} alt='Warning triangle' />
			{children}
		</div>
	)
}

export default InfoBlock
