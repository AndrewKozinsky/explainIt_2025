export const USER_AVATAR_MAX_UPLOAD_BYTES = 30 * 1024 * 1024
export const USER_AVATAR_MAX_INPUT_PIXELS = 80_000_000
export const USER_AVATAR_SHORT_SIDE = 512

/** The storage signer grants six hours; refresh an hour earlier. */
export function getAvatarUrlExpiresAt() {
	return new Date(Date.now() + 5 * 60 * 60_000).toISOString()
}

/** One region/mode namespace must correspond to exactly one database. */
export function getUserAvatarUploadPrefix(config: { region?: string; mode?: string }) {
	if (!config.region || !config.mode || !/^[a-z]+$/.test(config.region) || !/^[a-z]+$/.test(config.mode))
		throw new Error('Invalid user avatar storage namespace')

	return `user-avatars/uploads/${config.region}/${config.mode}/`
}

export function isUserAvatarUploadKey(key: string, prefix: string) {
	if (!key.startsWith(prefix)) return false

	return /^[1-9]\d*\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.webp$/.test(
		key.slice(prefix.length),
	)
}
