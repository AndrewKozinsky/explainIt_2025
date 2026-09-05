import type { AiDialoguePreviewEvent } from '@/entities/aiDialogue/types/aiDialoguePreview'
import type { AiDialogueWordSelectHandler } from '@/entities/aiDialogue/types/aiDialogueUi'
import HelpMessage from '../messages/HelpMessage'
import NpcActionsMessage from '../messages/NpcActionsMessage'
import PendingAnswerMessage from '../messages/PendingAnswerMessage'
import SceneUpdateMessage from '../messages/SceneUpdateMessage'
import UserActionsMessage from '../messages/UserActionsMessage'
import UserAvoidsNpcMessage from '../messages/UserAvoidsNpcMessage'
import WorldEventMessage from '../messages/WorldEventMessage'

type AiDialogMessageRouterProps = {
	event: AiDialoguePreviewEvent
	onWordSelect: AiDialogueWordSelectHandler
}

/**
 * Маршрутизирует событие диалога в компонент его типа.
 *
 * Принимает «ленивый» тип AiDialoguePreviewEvent: у сохранённого сообщения все
 * поля на месте, у превью (во время стрима) часть полей может отсутствовать.
 * Неизвестный/отсутствующий type рендерится как плейсхолдер «Ответ готовится».
 */
function AiDialogMessageRouter({ event, onWordSelect }: AiDialogMessageRouterProps) {
	if (event.type === 'sceneUpdate') {
		return (
			<SceneUpdateMessage content={event.content} translation={event.translation} onWordSelect={onWordSelect} />
		)
	}

	if (event.type === 'help') {
		return <HelpMessage content={event.content} translation={event.translation} onWordSelect={onWordSelect} />
	}

	if (event.type === 'worldEvent') {
		return <WorldEventMessage content={event.content} translation={event.translation} onWordSelect={onWordSelect} />
	}

	if (event.type === 'npcActions') {
		return (
			<NpcActionsMessage
				npcName={event.npcName}
				npcRole={event.npcRole}
				emotion={event.emotion}
				actions={event.actions}
				onWordSelect={onWordSelect}
			/>
		)
	}

	if (event.type === 'userActions') {
		return <UserActionsMessage actions={event.actions} onWordSelect={onWordSelect} />
	}

	if (event.type === 'userAvoidsNPC') {
		return <UserAvoidsNpcMessage />
	}

	return <PendingAnswerMessage />
}

export default AiDialogMessageRouter
