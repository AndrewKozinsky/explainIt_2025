import { redirect } from 'next/navigation'
import { useLocale } from 'next-intl'
import { pageUrls, localizePath } from 'utils/pageUrls'
import { useUser } from '@/shared/api/auth/UserProvider'

export function useGetOnAddMediaButtonClick(onClick: () => void) {
	const user = useUser()
	const locale = useLocale()

	return () => {
		if (user) {
			onClick()
		} else {
			redirect(localizePath(locale, pageUrls.auth.login.path))
		}
	}
}
