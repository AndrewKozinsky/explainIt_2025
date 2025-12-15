import cn from 'classnames'
import React from 'react'
import { publicFolderFilesUrls } from 'utils/publicFolderFilesUrls'
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
			<img src={publicFolderFilesUrls.icons.warningTriangle} alt='Warning triangle' />
			{children}
		</div>
	)
}

export default InfoBlock
