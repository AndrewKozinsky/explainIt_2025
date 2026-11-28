'use client'

import { useTranslations } from 'next-intl'
import UserAvatarField from '@/entities/user/ui/UserAvatarField/UserAvatarField'
import type { UserModel } from '@/entities/user/UserService'
import { useUser } from '@/shared/api/auth/UserProvider'
import { getProfileErrorText } from './fn/profileFormState'
import { useUserProfileForm } from './fn/useUserProfileForm'
import AvatarPresetPicker from './ui/AvatarPresetPicker'
import UserGenderField from './ui/UserGenderField'
import './UserProfileForm.scss'

function UserProfileForm() {
	const user = useUser()
	if (!user) return null

	return <ProfileFields key={user.id} user={user} />
}

function ProfileFields({ user }: { user: UserModel }) {
	const t = useTranslations('mePage.profile')
	const { state, isSaving, presets, changeGender, selectPreset } = useUserProfileForm(user)
	const selectedId = state.pendingPresetId ?? user.avatarPresetId

	return (
		<section className='user-profile-form' aria-label={t('ariaLabel')} aria-busy={isSaving}>
			<UserGenderField gender={state.pendingGender ?? user.gender} disabled={isSaving} onChange={changeGender} />
			<AvatarPresetPicker
				user={user}
				selectedId={selectedId}
				presets={presets.data ?? []}
				disabled={isSaving}
				loading={presets.isPending}
				error={presets.isError}
				refreshing={presets.isFetching}
				onRetry={() => void presets.refetch()}
				onSelect={selectPreset}
			>
				<UserAvatarField selected={selectedId === null} disabled={isSaving} />
			</AvatarPresetPicker>
			<p
				className={`user-profile-form__status${state.status === 'error' ? ' user-profile-form__status--error' : ''}`}
				role='status'
				aria-live='polite'
			>
				{isSaving ? t('status.saving') : (getProfileErrorText(state) ?? t(`status.${state.status}`))}
			</p>
		</section>
	)
}

export default UserProfileForm
