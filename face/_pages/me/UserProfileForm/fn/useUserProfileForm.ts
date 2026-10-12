import { useContext, useEffect, useReducer, useRef } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { userQueries, userQueryKeys } from '@/entities/user/UserQueryFacade'
import type { AvatarPresetId, AvatarPresetModel, UserGender, UserModel } from '@/entities/user/UserService'
import { useSetUser } from '@/shared/api/auth/UserProvider'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'
import { unwrapApiResult } from '@/shared/utils/fetchData/unwrapApiResult'
import { profileFormReducer, type ProfileOperation } from './profileFormState'
import { useRefreshUserAvatar } from './useRefreshUserAvatar'

function getPresetsRefreshInterval(presets: AvatarPresetModel[] | undefined) {
	if (!presets?.length) return false
	const expiresAt = Math.min(...presets.map((preset) => Date.parse(preset.avatarUrlExpiresAt)))
	return Number.isFinite(expiresAt) ? Math.max(60_000, expiresAt - Date.now()) : false
}

export function useUserProfileForm(user: UserModel) {
	const [state, dispatch] = useReducer(profileFormReducer, { status: 'idle' })
	const saving = useRef(false)
	const active = useRef(true)
	const setUser = useSetUser()
	const { notify } = useContext(NotificationContext)
	const queryClient = useQueryClient()
	const { mutateAsync: updateMe } = useMutation(userQueries.updateMe())
	const { mutateAsync: uploadAvatar } = useMutation(userQueries.uploadAvatar())
	const presets = useQuery({
		...userQueries.getAvatarPresets(),
		retry: 1,
		refetchInterval: (query) => getPresetsRefreshInterval(query.state.data),
	})

	const isSaving = state.status === 'saving'

	useRefreshUserAvatar(user, isSaving)

	useEffect(function () {
		active.current = true
		return function () {
			active.current = false
		}
	}, [])

	async function save(
		operation: ProfileOperation,
		request: () => Promise<UserModel>,
		pendingGender?: UserGender,
		pendingPresetId?: AvatarPresetId,
	) {
		if (!active.current || saving.current) return

		saving.current = true
		dispatch({ type: 'start', operation, pendingGender, pendingPresetId })

		try {
			await queryClient.cancelQueries({ queryKey: userQueryKeys.me() })
			const updated = await request()
			if (!active.current) return

			setUser(updated)
			dispatch({ type: 'success' })
		} catch (error) {
			if (!active.current) return

			const message = error instanceof Error ? error.message : 'Не удалось сохранить профиль. Попробуйте ещё раз.'
			dispatch({ type: 'failure', error: message })
			// Ошибку загрузки показывает сама дропзона, чтобы уведомление не дублировалось.
			if (operation === 'upload') throw new Error(message)

			notify({ type: 'error', message })
		} finally {
			saving.current = false
		}
	}

	function changeGender(gender: UserGender) {
		if (gender === user.gender) return

		return save('gender', () => unwrapApiResult(updateMe({ gender })), gender)
	}

	function selectPreset(id: AvatarPresetId) {
		const preset = presets.data?.find((item) => item.id === id)
		if (!preset || (user.avatarPresetId === id && user.gender === preset.gender)) return

		return save('preset', () => unwrapApiResult(updateMe({ avatarPresetId: id })), preset.gender, id)
	}

	function uploadPhoto(file: File) {
		return save('upload', () => unwrapApiResult(uploadAvatar(file)))
	}

	return { state, isSaving, presets, changeGender, selectPreset, uploadPhoto }
}
