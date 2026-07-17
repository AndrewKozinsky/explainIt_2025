'use client'

import { usePathname } from '@/i18n/routing'
import { Link } from '@/i18n/routing'
import LogoSign from '@/shared/ui/logo/LogoSign/LogoSign'
import { pageUrls } from '@/shared/utils/pageUrls'

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
