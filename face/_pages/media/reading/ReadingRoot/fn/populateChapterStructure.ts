import { ChapterTextStructurePopulated } from '_pages/media/reading/readingStore'

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

	const sentences: ChapterTextStructurePopulated.Sentence[] = sentencesCoords.map((sentence) => {
		const startOffset = Math.max(0, sentence.startOffset)
		const endOffset = Math.min(content.length, startOffset + Math.max(0, sentence.length))

		return {
			id: sentence.id,
			sentence: content.slice(startOffset, endOffset),
			translation: getInitialSentenceTranslation(),
		}
	})

	return {
		id: chapter.id,
		header: chapter.header || null,
		name: chapter.name || null,
		sentences,
	}
}

function getInitialSentenceTranslation(): ChapterTextStructurePopulated.Sentence['translation'] {
	return {
		sentenceTranslation: null,
		wordAnalysis: null,
		isLoading: false,
		error: null,
		isVisible: false,
	}
}
