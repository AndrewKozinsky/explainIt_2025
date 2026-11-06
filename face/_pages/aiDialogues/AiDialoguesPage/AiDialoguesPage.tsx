'use client'

import { useTranslations } from 'next-intl'
import { useUser } from '@/shared/api/auth/UserProvider'
import Header from '@/shared/ui/Header/Header'
import MediaPageContentWrapper from '@/shared/ui/media/MediaPageContentWrapper/MediaPageContentWrapper'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { pageUrls } from '@/shared/utils/pageUrls'
import PublicAiDialogueScenariosList from '@/widgets/aiDialogueScenario/PublicAiDialogueScenariosList/PublicAiDialogueScenariosList'
import UserAiDialoguesList from '@/widgets/aiUserDialogues/ui/UserAiDialoguesList/UserAiDialoguesList'
import './AiDialoguesPage.scss'

export default function AiDialoguesPage() {
	const tPageUrls = useTranslations('pageUrls')
	const t = useTranslations('aiDialoguesPage')
	const user = useUser()

	return (
		<MediaPageContentWrapper
			breadCrumbs={<BreadCrumbs items={[]} />}
			header={tPageUrls(pageUrls.aiDialogues.nameKey)}
		>
			<div className='ai-dialogues-page'>
				{user && <MyDialogues userId={user.id} />}
				<div className='ai-dialogues-page__part'>
					<Header hTag={2} hStyle={3}>
						{t('scenariosHeader')}
					</Header>
					<PublicAiDialogueScenariosList />
				</div>
			</div>
		</MediaPageContentWrapper>
	)
}

function MyDialogues({ userId }: { userId: number }) {
	const t = useTranslations('aiDialoguesPage')

	return (
		<div className='ai-dialogues-page__part'>
			<Header hTag={3} hStyle={4}>
				{t('myDialoguesHeader')}
			</Header>
			<UserAiDialoguesList userId={userId} />
		</div>
	)
}
