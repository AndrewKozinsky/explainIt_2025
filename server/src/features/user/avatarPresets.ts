import type { UserGender } from 'prisma/generated/client'

/** Shared assets are uploaded separately; profile changes must never delete them. */
export const avatarPresets = [
	{ id: 'male-1', gender: 'MALE', s3Key: 'user-avatars/shared/male-1.jpg' },
	{ id: 'male-2', gender: 'MALE', s3Key: 'user-avatars/shared/male-2.jpg' },
	{ id: 'female-1', gender: 'FEMALE', s3Key: 'user-avatars/shared/female-1.jpg' },
	{ id: 'female-2', gender: 'FEMALE', s3Key: 'user-avatars/shared/female-2.jpg' },
] as const satisfies ReadonlyArray<{ id: string; gender: UserGender; s3Key: string }>

export function getAvatarPreset(id: string) {
	return avatarPresets.find((preset) => preset.id === id)
}
