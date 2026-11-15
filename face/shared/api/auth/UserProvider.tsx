'use client'

import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { openUserEventsStream } from '@/entities/user/events/openUserEventsStream'
import { userQueryKeys } from '@/entities/user/UserQueryFacade'
import type { UserModel } from '@/entities/user/UserService'
import { subscribeToBalanceExhausted } from '@/shared/api/balanceExhaustedSignal'

const getMeQueryKey = userQueryKeys.me()

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
	const currentUserId = currentUser?.id ?? null

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

	/** Меняет баланс текущего пользователя в контексте и кэше; без пользователя ничего не делает. */
	const updateBalance = useCallback(
		function (getNewBalance: (balance: number) => number) {
			function withNewBalance(previousUser: null | UserModel | undefined): null | UserModel {
				if (!previousUser) return null

				return { ...previousUser, balance: getNewBalance(previousUser.balance) }
			}

			setCurrentUser(withNewBalance)
			queryClient.setQueryData<null | UserModel>(getMeQueryKey, withNewBalance)
		},
		[queryClient],
	)

	// Баланс меняется на сервере при каждом запросе к ИИ и при ежедневном начислении: держим его актуальным.
	// Поток зависит только от id, поэтому новый баланс не переоткрывает соединение.
	useEffect(
		function () {
			if (currentUserId === null) return

			const eventSource = openUserEventsStream({
				balanceChanged: (balance) => updateBalance(() => balance),
			})
			const unsubscribeFromBalanceExhausted = subscribeToBalanceExhausted(function () {
				// Сервер отказал из-за баланса: поток отстал. Точное значение придёт следующим событием.
				updateBalance((balance) => Math.min(balance, 0))
			})

			return function () {
				eventSource.close()
				unsubscribeFromBalanceExhausted()
			}
		},
		[currentUserId, updateBalance],
	)

	return (
		<UserContext.Provider value={currentUser}>
			<SetUserContext.Provider value={setUser}>{children}</SetUserContext.Provider>
		</UserContext.Provider>
	)
}
