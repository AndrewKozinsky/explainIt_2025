'use client'

import { usePathname } from '@/i18n/routing'
import { Link } from '@/i18n/routing'
import LogoSign from '@/shared/ui/logo/LogoSign/LogoSign'
import { pageUrls } from '@/shared/utils/pageUrls'
import './LinkLogo.scss'

export function LinkLogo() {
	const pathname = usePathname()

	const mainPath = pageUrls.main.path

	const logoContent = (
		<>
			<LogoSign />
			<span className='link-logo-sign__beta'>beta</span>
		</>
	)

	if (pathname === mainPath) {
		return <div className='link-logo-sign'>{logoContent}</div>
	}

	return (
		<Link href={mainPath} className='link-logo-sign'>
			{logoContent}
		</Link>
	)
}
