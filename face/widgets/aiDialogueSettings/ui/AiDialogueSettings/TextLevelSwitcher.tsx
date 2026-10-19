import type { AiDialogueCefrLevel } from '@/entities/aiDialogue/repository/AiDialogueRepository'
import Switcher from '@/shared/ui/Switcher/Switcher'

const textLevels = ['A1', 'A2', 'B1', 'B2', 'Any'] as const

export type AiDialogueTextLevel = AiDialogueCefrLevel | 'Any'

type TextLevelSwitcherProps = {
	textLevel: AiDialogueTextLevel
	onTextLevelChange: (level: AiDialogueTextLevel) => void
	disabled?: boolean
}

function TextLevelSwitcher({ textLevel, onTextLevelChange, disabled }: TextLevelSwitcherProps) {
	return (
		<Switcher
			label='Language level:'
			type='fit'
			size='small'
			orientation='horizontal'
			disabled={disabled}
			items={textLevels.map((level) => ({
				text: level,
				isCurrent: textLevel === level,
				onClick: () => onTextLevelChange(level),
			}))}
		/>
	)
}

export default TextLevelSwitcher
