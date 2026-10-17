import type { ReactNode } from 'react'
import '../AiDialogueMessages.scss'
import './WithAvatarMessageWrapper.scss'
import cn from 'classnames'

type WithAvatarMessageWrapperProps = {
	avatar: ReactNode
	name: string
	role?: string
	actions?: ReactNode
	speech?: ReactNode
	extraClass?: string
}

function WithAvatarMessageWrapper(props: WithAvatarMessageWrapperProps) {
	const { avatar, name, role, actions, speech, extraClass } = props

	return (
		<div className={cn('ai-dialogue-message-with-avatar', extraClass)}>
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
					<div className='ai-dialogue-message-with-avatar__actions'>{actions}</div>
					<div className='ai-dialogue-message-with-avatar__speech'>{speech}</div>
				</div>
			</div>
		</div>
	)
}

export default WithAvatarMessageWrapper
