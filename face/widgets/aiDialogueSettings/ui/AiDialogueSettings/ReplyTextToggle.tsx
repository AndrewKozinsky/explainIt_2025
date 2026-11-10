import { useTranslations } from 'next-intl'
import { useReplySettingsStore } from '@/entities/aiDialogue/replySettings/replySettingsStore'
import Toggle from '@/shared/ui/formRelated/Toggle/Toggle'

/** Переключатель «Текст реплик». Новое значение действует только на будущие реплики. */
function ReplyTextToggle() {
	const t = useTranslations('aiDialogue.replySettings')
	const isReplyTextVisible = useReplySettingsStore((state) => state.isReplyTextVisible)
	const setReplyTextVisible = useReplySettingsStore((state) => state.setReplyTextVisible)

	return (
		<Toggle
			label={t('replyText')}
			checked={isReplyTextVisible}
			inputProps={{ onChange: (event) => setReplyTextVisible(event.target.checked) }}
		/>
	)
}

export default ReplyTextToggle
