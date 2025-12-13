import { ChapterTextStructure } from '_pages/books/commonLogic/chapterStructureTypes'

export function chapterStructureIntoText(chapterStructure: ChapterTextStructure.Chapter): string {
	let text = ''

	for (const element of chapterStructure) {
		switch (element.t) {
			case 'sn':
				for (const part of element.p) {
					switch (part.t) {
						case 'w':
							text += part.v
							break
						case 'pn':
							text += part.v
							break
						case 's':
							text += ' '
							break
					}
				}
				break
		}
	}

	return text
}
