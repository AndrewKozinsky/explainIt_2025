import { create } from 'zustand'
import { UserOutModel } from '@/graphql'

type User = UserOutModel

export type UserStoreValues = {
	isLoading: boolean
	user: null | User
}

export const userStoreValues: UserStoreValues = {
	isLoading: true,
	user: null,
}

export type UserStoreMethods = {
	setUser: (user: UserStoreValues['user']) => void
}

export type UserStore = UserStoreValues & UserStoreMethods

export const useUserStore = create<UserStore>()((set) => {
	return {
		...userStoreValues,
		setUser: (user: UserStoreValues['user']) => {
			set({ user, isLoading: false })
		},
	}
})
