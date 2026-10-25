import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextIntlClientProvider } from 'next-intl'
import { createRoot } from 'react-dom/client'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'
import UserAiDialoguesList from '@/widgets/aiUserDialogues/ui/UserAiDialoguesList/UserAiDialoguesList'
import ScenarioPageFixture from './scenarios'
import '@/_pages/main/mainPageLayout/style/global.scss'

const client = new QueryClient({ defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } } })

createRoot(document.getElementById('root')!).render(
	new URLSearchParams(location.search).has('scenarios') ? (
		<ScenarioPageFixture />
	) : (
		<NextIntlClientProvider locale='ru' messages={{}} timeZone='Asia/Yekaterinburg'>
			<QueryClientProvider client={client}>
				<NotificationContext.Provider value={{ notify: () => undefined }}>
					<main style={{ width: 1200, margin: '40px auto' }}>
						<h2 style={{ fontSize: 40, lineHeight: '48px', fontWeight: 700, marginBottom: 14 }}>
							Мои диалоги
						</h2>
						<UserAiDialoguesList userId={7} />
					</main>
				</NotificationContext.Provider>
			</QueryClientProvider>
		</NextIntlClientProvider>
	),
)
