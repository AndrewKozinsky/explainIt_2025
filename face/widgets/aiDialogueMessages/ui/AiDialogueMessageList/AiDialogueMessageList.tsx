import cn from 'classnames'
import { useTranslations } from 'next-intl'
import type { AiDialogueVisualsModel } from '@/entities/aiDialogue/repository/AiDialogueRepository'
import { MessagesIcon } from '@/shared/ui/icons/mainPage/MessagesIcon'
import type { DialogueServerMessage } from '@/widgets/aiDialogueMessages/types/aiDialogueMessage'
import type { AiDialoguePreviewEvent } from '@/widgets/aiDialogueMessages/types/aiDialoguePreview'
import type { AiDialogueWordSelectHandler } from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import AiDialogMessageRouter from '@/widgets/aiDialogueMessages/ui/AiDialogMessageRouter/AiDialogMessageRouter'
import AiDialogueMessageReview from '../AiDialogueMessageReview/AiDialogueMessageReview'
import PendingAnswerMessage from '../messages/PendingAnswerMessage/PendingAnswerMessage'
import { DialogueVisualsProvider } from '../visuals/DialogueVisualsContext'
import './AiDialogueMessageList.scss'

type AiDialogueMessageListProps = {
	messages: DialogueServerMessage[]
	preview: AiDialoguePreviewEvent[]
	isGenerating: boolean
	onWordSelect: AiDialogueWordSelectHandler
	onMessageSelect: (messageId: number) => void
	selectedMessageId: number | null
	reviewOpen: boolean
	visuals?: AiDialogueVisualsModel
	refreshVisuals: () => void
	recoverImage: (assetKey: string) => void
}

/**
 * Список сообщений диалога: сохранённые сообщения + частичные события текущего
 * хода (превью). Пока генерация идёт и превью пусто — показывает плейсхолдер.
 */
function AiDialogueMessageList({
	messages,
	preview,
	isGenerating,
	onWordSelect,
	onMessageSelect,
	selectedMessageId,
	reviewOpen,
	visuals,
	refreshVisuals,
	recoverImage,
}: AiDialogueMessageListProps) {
	const t = useTranslations('aiDialoguePage.messageReview')

	const savedMessages = messages.map(({ id, payload }) => {
		const content = (
			<AiDialogMessageRouter
				key={id}
				messageId={id}
				event={payload}
				reserveSceneSpace={payload.type === 'sceneUpdate' && Boolean(payload.visualDescription)}
				onWordSelect={onWordSelect}
			/>
		)

		if (payload.type !== 'userActions') return content

		const isSelected = selectedMessageId === id
		const isReviewOpen = isSelected && reviewOpen
		const hasIssues = payload.textReview.some(
			({ analysis }) => analysis.critical.length || analysis.suggestions.length,
		)
		const reviewLabel = t(hasIssues ? 'openWithIssues' : 'open')

		return (
			<div className='ai-dialogue-user-message-row' key={id}>
				<div
					className={cn(
						'ai-dialogue-user-message-row__message',
						isSelected && 'ai-dialogue-user-message-row__message--selected',
					)}
					onClick={(event) => {
						if (
							event.target instanceof Element &&
							!event.target.closest('button, a') &&
							!window.getSelection()?.toString()
						) {
							onMessageSelect(id)
						}
					}}
				>
					{content}
					<button
						type='button'
						className={cn(
							'ai-dialogue-user-message-row__review-button',
							hasIssues && 'ai-dialogue-user-message-row__review-button--with-issues',
						)}
						aria-label={reviewLabel}
						aria-pressed={isReviewOpen}
						title={reviewLabel}
						onClick={() => onMessageSelect(id)}
					>
						<span aria-hidden='true'>
							<MessagesIcon />
						</span>
					</button>
				</div>
				{isReviewOpen && (
					<div className='ai-dialogue-user-message-row__inline-review'>
						<AiDialogueMessageReview message={payload} />
					</div>
				)}
			</div>
		)
	})

	const previewMessages = preview.map((event, index) => (
		<AiDialogMessageRouter
			key={`preview-${index}`}
			event={event}
			previewEventIndex={index}
			reserveSceneSpace
			onWordSelect={onWordSelect}
		/>
	))

	return (
		<DialogueVisualsProvider visuals={visuals} refreshVisuals={refreshVisuals} recoverImage={recoverImage}>
			<div className='ai-dialogue-message-list'>
				{savedMessages}

				{isGenerating && preview.length === 0 && <PendingAnswerMessage />}
				{previewMessages}
			</div>
		</DialogueVisualsProvider>
	)
}

export default AiDialogueMessageList
