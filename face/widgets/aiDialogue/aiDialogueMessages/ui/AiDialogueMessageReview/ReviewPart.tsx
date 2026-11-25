import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import ClickableText from '@/shared/ui/ClickableText/ClickableText'
import { segmentText } from '@/shared/ui/ClickableText/fn/textSegments'
import TranslationFeedback from '@/shared/ui/content/TranslationFeedback/TranslationFeedback'
import TranslationFeedbackError from '@/shared/ui/content/TranslationFeedback/TranslationFeedbackError'
import CheckButtonIcon from '@/shared/ui/icons/buttonIcons/standard/CheckButtonIcon'
import StyledMarkdown from '@/shared/ui/StyledMarkdown/StyledMarkdown'
import { getReviewIssues } from './fn/getReviewIssues'
import type { UserActionsEvent } from '../../types/aiDialogueMessage'
import type { AiDialogueWordSelectHandler } from '../../types/aiDialogueUi'

export default function ReviewPart({
	content,
	translation,
	review: { originalText, analysis },
	language,
	onWordSelect,
}: {
	content: string
	translation?: string
	review: NonNullable<UserActionsEvent['textReview']>[number]
	language: string
	onWordSelect: AiDialogueWordSelectHandler
}) {
	const t = useTranslations('aiDialoguePage.messageReview')
	const [hoveredIssue, setHoveredIssue] = useState<number | null>(null)
	const [focusedIssue, setFocusedIssue] = useState<number | null>(null)
	const originalSegments = useMemo(() => segmentText(originalText), [originalText])
	const correctedSegments = useMemo(() => segmentText(content), [content])

	const critical = useMemo(
		() => getReviewIssues(originalText, content, analysis.critical, language),
		[originalText, content, analysis.critical, language],
	)
	const { suggestions } = analysis
	const hasFeedback = critical.length > 0 || suggestions.length > 0

	const activeIssue = hoveredIssue ?? focusedIssue
	const highlight = activeIssue === null ? null : critical[activeIssue]?.highlight
	let highlightedStarts: Set<number> | undefined
	if (highlight) {
		const { fragmentStart, fragmentEnd } = highlight
		const highlightedSegments = originalSegments.filter(
			({ start, text }) => start < fragmentEnd && start + text.length > fragmentStart && text.trim(),
		)
		highlightedStarts = new Set(highlightedSegments.map(({ start }) => start))
	}

	return (
		<div className='ai-dialogue-message-review__part'>
			<div>
				<p className='ai-dialogue-message-review__label'>{t('original')}</p>
				<p className='ai-dialogue-message-review__text'>
					<ClickableText
						segments={originalSegments}
						highlightedStarts={highlightedStarts}
						onWordClick={({ text }) => onWordSelect({ word: text, sentence: originalText })}
					/>
					{!hasFeedback && (
						<span className='ai-dialogue-message-review__check' role='img' aria-label={t('noCorrections')}>
							<CheckButtonIcon />
						</span>
					)}
				</p>
			</div>
			{hasFeedback && (
				<div className='ai-dialogue-message-review__feedback'>
					{critical.length > 0 && (
						<TranslationFeedback aria-label={t('critical')}>
							{critical.map(({ fragment, replacement, explanation, highlight }, index) => (
								<TranslationFeedbackError
									key={index}
									className='ai-dialogue-message-review__issue'
									number={index + 1}
									fragment={fragment}
									replacement={replacement}
									explanation={explanation}
									tabIndex={highlight ? 0 : undefined}
									onMouseEnter={() => setHoveredIssue(index)}
									onMouseLeave={() => setHoveredIssue(null)}
									onFocus={() => setFocusedIssue(index)}
									onBlur={(event) => {
										if (!event.currentTarget.contains(event.relatedTarget)) setFocusedIssue(null)
									}}
								/>
							))}
						</TranslationFeedback>
					)}
					{suggestions.length > 0 && (
						<div className='ai-dialogue-message-review__suggestions' aria-label={t('suggestions')}>
							<h3 className='ai-dialogue-message-review__suggestions-heading'>{t('suggestions')}</h3>
							{suggestions.map(({ explanationMarkdown, example }, index) => (
								<div className='ai-dialogue-message-review__suggestion' key={index}>
									<StyledMarkdown
										className='ai-dialogue-message-review__suggestion-explanation'
										content={explanationMarkdown}
									/>
									<p className='ai-dialogue-message-review__suggestion-example'>{example}</p>
								</div>
							))}
						</div>
					)}
				</div>
			)}
			{content !== originalText && (
				<div>
					<p className='ai-dialogue-message-review__label'>{t('corrected')}</p>
					<p className='ai-dialogue-message-review__text'>
						<ClickableText
							segments={correctedSegments}
							onWordClick={({ text }) => onWordSelect({ word: text, sentence: content })}
						/>
					</p>
					{translation && <p className='ai-dialogue-message-review__translation'>{translation}</p>}
				</div>
			)}
		</div>
	)
}
