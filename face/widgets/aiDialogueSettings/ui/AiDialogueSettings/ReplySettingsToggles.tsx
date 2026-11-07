import { useTranslations } from 'next-intl'
import { useReplySettingsStore } from '@/entities/aiDialogue/replySettings/replySettingsStore'
import Toggle from '@/shared/ui/formRelated/Toggle/Toggle'
import './ReplySettingsToggles.scss'

/** Переключатели «Автоозвучка» и «Текст реплик». Новые значения действуют только на будущие реплики. */
function ReplySettingsToggles() {
	const t = useTranslations('aiDialogue.replySettings')
	const isAutoVoiceEnabled = useReplySettingsStore((state) => state.isAutoVoiceEnabled)
	const isReplyTextVisible = useReplySettingsStore((state) => state.isReplyTextVisible)
	const setAutoVoiceEnabled = useReplySettingsStore((state) => state.setAutoVoiceEnabled)
	const setReplyTextVisible = useReplySettingsStore((state) => state.setReplyTextVisible)

	return (
		<div className='reply-settings-toggles'>
			<Toggle
				label={t('autoVoice')}
				checked={isAutoVoiceEnabled}
				inputProps={{ onChange: (event) => setAutoVoiceEnabled(event.target.checked) }}
			/>
			<Toggle
				label={t('replyText')}
				checked={isReplyTextVisible}
				inputProps={{ onChange: (event) => setReplyTextVisible(event.target.checked) }}
			/>
		</div>
	)
}

export default ReplySettingsToggles
