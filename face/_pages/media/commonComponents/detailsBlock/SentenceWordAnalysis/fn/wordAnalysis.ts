export type WordAnalysis = {
	word: string | null
	translation: string | null
	examples: WordAnalysisExample[] | null
}

export type WordAnalysisExample = {
	text: WordAnalysisExampleWord[] | null
	translate: WordAnalysisExampleWord[] | null
}

export type WordAnalysisExampleWord = {
	text: string
	flashed?: boolean
}

let lastSuccessfulWordAnalysis: WordAnalysis | null = null

/**
 * Функция получает текст вида:
 * *   **room** — комната, помещение.
 * *   The `room` is very bright. — `Комната` очень светлая.
 *
 * и возвращает данные типа:
 * const wordAnalysis: WordAnalysis = {
 * 	word: 'room',
 * 	translation: 'комната, помещение.',
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
 * 					text: ' is very bright.',
 * 				},
 * 			],
 * 			translate: [
 * 				{
 * 					text: 'Комната',
 * 					flashed: true,
 * 				},
 * 				{
 * 					text: ' очень светлая.',
 * 				},
 * 			],
 * 		},
 * 	],
 * }
 * @param source
 */
export default function parseWordAnalysis(source: string): WordAnalysis | null {
	try {
		const lines = source.split('\n').map((line) => line.trim())

		if (!lines.length || !source.trim()) {
			return {
				word: null,
				translation: null,
				examples: null,
			}
		}

		const header = parseHeader(lines[0])
		const examples = lines
			.slice(1)
			.filter(Boolean)
			.map(parseExample)

		const result: WordAnalysis = {
			word: header.word,
			translation: header.translation,
			examples: examples.length ? examples : null,
		}

		if (isSuccessfulWordAnalysis(result)) {
			lastSuccessfulWordAnalysis = result
		}

		return result
	} catch {
		return lastSuccessfulWordAnalysis
	}
}

function parseHeader(line: string): Pick<WordAnalysis, 'word' | 'translation'> {
	const headerMatch = line.match(/^\*\s+\*\*(.+?)\*\*(?:\s+—\s+(.+))?$/)

	if (headerMatch) {
		return {
			word: headerMatch[1].trim() || null,
			translation: headerMatch[2]?.trim() || null,
		}
	}

	const fallbackMatch = line.match(/^\*\s+(.*)$/)

	if (!fallbackMatch) {
		return {
			word: null,
			translation: null,
		}
	}

	const content = fallbackMatch[1].trim()
	const separatorIndex = content.indexOf('—')

	if (separatorIndex === -1) {
		return {
			word: content || null,
			translation: null,
		}
	}

	const word = content.slice(0, separatorIndex).replace(/^\*\*|\*\*$/g, '').trim()
	const translation = content.slice(separatorIndex + 1).trim()

	return {
		word: word || null,
		translation: translation || null,
	}
}

function parseExample(line: string): WordAnalysisExample {
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
		text: text ? parseInlineBackticks(text) : null,
		translate: translate ? parseInlineBackticks(translate) : null,
	}
}

function parseInlineBackticks(text: string): WordAnalysisExampleWord[] {
	if (!text) {
		return []
	}

	const parts = text.split(/(`[^`]+`)/g).filter(Boolean)

	return parts.map((part) => {
		const isBackticked = part.startsWith('`') && part.endsWith('`')

		if (isBackticked) {
			return {
				text: part.slice(1, -1),
				flashed: true,
			}
		}

		return {
			text: part,
		}
	})
}

function isSuccessfulWordAnalysis(wordAnalysis: WordAnalysis): boolean {
	return Boolean(wordAnalysis.word && wordAnalysis.translation)
}
