import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getCurrentUser } from '@/shared/api/auth/getCurrentUser'
import { Providers } from '@/shared/api/auth/Providers'
import { UserProvider } from '@/shared/api/auth/UserProvider'
import { NotificationProvider } from '@/shared/ui/Notification/Notification'
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

	const [messages, user] = await Promise.all([getMessages(), getCurrentUser()])

	return (
		<NextIntlClientProvider locale={locale} messages={messages}>
			<NotificationProvider>
				<Providers>
					<UserProvider user={user}>
						<MainPageLayout>{children}</MainPageLayout>
					</UserProvider>
				</Providers>
			</NotificationProvider>
		</NextIntlClientProvider>
	)
}
