import { memo, type ReactNode } from 'react'
import type { AiDialogueEvent } from '@/widgets/aiDialogueMessages/types/aiDialogueMessage'
import type { AiDialogueWordSelectHandler } from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import UserMessage from '@/widgets/aiDialogueMessages/ui/messages/UserMessage/UserMessage'
import { useDialogueMode } from '../DialogueModeContext'
import HelpMessage from '../messages/HelpMessage/HelpMessage'
import NpcMessage from '../messages/NpcMessage/NpcMessage'
import SceneUpdateMessage from '../messages/SceneUpdateMessage/SceneUpdateMessage'
import UserAvoidsNpcMessage from '../messages/UserAvoidsNpcMessage/UserAvoidsNpcMessage'
import WorldEventMessage from '../messages/WorldEventMessage/WorldEventMessage'

type AiDialogMessageRouterProps = {
	event: AiDialogueEvent
	onWordSelect: AiDialogueWordSelectHandler
	messageId: number
	reviewButton?: ReactNode
	reserveSceneSpace?: boolean
}

/**
 * Маршрутизирует событие диалога в компонент его типа.
 */
function AiDialogMessageRouter({
	event,
	onWordSelect,
	messageId,
	reviewButton,
	reserveSceneSpace = false,
}: AiDialogMessageRouterProps) {
	const mode = useDialogueMode()

	if (mode === 'exam' && event.type === 'help') {
		return null
	}

	const mapping = {
		wordMap: 'wordMap' in event && event.wordMap?.status === 'ready' ? event.wordMap.blocks.content : undefined,
	}

	if (event.type === 'sceneUpdate') {
		return (
			<SceneUpdateMessage
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
				messageId={messageId}
				wordMap={event.wordMap}
				npcId={event.npcId}
				npcName={event.npcName}
				npcRole={event.npcRole}
				emotion={event.emotion}
				speechAndActions={event.actions}
				onWordSelect={onWordSelect}
			/>
		)
	}

	if (event.type === 'userActions') {
		return <UserMessage reviewButton={reviewButton} actions={event.actions} onWordSelect={onWordSelect} />
	}

	if (event.type === 'userAvoidsNPC') {
		return <UserAvoidsNpcMessage />
	}

	return null
}

// Добавление нового сообщения не должно заново рендерить все прежние реплики.
export default memo(AiDialogMessageRouter)
