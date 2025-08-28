import { createContext } from 'react'

type NotificationType = 'error'

export type Notification = {
	id: number
	type: NotificationType
	message: string
}

export type NotifyArg = { type: NotificationType; message: string }

type NotificationContextType = {
	notify: (arg: NotifyArg) => void
}

export const NotificationContext = createContext<NotificationContextType>(undefined as any as NotificationContextType)
