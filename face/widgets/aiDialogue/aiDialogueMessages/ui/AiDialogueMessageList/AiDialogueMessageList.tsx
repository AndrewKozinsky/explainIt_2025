import { useTranslations } from 'next-intl'
import type { AiDialogueVisualsModel } from '@/entities/aiDialogue/repository/AiDialogueRepository'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import type { DialogueServerMessage } from '@/widgets/aiDialogue/aiDialogueMessages/types/aiDialogueMessage'
import type { AiDialogueWordSelectHandler } from '@/widgets/aiDialogue/aiDialogueMessages/types/aiDialogueUi'
import AiDialogMessageRouter from '@/widgets/aiDialogue/aiDialogueMessages/ui/AiDialogMessageRouter/AiDialogMessageRouter'
import { useAiDialogueStore } from '_pages/aiDialogue/aiDialogueStore'
import { useDialogueMode } from '../DialogueModeContext'
import PendingAnswerMessage from '../messages/PendingAnswerMessage/PendingAnswerMessage'
import { DialogueVisualsProvider } from '../visuals/DialogueVisualsContext'
import './AiDialogueMessageList.scss'

type AiDialogueMessageListProps = {
	messages: DialogueServerMessage[]
	onWordSelect: AiDialogueWordSelectHandler
	onMessageSelect: (messageId: number) => void
	selectedMessageId: number | null
	reviewOpen: boolean
	visuals?: AiDialogueVisualsModel
	refreshVisuals: () => void
	recoverImage: (assetKey: string) => void
}

/**
 * Сохранённые сообщения и индикатор ожидания фонового ответа.
 */
function AiDialogueMessageList({
	messages,
	onWordSelect,
	onMessageSelect,
	selectedMessageId,
	reviewOpen,
	visuals,
	refreshVisuals,
	recoverImage,
}: AiDialogueMessageListProps) {
	const mode = useDialogueMode()
	const t = useTranslations('aiDialoguePage.messageReview')

	const savedMessages = messages.map(({ id, payload }) => {
		const isReviewOpen = selectedMessageId === id && reviewOpen
		const reviews = payload.type === 'userActions' ? (payload.textReview ?? []) : []
		const issueCount = reviews.reduce(
			(count, { analysis }) => count + analysis.critical.length + analysis.suggestions.length,
			0,
		)

		const content = (
			<AiDialogMessageRouter
				key={id}
				messageId={id}
				event={payload}
				reserveSceneSpace={payload.type === 'sceneUpdate' && Boolean(payload.visualDescription)}
				onWordSelect={onWordSelect}
				reviewButton={
					mode === 'practice' &&
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
			</div>
		)
	})

	return (
		<DialogueVisualsProvider visuals={visuals} refreshVisuals={refreshVisuals} recoverImage={recoverImage}>
			<div className='ai-dialogue-message-list'>
				{savedMessages}

				<DialoguePendingAnswer />
			</div>
		</DialogueVisualsProvider>
	)
}

function DialoguePendingAnswer() {
	const isGenerating = useAiDialogueStore((state) => state.isGenerating)
	return isGenerating ? <PendingAnswerMessage /> : null
}

export default AiDialogueMessageList
