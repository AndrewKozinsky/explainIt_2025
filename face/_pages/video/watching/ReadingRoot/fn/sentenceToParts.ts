import { PopulatedTextStructure } from '_pages/video/watching/common/populatedTextStructure'

export function sentenceToParts(sentence: string): PopulatedTextStructure.SentencePart[] {
	const parts: PopulatedTextStructure.SentencePart[] = []

	let partId = 0
	let i = 0

	while (i < sentence.length) {
		const char = sentence[i]

		if (isWhitespace(char)) {
			while (i < sentence.length && isWhitespace(sentence[i])) i++
			parts.push({ id: partId++, type: 'space' })
			continue
		}

		if (isWordChar(char)) {
			const start = i
			i++

			while (i < sentence.length) {
				const next = sentence[i]

				if (isWordChar(next)) {
					i++
					continue
				}

				if (isWordApostrophe(next)) {
					const prev = sentence[i - 1]
					const after = i + 1 < sentence.length ? sentence[i + 1] : ''

					if (isWordChar(prev) && isWordChar(after)) {
						i++
						continue
					}
				}

				break
			}

			parts.push({ id: partId++, type: 'word', value: sentence.slice(start, i) })
			continue
		}

		const start = i
		i++
		while (i < sentence.length && isPunctuationChar(sentence[i])) i++

		parts.push({ id: partId++, type: 'punctuation', value: sentence.slice(start, i) })
	}

	return parts
}

function isWhitespace(char: string): boolean {
	return /\s/u.test(char)
}

function isWordChar(char: string): boolean {
	return /[\p{L}\p{N}]/u.test(char)
}

function isWordApostrophe(char: string): boolean {
	return char === '\'' || char === '’'
}

function isPunctuationChar(char: string): boolean {
	if (isWhitespace(char)) return false
	if (isWordChar(char)) return false

	return true
}
