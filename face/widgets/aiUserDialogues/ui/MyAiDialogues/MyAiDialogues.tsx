'use client'

import { useTranslations } from 'next-intl'
import Header from '@/shared/ui/Header/Header'
import UserAiDialoguesList from '@/widgets/aiUserDialogues/ui/UserAiDialoguesList/UserAiDialoguesList'

type MyAiDialoguesProps = {
	userId: number
}

/** Блок «Мои диалоги»: заголовок и список диалогов пользователя. */
export default function MyAiDialogues({ userId }: MyAiDialoguesProps) {
	const t = useTranslations('aiDialoguesPage')

	return (
		<>
			<Header hTag={3} hStyle={4}>
				{t('myDialoguesHeader')}
			</Header>
			<UserAiDialoguesList userId={userId} />
		</>
	)
}
