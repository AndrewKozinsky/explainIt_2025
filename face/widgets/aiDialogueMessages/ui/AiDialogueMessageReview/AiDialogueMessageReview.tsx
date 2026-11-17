import { useTranslations } from 'next-intl'
import AiDialogueUserMessageIssues from '../AiDialogueUserMessageIssues/AiDialogueUserMessageIssues'
import type { UserActionsEvent } from '../../types/aiDialogueMessage'
import './AiDialogueMessageReview.scss'

export default function AiDialogueMessageReview({ message }: { message: UserActionsEvent | null }) {
	const t = useTranslations('aiDialoguePage')
	const tParts = useTranslations('aiDialogueForm.parts')
	const parts = message?.actions.map((action, index) => ({ ...action, review: message.textReview[index], index }))

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
							{group.map(({ content, review: { originalText, analysis }, index }) => (
								<div className='ai-dialogue-message-review__part' key={index}>
									<div>
										<p className='ai-dialogue-message-review__label'>
											{t('messageReview.original')}
										</p>
										<p className='ai-dialogue-message-review__text'>{originalText}</p>
									</div>
									{analysis.critical.length > 0 || analysis.suggestions.length > 0 ? (
										<AiDialogueUserMessageIssues
											analysis={analysis}
											criticalLabel={t('messageReview.critical')}
											suggestionsLabel={t('messageReview.suggestions')}
											showSuggestionsHeading
										/>
									) : (
										<p className='ai-dialogue-message-review__status'>
											{t('messageReview.noCorrections')}
										</p>
									)}
									{content !== originalText && (
										<div>
											<p className='ai-dialogue-message-review__label'>
												{t('messageReview.corrected')}
											</p>
											<p className='ai-dialogue-message-review__text'>{content}</p>
										</div>
									)}
								</div>
							))}
						</div>
					)
				})
			)}
		</section>
	)
}
