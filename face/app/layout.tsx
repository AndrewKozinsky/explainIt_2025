import React from 'react'
import { getLocale } from 'next-intl/server'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Изучение английского языка через видео с Ютуба',
	description: 'Изучение английского языка через видео с Ютуба',
	verification: {
		yandex: '1611c5fab3b46857',
	},
	keywords: ['адаптированные фильмы на английском', 'ютуб', 'смотреть видео в оригинале'],
	icons: {
		icon: '/favicon.svg',
	},
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
