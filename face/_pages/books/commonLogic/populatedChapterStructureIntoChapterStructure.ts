import { ChapterTextStructure, ChapterTextStructurePopulated } from './chapterStructureTypes'

/**
 * Получает структуру главы наполненную полезными данными и превращает её в структуру данных для сохранения на сервере
 * @param populatedChapterStructure — структура главы наполненная полезными данными
 */
export function populatedChapterStructureIntoChapterStructure(
	populatedChapterStructure: ChapterTextStructurePopulated.Chapter,
): ChapterTextStructure.Chapter {
	return populatedChapterStructure.parts.map((structurePart) => {
		return drySentenceStructure(structurePart)
	})
}

function drySentenceStructure(
	sentenceStructure: ChapterTextStructurePopulated.Sentence,
): ChapterTextStructure.Sentence {
	return {
		t: 'sn',
		tr: sentenceStructure.translation,
		// Составные части предложения
		p: drySentencePartsStructure(sentenceStructure.parts),
	}
}

function drySentencePartsStructure(
	sentenceParts: ChapterTextStructurePopulated.SentencePart[],
): ChapterTextStructure.SentencePart[] {
	return sentenceParts.map((part) => {
		if (part.type === 'word') {
			return { t: 'w', v: part.value } as const
		} else if (part.type === 'space') {
			return { t: 's' } as const
		}

		return { t: 'pn', v: part.value } as const
	})
}
