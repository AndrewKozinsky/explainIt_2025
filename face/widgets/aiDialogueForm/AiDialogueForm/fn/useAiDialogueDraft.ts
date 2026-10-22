import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { aiDialogueService } from '@/entities/aiDialogue/AiDialogueService'
import { openAiDialogueDictation } from '@/entities/aiDialogue/dictation/openAiDialogueDictation'
import { useAiDialogueSendMessage } from '_pages/aiDialogue/AiDialoguePage/fn/useAiDialogueSendMessage'
import { useAiDialogueStore } from '_pages/aiDialogue/aiDialogueStore'
import { AiDialogueDraftController } from './AiDialogueDraftController'

export function useAiDialogueDraft(dialogueId: number) {
	const generating = useAiDialogueStore((state) => state.isGenerating)
	const sender = useAiDialogueSendMessage(dialogueId)
	const senderRef = useRef(sender)
	senderRef.current = sender
	const [controller] = useState(
		() =>
			new AiDialogueDraftController({
				check: (part, text, signal) =>
					aiDialogueService.checkUserMessageText(dialogueId, { [part]: text }, signal),
				openDictation: (callbacks) => openAiDialogueDictation(dialogueId, callbacks),
				send: (actions) => senderRef.current.sendUserActions(actions),
				leave: () => senderRef.current.finishDialogue(),
			}),
	)

	const state = useSyncExternalStore(controller.subscribe, controller.getSnapshot, controller.getSnapshot)

	useEffect(() => {
		controller.activate()
		return () => controller.dispose()
	}, [controller])
	useEffect(() => controller.setBlocked(generating), [controller, generating])

	return { controller, state, blocked: generating || state.blocked }
}
