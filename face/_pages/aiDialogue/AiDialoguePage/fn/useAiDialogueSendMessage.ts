'use client'

import { useCallback, useEffect, useRef } from 'react'
import { aiDialogueService } from '@/entities/aiDialogue/AiDialogueService'
import { capturePosthogEvent } from '@/shared/posthog/posthogEvents'
import type { AiDialogueClientEvent } from '@/widgets/aiDialogueMessages/types/aiDialogueMessage'
import { useAiDialogueStore } from '../../aiDialogueStore'

/** Добавляет подтверждённое POST-сообщение в ленту. */
export function useAiDialogueSendMessage(dialogueId: number) {
	const lifetime = useRef({ active: true })

	useEffect(() => {
		const current = { active: true }
		lifetime.current = current

		return () => {
			current.active = false
		}
	}, [dialogueId])

	return useCallback(
		async (event: AiDialogueClientEvent): Promise<string | null> => {
			const currentLifetime = lifetime.current
			const result = await aiDialogueService.createMessage(dialogueId, event)
			// Ответ прежнего диалога не должен попасть в общий стор после навигации.
			if (!currentLifetime.active) return null

			if (result.error) return result.error
			if (result.errors?.length) return result.errors.flatMap((error) => error.messages).join(' ')
			if (result.data.dialogueId !== dialogueId || result.data.payload.type !== event.type) {
				throw new Error('Unexpected dialogue message response')
			}

			if (event.type === 'userActions' && !hasUserActions()) {
				capturePosthogEvent({ name: 'first_message_sent', dialogue_id: dialogueId })
			}

			useAiDialogueStore.getState().upsertMessage(result.data)

			return null
		},
		[dialogueId],
	)
}

/** Есть ли в загруженном диалоге хотя бы одна реплика или действие пользователя. */
function hasUserActions(): boolean {
	for (const message of useAiDialogueStore.getState().messages.values()) {
		if (message.payload.type === 'userActions') return true
	}

	return false
}
