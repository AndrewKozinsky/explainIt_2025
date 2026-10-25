import { useId } from 'react'
import PublicScenarioCard from '../PublicScenarioCard/PublicScenarioCard'
import type { ScenarioGroupConfig } from '../../fn/getScenarioGroupsConfig'
import './PublicScenarioGroup.scss'

type Props = {
	group: ScenarioGroupConfig
	creatingScenarioId: number | null
	onScenarioClick: (scenarioId: number) => void
}

export default function PublicScenarioGroup({ group, creatingScenarioId, onScenarioClick }: Props) {
	const headingId = useId()

	return (
		<section className='public-scenario-group' aria-labelledby={headingId}>
			<h3 className='public-scenario-group__heading' id={headingId}>
				{group.title}
				<span className='public-scenario-group__count'>{group.scenarios.length}</span>
			</h3>
			<div className='public-scenario-group__grid'>
				{group.scenarios.map((scenario) => (
					<PublicScenarioCard
						key={scenario.id}
						scenario={scenario}
						creatingScenarioId={creatingScenarioId}
						onScenarioClick={onScenarioClick}
					/>
				))}
			</div>
		</section>
	)
}
