import {
	ChapterTextStructure,
	ChapterTextStructureFull,
} from '@/_pages/books/books/editableFormSection/common/chapterStructureTypes'
import { booksFetcher } from '_pages/books/booksFetcher'

export function useGetContentStructure(): ChapterTextStructureFull.Chapter | null {
	const chapterData = booksFetcher.useGetCurrentChapter()
	if (!chapterData) return null

	const chapterStructure = chapterData.content
		? (JSON.parse(chapterData.content) as ChapterTextStructure.Chapter)
		: null

	if (!chapterStructure) {
		return null
	}

	let elementId = 1
	const fullStructure: ChapterTextStructureFull.Chapter = chapterStructure.map((item: any) => {
		const currentId = elementId++
		if (item.t === 'sentence') {
			let partId = 1
			const sentenceParts = (item.parts || []).map((part: any) => {
				const currentPartId = partId++
				if (part.t === 'word') {
					return { id: currentPartId, type: 'word', value: part.v } as const
				} else if (part.t === 'punctuation') {
					return { id: currentPartId, type: 'punctuation', value: part.v } as const
				} else if (part.t === 'space') {
					return { id: currentPartId, type: 'space' } as const
				} else if (part.t === 'carriageReturn') {
					return { id: currentPartId, type: 'carriageReturn' } as const
				}
				// Fallback in case of unknown type
				return { id: currentPartId, type: 'space' } as const
			})

			return {
				id: currentId,
				type: 'sentence',
				translatedSentence: item.translate ?? null,
				sentenceParts,
			}
		} else if (item.t === 'space') {
			return { id: currentId, type: 'space' }
		} else if (item.t === 'carriageReturn') {
			return { id: currentId, type: 'carriageReturn' }
		} else if (item.t === 'punctuation') {
			return { id: currentId, type: 'punctuation', value: item.v }
		}

		// Fallback in case of unknown top-level type
		return { id: currentId, type: 'space' }
	})

	return fullStructure
}
