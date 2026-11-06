import { useTranslations } from 'next-intl'
import MediaCardButton from '@/entities/mediaCard/MediaCard/MediaCardButton'
import type { ScenarioCardConfig } from '../../fn/getScenarioGroupsConfig'
import './PublicScenarioCard.scss'

type Props = {
	scenario: ScenarioCardConfig
	creatingScenarioId: number | null
	onScenarioClick: (scenarioId: number) => void
}

export default function PublicScenarioCard({ scenario, creatingScenarioId, onScenarioClick }: Props) {
	const t = useTranslations('aiDialogueScenariosList')

	return (
		<MediaCardButton
			title={scenario.title}
			subTitle={scenario.description}
			coverUrl={scenario.coverUrl}
			defaultMediaName={t('emptyScenarioName')}
			extraClass='public-scenario-card'
			aria-label={scenario.title}
			disabled={creatingScenarioId !== null}
			loading={creatingScenarioId === scenario.id}
			loadingLabel={t('creatingDialogue')}
			onClick={() => onScenarioClick(scenario.id)}
		/>
	)
}
