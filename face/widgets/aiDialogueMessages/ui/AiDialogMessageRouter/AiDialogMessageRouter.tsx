import type { AiDialoguePreviewEvent } from '@/widgets/aiDialogueMessages/types/aiDialoguePreview'
import type { AiDialogueWordSelectHandler } from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import UserMessage from '@/widgets/aiDialogueMessages/ui/messages/UserMessage/UserMessage'
import HelpMessage from '../messages/HelpMessage'
import NpcMessage from '../messages/NpcMessage/NpcMessage'
import PendingAnswerMessage from '../messages/PendingAnswerMessage'
import SceneUpdateMessage from '../messages/SceneUpdateMessage/SceneUpdateMessage'
import UserAvoidsNpcMessage from '../messages/UserAvoidsNpcMessage'
import WorldEventMessage from '../messages/WorldEventMessage/WorldEventMessage'

type AiDialogMessageRouterProps = {
	event: AiDialoguePreviewEvent
	onWordSelect: AiDialogueWordSelectHandler
	messageId?: number
	audioAttemptId?: string
	audioEventIndex?: number
	reserveSceneSpace?: boolean
}

/**
 * Маршрутизирует событие диалога в компонент его типа.
 *
 * Принимает «ленивый» тип AiDialoguePreviewEvent: у сохранённого сообщения все
 * поля на месте, у превью (во время стрима) часть полей может отсутствовать.
 * Неизвестный/отсутствующий type рендерится как плейсхолдер «Ответ готовится».
 */
function AiDialogMessageRouter({
	event,
	onWordSelect,
	messageId,
	audioAttemptId,
	audioEventIndex,
	reserveSceneSpace = false,
}: AiDialogMessageRouterProps) {
	const audioAddress = { messageId, attemptId: audioAttemptId, eventIndex: audioEventIndex }
	const mapping = {
		wordMap: event.wordMap?.status === 'ready' ? event.wordMap.blocks.content : undefined,
	}

	if (event.type === 'sceneUpdate') {
		return (
			<SceneUpdateMessage
				audioAddress={audioAddress}
				{...mapping}
				messageId={messageId}
				reserveSpace={reserveSceneSpace}
				content={event.content}
				translation={event.translation}
				onWordSelect={onWordSelect}
			/>
		)
	}

	if (event.type === 'help') {
		return (
			<HelpMessage
				{...mapping}
				content={event.content}
				translation={event.translation}
				onWordSelect={onWordSelect}
			/>
		)
	}

	if (event.type === 'worldEvent') {
		return (
			<WorldEventMessage
				{...mapping}
				content={event.content}
				translation={event.translation}
				onWordSelect={onWordSelect}
			/>
		)
	}

	if (event.type === 'npcActions') {
		return (
			<NpcMessage
				audioAddress={audioAddress}
				wordMap={event.wordMap}
				npcId={event.npcId}
				npcName={event.npcName}
				npcRole={event.npcRole}
				emotion={event.emotion}
				actions={event.actions}
				onWordSelect={onWordSelect}
			/>
		)
	}

	if (event.type === 'userActions') {
		return <UserMessage actions={event.actions} onWordSelect={onWordSelect} />
	}

	if (event.type === 'userAvoidsNPC') {
		return <UserAvoidsNpcMessage />
	}

	return <PendingAnswerMessage />
}

export default AiDialogMessageRouter
