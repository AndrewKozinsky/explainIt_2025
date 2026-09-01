'use client'

import { useQuery } from '@tanstack/react-query'
import { aiDialogueScenarioQueries } from '@/entities/aiDialogueScenario/AiDialogueScenarioQueryFacade'
import MediaPageContentTabs from '@/shared/ui/media/MediaPageContentTabs/MediaPageContentTabs'
import MediaPageContentWrapper from '@/shared/ui/media/MediaPageContentWrapper/MediaPageContentWrapper'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { pageUrls } from '@/shared/utils/pageUrls'
import PublicAiDialogueScenariosList from '@/widgets/aiDialogueScenario/PublicAiDialogueScenariosList/PublicAiDialogueScenariosList'
import { useAiDialogueScenariosPageTabs } from './fn/useAiDialogueScenariosPageTabs'

export default function AiDialogueScenariosPage() {
	const { data: scenarios } = useQuery(aiDialogueScenarioQueries.getAiDialogueScenarios())

	const { defaultTab, onTabChange } = useAiDialogueScenariosPageTabs()

	return (
		<MediaPageContentWrapper breadCrumbs={<BreadCrumbs items={[]} />} header={pageUrls.aiDialogueScenarios.name}>
			<MediaPageContentTabs
				tabs={[
					{
						key: 'library',
						label: 'Библиотека',
						content: <PublicAiDialogueScenariosList scenarios={scenarios ?? []} />,
					},
					{
						key: 'private',
						label: 'Мои сценарии',
						content: null,
					},
				]}
				defaultTab={defaultTab}
				onTabChange={onTabChange}
			/>
		</MediaPageContentWrapper>
	)
}
