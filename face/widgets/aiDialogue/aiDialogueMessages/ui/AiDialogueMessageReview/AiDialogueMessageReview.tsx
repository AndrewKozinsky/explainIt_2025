import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import ClickableText from '@/shared/ui/ClickableText/ClickableText'
import { segmentText } from '@/shared/ui/ClickableText/fn/textSegments'
import CheckButtonIcon from '@/shared/ui/icons/buttonIcons/standard/CheckButtonIcon'
import AiDialogueUserMessageIssues from '../AiDialogueUserMessageIssues/AiDialogueUserMessageIssues'
import { getReviewIssues } from './getReviewIssues'
import type { UserActionsEvent } from '../../types/aiDialogueMessage'
import type { AiDialogueWordSelectHandler } from '../../types/aiDialogueUi'
import './AiDialogueMessageReview.scss'

export default function AiDialogueMessageReview({
	message,
	language,
	onWordSelect,
}: {
	message: UserActionsEvent | null
	language: string
	onWordSelect: AiDialogueWordSelectHandler
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
									onWordSelect={onWordSelect}
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
