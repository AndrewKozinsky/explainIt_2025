import React from 'react'
import cn from 'classnames'
import BaseButton from '@/shared/ui/BaseButton/BaseButton'
import { CloseIcon } from '@/shared/ui/icons/CloseIcon'
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
}

export default CloseButton
