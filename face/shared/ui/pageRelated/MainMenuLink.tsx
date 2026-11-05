'use client'

import cn from 'classnames'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { PageNameKey } from '@/shared/utils/pageUrls'
import { useIsCurrentPage } from './MainMenu/fn/mainMenuFn'

type MenuLinkProps = {
	linkData: {
		path: string
		nameKey: PageNameKey
	}
}

export function MainMenuLink(props: MenuLinkProps) {
	const { linkData } = props
	const { path, nameKey } = linkData
	const t = useTranslations('pageUrls')

	const isCurrentPage = useIsCurrentPage(path)

	return (
		<Link href={path} className={cn('link', isCurrentPage && 'main-menu__link--current')}>
			{t(nameKey)}
		</Link>
	)
}
