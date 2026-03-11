import { useContext } from 'react'
import { useUserStore } from 'stores/userStore'
import { NotificationContext } from 'ui/Notification/context'

export function useGetOnAddMediaButtonClick(onClick: () => void) {
	const { notify } = useContext(NotificationContext)

	const user = useUserStore((state) => state.user)
	const isUserLoading = useUserStore((state) => state.isLoading)

	return () => {
		if (isUserLoading) {
			return () => {}
		}

		if (user) {
			onClick()
		} else {
			notify({
				type: 'warning',
				message: 'Создавать новую книгу или фильм могут только авторизованные пользователи.',
			})
		}
	}
}
