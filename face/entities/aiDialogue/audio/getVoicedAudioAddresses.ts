import type { DialogueServerMessage } from '@/widgets/aiDialogueMessages/types/aiDialogueMessage'
import { type DialogueAudioAddress, SCENE_AUDIO_ACTION_INDEX } from './dialogueAudioTypes'

/** Озвучиваемые тексты сообщения в порядке чтения: описание сцены или реплики NPC (без невербальных действий). */
export function getVoicedAudioAddresses(message: DialogueServerMessage): DialogueAudioAddress[] {
	const { payload } = message

	if (payload.type === 'sceneUpdate') {
		return payload.content ? [{ messageId: message.id, actionIndex: SCENE_AUDIO_ACTION_INDEX }] : []
	}

	if (payload.type !== 'npcActions') return []

	return payload.actions.flatMap(function (action, actionIndex) {
		return action.type === 'speech' && action.content ? [{ messageId: message.id, actionIndex }] : []
	})
}
