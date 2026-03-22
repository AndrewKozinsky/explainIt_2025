'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoSign from 'ui/logo/LogoSign/LogoSign'

export function LinkLogo() {
	const pathname = usePathname()

	if (pathname === '/') {
		return <LogoSign />
	}

	return (
		<Link href='/'>
			<LogoSign />
		</Link>
	)
}
