import type { UserMessagePartCheck } from '@/entities/aiDialogue/messageCheck/userMessageCheckTypes'
import StyledMarkdown from '@/shared/ui/StyledMarkdown/StyledMarkdown'
import './AiDialogueUserMessageIssues.scss'

type Props = {
	analysis: UserMessagePartCheck
	criticalLabel: string
	suggestionsLabel: string
}

export default function AiDialogueUserMessageIssues({ analysis, criticalLabel, suggestionsLabel }: Props) {
	const { critical, suggestions } = analysis
	if (!critical.length && !suggestions.length) return null

	return (
		<div className='ai-dialogue-user-message-issues'>
			{critical.length > 0 && (
				<ol className='ai-dialogue-user-message-issues__critical' aria-label={criticalLabel}>
					{critical.map((issue, index) => (
						<li className='ai-dialogue-user-message-issues__issue' key={index}>
							<div className='ai-dialogue-user-message-issues__issue-content'>
								<div
									className='ai-dialogue-user-message-issues__error-header'
									role='heading'
									aria-level={3}
								>
									<StyledMarkdown content={issue.title} />
								</div>
								<StyledMarkdown
									className='ai-dialogue-user-message-issues__error-sentence'
									content={issue.sentenceMarkdown}
								/>
								<StyledMarkdown content={issue.explanationMarkdown} />
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
