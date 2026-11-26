import { useContext } from 'react'
import { useIsMutating, useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { userQueries, userQueryKeys } from '@/entities/user/UserQueryFacade'
import { GENERATE_SCENE_IMAGE } from '@/entities/user/UserService'
import { useSetUser, useUser } from '@/shared/api/auth/UserProvider'
import Toggle from '@/shared/ui/formRelated/Toggle/Toggle'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'
import { unwrapApiResult } from '@/shared/utils/fetchData/unwrapApiResult'

const mutationKey = [...userQueryKeys.me(), GENERATE_SCENE_IMAGE]

function SceneImagesToggle() {
	const t = useTranslations('aiDialogueSettings')
	const user = useUser()
	const setUser = useSetUser()
	const { notify } = useContext(NotificationContext)
	const isSaving = useIsMutating({ mutationKey }) > 0
	const { mutationFn: updateMe } = userQueries.updateMe()

	const { mutate } = useMutation({
		mutationKey,
		mutationFn: (enabled: boolean) =>
			unwrapApiResult(updateMe({ preferences: { [GENERATE_SCENE_IMAGE]: enabled } })),
		onSuccess: (updated) => {
			setUser((current) =>
				current?.id === updated.id ? { ...current, preferences: updated.preferences } : current,
			)
		},
		onError: (error) => notify({ type: 'error', message: error.message }),
	})

	return (
		<Toggle
			label={t('sceneImages')}
			checked={user?.preferences[GENERATE_SCENE_IMAGE] ?? true}
			disabled={!user || isSaving}
			inputProps={{ onChange: (event) => mutate(event.target.checked) }}
		/>
	)
}

export default SceneImagesToggle
