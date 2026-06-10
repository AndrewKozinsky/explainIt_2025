'use client'

import { usePathname } from '@/i18n/routing'
import { Link } from '@/i18n/routing'
import LogoWithText from '../LogoWithText/LogoWithText'
import './LinkLogoWithText.scss'

export function LinkLogoWithText() {
	const pathname = usePathname()

	if (pathname === '/') {
		return (
			<div className='link-logo-default'>
				<LogoWithText />
			</div>
		)
	}
	return (
		<Link href='/' className='link-logo'>
			<LogoWithText />
		</Link>
	)
}
