import { useCallback, useEffect, useState } from 'react'
import posthog from 'posthog-js'
import { localStorageManager } from '@/shared/utils/localStorageManager'

/**
 * Состояние баннера про cookies.
 *
 * Аналитика и запись сессий работают сразу, баннер о них сообщает.
 * «Принять» только скрывает баннер. «Отклонить» скрывает его и выключает PostHog
 * для этого браузера: PostHog сам запоминает отказ и после перезагрузки не отправляет данные.
 */
export function useCookieBannerIntl() {
	// Выбор хранится в localStorage, который недоступен при серверной отрисовке,
	// поэтому баннер появляется только после монтирования.
	const [isVisible, setIsVisible] = useState(false)

	useEffect(function () {
		setIsVisible(localStorageManager.cookieBannerIntl.getChoice() === null)
	}, [])

	const accept = useCallback(function () {
		localStorageManager.cookieBannerIntl.setChoice('accepted')
		setIsVisible(false)
	}, [])

	const reject = useCallback(function () {
		localStorageManager.cookieBannerIntl.setChoice('rejected')
		if (posthog.__loaded) posthog.opt_out_capturing()
		setIsVisible(false)
	}, [])

	return { isVisible, accept, reject }
}
