import React from 'react'
import cn from 'classnames'
import BaseButton from 'ui/BaseButton/BaseButton'
import { CloseIcon } from '@/ui/icons/CloseIcon'
import './CloseButton.scss'

type CloseButtonProps = {
	extraClass?: string
	onClick: () => void
}

function CloseButton(props: CloseButtonProps) {
	const { extraClass, onClick } = props

	return (
		<BaseButton extraClass={cn('close-button', extraClass)} onClick={onClick}>
			<CloseIcon />
		</BaseButton>
	)
	/*return (
		<button onClick={onClick} className={cn('close-button', extraClass)}>
			<CloseIcon />
		</button>
	)*/
}

export default CloseButton
