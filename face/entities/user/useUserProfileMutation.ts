import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSetUser } from '@/shared/api/auth/UserProvider'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import { unwrapApiResult } from '@/shared/utils/fetchData/unwrapApiResult'
import { userQueryKeys } from './UserQueryFacade'
import type { UserModel } from './UserService'

export function useUserProfileMutation<T>(userId: number, request: (input: T) => Promise<ApiResult<UserModel>>) {
	const queryClient = useQueryClient()
	const setUser = useSetUser()
	const mutationKey = [...userQueryKeys.me(), 'profile', userId]
	const scope = { id: `user-profile-${userId}` }
	const isSavingProfile = useIsMutating({ mutationKey }) > 0
	const mutation = useMutation({
		mutationKey,
		scope,
		mutationFn: (input: T) => unwrapApiResult(request(input)),
		onMutate: () => queryClient.cancelQueries({ queryKey: userQueryKeys.me() }),
		onSuccess: ({ id, gender, avatarPresetId, avatarUrl, uploadedAvatarUrl }) => {
			setUser((current) =>
				current?.id === id ? { ...current, gender, avatarPresetId, avatarUrl, uploadedAvatarUrl } : current,
			)
		},
	})

	return { ...mutation, isSavingProfile }
}
