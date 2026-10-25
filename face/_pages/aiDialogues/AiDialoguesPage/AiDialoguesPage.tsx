'use client'

import { useUser } from '@/shared/api/auth/UserProvider'
import Header from '@/shared/ui/Header/Header'
import MediaPageContentWrapper from '@/shared/ui/media/MediaPageContentWrapper/MediaPageContentWrapper'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { pageUrls } from '@/shared/utils/pageUrls'
import PublicAiDialogueScenariosList from '@/widgets/aiDialogueScenario/PublicAiDialogueScenariosList/PublicAiDialogueScenariosList'
import UserAiDialoguesList from '@/widgets/aiUserDialogues/ui/UserAiDialoguesList/UserAiDialoguesList'
import './AiDialoguesPage.scss'

export default function AiDialoguesPage() {
	const user = useUser()

	return (
		<MediaPageContentWrapper breadCrumbs={<BreadCrumbs items={[]} />} header={pageUrls.aiDialogues.name}>
			<div className='ai-dialogues-page'>
				{user && <MyDialogues userId={user.id} />}
				<div className='ai-dialogues-page__part'>
					<Header hTag={2} hStyle={3}>
						Сценарии диалогов
					</Header>
					<PublicAiDialogueScenariosList />
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
