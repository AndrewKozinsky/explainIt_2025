import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import ArrowRightPureButtonIcon from '@/shared/ui/icons/buttonIcons/standard/ArrowRightPureButtonIcon'
import Modal from '@/shared/ui/Modal/Modal'
import { type StartDialogueOptions, useStartDialogueOptions } from '../../fn/useStartDialogueOptions'
import ScenarioDescription from './ScenarioDescription'
import StartDialogueSettings from './StartDialogueSettings'
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
				<StartDialogueSettings settings={settings} disabled={loading} />
				<Button
					theme='accent'
					icon={<ArrowRightPureButtonIcon />}
					size='big'
					loading={loading}
					onClick={() => onStart(settings.options)}
				>
					Начать диалог
				</Button>
			</div>
		</Modal>
	)
}
