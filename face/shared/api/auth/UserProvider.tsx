'use client'

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import type { UserOutModel } from '@/shared/api/generated/models'

/** Must match getAuthControllerGetMeQueryKey() from generated/auth/auth.ts */
const getMeQueryKey = ['/api/auth/me'] as const

const UserContext = createContext<UserOutModel | null>(null)
const SetUserContext = createContext<(user: UserOutModel | null) => void>(function () {})

/**
 * Access the current user from context.
 * Reactive — updates immediately on login/logout without page reload.
 * Returns UserOutModel if authenticated, null otherwise.
 */
export function useUser(): UserOutModel | null {
	return useContext(UserContext)
}

/**
 * Update the current user in both context and React Query cache.
 * Used by login/logout handlers.
 */
export function useSetUser(): (user: UserOutModel | null) => void {
	return useContext(SetUserContext)
}

type UserProviderProps = {
	user: UserOutModel | null
	children: ReactNode
}

export function UserProvider({ user, children }: UserProviderProps) {
	const [currentUser, setCurrentUser] = useState<UserOutModel | null>(user)
	const queryClient = useQueryClient()

	// Sync from server prop (e.g., on page navigation or full reload)
	useEffect(
		function () {
			setCurrentUser(user)
			queryClient.setQueryData(getMeQueryKey, user ?? null)
		},
		[user, queryClient],
	)

	// Stable setter: updates both context state and React Query cache
	const setUser = useCallback(
		function (newUser: UserOutModel | null) {
			setCurrentUser(newUser)
			queryClient.setQueryData(getMeQueryKey, newUser)
		},
		[queryClient],
	)

	return (
		<UserContext.Provider value={currentUser}>
			<SetUserContext.Provider value={setUser}>{children}</SetUserContext.Provider>
		</UserContext.Provider>
	)
}
