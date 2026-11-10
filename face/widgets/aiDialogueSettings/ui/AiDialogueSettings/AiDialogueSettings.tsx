import { useTranslations } from 'next-intl'
import TextLevelSwitcher, { type AiDialogueTextLevel } from '@/entities/aiDialogue/ui/TextLevelSwitcher'
import AutoVoiceToggle from './AutoVoiceToggle'
import ReplyTextToggle from './ReplyTextToggle'
import UnlockAudioButton from './UnlockAudioButton'
import './AiDialogueSettings.scss'

export type { AiDialogueTextLevel } from '@/entities/aiDialogue/ui/TextLevelSwitcher'

type AiDialogueSettingsProps = {
	textLevel: AiDialogueTextLevel
	onTextLevelChange: (level: AiDialogueTextLevel) => void
	isUpdatingTextLevel?: boolean
	audioBlocked: boolean
	onUnlockAudio: () => void
}

function AiDialogueSettings(props: AiDialogueSettingsProps) {
	const { textLevel, onTextLevelChange, isUpdatingTextLevel, audioBlocked, onUnlockAudio } = props
	const t = useTranslations('aiDialogueSettings')

	return (
		<section className='ai-dialogue-settings' aria-label={t('heading')}>
			<TextLevelSwitcher
				textLevel={textLevel}
				onTextLevelChange={onTextLevelChange}
				disabled={isUpdatingTextLevel}
			/>
			<AutoVoiceToggle />
			<ReplyTextToggle />
			<UnlockAudioButton audioBlocked={audioBlocked} onUnlockAudio={onUnlockAudio} />
		</section>
	)
}

export default AiDialogueSettings
