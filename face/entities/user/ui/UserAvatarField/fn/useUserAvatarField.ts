import { useContext } from 'react'
import type { UploadProgressCallbacks } from '@/shared/api/uploadWithProgress'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'
import { userQueries } from '../../../UserQueryFacade'
import { useUserProfileMutation } from '../../../useUserProfileMutation'
import type { UserModel } from '../../../UserService'

export type UserAvatarFieldOptions = { selected?: boolean; disabled?: boolean }
type AvatarAction =
	{ type: 'upload'; file: File; uploadProgress: UploadProgressCallbacks } | { type: 'select' } | { type: 'delete' }

export const avatarUploadOptions = {
	accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/webp': ['.webp'] },
	maxSize: 30 * 1024 * 1024,
}

function changeAvatar(action: AvatarAction) {
	if (action.type === 'upload') {
		return userQueries.uploadAvatar(action.uploadProgress).mutationFn(action.file)
	}

	if (action.type === 'delete') {
		return userQueries.deleteAvatar().mutationFn()
	}

	return userQueries.updateMe().mutationFn({ avatarPresetId: null })
}

export function useUserAvatarField(user: UserModel, options: UserAvatarFieldOptions) {
	const { selected = user.avatarPresetId === null, disabled } = options
	const { notify } = useContext(NotificationContext)
	const { mutate, mutateAsync, isPending, variables, isSavingProfile } = useUserProfileMutation(user.id, changeAvatar)
	const isDisabled = disabled || isSavingProfile
	const deleting = isPending && variables?.type === 'delete'
	const photoUrl = user.uploadedAvatarUrl

	function notifyError(error: Error) {
		notify({ type: 'error', message: error.message })
	}

	function selectPhoto() {
		if (!selected) mutate({ type: 'select' }, { onError: notifyError })
	}

	function deletePhoto() {
		mutate({ type: 'delete' }, { onError: notifyError })
	}

	async function uploadPhoto(file: File, uploadProgress: UploadProgressCallbacks) {
		await mutateAsync({ type: 'upload', file, uploadProgress })
	}

	return { photoUrl, selected, isDisabled, deleting, selectPhoto, deletePhoto, uploadPhoto }
}
