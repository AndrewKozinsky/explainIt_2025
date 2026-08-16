import React from 'react'
import { Link } from '@/i18n/routing'
import { useUser } from '@/shared/api/auth/UserProvider'
import { pageUrls } from '@/shared/utils/pageUrls'

function ChatInputWarningMessage() {
	const user = useUser()
	const hasBalance = (user?.balance ?? 0) > 0

	let warningMessage: React.ReactNode = ''

	if (!user) {
		warningMessage = (
			<>
				Войдите{' '}
				<Link href={pageUrls.auth.login.path} className='link'>
					в учётную запись
				</Link>{' '}
				чтобы задать вопрос.
			</>
		)
	}

	if (user && !hasBalance) {
		warningMessage = (
			<>
				Общение с ИИ расходует баланс.{' '}
				<Link href={pageUrls.me.path} className='link'>
					Пополните
				</Link>
				, чтобы продолжить.
			</>
		)
	}

	if (!warningMessage) {
		return null
	}

	return <p className='chat-input__warning-message'>{warningMessage}</p>
}

export default ChatInputWarningMessage
