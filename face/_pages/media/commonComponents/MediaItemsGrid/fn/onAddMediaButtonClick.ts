// import { redirect } from 'next/navigation'
// import { useUserStore } from 'stores/userStore'
// import { pageUrls } from 'сonsts/pageUrls'

/*export function useGetOnAddMediaButtonClick(onClick: () => void) {
	const user = useUserStore((state) => state.user)
	const isUserLoading = useUserStore((state) => state.isLoading)

	return () => {
		if (isUserLoading) {
			return () => {}
		}

		if (user) {
			onClick()
		} else {
			redirect(pageUrls.auth.login.path)
		}
	}
}*/
