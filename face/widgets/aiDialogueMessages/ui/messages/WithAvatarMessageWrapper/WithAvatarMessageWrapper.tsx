import type { ReactNode } from 'react'
import '../PendingAnswerMessage/PendingAnswerMessage.scss'
import './WithAvatarMessageWrapper.scss'
import cn from 'classnames'

type WithAvatarMessageWrapperProps = {
	avatar: ReactNode
	name: string
	role?: string
	contentGroups: { key: number; speech?: ReactNode; actions?: ReactNode }[]
	extraClass?: string
}

function WithAvatarMessageWrapper(props: WithAvatarMessageWrapperProps) {
	const { avatar, name, role, contentGroups, extraClass } = props

	return (
		<section className={cn('ai-dialogue-message-with-avatar', extraClass)}>
			{avatar}
			<div className='ai-dialogue-message-with-avatar__body'>
				<div className='ai-dialogue-message-with-avatar__header'>
					<span className='ai-dialogue-message-with-avatar__name'>{name}</span>
					{role && (
						<>
							<span className='ai-dialogue-message-with-avatar__circle' />
							<span className='ai-dialogue-message-with-avatar__role'>{role}</span>
						</>
					)}
				</div>
				<div className='ai-dialogue-message-with-avatar__content'>
					{contentGroups.map(({ key, speech, actions }) => (
						<div key={key} className='ai-dialogue-message-with-avatar__group'>
							{speech && <div className='ai-dialogue-message-with-avatar__speech'>{speech}</div>}
							{actions && <div className='ai-dialogue-message-with-avatar__actions'>{actions}</div>}
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default WithAvatarMessageWrapper
