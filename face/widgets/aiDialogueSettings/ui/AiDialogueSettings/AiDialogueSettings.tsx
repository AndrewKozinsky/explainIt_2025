import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import Toggle from '@/shared/ui/formRelated/Toggle/Toggle'
import Switcher from '@/shared/ui/Switcher/Switcher'
import './AiDialogueSettings.scss'

const textLevels = ['A1', 'A2', 'B1', 'B2', 'Any'] as const

export type AiDialogueTextLevel = (typeof textLevels)[number]

type AiDialogueSettingsProps = {
	textLevel: AiDialogueTextLevel
	onTextLevelChange: (level: AiDialogueTextLevel) => void
	showText: boolean
	onShowTextChange: (showText: boolean) => void
	audioBlocked: boolean
	onUnlockAudio: () => void
}

function AiDialogueSettings(props: AiDialogueSettingsProps) {
	const { textLevel, onTextLevelChange, showText, onShowTextChange, audioBlocked, onUnlockAudio } = props

	return (
		<section className='ai-dialogue-settings' aria-label='Settings'>
			<h2 className='ai-dialogue-settings__heading'>Settings</h2>
			<Switcher
				label='Text level:'
				type='fit'
				orientation='horizontal'
				items={textLevels.map((level) => ({
					text: level,
					isCurrent: textLevel === level,
					onClick: () => onTextLevelChange(level),
				}))}
			/>
			<Toggle
				label='Show text'
				checked={showText}
				inputProps={{ onChange: (event) => onShowTextChange(event.target.checked) }}
			/>
			{audioBlocked && (
				<Button theme='outline' size='small' onClick={onUnlockAudio}>
					Включить звук
				</Button>
			)}
		</section>
	)
}

export default AiDialogueSettings
