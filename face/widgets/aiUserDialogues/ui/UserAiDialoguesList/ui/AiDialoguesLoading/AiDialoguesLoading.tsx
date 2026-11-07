import { useTranslations } from 'next-intl'

/** Сообщение о загрузке списка диалогов. */
export default function AiDialoguesLoading() {
	const t = useTranslations('userAiDialogues')

	return <p role='status'>{t('loading')}</p>
}
