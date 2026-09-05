import type { DialogueServerMessage } from '@/entities/aiDialogue/types/aiDialogueMessage'
import type { AiDialoguePreviewEvent } from '@/entities/aiDialogue/types/aiDialoguePreview'
import type { AiDialogueWordSelectHandler } from '@/entities/aiDialogue/types/aiDialogueUi'
import AiDialogMessageRouter from '../AiDialogMessageRouter/AiDialogMessageRouter'
import PendingAnswerMessage from '../messages/PendingAnswerMessage'
import './AiDialogueMessageList.scss'

type AiDialogueMessageListProps = {
	messages: DialogueServerMessage[]
	preview: AiDialoguePreviewEvent[]
	isGenerating: boolean
	onWordSelect: AiDialogueWordSelectHandler
}

/**
 * Список сообщений диалога: сохранённые сообщения + частичные события текущего
 * хода (превью). Пока генерация идёт и превью пусто — показывает плейсхолдер.
 */
function AiDialogueMessageList({ messages, preview, isGenerating, onWordSelect }: AiDialogueMessageListProps) {
	return (
		<div className='ai-dialogue-message-list'>
			{messages.map((message) => (
				<AiDialogMessageRouter key={message.id} event={message.payload} onWordSelect={onWordSelect} />
			))}

			{isGenerating && preview.length === 0 && <PendingAnswerMessage />}

			{preview.map((event, index) => (
				<AiDialogMessageRouter key={`preview-${index}`} event={event} onWordSelect={onWordSelect} />
			))}
		</div>
	)
}

export default AiDialogueMessageList
