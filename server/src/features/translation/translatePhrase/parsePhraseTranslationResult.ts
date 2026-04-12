export type ParsedPhraseTranslationResult = {
	phrase: string
	translate: string
	examples: { text: string; translate: string }[]
}

export function parsePhraseTranslationResult(message: null | string): null | ParsedPhraseTranslationResult {
	if (!message) return null

	const normalizedLines = message
		.split('\n')
		.map((line) => line.trim())
		.filter((line) => Boolean(line))

	if (normalizedLines.length < 2) {
		return null
	}

	const phrase = normalizedLines[0]
	const translate = normalizedLines[1]

	if (!phrase || !translate) {
		return null
	}

	const exampleLines = normalizedLines.slice(2)
	const examples: { text: string; translate: string }[] = []

	for (let index = 0; index + 1 < exampleLines.length; index += 2) {
		const text = exampleLines[index]
		const exampleTranslate = exampleLines[index + 1]

		if (!text || !exampleTranslate) {
			continue
		}

		examples.push({
			text,
			translate: exampleTranslate,
		})
	}

	return {
		phrase,
		translate,
		examples,
	}
}
