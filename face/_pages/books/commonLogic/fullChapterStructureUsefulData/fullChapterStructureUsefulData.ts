import { ChapterTextStructure, ChapterTextStructurePopulated } from '../chapterStructureTypes'

/**
 * Получает структуру главы с сервера и наполняет её полезными данными чтобы из
 * ChapterTextStructure.Chapter получить ChapterTextStructureFull.Chapter
 * @param chapterStructure — данные с сервера преобразованные в массив объектов
 * @param phrases — данные о переведённых фразах
 */
export function fullChapterStructureUsefulData(
	chapterStructure: ChapterTextStructure.Chapter,
	phrases: ChapterTextStructure.Phrase[],
): ChapterTextStructurePopulated.Chapter {
	let elementId = 1

	const fullStructure: ChapterTextStructurePopulated.Chapter = chapterStructure.map((item: any) => {
		const currentId = elementId++
		if (item.t === 'sentence') {
			let partId = 1
			const parts = (item.parts || []).map((part: any) => {
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
				// Fallback in case of an unknown type
				return { id: currentPartId, type: 'space' } as const
			})

			// Build phrases mapping for this sentence by matching sentenceId
			const phrasesMapping = (phrases || [])
				.filter((p) => p.sentenceId === currentId)
				.map((p) => ({
					phraseIdInDb: p.id,
					phrase: p.phrase,
					wordIds: p.phraseWordsIdx,
					analysis: {
						translation: p.translation,
						analysis: p.analysis,
						examples: (p.examples || []).map((ex) => ({
							foreignLang: ex.sentence,
							nativeLang: ex.translation,
						})),
					},
				}))

			return {
				id: currentId,
				type: 'sentence',
				translation: item.translation ?? null,
				parts,
				phrasesMapping,
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
