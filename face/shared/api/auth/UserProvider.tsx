'use client'

import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import type { UserModel } from '@/entities/auth/repository/AuthRepository'
import { getUserControllerGetMeQueryKey } from '@/shared/api/generated/user/user'

const getMeQueryKey = getUserControllerGetMeQueryKey()

const UserContext = createContext<UserModel | null>(null)
const SetUserContext = createContext<(user: UserModel | null) => void>(function () {})

/**
 * Access the current user from context.
 * Reactive — updates immediately on login/logout without page reload.
 * Returns UserModel if authenticated, null otherwise.
 */
export function useUser(): UserModel | null {
	return useContext(UserContext)
}

/**
 * Update the current user in both context and React Query cache.
 * Used by login/logout handlers.
 */
export function useSetUser(): (user: UserModel | null) => void {
	return useContext(SetUserContext)
}

type UserProviderProps = {
	user: UserModel | null
	children: ReactNode
}

export function UserProvider({ user, children }: UserProviderProps) {
	const [currentUser, setCurrentUser] = useState<UserModel | null>(user)
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
		function (newUser: UserModel | null) {
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
