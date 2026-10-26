import TextLevelSwitcher from '@/entities/aiDialogue/ui/TextLevelSwitcher'
import LabelWithField from '@/shared/ui/formRelated/LabelWithField/LabelWithField'
import LanguageSwitch from '@/shared/ui/LanguageSwitch/LanguageSwitch'
import { practiceLanguages, type useStartDialogueOptions } from '../../fn/useStartDialogueOptions'

type Props = {
	settings: ReturnType<typeof useStartDialogueOptions>
	disabled: boolean
}

export default function StartDialogueSettings({ settings, disabled }: Props) {
	return (
		<fieldset className='start-dialogue-modal__settings' disabled={disabled} aria-label='Настройки диалога'>
			<LabelWithField label='Язык практики'>
				<LanguageSwitch
					languages={practiceLanguages}
					currentLang={settings.practiceLanguage}
					onChange={settings.setPracticeLanguage}
				/>
			</LabelWithField>
			<TextLevelSwitcher
				textLevel={settings.textLevel}
				onTextLevelChange={settings.setTextLevel}
				disabled={disabled}
				size='medium'
				description='Можно изменить во время разговора'
			/>
		</fieldset>
	)
}
