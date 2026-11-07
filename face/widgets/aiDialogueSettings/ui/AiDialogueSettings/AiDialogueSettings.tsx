import { useTranslations } from 'next-intl'
import TextLevelSwitcher, { type AiDialogueTextLevel } from '@/entities/aiDialogue/ui/TextLevelSwitcher'
import ReplySettingsToggles from './ReplySettingsToggles'
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
			<h2 className='ai-dialogue-settings__heading'>{t('heading')}</h2>
			<TextLevelSwitcher
				textLevel={textLevel}
				onTextLevelChange={onTextLevelChange}
				disabled={isUpdatingTextLevel}
			/>
			<ReplySettingsToggles />
			<UnlockAudioButton audioBlocked={audioBlocked} onUnlockAudio={onUnlockAudio} />
		</section>
	)
}

export default AiDialogueSettings
