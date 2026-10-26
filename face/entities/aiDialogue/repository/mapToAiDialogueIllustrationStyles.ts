import type { AiDialogueIllustrationStylesModel } from '../types/aiDialogueIllustrationStyles'

/** Не превращаем повреждённый ответ каталога в запуск со случайным стилем. */
export function mapToAiDialogueIllustrationStyles(raw: unknown): AiDialogueIllustrationStylesModel {
	if (!raw || typeof raw !== 'object') throw new Error('Invalid illustration styles response')

	const catalog = raw as AiDialogueIllustrationStylesModel

	if (
		typeof catalog.defaultStyleId !== 'string' ||
		typeof catalog.urlsExpireAt !== 'string' ||
		!Number.isFinite(Date.parse(catalog.urlsExpireAt)) ||
		!Array.isArray(catalog.styles) ||
		!catalog.styles.every(
			(style) =>
				style &&
				typeof style.id === 'string' &&
				style.id.length > 0 &&
				typeof style.titleKey === 'string' &&
				style.titleKey.length > 0 &&
				typeof style.previewUrl === 'string' &&
				style.previewUrl.length > 0,
		) ||
		new Set(catalog.styles.map((style) => style.id)).size !== catalog.styles.length ||
		(catalog.styles.length > 0 && !catalog.styles.some((style) => style.id === catalog.defaultStyleId))
	)
		throw new Error('Invalid illustration styles catalog')

	return {
		defaultStyleId: catalog.defaultStyleId,
		urlsExpireAt: catalog.urlsExpireAt,
		styles: catalog.styles.map((style) => ({
			id: style.id,
			titleKey: style.titleKey,
			previewUrl: style.previewUrl,
		})),
	}
}
