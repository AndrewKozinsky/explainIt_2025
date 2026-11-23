import type { UserMessageSuggestion } from '@/entities/aiDialogue/messageCheck/userMessageCheckTypes'
import StyledMarkdown from '@/shared/ui/StyledMarkdown/StyledMarkdown'
import type { ReviewIssue } from '../AiDialogueMessageReview/getReviewIssues'
import './AiDialogueUserMessageIssues.scss'

type Props = {
	critical: ReviewIssue[]
	suggestions: UserMessageSuggestion[]
	criticalLabel: string
	suggestionsLabel: string
	onHover: (index: number | null) => void
	onFocus: (index: number | null) => void
}

export default function AiDialogueUserMessageIssues({
	critical,
	suggestions,
	criticalLabel,
	suggestionsLabel,
	onHover,
	onFocus,
}: Props) {
	if (!critical.length && !suggestions.length) return null

	return (
		<div className='ai-dialogue-user-message-issues'>
			{critical.length > 0 && (
				<ol className='ai-dialogue-user-message-issues__critical' role='list' aria-label={criticalLabel}>
					{critical.map((issue, index) => (
						<li
							className='ai-dialogue-user-message-issues__issue'
							key={index}
							role='listitem'
							tabIndex={issue.highlight ? 0 : undefined}
							onMouseEnter={() => onHover(index)}
							onMouseLeave={() => onHover(null)}
							onFocus={() => onFocus(index)}
							onBlur={(event) => {
								if (!event.currentTarget.contains(event.relatedTarget)) onFocus(null)
							}}
						>
							<span className='ai-dialogue-user-message-issues__number' aria-hidden='true'>
								{String(index + 1).padStart(2, '0')}
							</span>
							<div className='ai-dialogue-user-message-issues__issue-content'>
								<p className='ai-dialogue-user-message-issues__correction'>
									{issue.replacement ? <s>{issue.fragment}</s> : <span>{issue.fragment}</span>}
									{issue.replacement && (
										<>
											{' '}
											<span
												className='ai-dialogue-user-message-issues__arrow-circle'
												aria-hidden='true'
											>
												<span className='ai-dialogue-user-message-issues__arrow'>→</span>
											</span>
											{'\u00a0'}
											<strong>{issue.replacement}</strong>
										</>
									)}
								</p>
								{issue.explanation && (
									<StyledMarkdown
										className='ai-dialogue-user-message-issues__explanation'
										content={issue.explanation}
									/>
								)}
							</div>
						</li>
					))}
				</ol>
			)}
			{suggestions.length > 0 && (
				<div className='ai-dialogue-user-message-issues__suggestions' aria-label={suggestionsLabel}>
					<h3 className='ai-dialogue-user-message-issues__suggestions-heading'>{suggestionsLabel}</h3>
					{suggestions.map((item, index) => (
						<div className='ai-dialogue-user-message-issues__suggestion' key={index}>
							<StyledMarkdown
								className='ai-dialogue-user-message-issues__suggestion-top'
								content={item.explanationMarkdown}
							/>
							<p className='ai-dialogue-user-message-issues__suggestion-bottom'>{item.example}</p>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
