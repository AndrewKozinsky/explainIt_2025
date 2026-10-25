import { aiDialogueScenarioConfig } from '@/entities/aiDialogueScenario/lib/aiDialogueScenarioConfig'
import MediaCardButton from '@/entities/mediaCard/MediaCard/MediaCardButton'
import Spinner from '@/shared/ui/Spinner/Spinner'
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
			onClick={() => onScenarioClick(scenario.id)}
			coverOverlay={creatingScenarioId === scenario.id ? <CreationIndicator /> : undefined}
		/>
	)
}

function CreationIndicator() {
	return (
		<span className='public-scenario-card__pending' role='status' aria-label='Создаю диалог'>
			<Spinner size='small' />
		</span>
	)
}
