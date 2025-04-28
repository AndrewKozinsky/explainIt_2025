import React from 'react'
import type { Metadata } from 'next'
import MainPageLayout from '../_pages/mainPageLayout/MainPageLayout/MainPageLayout'

export const metadata: Metadata = {
	title: 'Курс английского языка',
	description: 'Курс английского языка для начинающих',
	verification: {
		yandex: '1611c5fab3b46857',
	},
	keywords: ['английский', 'a1', 'упражнения на английском', 'адаптированные тексты', 'для начинающих'],
	icons: {
		icon: '/favicon.svg',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<head>
				<meta name='google-site-verification' content='5OljJ97EI98yn2tlM7Vziu_9l0c5ujOn8F3VxahktD4' />
				<meta name='yandex-verification' content='b8b37674c9ce501f' />
			</head>
			<body>
				<MainPageLayout>{children}</MainPageLayout>
			</body>
		</html>
	)
}
