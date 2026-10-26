import type {
	AiDialogueIllustrationStyleModel,
	AiDialogueIllustrationStylesModel,
} from '../types/aiDialogueIllustrationStyles'

/** Не превращаем повреждённый ответ каталога в запуск со случайным стилем. */
export function mapToAiDialogueIllustrationStyles(raw: unknown): AiDialogueIllustrationStylesModel {
	if (!isValidIllustrationStylesCatalog(raw)) throw new Error('Invalid illustration styles catalog')

	return {
		defaultStyleId: raw.defaultStyleId,
		styles: raw.styles.map((style) => ({
			id: style.id,
			titleKey: style.titleKey,
			previewUrl: style.previewUrl,
		})),
	}
}

/** Проверяет структуру каталога, уникальность id и доступность стандартного стиля. */
function isValidIllustrationStylesCatalog(raw: unknown): raw is AiDialogueIllustrationStylesModel {
	if (!raw || typeof raw !== 'object') return false

	const catalog = raw as AiDialogueIllustrationStylesModel

	if (typeof catalog.defaultStyleId !== 'string' || !Array.isArray(catalog.styles)) return false
	if (!catalog.styles.every(isValidIllustrationStyle)) return false

	const uniqueStyleIds = new Set(catalog.styles.map((style) => style.id))
	const hasDefaultStyle = catalog.styles.length === 0 || uniqueStyleIds.has(catalog.defaultStyleId)
	return uniqueStyleIds.size === catalog.styles.length && hasDefaultStyle
}

function isValidIllustrationStyle(raw: unknown): raw is AiDialogueIllustrationStyleModel {
	if (!raw || typeof raw !== 'object') return false
	const style = raw as AiDialogueIllustrationStyleModel

	return (
		typeof style.id === 'string' &&
		style.id.length > 0 &&
		typeof style.titleKey === 'string' &&
		style.titleKey.length > 0 &&
		typeof style.previewUrl === 'string' &&
		style.previewUrl.length > 0
	)
}
