import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import CheckButtonIcon from '@/shared/ui/icons/buttonIcons/standard/CheckButtonIcon'
import AiDialogueUserMessageIssues from '../AiDialogueUserMessageIssues/AiDialogueUserMessageIssues'
import { getReviewIssues, type ReviewHighlight } from './getReviewIssues'
import type { UserActionsEvent } from '../../types/aiDialogueMessage'
import './AiDialogueMessageReview.scss'

export default function AiDialogueMessageReview({
	message,
	language,
}: {
	message: UserActionsEvent | null
	language: string
}) {
	const t = useTranslations('aiDialoguePage')
	const tParts = useTranslations('aiDialogueForm.parts')
	const parts = message?.textReview?.map((review, index) => ({ ...message.actions[index], review, index }))

	return (
		<section className='ai-dialogue-message-review' aria-label={t('tabs.message')}>
			{!parts ? (
				<p className='ai-dialogue-message-review__empty'>{t('messageReview.empty')}</p>
			) : (
				(['speech', 'action'] as const).map((type) => {
					const group = parts.filter((part) => part.type === type)
					if (group.length === 0) return null

					return (
						<div className='ai-dialogue-message-review__group' key={type}>
							<h2 className='ai-dialogue-message-review__heading'>{tParts(type)}</h2>
							{group.map(({ index, content, translation, review }) => (
								<ReviewPart
									key={index}
									content={content}
									translation={translation}
									review={review}
									language={language}
								/>
							))}
						</div>
					)
				})
			)}
		</section>
	)
}

function ReviewPart({
	content,
	translation,
	review: { originalText, analysis },
	language,
}: {
	content: string
	translation?: string
	review: NonNullable<UserActionsEvent['textReview']>[number]
	language: string
}) {
	const t = useTranslations('aiDialoguePage.messageReview')
	const [hoveredIssue, setHoveredIssue] = useState<number | null>(null)
	const [focusedIssue, setFocusedIssue] = useState<number | null>(null)

	const critical = useMemo(
		() => getReviewIssues(originalText, content, analysis.critical, language),
		[originalText, content, analysis.critical, language],
	)

	const activeIssue = hoveredIssue ?? focusedIssue
	const highlight = activeIssue === null ? null : critical[activeIssue]?.highlight

	return (
		<div className='ai-dialogue-message-review__part'>
			<div>
				<p className='ai-dialogue-message-review__label'>{t('original')}</p>
				<p className='ai-dialogue-message-review__text'>
					{highlight ? <HighlightedAnswer text={originalText} highlight={highlight} /> : originalText}
					{critical.length === 0 && analysis.suggestions.length === 0 && (
						<span className='ai-dialogue-message-review__check' role='img' aria-label={t('noCorrections')}>
							<CheckButtonIcon />
						</span>
					)}
				</p>
			</div>
			<AiDialogueUserMessageIssues
				critical={critical}
				suggestions={analysis.suggestions}
				criticalLabel={t('critical')}
				suggestionsLabel={t('suggestions')}
				onHover={setHoveredIssue}
				onFocus={setFocusedIssue}
			/>
			{content !== originalText && (
				<div>
					<p className='ai-dialogue-message-review__label'>{t('corrected')}</p>
					<p className='ai-dialogue-message-review__text'>{content}</p>
					{translation && <p className='ai-dialogue-message-review__translation'>{translation}</p>}
				</div>
			)}
		</div>
	)
}

function HighlightedAnswer({ text, highlight }: { text: string; highlight: ReviewHighlight }) {
	const { sentenceStart, sentenceEnd, fragmentStart, fragmentEnd } = highlight
	return (
		<>
			{text.slice(0, sentenceStart)}
			<mark className='ai-dialogue-message-review__sentence-highlight'>
				{text.slice(sentenceStart, fragmentStart)}
				<span className='ai-dialogue-message-review__fragment-highlight'>
					{text.slice(fragmentStart, fragmentEnd)}
				</span>
				{text.slice(fragmentEnd, sentenceEnd)}
			</mark>
			{text.slice(sentenceEnd)}
		</>
	)
}
