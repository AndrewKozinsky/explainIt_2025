import React from 'react'
import cn from 'classnames'
import './ChatRoundButton.scss'

type RoundButtonProps = {
	icon: React.ReactNode
	disabled: boolean
	onClick: () => void
	color?: 'blue' | 'red'
}

function ChatRoundButton(props: RoundButtonProps) {
	const { icon, disabled, onClick, color } = props

	return (
		<button
			disabled={disabled}
			onClick={onClick}
			type='button'
			className={cn(
				'chat-round-button',
				color && `chat-round-button--${color}`,
				disabled && 'chat-round-button--disabled',
			)}
		>
			{icon}
		</button>
	)
}

export default ChatRoundButton
