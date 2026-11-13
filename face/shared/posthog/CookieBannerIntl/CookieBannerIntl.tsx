'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import { pageUrls } from '@/shared/utils/pageUrls'
import { useCookieBannerIntl } from './fn/useCookieBannerIntl'
import './CookieBannerIntl.scss'

/** Баннер внизу экрана: сообщает про cookies и запись сессий, позволяет отказаться. */
function CookieBannerIntl() {
	const t = useTranslations('cookieBannerIntl')
	const { isVisible, accept, reject } = useCookieBannerIntl()

	if (!isVisible) return null

	return (
		<section className='cookie-banner-intl' aria-label={t('label')}>
			<p className='cookie-banner-intl__text'>
				{t.rich('text', {
					privacy: (chunks) => (
						<Link href={pageUrls.docs.privacyPolicy.path} className='link'>
							{chunks}
						</Link>
					),
				})}
			</p>
			<div className='cookie-banner-intl__buttons'>
				<Button theme='outline' size='small' onClick={reject}>
					{t('reject')}
				</Button>
				<Button theme='accent' size='small' onClick={accept}>
					{t('accept')}
				</Button>
			</div>
		</section>
	)
}

export default CookieBannerIntl
