import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'

export function chapterStructureIntoText(chapterStructure: ChapterTextStructurePopulated.Chapter): string {
	let result = ''

	for (const item of chapterStructure) {
		if ((item as any).type === 'sentence') {
			const sentence = item as ChapterTextStructurePopulated.Sentence
			for (const part of sentence.parts) {
				if (part.type === 'word') {
					result += part.value
				} else if (part.type === 'space') {
					result += ' '
				} else if (part.type === 'punctuation') {
					result += part.value
				} else if (part.type === 'carriageReturn') {
					result += '\n'
				}
			}
			continue
		}

		// Top-level parts (space, punctuation, carriageReturn)
		const t = (item as any).type
		if (t === 'space') {
			result += ' '
		} else if (t === 'punctuation') {
			result += (item as any).value
		} else if (t === 'carriageReturn') {
			result += '\n'
		}
	}

	return result
}
