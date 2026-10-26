import { aiDialogueScenarioConfig } from '@/entities/aiDialogueScenario/lib/aiDialogueScenarioConfig'
import MediaCardButton from '@/entities/mediaCard/MediaCard/MediaCardButton'
import type { ScenarioCardConfig } from '../../fn/getScenarioGroupsConfig'
import './PublicScenarioCard.scss'

type Props = {
	scenario: ScenarioCardConfig
	creatingScenarioId: number | null
	onScenarioClick: (scenarioId: number) => void
}

export default function PublicScenarioCard({ scenario, creatingScenarioId, onScenarioClick }: Props) {
	return (
		<MediaCardButton
			title={scenario.title}
			subTitle={scenario.description}
			coverUrl={scenario.coverUrl}
			defaultMediaName={aiDialogueScenarioConfig.emptyScenarioName}
			extraClass='public-scenario-card'
			aria-label={scenario.title}
			disabled={creatingScenarioId !== null}
			loading={creatingScenarioId === scenario.id}
			loadingLabel='Создаю диалог'
			onClick={() => onScenarioClick(scenario.id)}
		/>
	)
}
