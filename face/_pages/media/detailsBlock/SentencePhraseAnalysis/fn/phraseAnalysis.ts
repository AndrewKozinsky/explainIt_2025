export type PhraseAnalysis = {
	phrase: string | null
	translation: PhraseAnalysisExamplePhrase[] | null
	examples: PhraseAnalysisExample[] | null
}

export type PhraseAnalysisExample = {
	text: PhraseAnalysisExamplePhrase[] | null
	translate: PhraseAnalysisExamplePhrase[] | null
}

export type PhraseAnalysisExamplePhrase = {
	text: string
	flashed?: boolean
}

let lastSuccessfulPhraseAnalysis: PhraseAnalysis | null = null

/**
 * Функция получает текст вида:
 * *   **room** — комната, `помещение`, *пространство*, **место**.
 * *   The `room` is bright. — `Комната` светлая.
 * *   The *room* is bright. — *Комната* светлая.
 * *   The **room** is bright. — **Комната** светлая.
 *
 * и возвращает данные типа:
 * const phraseAnalysis: PhraseAnalysis = {
 * 	phrase: 'room',
 * 	translation: [
 * 		{text: 'комната'},
 * 		{text: ', '},
 * 		{text: 'помещение', flashed: true},
 * 		{text: ', '},
 * 		{text: 'пространство', flashed: true},
 * 		{text: ', '},
 * 		{text: 'место', flashed: true},
 * 	]',
 * 	examples: [
 * 		{
 * 			text: [
 * 				{
 * 					text: 'The ',
 * 				},
 * 				{
 * 					text: 'room',
 * 					flashed: true,
 * 				},
 * 				{
 * 					text: ' is bright.',
 * 				},
 * 			],
 * 			translate: [
 * 				{
 * 					text: 'Комната',
 * 					flashed: true,
 * 				},
 * 				{
 * 					text: ' светлая.',
 * 				},
 * 			],
 * 		},
 * 		{
 * 			text: [
 * 				{
 * 					text: 'The ',
 * 				},
 * 				{
 * 					text: 'room',
 * 					flashed: true,
 * 				},
 * 				{
 * 					text: ' is bright.',
 * 				},
 * 			],
 * 			translate: [
 * 				{
 * 					text: 'Комната',
 * 					flashed: true,
 * 				},
 * 				{
 * 					text: ' светлая.',
 * 				},
 * 			],
 * 		},
 * 		{
 * 			text: [
 * 				{
 * 					text: 'The ',
 * 				},
 * 				{
 * 					text: 'room',
 * 					flashed: true,
 * 				},
 * 				{
 * 					text: ' is bright.',
 * 				},
 * 			],
 * 			translate: [
 * 				{
 * 					text: 'Комната',
 * 					flashed: true,
 * 				},
 * 				{
 * 					text: ' светлая.',
 * 				},
 * 			],
 * 		},
 * 	],
 * }
 * @param source
 */
export default function parsePhraseAnalysis(source: string): PhraseAnalysis | null {
	try {
		const lines = source.split('\n').map((line) => line.trim())

		if (!lines.length || !source.trim()) {
			return {
				phrase: null,
				translation: null,
				examples: null,
			}
		}

		const header = parseHeader(lines[0])
		const examples = lines.slice(1).filter(Boolean).map(parseExample)

		const result: PhraseAnalysis = {
			phrase: header.phrase,
			translation: header.translation,
			examples: examples.length ? examples : null,
		}

		if (isSuccessfulPhraseAnalysis(result)) {
			lastSuccessfulPhraseAnalysis = result
		}

		return result
	} catch {
		return lastSuccessfulPhraseAnalysis
	}
}

function parseHeader(line: string): Pick<PhraseAnalysis, 'phrase' | 'translation'> {
	const headerMatch = line.match(/^\*\s+\*\*(.+?)\*\*(?:\s+—\s+(.+))?$/)

	if (headerMatch) {
		return {
			phrase: headerMatch[1].trim() || null,
			translation: parseSourceText(headerMatch[2]?.trim() ?? ''),
		}
	}

	const fallbackMatch = line.match(/^\*\s+(.*)$/)

	if (!fallbackMatch) {
		return {
			phrase: null,
			translation: null,
		}
	}

	const content = fallbackMatch[1].trim()
	const separatorIndex = content.indexOf('—')

	if (separatorIndex === -1) {
		return {
			phrase: unwrapMarkedText(content).trim() || null,
			translation: null,
		}
	}

	const word = content.slice(0, separatorIndex).trim()
	const translation = content.slice(separatorIndex + 1).trim()

	return {
		phrase: unwrapMarkedText(word).trim() || null,
		translation: parseSourceText(translation),
	}
}

function parseExample(line: string): PhraseAnalysisExample {
	const match = line.match(/^\*\s+(.+?)(?:\s+—\s+(.+))?$/)

	if (!match) {
		return {
			text: null,
			translate: null,
		}
	}

	const text = match[1]?.trim()
	const translate = match[2]?.trim()

	return {
		text: parseSourceText(text ?? ''),
		translate: parseSourceText(translate ?? ''),
	}
}

function parseSourceText(text: string): PhraseAnalysisExamplePhrase[] | null {
	if (!text) {
		return null
	}

	const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g).filter(Boolean)

	const parsedParts = parts
		.map((part) => {
			const normalizedPart = unwrapMarkedText(part)

			if (!normalizedPart) {
				return null
			}

			const isFlashed = isMarkedText(part)

			if (isFlashed) {
				return {
					text: normalizedPart,
					flashed: true,
				}
			}

			return {
				text: normalizedPart,
			}
		})
		.filter(Boolean) as PhraseAnalysisExamplePhrase[]

	return parsedParts.length ? parsedParts : null
}

function isMarkedText(text: string): boolean {
	return (
		(text.startsWith('**') && text.endsWith('**') && text.length > 4) ||
		(text.startsWith('*') && text.endsWith('*') && text.length > 2) ||
		(text.startsWith('`') && text.endsWith('`') && text.length > 2)
	)
}

function unwrapMarkedText(text: string): string {
	if (text.startsWith('**') && text.endsWith('**') && text.length > 4) {
		return text.slice(2, -2)
	}

	if (text.startsWith('*') && text.endsWith('*') && text.length > 2) {
		return text.slice(1, -1)
	}

	if (text.startsWith('`') && text.endsWith('`') && text.length > 2) {
		return text.slice(1, -1)
	}

	return text
}

function isSuccessfulPhraseAnalysis(phraseAnalysis: PhraseAnalysis): boolean {
	return Boolean(phraseAnalysis.phrase && phraseAnalysis.translation?.length)
}
