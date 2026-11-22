import { useCallback } from 'react'
import { useDialogueVisuals } from '../../../visuals/DialogueVisualsContext'
import { useDialogueImage } from '../../visuals/fn/useDialogueImage'

export function useDialogueUserAvatar() {
	const { userAvatarUrl, recoverImage } = useDialogueVisuals()

	const onError = useCallback(
		function () {
			recoverImage('user-avatar')
		},
		[recoverImage],
	)

	return useDialogueImage(userAvatarUrl, true, onError)
}
