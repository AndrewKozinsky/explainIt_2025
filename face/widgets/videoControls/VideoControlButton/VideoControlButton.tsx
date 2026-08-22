import React from 'react'
import BaseButton from '@/shared/ui/formRelated/buttons/BaseButton/BaseButton'
import './VideoControlButton.scss'

type VideoControlButtonProps = {
	icon: React.ReactNode
	onClick?: () => void
	disabled?: boolean
}

function VideoControlButton(props: VideoControlButtonProps) {
	const { icon, onClick, disabled } = props

	return (
		<BaseButton extraClass='video-control-button' onClick={onClick} disabled={disabled}>
			{icon}
		</BaseButton>
	)
}

export default VideoControlButton
