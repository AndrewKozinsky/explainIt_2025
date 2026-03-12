import React from 'react'
import { NotificationProvider } from 'ui/Notification/Notification'
import MainPageLayout from '_pages/main/mainPageLayout/MainPageLayout/MainPageLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Чтение книг на английском языке',
	description: 'Чтение книг и просмотр фильмов на английском и других языках',
	verification: {
		yandex: '1611c5fab3b46857',
	},
	keywords: [
		'чтение на английском',
		'адаптированная литература на английском',
		'адаптированные тексты на немецком',
		'чтение английских книг',
		'книги в оригинале',
	],
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
