import { useLocale, useTranslations } from 'next-intl'
import ContentHeaderWithChildren from '@/shared/ui/content/ContentHeaderWithChildren/ContentHeaderWithChildren'
import ContentList from '@/shared/ui/content/ContentList/ContentList'
import ContentText from '@/shared/ui/content/ContentText/ContentText'
import ContentWrapper from '@/shared/ui/content/ContentWrapper/ContentWrapper'
import DotSeparator from '@/shared/ui/content/DotSeparator/DotSeparator'
import TranslationFeedback from '@/shared/ui/content/TranslationFeedback/TranslationFeedback'
import TranslationFeedbackError from '@/shared/ui/content/TranslationFeedback/TranslationFeedbackError'
import { getLocalizedLanguageName, type LanguageCode } from '@/shared/utils/languages'
import type { ExamResultEvent } from '@/widgets/aiDialogue/aiDialogueMessages/types/aiDialogueMessage'
import { AiDialogueExamFailedShield } from '@/widgets/aiUserDialogues/ui/AiDialogueExamSummary/AiDialogueExamShields'
import AiDialogueExamMedal from './AiDialogueExamMedal'
import './AiDialogueExamResult.scss'

type Props = {
	result: ExamResultEvent
	languageCode: LanguageCode
	scenarioTitle: string
}

export default function AiDialogueExamResult({ result, languageCode, scenarioTitle }: Props) {
	const t = useTranslations('aiDialoguePage.exam')
	const tStatus = useTranslations('userAiDialogues.card.exam')
	const locale = useLocale()
	const { level, medalUrl, summary, strengths, errors, recommendations } = result
	const passed = level !== 'A0'
	const status = passed ? 'passed' : 'failed'

	return (
		<section className='ai-dialogue-exam-result' aria-label={t('result')}>
			<header className='ai-dialogue-exam-result__header'>
				<div className='ai-dialogue-exam-result__intro'>
					<p className={`ai-dialogue-exam-result__badge ai-dialogue-exam-result__badge--${status}`}>
						{tStatus(`${status}.title`)}
					</p>
					<div className='ai-dialogue-exam-result__meta'>
						<span>{getLocalizedLanguageName(languageCode, locale)}</span>
						<DotSeparator />
						<span>{scenarioTitle}</span>
					</div>
					<h2 className='ai-dialogue-exam-result__title'>
						{passed ? t('achievedLevel', { level }) : t('attemptNotPassed')}
					</h2>
					<p className='ai-dialogue-exam-result__summary'>{summary}</p>
				</div>
				{passed ? (
					<AiDialogueExamMedal url={medalUrl} level={level} />
				) : (
					<div className='ai-dialogue-exam-result__shield'>
						<AiDialogueExamFailedShield />
					</div>
				)}
			</header>
			{strengths.length > 0 && (
				<ContentHeaderWithChildren title={t('strengths')} hTag={4}>
					<ContentList type='checkMarks'>
						{strengths.map((text, index) => (
							<li key={index}>{text}</li>
						))}
					</ContentList>
				</ContentHeaderWithChildren>
			)}
			{errors.length > 0 && (
				<ContentHeaderWithChildren title={t('errors')} hTag={4}>
					<TranslationFeedback className='ai-dialogue-exam-result__feedback'>
						{errors.map((error, index) => (
							<TranslationFeedbackError
								key={index}
								number={index + 1}
								fragment={error.originalText}
								replacement={error.suggestedText}
								explanation={error.explanation}
								strikeFragment={false}
							/>
						))}
					</TranslationFeedback>
				</ContentHeaderWithChildren>
			)}
			{recommendations.length > 0 && (
				<div className='ai-dialogue-exam-result__recommendations'>
					<ContentHeaderWithChildren title={t('recommendations')} hTag={4}>
						<ContentWrapper>
							{recommendations.map((text, index) => (
								<ContentText key={index}>{text}</ContentText>
							))}
						</ContentWrapper>
					</ContentHeaderWithChildren>
				</div>
			)}
		</section>
	)
}
