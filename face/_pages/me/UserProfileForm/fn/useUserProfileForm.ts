import { useContext, useEffect, useReducer, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { userQueries } from '@/entities/user/UserQueryFacade'
import type { AvatarPresetId, UpdateUserProfileInput, UserGender, UserModel } from '@/entities/user/UserService'
import { useUserProfileMutation } from '@/entities/user/useUserProfileMutation'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'
import { profileFormReducer } from './profileFormState'

export function useUserProfileForm(user: UserModel) {
	const t = useTranslations('mePage.profile')
	const [state, dispatch] = useReducer(profileFormReducer, { status: 'idle' })
	const saving = useRef(false)
	const active = useRef(true)
	const { notify } = useContext(NotificationContext)
	const { mutateAsync: updateMe, isSavingProfile } = useUserProfileMutation(
		user.id,
		userQueries.updateMe().mutationFn,
	)

	const presets = useQuery({
		...userQueries.getAvatarPresets(),
		retry: 1,
	})

	const isSaving = state.status === 'saving' || isSavingProfile

	useEffect(function () {
		active.current = true
		return function () {
			active.current = false
		}
	}, [])

	async function save(input: UpdateUserProfileInput, pendingGender?: UserGender, pendingPresetId?: AvatarPresetId) {
		if (!active.current || saving.current || isSavingProfile) {
			return
		}

		saving.current = true
		dispatch({ type: 'start', pendingGender, pendingPresetId })

		try {
			await updateMe(input)
			if (active.current) {
				dispatch({ type: 'success' })
			}
		} catch (error) {
			if (!active.current) return

			const message = error instanceof Error ? error.message : t('saveError')

			dispatch({ type: 'failure', error: message })
			notify({ type: 'error', message })
		} finally {
			saving.current = false
		}
	}

	function changeGender(gender: UserGender) {
		if (gender === user.gender) return

		const currentPreset = presets.data?.find((preset) => preset.id === user.avatarPresetId)
		const defaultPreset = presets.data?.find((preset) => preset.gender === gender)
		const pendingPresetId = currentPreset && currentPreset.gender !== gender ? defaultPreset?.id : undefined

		return save({ gender }, gender, pendingPresetId)
	}

	function selectPreset(id: AvatarPresetId) {
		const preset = presets.data?.find((item) => item.id === id)
		if (!preset || (user.avatarPresetId === id && user.gender === preset.gender)) return

		return save({ avatarPresetId: id }, preset.gender, id)
	}

	return { state, isSaving, presets, changeGender, selectPreset }
}
