import type { AvatarPresetOutModel, UserOutModel } from '@/shared/api/generated/models'
import type { AvatarPresetId, AvatarPresetModel, UserModel } from './UserRepository'

export function mapToUser(raw: UserOutModel): UserModel {
	return {
		id: raw.id,
		email: raw.email,
		isUserConfirmed: raw.isUserConfirmed,
		balance: raw.balance,
		gender: raw.gender,
		avatarPresetId: mapAvatarPresetId(raw.avatarPresetId),
		avatarUrl: raw.avatarUrl,
		uploadedAvatarUrl: raw.uploadedAvatarUrl ?? null,
		avatarUrlExpiresAt: raw.avatarUrlExpiresAt,
	}
}

export function mapToAvatarPreset(raw: AvatarPresetOutModel): AvatarPresetModel {
	return { id: raw.id, gender: raw.gender, avatarUrl: raw.avatarUrl, avatarUrlExpiresAt: raw.avatarUrlExpiresAt }
}

function mapAvatarPresetId(id: string | null | undefined): AvatarPresetId | null {
	if (id === 'male-1' || id === 'male-2' || id === 'female-1' || id === 'female-2') return id

	return null
}
