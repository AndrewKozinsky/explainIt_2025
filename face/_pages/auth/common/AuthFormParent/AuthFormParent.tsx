import Link from 'next/link'
import React from 'react'
import Header from '@/ui/Header/Header'
import mainConfig from '../../../../сonsts/mainConfig'
import './AuthFormParent.scss'

type AuthPageLayoutProps = {
	pageTitle: string
	form: React.ReactNode
	afterFormLinks: { path: string; name: string }[]
}

export function AuthFormParent(props: AuthPageLayoutProps) {
	const { pageTitle, form, afterFormLinks } = props

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
						{link.name}
					</Link>
				))}
			</p>
			<p className='auth-page-layout__problems-info'>
				В случае технических проблем обращайтесь на{' '}
				<a className='link' href={'mailto:' + mainConfig.supportEmail}>
					{mainConfig.supportEmail}
				</a>
				.
			</p>
		</section>
	)
}
