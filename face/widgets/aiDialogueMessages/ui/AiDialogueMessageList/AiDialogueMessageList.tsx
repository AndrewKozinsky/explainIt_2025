import { useTranslations } from 'next-intl'
import type { AiDialogueVisualsModel } from '@/entities/aiDialogue/repository/AiDialogueRepository'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
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
		const isReviewOpen = selectedMessageId === id && reviewOpen
		const issueCount =
			payload.type === 'userActions'
				? payload.textReview.reduce(
						(count, { analysis }) => count + analysis.critical.length + analysis.suggestions.length,
						0,
					)
				: 0

		const content = (
			<AiDialogMessageRouter
				key={id}
				messageId={id}
				event={payload}
				reserveSceneSpace={payload.type === 'sceneUpdate' && Boolean(payload.visualDescription)}
				onWordSelect={onWordSelect}
				reviewButton={
					issueCount > 0 && (
						<Button
							size='small'
							theme={isReviewOpen ? 'accent' : 'outline'}
							extraClass='ai-dialogue-user-message-row__review-button'
							aria-pressed={isReviewOpen}
							disabled={isReviewOpen}
							onClick={() => onMessageSelect(id)}
						>
							{t('issueCount', { count: issueCount })}
						</Button>
					)
				}
			/>
		)

		if (payload.type !== 'userActions') return content

		return (
			<div className='ai-dialogue-user-message-row' key={id}>
				{content}
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
