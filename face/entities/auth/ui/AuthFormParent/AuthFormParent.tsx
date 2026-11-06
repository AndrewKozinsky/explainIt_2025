import React from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import Header from '@/shared/ui/Header/Header'
import { PageNameKey } from '@/shared/utils/pageUrls'
import mainConfig from '@/shared/сonsts/mainConfig'
import './AuthFormParent.scss'

type AuthPageLayoutProps = {
	pageTitle: string
	form: React.ReactNode
	afterFormLinks: { path: string; nameKey: PageNameKey }[]
}

export function AuthFormParent(props: AuthPageLayoutProps) {
	const { pageTitle, form, afterFormLinks } = props
	const t = useTranslations('pageUrls')
	const tAuth = useTranslations('auth')

	return (
		<section className='auth-page-layout'>
			<div className='auth-page-layout__main'>
				<Header hTag={1} hStyle={3}>
					{pageTitle}
				</Header>
				{form}
			</div>
			<p className='auth-page-layout__after-form-links'>
				{afterFormLinks.map((link) => (
					<Link className='link' key={link.path} href={link.path}>
						{t(link.nameKey)}
					</Link>
				))}
			</p>
			<p className='auth-page-layout__problems-info'>
				{tAuth.rich('problemsInfo', {
					email: mainConfig.supportEmail,
					link: (chunks) => (
						<a className='link' href={'mailto:' + mainConfig.supportEmail}>
							{chunks}
						</a>
					),
				})}
			</p>
		</section>
	)
}
