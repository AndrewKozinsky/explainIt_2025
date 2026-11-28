import { getR2EnvironmentPrefix } from 'infrastructure/cloudflareS3/r2EnvironmentPrefix'
import type { UserGender } from 'prisma/generated/client'

/** Shared assets are uploaded separately; profile changes must never delete them. */
export const avatarPresets = [
	{ id: 'male-1', gender: 'MALE', file: 'male-1.jpg' },
	{ id: 'male-2', gender: 'MALE', file: 'male-2.jpg' },
	{ id: 'female-1', gender: 'FEMALE', file: 'female-1.jpg' },
	{ id: 'female-2', gender: 'FEMALE', file: 'female-2.jpg' },
] as const satisfies ReadonlyArray<{ id: string; gender: UserGender; file: string }>

export function getAvatarPreset(id: string) {
	return avatarPresets.find((preset) => preset.id === id)
}

export function getDefaultAvatarPresetId(gender: UserGender): (typeof avatarPresets)[number]['id'] {
	return gender === 'FEMALE' ? 'female-1' : 'male-1'
}

export function getAvatarPresetS3Key(preset: (typeof avatarPresets)[number], mode: string | undefined): string {
	return `${getR2EnvironmentPrefix('user-avatars-shared', mode)}${preset.file}`
}

/** Resolves the selected profile avatar; a preset takes precedence over a retained upload. */
export function getUserAvatarS3Key(
	user: { avatar_preset_id: string | null; avatar_s3_key: string | null },
	mode: string | undefined,
): string {
	if (user.avatar_preset_id === null && user.avatar_s3_key) return user.avatar_s3_key

	const preset = user.avatar_preset_id !== null ? getAvatarPreset(user.avatar_preset_id) : undefined
	if (preset) return getAvatarPresetS3Key(preset, mode)

	throw new Error('User avatar is not configured')
}
