import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { openAiDialogueDictation } from '@/entities/aiDialogue/dictation/openAiDialogueDictation'
import type { SendAiDialogueMessage } from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import { useAiDialogueStore } from '_pages/aiDialogue/aiDialogueStore'
import { AiDialogueDraftController } from './AiDialogueDraftController'

export function useAiDialogueDraft(dialogueId: number, send: SendAiDialogueMessage, balanceExhausted: boolean) {
	const generating = useAiDialogueStore((state) => state.isGenerating)
	const sendRef = useRef(send)
	sendRef.current = send

	const [controller] = useState(
		() =>
			new AiDialogueDraftController({
				openDictation: (callbacks) => openAiDialogueDictation(dialogueId, callbacks),
				send: (event) => sendRef.current(event),
			}),
	)

	const state = useSyncExternalStore(controller.subscribe, controller.getSnapshot, controller.getSnapshot)

	useEffect(() => {
		controller.activate()
		return () => controller.dispose()
	}, [controller])

	const blocked = generating || balanceExhausted
	useEffect(() => controller.setBlocked(blocked), [controller, blocked])

	return { controller, state, blocked: blocked || state.blocked }
}
