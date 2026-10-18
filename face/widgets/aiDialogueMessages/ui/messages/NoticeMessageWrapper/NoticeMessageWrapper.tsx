import type { ReactNode } from 'react'
import './NoticeMessageWrapper.scss'

type NoticeMessageWrapperProps = {
	text: string
	icon: ReactNode
}

function NoticeMessageWrapper({ text, icon }: NoticeMessageWrapperProps) {
	return (
		<div className='notice-message'>
			<div className='notice-message__text'>{text}</div>
			<div className='notice-message__icon' aria-hidden='true'>
				{icon}
			</div>
		</div>
	)
}

export default NoticeMessageWrapper
