import { getSignedFileUrlWindow, signedFileUrlWindowSeconds } from 'infrastructure/cloudflareS3/cloudflareS3.service'

export const USER_AVATAR_MAX_UPLOAD_BYTES = 30 * 1024 * 1024
export const USER_AVATAR_MAX_INPUT_PIXELS = 80_000_000
export const USER_AVATAR_SHORT_SIDE = 512

/** Запас до окончания подписи: клиент обновляет ссылку за час до него, чтобы пережить задержки и расхождение часов. */
const avatarUrlRefreshMarginMs = 60 * 60_000

/**
 * Момент, когда клиенту пора перечитать ссылки на аватар: за час до окончания подписи getFileUrl.
 * Подпись привязана к окну, поэтому до этого момента ссылка на тот же файл не меняется и браузер берёт его из кэша.
 * Считать до подписи ссылок: если запрос попадёт на границу окна, срок окажется раньше, а не позже нужного.
 */
export function getAvatarUrlExpiresAt(now = Date.now()) {
	const { expiresAt } = getSignedFileUrlWindow(signedFileUrlWindowSeconds, now)

	return new Date(expiresAt.getTime() - avatarUrlRefreshMarginMs).toISOString()
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
