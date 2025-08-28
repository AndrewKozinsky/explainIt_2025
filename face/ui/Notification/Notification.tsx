'use client'

import { ReactNode } from 'react'
import Paragraph from '../Paragraph/Paragraph'
import { useGetNotify } from './fn/notify'
import { NotificationContext } from './context'
import './Notifications.scss'

type NotificationProviderProps = {
	children: ReactNode
}

export function NotificationProvider(props: NotificationProviderProps) {
	const { children } = props

	const { notify, notifications } = useGetNotify()

	return (
		<NotificationContext.Provider value={{ notify }}>
			<div className='notifications'>
				{notifications.map((notification) => (
					<div className='notifications_item' key={notification.id}>
						<Paragraph fontSize='15'>{notification.message}</Paragraph>
					</div>
				))}
			</div>
			{children}
		</NotificationContext.Provider>
	)
}
