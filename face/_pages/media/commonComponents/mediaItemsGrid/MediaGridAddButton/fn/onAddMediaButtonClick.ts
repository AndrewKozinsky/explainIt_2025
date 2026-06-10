import { redirect } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useUserStore } from 'stores/userStore'
import { pageUrls, localizePath } from 'utils/pageUrls'

export function useGetOnAddMediaButtonClick(onClick: () => void) {
	const user = useUserStore((state) => state.user)
	const isUserLoading = useUserStore((state) => state.isLoading)
	const locale = useLocale()

	return () => {
		if (isUserLoading) {
			return () => {}
		}

		if (user) {
			onClick()
		} else {
			redirect(localizePath(locale, pageUrls.auth.login.path))
		}
	}
}
