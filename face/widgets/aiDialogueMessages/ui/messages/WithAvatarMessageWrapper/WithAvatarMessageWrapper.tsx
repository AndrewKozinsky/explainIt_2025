import type { ReactNode } from 'react'
import '../AiDialogueMessages.scss'
import './WithAvatarMessageWrapper.scss'

type WithAvatarMessageWrapperProps = {
	avatar: ReactNode
	name: string
	role?: string
	actions?: ReactNode
	speech?: ReactNode
}

function WithAvatarMessageWrapper({ avatar, name, role, actions, speech }: WithAvatarMessageWrapperProps) {
	return (
		<div className='ai-dialogue-message-with-avatar'>
			{avatar}
			<div className='ai-dialogue-message-with-avatar__body'>
				<div className='ai-dialogue-message-with-avatar__header'>
					{name && <span className='ai-dialogue-message-with-avatar__name'>{name}</span>}
					{role && (
						<>
							<span className='ai-dialogue-message-with-avatar__circle' />
							<span className='ai-dialogue-message-with-avatar__role'>{role}</span>
						</>
					)}
				</div>
				<div className='ai-dialogue-message-with-avatar__content'>
					{actions}
					{speech}
				</div>
			</div>
		</div>
	)
}

export default WithAvatarMessageWrapper
