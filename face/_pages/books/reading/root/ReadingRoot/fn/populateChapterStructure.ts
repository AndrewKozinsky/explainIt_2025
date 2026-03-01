import { ChapterTextStructurePopulated } from '../../../readingStore'

/**
 * Получает структуру главы с сервера и наполняет её полезными данными чтобы из
 * ChapterTextStructure.Chapter получить ChapterTextStructurePopulated.Chapter
 * @param chapter — данные главы
 */
export function populateChapterStructure(chapter: {
	id: number
	header: undefined | null | string
	name: undefined | null | string
	content: undefined | null | string
	sentences?:
		| null
		| {
				id: number
				startOffset: number
				length: number
		  }[]
}): ChapterTextStructurePopulated.Chapter {
	const content = chapter.content ?? ''
	const sentencesCoords = chapter.sentences ?? []

	const sentences: { id: number; sentence: string }[] = sentencesCoords.map((sentence) => {
		const startOffset = Math.max(0, sentence.startOffset)
		const endOffset = Math.min(content.length, startOffset + Math.max(0, sentence.length))

		return {
			id: sentence.id,
			sentence: content.slice(startOffset, endOffset),
		}
	})

	return {
		id: chapter.id,
		header: chapter.header || null,
		name: chapter.name || null,
		sentences,
	}
}
