import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { aiDialogueQueries } from '@/entities/aiDialogue/AiDialogueQueryFacade'
import type { AiDialogueModel } from '@/entities/aiDialogue/AiDialogueService'
import type { AiDialogueTextLevel } from '@/entities/aiDialogue/ui/TextLevelSwitcher'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'

/** Связывает переключатель с PATCH: Any → null, серверный выбор, состояние сохранения и уведомления об ошибках. */
export function useAiDialogueTextLevel(dialogueId: number, dialogue: AiDialogueModel | undefined) {
	const queryClient = useQueryClient()
	const { notify } = useContext(NotificationContext)

	const mutation = useMutation({
		...aiDialogueQueries.updateDialogue(dialogueId, queryClient),
		onError: function (error) {
			notify({ type: 'error', message: error.message })
		},
	})
	const textLevel: AiDialogueTextLevel = dialogue?.maxCefrLevel ?? 'Any'

	function changeTextLevel(level: AiDialogueTextLevel) {
		if (!dialogue || mutation.isPending || level === textLevel) return

		mutation.mutate({ maxCefrLevel: level === 'Any' ? null : level })
	}

	return { textLevel, changeTextLevel, isUpdatingTextLevel: mutation.isPending }
}
