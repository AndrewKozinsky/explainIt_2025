'use client'

import { useQuery } from '@tanstack/react-query'
import { aiDialogueQueries } from '@/entities/aiDialogue/AiDialogueQueryFacade'
import { aiDialogueScenarioQueries } from '@/entities/aiDialogueScenario/AiDialogueScenarioQueryFacade'
import { useUser } from '@/shared/api/auth/UserProvider'
import Header from '@/shared/ui/Header/Header'
import MediaPageContentTabs from '@/shared/ui/media/MediaPageContentTabs/MediaPageContentTabs'
import MediaPageContentWrapper from '@/shared/ui/media/MediaPageContentWrapper/MediaPageContentWrapper'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { pageUrls } from '@/shared/utils/pageUrls'
import UserAiDialoguesList from '@/widgets/aiDialogue/UserAiDialoguesList/UserAiDialoguesList'
import PublicAiDialogueScenariosList from '@/widgets/aiDialogueScenario/PublicAiDialogueScenariosList/PublicAiDialogueScenariosList'
import { useAiDialogueScenariosTabs } from './fn/useAiDialogueScenariosTabs'
import './AiDialoguesPage.scss'

export default function AiDialoguesPage() {
	const { data: scenarios } = useQuery(aiDialogueScenarioQueries.getAiDialogueScenarios())

	const user = useUser()
	const { data: dialogues } = useQuery({
		...aiDialogueQueries.getUserDialogues(),
		enabled: !!user,
	})

	const { defaultTab, onTabChange } = useAiDialogueScenariosTabs()

	return (
		<MediaPageContentWrapper breadCrumbs={<BreadCrumbs items={[]} />} header={pageUrls.aiDialogues.name}>
			<div className='ai-dialogues-page'>
				<div className='ai-dialogues-page__part'>
					<Header hTag={3}>Сценарии</Header>
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
				</div>
				{user && (
					<div className='ai-dialogues-page__part'>
						<Header hTag={3}>История диалогов</Header>
						{dialogues && <UserAiDialoguesList dialogues={dialogues} />}
					</div>
				)}
			</div>
		</MediaPageContentWrapper>
	)
}
