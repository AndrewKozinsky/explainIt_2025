import React from 'react'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { NotificationProvider } from 'ui/Notification/Notification'
import { routing } from '@/i18n/routing'
import MainPageLayout from '_pages/main/mainPageLayout/MainPageLayout/MainPageLayout'

export default async function LocaleLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode
	params: Promise<{ locale: string }>
}>) {
	const { locale } = await params

	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}

	const messages = await getMessages()

	return (
		<NextIntlClientProvider locale={locale} messages={messages}>
			<NotificationProvider>
				<MainPageLayout>{children}</MainPageLayout>
			</NotificationProvider>
		</NextIntlClientProvider>
	)
}
