'use client'

import type { UserModel } from '@/entities/user/UserService'
import { useUser } from '@/shared/api/auth/UserProvider'
import { getProfileStatusText } from './fn/profileFormState'
import { useUserProfileForm } from './fn/useUserProfileForm'
import AvatarPresetPicker from './ui/AvatarPresetPicker'
import UserAvatarField from './ui/UserAvatarField'
import UserGenderField from './ui/UserGenderField'
import './UserProfileForm.scss'

function UserProfileForm() {
	const user = useUser()
	if (!user) return null

	return <ProfileFields key={user.id} user={user} />
}

function ProfileFields({ user }: { user: UserModel }) {
	const { state, isSaving, presets, changeGender, selectPreset, selectPhoto, uploadPhoto } = useUserProfileForm(user)

	return (
		<section className='user-profile-form' aria-label='Настройки профиля' aria-busy={isSaving}>
			<UserGenderField gender={state.pendingGender ?? user.gender} disabled={isSaving} onChange={changeGender} />
			<AvatarPresetPicker
				user={user}
				selectedId={state.pendingPresetId !== undefined ? state.pendingPresetId : user.avatarPresetId}
				presets={presets.data ?? []}
				disabled={isSaving}
				loading={presets.isPending}
				error={presets.isError}
				refreshing={presets.isFetching}
				onRetry={() => void presets.refetch()}
				onSelect={selectPreset}
			>
				<UserAvatarField
					avatarUrl={user.uploadedAvatarUrl}
					selected={
						(state.pendingPresetId !== undefined ? state.pendingPresetId : user.avatarPresetId) === null
					}
					disabled={isSaving}
					onSelect={selectPhoto}
					onUploadFile={uploadPhoto}
				/>
			</AvatarPresetPicker>
			<p
				className={`user-profile-form__status${state.status === 'error' ? ' user-profile-form__status--error' : ''}`}
				role='status'
				aria-live='polite'
			>
				{getProfileStatusText(state)}
			</p>
		</section>
	)
}

export default UserProfileForm
