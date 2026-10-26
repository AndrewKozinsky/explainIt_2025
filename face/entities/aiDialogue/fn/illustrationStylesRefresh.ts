import type { AiDialogueIllustrationStylesModel } from '../types/aiDialogueIllustrationStyles'

/** Ссылки обновляются за минуту до рекомендованного сервером срока. */
export function illustrationStylesStaleTime(catalog?: AiDialogueIllustrationStylesModel, updatedAt = Date.now()) {
	return catalog ? Math.max(0, Date.parse(catalog.urlsExpireAt) - 60_000 - updatedAt) : 0
}

/** Просроченный снимок после ошибки повторяется не чаще раза в минуту. */
export function illustrationStylesRefreshInterval(catalog?: AiDialogueIllustrationStylesModel, now = Date.now()) {
	if (!catalog) return false

	const refreshAfter = illustrationStylesStaleTime(catalog, now)
	return refreshAfter > 0 ? Math.min(2_147_483_647, refreshAfter) : 60_000
}
