import { useTranslations } from 'next-intl'
import IllustrationStyleSwitcher from '@/entities/aiDialogue/ui/IllustrationStyleSwitcher/IllustrationStyleSwitcher'
import TextLevelSwitcher from '@/entities/aiDialogue/ui/TextLevelSwitcher'
import { aiDialogueScenarioConfig } from '@/entities/aiDialogueScenario/lib/aiDialogueScenarioConfig'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import LabelWithField from '@/shared/ui/formRelated/LabelWithField/LabelWithField'
import TextInput from '@/shared/ui/formRelated/TextInput/TextInput'
import ArrowRightPureButtonIcon from '@/shared/ui/icons/buttonIcons/standard/ArrowRightPureButtonIcon'
import LanguageSwitch from '@/shared/ui/LanguageSwitch/LanguageSwitch'
import Modal from '@/shared/ui/Modal/Modal'
import { type StartDialogueOptions, useStartDialogueOptions } from '../../fn/useStartDialogueOptions'
import ScenarioDescription from './ScenarioDescription'
import ScenarioPracticeHints from './ScenarioPracticeHints'
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
	const t = useTranslations('aiDialogueScenariosList.startModal')
	const settings = useStartDialogueOptions()

	return (
		<Modal isOpen close={onClose} extraClass='start-dialogue-modal'>
			<img src={scenario.coverUrl} alt='' className='start-dialogue-modal__cover' />
			<div className='start-dialogue-modal__content'>
				<ScenarioDescription scenario={scenario} groupTitle={groupTitle} />
				<ScenarioPracticeHints scenario={scenario} />
				<LabelWithField label={t('practiceLanguage')}>
					<LanguageSwitch
						languages={settings.practiceLanguages}
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
					description={t('textLevelDescription')}
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
				<TextInput
					block
					label={t('userScenarioAmendment')}
					maxCharacters={aiDialogueScenarioConfig.userScenarioAmendmentMaxLength}
					currentText={settings.userScenarioAmendment}
					textareaProps={{
						value: settings.userScenarioAmendment,
						onChange: (event) => settings.changeUserScenarioAmendment(event.target.value),
						placeholder: scenario.userScenarioAmendmentHint,
						disabled: loading,
						rows: 3,
					}}
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
					{t('start')}
				</Button>
			</div>
		</Modal>
	)
}
