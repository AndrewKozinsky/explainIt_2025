import type { ScenarioCardConfig } from '../../fn/getScenarioGroupsConfig'

type Props = {
	scenario: ScenarioCardConfig
	groupTitle: string
}

export default function ScenarioDescription({ scenario, groupTitle }: Props) {
	return (
		<div className='start-dialogue-modal__description'>
			<p className='start-dialogue-modal__group'>{groupTitle}</p>
			<h2 className='start-dialogue-modal__title'>{scenario.title}</h2>
			<p className='start-dialogue-modal__summary'>{scenario.description}</p>
		</div>
	)
}
