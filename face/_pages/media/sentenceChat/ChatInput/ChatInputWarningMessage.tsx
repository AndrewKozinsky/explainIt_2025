// import React from 'react'
// import Link from 'next/link'
// import { useUserStore } from 'stores/userStore'
// import { pageUrls } from 'сonsts/pageUrls'

/*function ChatInputWarningMessage() {
	const user = useUserStore((s) => s.user)
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
		return <span />
	}

	return <p className='chat-input__warning-message'>{warningMessage}</p>
}*/

// export default ChatInputWarningMessage
