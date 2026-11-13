import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getCurrentUser } from '@/shared/api/auth/getCurrentUser'
import { Providers } from '@/shared/api/auth/Providers'
import { UserProvider } from '@/shared/api/auth/UserProvider'
import CookieBannerIntl from '@/shared/posthog/CookieBannerIntl/CookieBannerIntl'
import { getPosthogSettings } from '@/shared/posthog/fn/getPosthogSettings'
import { PosthogProvider } from '@/shared/posthog/PosthogProvider'
import { NotificationProvider } from '@/shared/ui/Notification/Notification'
import { getRuntimeRegion } from '@/shared/utils/getRuntimeRegion'
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
	const posthogSettings = getPosthogSettings()

	return (
		<NextIntlClientProvider locale={locale} messages={messages}>
			<NotificationProvider>
				{/* Новый кэш запросов для каждой локали: сервер отдаёт тексты контента на языке интерфейса. */}
				<Providers key={locale}>
					<UserProvider user={user}>
						<PosthogProvider settings={posthogSettings}>
							<MainPageLayout>{children}</MainPageLayout>
							{/* Баннер показывается во всех окружениях immersia.site, чтобы его можно было проверить локально. */}
							{getRuntimeRegion() === 'intl' && <CookieBannerIntl />}
						</PosthogProvider>
					</UserProvider>
				</Providers>
			</NotificationProvider>
		</NextIntlClientProvider>
	)
}
