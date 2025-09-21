import { ChapterTextStructure, ChapterTextStructureFull } from '_pages/books/chapterStructureTypes'

export const booksHelper = {
	jsonChapterContentStructureToText(chapter: undefined | null | string): string {
		if (!chapter) return ''

		try {
			let arr = JSON.parse(chapter) as ChapterTextStructure.Chapter
			if (!Array.isArray(arr)) return ''

			return this.chapterContentStructureToText(arr)
		} catch (_e) {
			return ''
		}
	},
	chapterContentStructureToText(chapter: ChapterTextStructure.Chapter | ChapterTextStructureFull.Chapter): string {
		const getType = (o: any): string | null => (o && (o.t ?? o.type)) ?? null
		const getValue = (o: any): string => (o && (o.v ?? o.value)) ?? ''
		const getParts = (o: any): any[] | null => {
			if (!o) return null
			if (Array.isArray(o.parts)) return o.parts
			return null
		}

		let text = ''
		for (const element of chapter) {
			const t = getType(element)

			if (t === 'sentence') {
				const parts = getParts(element) ?? []
				for (const part of parts) {
					const pt = getType(part)
					switch (pt) {
						case 'word':
						case 'punctuation':
							text += getValue(part)
							break
						case 'space':
							text += ' '
							break
						case 'carriageReturn':
							text += '\n'
							break
					}
				}
			} else if (t === 'space') {
				text += ' '
			} else if (t === 'carriageReturn') {
				text += '\n'
			} else if (t === 'punctuation') {
				// In case top-level punctuation appears in structure
				text += getValue(element)
			}
		}

		return text
	},
}
