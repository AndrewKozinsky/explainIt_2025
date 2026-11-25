import { useTranslations } from 'next-intl'
import TextLevelSwitcher, { type AiDialogueTextLevel } from '@/entities/aiDialogue/ui/TextLevelSwitcher'
import AutoVoiceToggle from './AutoVoiceToggle'
import ReplyTextToggle from './ReplyTextToggle'
import SceneImagesToggle from './SceneImagesToggle'
import UnlockAudioButton from './UnlockAudioButton'
import './AiDialogueSettings.scss'

export type { AiDialogueTextLevel } from '@/entities/aiDialogue/ui/TextLevelSwitcher'

type AiDialogueSettingsProps =
	| { mode: 'exam' }
	| {
			mode: 'practice'
			textLevel: AiDialogueTextLevel
			onTextLevelChange: (level: AiDialogueTextLevel) => void
			isUpdatingTextLevel?: boolean
			audioBlocked: boolean
			onUnlockAudio: () => void
	  }

function AiDialogueSettings(props: AiDialogueSettingsProps) {
	const t = useTranslations('aiDialogueSettings')

	return (
		<section className='ai-dialogue-settings' aria-label={t('heading')}>
			{props.mode === 'practice' && (
				<>
					<TextLevelSwitcher
						textLevel={props.textLevel}
						onTextLevelChange={props.onTextLevelChange}
						disabled={props.isUpdatingTextLevel}
					/>
					<AutoVoiceToggle />
					<ReplyTextToggle />
					<UnlockAudioButton audioBlocked={props.audioBlocked} onUnlockAudio={props.onUnlockAudio} />
				</>
			)}
			<SceneImagesToggle />
		</section>
	)
}

export default AiDialogueSettings
