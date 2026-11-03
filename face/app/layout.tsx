import React from 'react'
import { getLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

/** Заголовок вкладки, описание и ключевые слова сайта на языке интерфейса. Страницы могут задать свои */
export async function generateMetadata(): Promise<Metadata> {
	const locale = await getLocale()
	const t = await getTranslations({ locale, namespace: 'siteMeta' })

	return {
		title: t('title'),
		description: t('description'),
		verification: {
			yandex: '1611c5fab3b46857',
		},
		keywords: t.raw('keywords') as string[],
		icons: {
			icon: '/favicon.svg',
		},
	}
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const locale = await getLocale()

	return (
		<html lang={locale}>
			<head>
				<meta name='google-site-verification' content='5OljJ97EI98yn2tlM7Vziu_9l0c5ujOn8F3VxahktD4' />
				<meta name='yandex-verification' content='b8b37674c9ce501f' />
			</head>
			<body>{children}</body>
		</html>
	)
}
