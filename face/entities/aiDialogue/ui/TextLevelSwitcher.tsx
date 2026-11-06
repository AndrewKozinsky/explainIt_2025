import { useTranslations } from 'next-intl'
import type { AiDialogueCefrLevel } from '@/entities/aiDialogue/repository/AiDialogueRepository'
import LabelWithField from '@/shared/ui/formRelated/LabelWithField/LabelWithField'
import Switcher from '@/shared/ui/Switcher/Switcher'

export const textLevels = ['A1', 'A2', 'B1', 'B2', 'Any'] as const

export type AiDialogueTextLevel = AiDialogueCefrLevel | 'Any'

type TextLevelSwitcherProps = {
	textLevel: AiDialogueTextLevel
	onTextLevelChange: (level: AiDialogueTextLevel) => void
	disabled?: boolean
	size?: 'small' | 'medium' | 'big'
	description?: string
}

function TextLevelSwitcher({
	textLevel,
	onTextLevelChange,
	disabled,
	size = 'small',
	description,
}: TextLevelSwitcherProps) {
	const t = useTranslations('aiDialogue.textLevelSwitcher')

	return (
		<LabelWithField label={t('label')} description={description}>
			<Switcher
				type='fit'
				size={size}
				orientation='horizontal'
				disabled={disabled}
				items={textLevels.map((level) => ({
					text: level === 'Any' ? t('anyLevel') : level,
					isCurrent: textLevel === level,
					onClick: () => onTextLevelChange(level),
				}))}
			/>
		</LabelWithField>
	)
}

export default TextLevelSwitcher
