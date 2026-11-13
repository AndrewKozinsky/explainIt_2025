'use client'

import { type ReactNode, useEffect, useRef } from 'react'
import posthog from 'posthog-js'
import { useUser } from '@/shared/api/auth/UserProvider'
import { posthogConfig } from './posthogConfig'
import type { PosthogSettings } from './fn/getPosthogSettings'

type PosthogProviderProps = {
	/** Настройки PostHog; null — PostHog выключен (например, на explainit.ru или локально). */
	settings: PosthogSettings | null
	children: ReactNode
}

/**
 * Запускает PostHog (события, запись сессий) и связывает данные с вошедшим пользователем.
 * Должен находиться внутри `UserProvider`.
 */
export function PosthogProvider(props: PosthogProviderProps) {
	const { settings, children } = props

	useInitPosthog(settings)
	useIdentifyUser(settings !== null)

	return children
}

/** Однократно запускает PostHog, если он включён. */
function useInitPosthog(settings: PosthogSettings | null) {
	useEffect(
		function () {
			if (!settings || posthog.__loaded) return

			posthog.init(settings.projectToken, {
				api_host: posthogConfig.proxyPath,
				ui_host: posthogConfig.uiHost,
				defaults: '2026-08-30',
				// Профили создаются только для вошедших пользователей.
				person_profiles: 'identified_only',
				session_recording: {
					// Поля ввода скрыты, кроме отмеченных атрибутом (форма ответа в диалоге).
					maskAllInputs: true,
					maskInputFn: revealMarkedInput,
				},
			})
		},
		[settings],
	)
}

/**
 * Связывает события и записи сессий с id вошедшего пользователя,
 * а при выходе начинает новую анонимную сессию.
 */
function useIdentifyUser(isEnabled: boolean) {
	const user = useUser()
	const identifiedUserId = useRef<string | null>(null)

	useEffect(
		function () {
			if (!isEnabled) return

			const userId = user ? String(user.id) : null
			if (userId === identifiedUserId.current) return

			if (userId) {
				posthog.identify(userId)
			} else {
				posthog.reset()
			}

			identifiedUserId.current = userId
		},
		[isEnabled, user],
	)
}

/**
 * Вызывается записью сессии для каждого скрываемого поля ввода.
 * Возвращает настоящий текст для полей с атрибутом `posthogConfig.unmaskedInputAttribute`,
 * остальные заменяет звёздочками.
 */
function revealMarkedInput(text: string, element?: HTMLElement): string {
	if (element?.hasAttribute(posthogConfig.unmaskedInputAttribute)) return text

	return '*'.repeat(text.length)
}
