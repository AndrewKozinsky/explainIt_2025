import React from 'react'
import cn from 'classnames'
import BaseButton from '@/shared/ui/formRelated/buttons/BaseButton/BaseButton'
import './VideoControlButton.scss'

type VideoControlButtonProps = {
	icon: React.ReactNode
	onClick?: () => void
	disabled?: boolean
	active?: boolean
}

function VideoControlButton(props: VideoControlButtonProps) {
	const { icon, onClick, disabled, active } = props

	return (
		<BaseButton
			extraClass={cn('video-control-button', active && 'video-control-button--active')}
			onClick={onClick}
			disabled={disabled}
		>
			{icon}
		</BaseButton>
	)
}

export default VideoControlButton
