'use client'

import { useCallback, useContext, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { aiDialogueQueryKeys } from '@/entities/aiDialogue/AiDialogueQueryFacade'
import { aiDialogueService } from '@/entities/aiDialogue/AiDialogueService'
import { useRouter } from '@/i18n/routing'
import { useUser } from '@/shared/api/auth/UserProvider'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'
import { LanguageCode } from '@/shared/utils/languages'
import { pageUrls } from '@/shared/utils/pageUrls'

/**
 * Хук клика по карточке сценария диалога.
 *
 * Клик выбирает сценарий и открывает окно запуска. Кнопка запуска проверяет вход,
 * затем создаёт диалог и переадресовывает на него.
 */
export function useAiDialogueScenarioClick() {
	const router = useRouter()
	const user = useUser()
	const locale = useLocale()
	const { notify } = useContext(NotificationContext)
	const queryClient = useQueryClient()
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
	const [selectedScenarioId, setSelectedScenarioId] = useState<number | null>(null)
	const [creatingScenarioId, setCreatingScenarioId] = useState<number | null>(null)
	const isCreating = useRef(false)

	const closeLoginModal = useCallback(function () {
		setIsLoginModalOpen(false)
	}, [])

	const onScenarioClick = useCallback(function (scenarioId: number) {
		if (!isCreating.current) setSelectedScenarioId(scenarioId)
	}, [])

	const closeScenarioModal = useCallback(function () {
		if (!isCreating.current) setSelectedScenarioId(null)
	}, [])

	const onStartDialogue = useCallback(
		async function () {
			if (isCreating.current || selectedScenarioId === null) return

			if (!user) {
				setSelectedScenarioId(null)
				setIsLoginModalOpen(true)
				return
			}

			isCreating.current = true
			setCreatingScenarioId(selectedScenarioId)
			try {
				// TODO: временно передаём английский как язык практики — позже дадим пользователю выбор.
				const result = await aiDialogueService.createDialogue({
					scenarioId: selectedScenarioId,
					sourceLanguageCode: 'en',
					targetLanguageCode: locale as LanguageCode,
				})

				if (result.error) {
					notify({ type: 'error', message: result.error })
					return
				}

				if (result.errors && result.errors.length > 0) {
					const text = result.errors.map((e) => `${e.field}: ${e.messages.join(', ')}`).join('; ')
					notify({ type: 'error', message: text })
					return
				}

				if (result.data) {
					await queryClient.invalidateQueries({ queryKey: aiDialogueQueryKeys.list() })
					setSelectedScenarioId(null)
					router.push(pageUrls.aiDialogues.dialog(result.data.id).path)
				}
			} finally {
				isCreating.current = false
				setCreatingScenarioId(null)
			}
		},
		[selectedScenarioId, user, locale, notify, queryClient, router],
	)

	const onLoginClick = useCallback(
		function () {
			closeLoginModal()
			router.push(pageUrls.auth.login.path)
		},
		[closeLoginModal, router],
	)

	const onRegisterClick = useCallback(
		function () {
			closeLoginModal()
			router.push(pageUrls.auth.register.path)
		},
		[closeLoginModal, router],
	)

	return {
		onScenarioClick,
		selectedScenarioId,
		closeScenarioModal,
		onStartDialogue,
		creatingScenarioId,
		isLoginModalOpen,
		closeLoginModal,
		onLoginClick,
		onRegisterClick,
	}
}
