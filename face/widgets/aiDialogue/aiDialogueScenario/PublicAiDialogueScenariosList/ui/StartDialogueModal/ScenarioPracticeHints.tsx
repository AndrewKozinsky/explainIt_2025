import { useTranslations } from 'next-intl'
import ContentHeaderWithChildren from '@/shared/ui/content/ContentHeaderWithChildren/ContentHeaderWithChildren'
import ContentList from '@/shared/ui/content/ContentList/ContentList'
import ContentText from '@/shared/ui/content/ContentText/ContentText'
import type { ScenarioCardConfig } from '../../fn/getScenarioGroupsConfig'

type Props = {
	scenario: ScenarioCardConfig
}

/** Блоки «Идеи для диалога» и «Что тренирует»; пустой блок не выводится. */
export default function ScenarioPracticeHints({ scenario }: Props) {
	const t = useTranslations('aiDialogueScenariosList.startModal')
	const hasTrainedSkills = scenario.trainedSkills.trim() !== ''
	const hasConversationIdeas = scenario.conversationIdeas.length > 0

	if (!hasTrainedSkills && !hasConversationIdeas) return null

	return (
		<>
			{hasConversationIdeas && (
				<ContentHeaderWithChildren title={t('conversationIdeas')} hTag={5}>
					<ContentList size='small'>
						{scenario.conversationIdeas.map((idea) => (
							<li key={idea}>{idea}</li>
						))}
					</ContentList>
				</ContentHeaderWithChildren>
			)}
			{hasTrainedSkills && (
				<ContentHeaderWithChildren title={t('trainedSkills')} hTag={5}>
					<ContentText size='small'>{scenario.trainedSkills}</ContentText>
				</ContentHeaderWithChildren>
			)}
		</>
	)
}
