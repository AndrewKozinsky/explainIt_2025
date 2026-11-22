import rudictionary from '@/messages/ru/dictionary.json'
import ruaiDialogueMessages from '@/messages/ru/aiDialogueMessages.json'
import ruaiDialogueSettings from '@/messages/ru/aiDialogueSettings.json'
import ruaiDialogueForm from '@/messages/ru/aiDialogueForm.json'
import ruaiDialoguePage from '@/messages/ru/aiDialoguePage.json'
import endictionary from '@/messages/en/dictionary.json'
import enaiDialogueMessages from '@/messages/en/aiDialogueMessages.json'
import enaiDialogueSettings from '@/messages/en/aiDialogueSettings.json'
import enaiDialogueForm from '@/messages/en/aiDialogueForm.json'
import enaiDialoguePage from '@/messages/en/aiDialoguePage.json'
import AiDialoguePage from '@/_pages/aiDialogue/AiDialoguePage/AiDialoguePage'
import { type ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextIntlClientProvider } from 'next-intl'
import AiDialoguesPage from '@/_pages/aiDialogues/AiDialoguesPage/AiDialoguesPage'
import type { UserModel } from '@/entities/user/UserService'
import enAiDialogueMessages from '@/messages/en/aiDialogue.json'
import enaiDialogueScenariosList from '@/messages/en/aiDialogueScenariosList.json'
import enaiDialoguesPage from '@/messages/en/aiDialoguesPage.json'
import enauth from '@/messages/en/auth.json'
import enbalanceExhaustedNotice from '@/messages/en/balanceExhaustedNotice.json'
import enpageUrls from '@/messages/en/pageUrls.json'
import enuserAiDialogues from '@/messages/en/userAiDialogues.json'
import ruAiDialogueMessages from '@/messages/ru/aiDialogue.json'
import ruaiDialogueScenariosList from '@/messages/ru/aiDialogueScenariosList.json'
import ruaiDialoguesPage from '@/messages/ru/aiDialoguesPage.json'
import ruauth from '@/messages/ru/auth.json'
import rubalanceExhaustedNotice from '@/messages/ru/balanceExhaustedNotice.json'
import rupageUrls from '@/messages/ru/pageUrls.json'
import ruuserAiDialogues from '@/messages/ru/userAiDialogues.json'
import { UserProvider } from '@/shared/api/auth/UserProvider'
import { NotificationContext, type NotifyArg } from '@/shared/ui/Notification/fn/context'

// Переводы настоящей страницы сценариев и её модального окна.
const enMessages = {
	aiDialoguePage: enaiDialoguePage,
	aiDialogueForm: enaiDialogueForm,
	aiDialogueSettings: enaiDialogueSettings,
	aiDialogueMessages: enaiDialogueMessages,
	dictionary: endictionary,

	aiDialogue: enAiDialogueMessages,
	aiDialogueScenariosList: enaiDialogueScenariosList,
	aiDialoguesPage: enaiDialoguesPage,
	pageUrls: enpageUrls,
	userAiDialogues: enuserAiDialogues,
	balanceExhaustedNotice: enbalanceExhaustedNotice,
	auth: enauth,
}
const ruMessages = {
	aiDialoguePage: ruaiDialoguePage,
	aiDialogueForm: ruaiDialogueForm,
	aiDialogueSettings: ruaiDialogueSettings,
	aiDialogueMessages: ruaiDialogueMessages,
	dictionary: rudictionary,

	aiDialogue: ruAiDialogueMessages,
	aiDialogueScenariosList: ruaiDialogueScenariosList,
	aiDialoguesPage: ruaiDialoguesPage,
	pageUrls: rupageUrls,
	userAiDialogues: ruuserAiDialogues,
	balanceExhaustedNotice: rubalanceExhaustedNotice,
	auth: ruauth,
}

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
}

/** Настоящая страница и её клиентские слои; HTTP подменяет Playwright. */
export default function ScenarioPageFixture() {
	const [notification, notify] = useState<NotifyArg | null>(null)

	return (
		<FixtureProviders>
			<NotificationContext.Provider value={{ notify }}>
				<main style={{ maxWidth: 1200, margin: '40px auto', padding: '0 20px' }}>
					{notification && <p role='alert'>{notification.message}</p>}
					{new URLSearchParams(location.search).has('exam-page') ? (
						<AiDialoguePage dialogueId='42' />
					) : (
						<AiDialoguesPage />
					)}
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
