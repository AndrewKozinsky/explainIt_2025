import Switcher from '@/shared/ui/Switcher/Switcher'

const textLevels = ['A1', 'A2', 'B1', 'B2', 'Any'] as const

export type AiDialogueTextLevel = (typeof textLevels)[number]

type TextLevelSwitcherProps = {
	textLevel: AiDialogueTextLevel
	onTextLevelChange: (level: AiDialogueTextLevel) => void
}

function TextLevelSwitcher({ textLevel, onTextLevelChange }: TextLevelSwitcherProps) {
	return (
		<Switcher
			label='Language level:'
			type='fit'
			orientation='horizontal'
			items={textLevels.map((level) => ({
				text: level,
				isCurrent: textLevel === level,
				onClick: () => onTextLevelChange(level),
			}))}
		/>
	)
}

export default TextLevelSwitcher
