import { useTranslations } from 'next-intl'
import ReviewPart from './ReviewPart'
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
