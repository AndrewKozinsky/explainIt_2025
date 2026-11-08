import type { ReactNode } from 'react'
import './NoticeMessageWrapper.scss'

type NoticeMessageWrapperProps = {
	/** Содержимое уведомления: строка или разметка (например, текст с кликабельными словами). */
	children: ReactNode
	icon: ReactNode
}

function NoticeMessageWrapper({ children, icon }: NoticeMessageWrapperProps) {
	return (
		<div className='notice-message'>
			<div className='notice-message__text'>{children}</div>
			<div className='notice-message__icon' aria-hidden='true'>
				{icon}
			</div>
		</div>
	)
}

export default NoticeMessageWrapper
