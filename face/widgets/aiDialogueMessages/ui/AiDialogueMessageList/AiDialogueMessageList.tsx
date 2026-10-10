import type { AiDialogueVisualsModel } from '@/entities/aiDialogue/repository/AiDialogueRepository'
import type { DialogueServerMessage } from '@/widgets/aiDialogueMessages/types/aiDialogueMessage'
import type { AiDialoguePreviewEvent } from '@/widgets/aiDialogueMessages/types/aiDialoguePreview'
import type { AiDialogueWordSelectHandler } from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import AiDialogMessageRouter from '@/widgets/aiDialogueMessages/ui/AiDialogMessageRouter/AiDialogMessageRouter'
import PendingAnswerMessage from '../messages/PendingAnswerMessage'
import { DialogueVisualsProvider } from '../visuals/DialogueVisualsContext'
import './AiDialogueMessageList.scss'

type AiDialogueMessageListProps = {
	messages: DialogueServerMessage[]
	preview: AiDialoguePreviewEvent[]
	isGenerating: boolean
	onWordSelect: AiDialogueWordSelectHandler
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
	visuals,
	refreshVisuals,
	recoverImage,
}: AiDialogueMessageListProps) {
	const savedMessages = messages.map((message) => (
		<AiDialogMessageRouter
			key={message.id}
			messageId={message.id}
			event={message.payload}
			reserveSceneSpace={message.payload.type === 'sceneUpdate' && Boolean(message.payload.visualDescription)}
			onWordSelect={onWordSelect}
		/>
	))

	const previewMessages = preview.map((event, index) => (
		<AiDialogMessageRouter key={`preview-${index}`} event={event} reserveSceneSpace onWordSelect={onWordSelect} />
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
