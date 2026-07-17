import { redirect } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useUser } from '@/shared/api/auth/UserProvider'
import { pageUrls, localizePath } from '@/shared/utils/pageUrls'

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
