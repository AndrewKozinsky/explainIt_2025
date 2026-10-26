import IllustrationStyleSwitcher from '@/entities/aiDialogue/ui/IllustrationStyleSwitcher/IllustrationStyleSwitcher'
import TextLevelSwitcher from '@/entities/aiDialogue/ui/TextLevelSwitcher'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import LabelWithField from '@/shared/ui/formRelated/LabelWithField/LabelWithField'
import ArrowRightPureButtonIcon from '@/shared/ui/icons/buttonIcons/standard/ArrowRightPureButtonIcon'
import LanguageSwitch from '@/shared/ui/LanguageSwitch/LanguageSwitch'
import Modal from '@/shared/ui/Modal/Modal'
import { practiceLanguages, type StartDialogueOptions, useStartDialogueOptions } from '../../fn/useStartDialogueOptions'
import ScenarioDescription from './ScenarioDescription'
import type { ScenarioCardConfig } from '../../fn/getScenarioGroupsConfig'
import './StartDialogueModal.scss'

type Props = {
	scenario: ScenarioCardConfig
	groupTitle: string
	loading: boolean
	onClose: () => void
	onStart: (options: StartDialogueOptions) => void
}

export default function StartDialogueModal({ scenario, groupTitle, loading, onClose, onStart }: Props) {
	const settings = useStartDialogueOptions()

	return (
		<Modal isOpen close={onClose} extraClass='start-dialogue-modal'>
			<img src={scenario.coverUrl} alt='' className='start-dialogue-modal__cover' />
			<div className='start-dialogue-modal__content'>
				<ScenarioDescription scenario={scenario} groupTitle={groupTitle} />
				<LabelWithField label='Язык практики'>
					<LanguageSwitch
						languages={practiceLanguages}
						currentLang={settings.practiceLanguage}
						onChange={settings.changePracticeLanguage}
						disabled={loading}
					/>
				</LabelWithField>
				<TextLevelSwitcher
					textLevel={settings.textLevel}
					onTextLevelChange={settings.changeTextLevel}
					disabled={loading}
					size='medium'
					description='Можно изменить во время разговора'
				/>
				<IllustrationStyleSwitcher
					styles={settings.illustrationStyles.styles}
					selectedStyleId={settings.illustrationStyles.selectedStyleId}
					onChange={settings.illustrationStyles.changeIllustrationStyle}
					disabled={loading}
					isPending={settings.illustrationStyles.isPending}
					isError={settings.illustrationStyles.isError}
					isFetching={settings.illustrationStyles.isFetching}
					onRetry={settings.illustrationStyles.retry}
				/>
				<Button
					theme='accent'
					icon={<ArrowRightPureButtonIcon />}
					size='big'
					loading={loading}
					disabled={!settings.options}
					onClick={() => {
						if (settings.options) onStart(settings.options)
					}}
				>
					Начать диалог
				</Button>
			</div>
		</Modal>
	)
}
