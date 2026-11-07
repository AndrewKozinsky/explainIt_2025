import { useTranslations } from 'next-intl'

/** Сообщение о том, что у пользователя ещё нет диалогов. */
export default function AiDialoguesEmpty() {
	const t = useTranslations('userAiDialogues')

	return <p>{t('empty')}</p>
}
