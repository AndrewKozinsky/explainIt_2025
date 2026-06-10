'use client'

import LogoSign from 'ui/logo/LogoSign/LogoSign'
import { pageUrls } from 'utils/pageUrls'
import { usePathname } from '@/i18n/routing'
import { Link } from '@/i18n/routing'

export function LinkLogo() {
	const pathname = usePathname()

	const mainPath = pageUrls.main.path

	if (pathname === mainPath) {
		return <LogoSign />
	}

	return (
		<Link href={mainPath}>
			<LogoSign />
		</Link>
	)
}
