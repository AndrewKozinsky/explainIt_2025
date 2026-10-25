'use client'

import { useQuery } from '@tanstack/react-query'
import { aiDialogueScenarioQueries } from '@/entities/aiDialogueScenario/AiDialogueScenarioQueryFacade'
import { useUser } from '@/shared/api/auth/UserProvider'
import Header from '@/shared/ui/Header/Header'
import MediaPageContentWrapper from '@/shared/ui/media/MediaPageContentWrapper/MediaPageContentWrapper'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { pageUrls } from '@/shared/utils/pageUrls'
import PublicAiDialogueScenariosList from '@/widgets/aiDialogueScenario/PublicAiDialogueScenariosList/PublicAiDialogueScenariosList'
import UserAiDialoguesList from '@/widgets/aiUserDialogues/ui/UserAiDialoguesList/UserAiDialoguesList'
import './AiDialoguesPage.scss'

export default function AiDialoguesPage() {
	const { data: scenarios } = useQuery(aiDialogueScenarioQueries.getAiDialogueScenarios())

	const user = useUser()

	return (
		<MediaPageContentWrapper breadCrumbs={<BreadCrumbs items={[]} />} header={pageUrls.aiDialogues.name}>
			<div className='ai-dialogues-page'>
				{user && <MyDialogues userId={user.id} />}
				<div className='ai-dialogues-page__part'>
					<Header hTag={3}>Сценарии</Header>
					<PublicAiDialogueScenariosList scenarios={scenarios ?? []} />
				</div>
			</div>
		</MediaPageContentWrapper>
	)
}

function MyDialogues({ userId }: { userId: number }) {
	return (
		<div className='ai-dialogues-page__part'>
			<Header hTag={3} hStyle={4}>
				Мои диалоги
			</Header>
			<UserAiDialoguesList userId={userId} />
		</div>
	)
}
