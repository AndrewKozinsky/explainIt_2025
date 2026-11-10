import { useTranslations } from 'next-intl'
import { useReplySettingsStore } from '@/entities/aiDialogue/replySettings/replySettingsStore'
import Toggle from '@/shared/ui/formRelated/Toggle/Toggle'

/** Переключатель «Автоозвучка». Новое значение действует только на будущие реплики. */
function AutoVoiceToggle() {
	const t = useTranslations('aiDialogue.replySettings')
	const isAutoVoiceEnabled = useReplySettingsStore((state) => state.isAutoVoiceEnabled)
	const setAutoVoiceEnabled = useReplySettingsStore((state) => state.setAutoVoiceEnabled)

	return (
		<Toggle
			label={t('autoVoice')}
			checked={isAutoVoiceEnabled}
			inputProps={{ onChange: (event) => setAutoVoiceEnabled(event.target.checked) }}
		/>
	)
}

export default AutoVoiceToggle
