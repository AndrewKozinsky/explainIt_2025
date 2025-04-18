import cn from 'classnames'
import React from 'react'
import { CloseIcon } from '../../icons/CloseIcon/CloseIcon'
import '../Button.scss'
import './CloseButton.scss'

type CloseButtonProps = {
	extraClass?: string
	onClick: () => void
}

function CloseButton(props: CloseButtonProps) {
	const { extraClass, onClick } = props

	return (
		<button onClick={onClick} className={cn('button', 'close-button', extraClass)}>
			<CloseIcon />
		</button>
	)
}

export default CloseButton
