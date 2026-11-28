import { useTranslations } from 'next-intl'
import ContentHeaderWithChildren from '@/shared/ui/content/ContentHeaderWithChildren/ContentHeaderWithChildren'
import ContentList from '@/shared/ui/content/ContentList/ContentList'
import type { ScenarioCardConfig } from '../../fn/getScenarioGroupsConfig'

type Props = Pick<ScenarioCardConfig, 'conversationIdeas'>

export default function ScenarioConversationIdeas({ conversationIdeas }: Props) {
	const t = useTranslations('aiDialogueScenariosList.startModal')

	if (conversationIdeas.length === 0) {
		return null
	}

	return (
		<ContentHeaderWithChildren title={t('conversationIdeas')} hTag={5}>
			<ContentList size='small'>
				{conversationIdeas.map((idea) => (
					<li key={idea}>{idea}</li>
				))}
			</ContentList>
		</ContentHeaderWithChildren>
	)
}
