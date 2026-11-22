import { useTranslations } from 'next-intl'
import type { AiDialogueScenarioModel } from '@/entities/aiDialogueScenario/AiDialogueScenarioModel'
import ContentHeaderWithChildren from '@/shared/ui/content/ContentHeaderWithChildren/ContentHeaderWithChildren'
import ContentList from '@/shared/ui/content/ContentList/ContentList'
import ContentText from '@/shared/ui/content/ContentText/ContentText'
import ContentWrapper from '@/shared/ui/content/ContentWrapper/ContentWrapper'

type Props = {
	conversationIdeas: AiDialogueScenarioModel['conversationIdeas']
}

export default function AiDialogueConversationTopics({ conversationIdeas }: Props) {
	const t = useTranslations('aiDialoguePage.conversationTopics')

	return (
		<ContentHeaderWithChildren title={t('title')} hTag={4}>
			<ContentWrapper>
				<ContentText>{t('beYourself')}</ContentText>
				{conversationIdeas.length > 0 && (
					<>
						<ContentText>{t('ideasIntroduction')}</ContentText>
						<ContentList>
							{conversationIdeas.map((idea, index) => (
								<li key={index}>{idea}</li>
							))}
						</ContentList>
					</>
				)}
				<ContentText>{t('ownTopic')}</ContentText>
			</ContentWrapper>
		</ContentHeaderWithChildren>
	)
}
