import type { Metadata } from 'next'
import React from 'react'
import Metrika from './_in/Metrika/Metrika'
import './_in/style/global.scss'

export const metadata: Metadata = {
	title: 'Курс английского языка',
	description: 'Курс английского языка с уровня А1',
	verification: {
		yandex: '1611c5fab3b46857',
	},
	keywords: ['английский', 'a1', 'упражнения на английском', 'адаптированные тексты'],
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
			</head>
			<body>
				<Metrika />
				{children}
			</body>
		</html>
	)
}
