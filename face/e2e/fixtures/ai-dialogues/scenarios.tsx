import { type ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextIntlClientProvider } from 'next-intl'
import AiDialoguesPage from '@/_pages/aiDialogues/AiDialoguesPage/AiDialoguesPage'
import type { UserModel } from '@/entities/user/UserService'
import { UserProvider } from '@/shared/api/auth/UserProvider'
import { NotificationContext, type NotifyArg } from '@/shared/ui/Notification/fn/context'
import enMessages from '../../../messages/en.json'
import ruMessages from '../../../messages/ru.json'

const client = new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: 0 } } })
const user: UserModel = {
	id: 7,
	email: 'fixture@example.test',
	isUserConfirmed: true,
	balance: 100,
	gender: 'MALE',
	avatarPresetId: null,
	avatarUrl: '',
	uploadedAvatarUrl: null,
	avatarUrlExpiresAt: '',
}

/** Настоящая страница и её клиентские слои; HTTP подменяет Playwright. */
export default function ScenarioPageFixture() {
	const [notification, notify] = useState<NotifyArg | null>(null)

	return (
		<FixtureProviders>
			<NotificationContext.Provider value={{ notify }}>
				<main style={{ maxWidth: 1200, margin: '40px auto', padding: '0 20px' }}>
					{notification && <p role='alert'>{notification.message}</p>}
					<AiDialoguesPage />
				</main>
			</NotificationContext.Provider>
		</FixtureProviders>
	)
}

function FixtureProviders({ children }: { children: ReactNode }) {
	const authenticated = new URLSearchParams(location.search).has('authenticated')
	const locale = new URLSearchParams(location.search).get('locale') === 'en' ? 'en' : 'ru'

	return (
		<NextIntlClientProvider
			locale={locale}
			messages={locale === 'en' ? enMessages : ruMessages}
			timeZone='Asia/Yekaterinburg'
		>
			<QueryClientProvider client={client}>
				<UserProvider user={authenticated ? user : null}>{children}</UserProvider>
			</QueryClientProvider>
		</NextIntlClientProvider>
	)
}
