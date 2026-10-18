import TextLevelSwitcher, { type AiDialogueTextLevel } from './TextLevelSwitcher'
import UnlockAudioButton from './UnlockAudioButton'
import './AiDialogueSettings.scss'

export type { AiDialogueTextLevel } from './TextLevelSwitcher'

type AiDialogueSettingsProps = {
	textLevel: AiDialogueTextLevel
	onTextLevelChange: (level: AiDialogueTextLevel) => void
	audioBlocked: boolean
	onUnlockAudio: () => void
}

function AiDialogueSettings(props: AiDialogueSettingsProps) {
	const { textLevel, onTextLevelChange, audioBlocked, onUnlockAudio } = props

	return (
		<section className='ai-dialogue-settings' aria-label='Settings'>
			<h2 className='ai-dialogue-settings__heading'>Settings</h2>
			<TextLevelSwitcher textLevel={textLevel} onTextLevelChange={onTextLevelChange} />
			<UnlockAudioButton audioBlocked={audioBlocked} onUnlockAudio={onUnlockAudio} />
		</section>
	)
}

export default AiDialogueSettings
