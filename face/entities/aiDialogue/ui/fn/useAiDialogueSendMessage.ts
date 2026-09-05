'use client'

import { useCallback, useContext, useState } from 'react'
import { aiDialogueService } from '@/entities/aiDialogue/AiDialogueService'
import type { AiDialogueActionItem, AiDialogueClientEvent } from '@/entities/aiDialogue/types/aiDialogueMessage'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'
import { useAiDialogueStore } from '../aiDialogueStore'

/**
 * Хук отправки события пользователя в диалог (действие/реплика или уход от NPC).
 *
 * Отправляет событие через REST и на успехе кладёт подтверждённое сообщение в стор.
 * Сервер не возвращает событие пользователя по SSE — по шине приходят только
 * события NPC, поэтому сообщение пользователя нужно добавить вручную из ответа POST.
 * Ошибки показываются через уведомление.
 *
 * Возвращаемые функции резолвятся `true`, если сообщение отправлено и добавлено,
 * и `false` — если произошла ошибка (уже уведомлена).
 */
export function useAiDialogueSendMessage(dialogueId: number) {
	const { notify } = useContext(NotificationContext)
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

	const send = useCallback(
		async function (event: AiDialogueClientEvent): Promise<boolean> {
			setStatus('loading')

			const result = await aiDialogueService.createMessage(dialogueId, event)

			if (result.error) {
				notify({ type: 'error', message: result.error })
				setStatus('idle')
				return false
			}

			if (result.errors && result.errors.length > 0) {
				const text = result.errors.map((e) => `${e.field}: ${e.messages.join(', ')}`).join('; ')
				notify({ type: 'error', message: text })
				setStatus('idle')
				return false
			}

			useAiDialogueStore.getState().upsertMessage(result.data)
			setStatus('idle')
			return true
		},
		[dialogueId, notify],
	)

	const sendUserActions = useCallback(
		function (actions: AiDialogueActionItem[]): Promise<boolean> {
			return send({ type: 'userActions', actions })
		},
		[send],
	)

	const finishDialogue = useCallback(
		function (): Promise<boolean> {
			return send({ type: 'userAvoidsNPC' })
		},
		[send],
	)

	return { status, sendUserActions, finishDialogue }
}
