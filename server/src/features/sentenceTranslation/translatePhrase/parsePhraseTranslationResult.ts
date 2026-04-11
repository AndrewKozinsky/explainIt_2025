export type ParsedPhraseTranslationResult = {
	phrase: string
	translate: string
	examples: { text: string; translate: string }[]
}

export function parsePhraseTranslationResult(message: null | string): null | ParsedPhraseTranslationResult {
	if (!message) return null

	let data: any = null
	try {
		data = JSON.parse(message)
	} catch {
		return null
	}

	if (!data || typeof data !== 'object') return null
	if (typeof data.phrase !== 'string') return null
	if (typeof data.translate !== 'string') return null
	if (!Array.isArray(data.examples)) return null

	const examples = data.examples
		.map((example: any) => {
			if (!example || typeof example !== 'object') return null
			if (typeof example.text !== 'string' || typeof example.translate !== 'string') return null

			return {
				text: example.text,
				translate: example.translate,
			}
		})
		.filter(Boolean) as { text: string; translate: string }[]

	return {
		phrase: data.phrase.trim(),
		translate: data.translate.trim(),
		examples,
	}
}
