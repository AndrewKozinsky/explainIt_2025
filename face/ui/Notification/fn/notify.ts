import { useCallback, useState } from 'react'
import { Notification, NotifyArg } from '../context'

export function useGetNotify() {
	const [notifications, setNotifications] = useState<Notification[]>([])

	const notify = useCallback(function (data: NotifyArg) {
		const id = Date.now()
		setNotifications((prev) => [...prev, { id, ...data }])

		// Auto-remove after 5s
		setTimeout(() => {
			setNotifications((prev) => prev.filter((n) => n.id !== id))
		}, 5000)
	}, [])

	return {
		notify,
		notifications,
	}
}
