import React from 'react'
import type { Metadata } from 'next'
import MainPageLayout from '../_pages/main/mainPageLayout/MainPageLayout/MainPageLayout'
import { NotificationProvider } from 'ui/Notification/Notification'

export const metadata: Metadata = {
	title: 'Чтение книг на иностранном языке',
	description: 'Приложение для чтения книг на иностранном языка',
	verification: {
		yandex: '1611c5fab3b46857',
	},
	keywords: ['английский', 'a1', 'упражнения на английском', 'для начинающих'],
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
				<NotificationProvider>
					<MainPageLayout>{children}</MainPageLayout>
				</NotificationProvider>
			</body>
		</html>
	)
}
