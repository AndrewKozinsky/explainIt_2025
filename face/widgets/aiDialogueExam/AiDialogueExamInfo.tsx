import { useTranslations } from 'next-intl'
import type { AiDialogueScenarioModel } from '@/entities/aiDialogueScenario/AiDialogueScenarioModel'
import ContentBordered from '@/shared/ui/content/ContentBordered/ContentBordered'
import ContentHeaderWithChildren from '@/shared/ui/content/ContentHeaderWithChildren/ContentHeaderWithChildren'
import ContentList from '@/shared/ui/content/ContentList/ContentList'
import ContentText from '@/shared/ui/content/ContentText/ContentText'
import ContentWrapper from '@/shared/ui/content/ContentWrapper/ContentWrapper'
import './AiDialogueExamInfo.scss'

type Props = {
	scenario: Pick<AiDialogueScenarioModel, 'title' | 'conversationIdeas'>
}

export default function AiDialogueExamInfo({ scenario }: Props) {
	const t = useTranslations('aiDialoguePage.examInfo')
	const tPage = useTranslations('aiDialoguePage')

	return (
		<div className='ai-dialogue-exam-info'>
			<ContentHeaderWithChildren title={t('title', { scenarioTitle: scenario.title })}>
				<ContentWrapper>
					<ContentText>{t('introduction')}</ContentText>
					<ContentText>{t('realLife')}</ContentText>
					<ContentList>
						<li>{t('speech')}</li>
						<li>{t('translation')}</li>
						<li>{t('corrections')}</li>
					</ContentList>
				</ContentWrapper>
			</ContentHeaderWithChildren>
			<ContentHeaderWithChildren title={t('processTitle')} hTag={4}>
				<ContentWrapper>
					<ContentList>
						<li>{t('detailedAnswers')}</li>
						<li>{t('minimumAnswers', { checkButton: tPage('exam.check') })}</li>
						<li>{t('assessment')}</li>
					</ContentList>
					<ContentBordered>
						<ContentText size='small'>{t('recommendations')}</ContentText>
					</ContentBordered>
				</ContentWrapper>
			</ContentHeaderWithChildren>
			<ContentHeaderWithChildren title={t('topicsTitle')} hTag={4}>
				<ContentWrapper>
					<ContentText>{t('beYourself')}</ContentText>
					{scenario.conversationIdeas.length > 0 && (
						<>
							<ContentText>{t('ideasIntroduction')}</ContentText>
							<ContentList>
								{scenario.conversationIdeas.map((idea, index) => (
									<li key={index}>{idea}</li>
								))}
							</ContentList>
						</>
					)}
					<ContentText>{t('ownTopic')}</ContentText>
				</ContentWrapper>
			</ContentHeaderWithChildren>
		</div>
	)
}
