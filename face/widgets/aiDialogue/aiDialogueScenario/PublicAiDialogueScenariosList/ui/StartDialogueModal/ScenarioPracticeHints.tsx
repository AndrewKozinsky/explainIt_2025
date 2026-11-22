import { useTranslations } from 'next-intl'
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
		<div className='start-dialogue-modal__hints'>
			{hasConversationIdeas && (
				<section className='start-dialogue-modal__hint'>
					<h3 className='start-dialogue-modal__hint-title'>{t('conversationIdeas')}</h3>
					<ul className='start-dialogue-modal__ideas'>
						{scenario.conversationIdeas.map((idea) => (
							<li key={idea} className='start-dialogue-modal__idea'>
								{idea}
							</li>
						))}
					</ul>
				</section>
			)}
			{hasTrainedSkills && (
				<section className='start-dialogue-modal__hint'>
					<h3 className='start-dialogue-modal__hint-title'>{t('trainedSkills')}</h3>
					<p className='start-dialogue-modal__hint-text'>{scenario.trainedSkills}</p>
				</section>
			)}
		</div>
	)
}
