import { ChapterTextStructure } from '_pages/books/commonLogic/chapterStructureTypes'

export function chapterStructureIntoText(chapterStructure: ChapterTextStructure.Chapter): string {
	let text = ''

	for (const element of chapterStructure) {
		switch (element.t) {
			case 'sentence':
				for (const part of element.parts) {
					switch (part.t) {
						case 'word':
							text += part.v
							break
						case 'punctuation':
							text += part.v
							break
						case 'space':
							text += ' '
							break
						case 'carriageReturn':
							text += '\n'
							break
					}
				}
				break
			case 'space':
				text += ' '
				break
			case 'carriageReturn':
				text += '\n'
				break
			case 'punctuation':
				text += element.v
				break
		}
	}

	return text
}
