type ParsedSentenceTranslationResult = {
	translation: string
	analysis: null | string
}

export function parseSentenceTranslationResult(
	message: null | string,
	options?: { requireTranslation?: boolean },
): null | ParsedSentenceTranslationResult {
	const requireTranslation = options?.requireTranslation ?? true

	if (!message) return null

	const normalized = message.trim()
	if (!normalized) return null

	const translationAndAnalysisParts = normalized.split(/\n\s*\n/)

	const translation = (translationAndAnalysisParts[0] ?? '').trim()
	const analysis =
		translationAndAnalysisParts.length > 1 ? translationAndAnalysisParts.slice(1).join('\n\n').trim() : null

	if (requireTranslation && !translation) return null

	return {
		translation,
		analysis,
	}
}
