export const booksHelper = {
	jsonChapterContentStructureToText(chapter: undefined | null | string): string {
		if (!chapter) return ''

		let arr: any
		try {
			arr = JSON.parse(chapter)
		} catch (_e) {
			return ''
		}
		if (!Array.isArray(arr)) return ''

		const getType = (o: any): string | null => (o && (o.t ?? o.type)) ?? null
		const getValue = (o: any): string => (o && (o.v ?? o.value)) ?? ''
		const getParts = (o: any): any[] | null => {
			if (!o) return null
			if (Array.isArray(o.parts)) return o.parts
			return null
		}

		let text = ''
		for (const element of arr) {
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
