'use client'

import { useCallback, useContext, useState } from 'react'
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
 * Обрабатывает клик по сценарию:
 * 1. Если пользователь не вошёл — открывает модалку с просьбой войти.
 * 2. Иначе создаёт диалог по сценарию и переадресовывает на него.
 */
export function useAiDialogueScenarioClick() {
	const router = useRouter()
	const user = useUser()
	const locale = useLocale()
	const { notify } = useContext(NotificationContext)
	const queryClient = useQueryClient()
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

	const closeLoginModal = useCallback(function () {
		setIsLoginModalOpen(false)
	}, [])

	const onScenarioClick = useCallback(
		async function (scenarioId: number) {
			if (!user) {
				setIsLoginModalOpen(true)
				return
			}

			// TODO: временно передаём английский как язык практики — позже дадим пользователю выбор.
			const result = await aiDialogueService.createDialogue({
				scenarioId,
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
				queryClient.invalidateQueries({ queryKey: aiDialogueQueryKeys.list() })
				router.push(pageUrls.aiDialogues.dialog(result.data.id).path)
			}
		},
		[user, locale, notify, queryClient, router],
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

	return { onScenarioClick, isLoginModalOpen, closeLoginModal, onLoginClick, onRegisterClick }
}
