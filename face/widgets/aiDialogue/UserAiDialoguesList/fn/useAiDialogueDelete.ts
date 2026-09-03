'use client'

import { useCallback, useContext, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { aiDialogueQueryKeys } from '@/entities/aiDialogue/AiDialogueQueryFacade'
import { aiDialogueService } from '@/entities/aiDialogue/AiDialogueService'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'

/**
 * Хук удаления диалога из истории.
 *
 * Управляет модалкой подтверждения удаления:
 * - клик по иконке удаления открывает модалку для конкретного диалога;
 * - подтверждение удаляет диалог и обновляет список;
 * - отказ закрывает модалку.
 */
export function useAiDialogueDelete() {
	const { notify } = useContext(NotificationContext)
	const queryClient = useQueryClient()

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')
	const dialogueIdRef = useRef<number | null>(null)

	const openDeleteModal = useCallback(function (id: number) {
		dialogueIdRef.current = id
		setIsModalOpen(true)
	}, [])

	const closeDeleteModal = useCallback(function () {
		dialogueIdRef.current = null
		setIsModalOpen(false)
	}, [])

	const onConfirmDelete = useCallback(
		async function () {
			const id = dialogueIdRef.current
			if (id === null) {
				return
			}

			setStatus('loading')

			const result = await aiDialogueService.deleteDialogue(id)

			if (result.error) {
				notify({ type: 'error', message: result.error })
				setStatus('idle')
				return
			}

			if (result.errors && result.errors.length > 0) {
				const text = result.errors.map((e) => `${e.field}: ${e.messages.join(', ')}`).join('; ')
				notify({ type: 'error', message: text })
				setStatus('idle')
				return
			}

			queryClient.invalidateQueries({ queryKey: aiDialogueQueryKeys.list() })
			setStatus('idle')
		},
		[notify, queryClient],
	)

	return {
		isModalOpen,
		status,
		openDeleteModal,
		closeDeleteModal,
		onConfirmDelete,
	}
}
