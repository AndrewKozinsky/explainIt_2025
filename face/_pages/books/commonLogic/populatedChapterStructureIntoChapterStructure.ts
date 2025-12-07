import { ChapterTextStructure, ChapterTextStructurePopulated } from './chapterStructureTypes'

/**
 * Получает структуру главы наполненную полезными данными и превращает её в структуру данных для сохранения на сервере
 * @param populatedChapterStructure — структура главы наполненная полезными данными
 */
export function populatedChapterStructureIntoChapterStructure(
	populatedChapterStructure: ChapterTextStructurePopulated.Chapter,
): ChapterTextStructure.Chapter {
	return populatedChapterStructure.parts.map((structurePart) => {
		if (structurePart.type === 'sentence') {
			return drySentenceStructure(structurePart)
		} else if (structurePart.type === 'space') {
			return { t: 's' }
		} else if (structurePart.type === 'carriageReturn') {
			return { t: 'cr' }
		}

		return { t: 'pn', v: structurePart.value }
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
		// Try not to use it
		// Соответствия между идентификаторами слов в предложении и идентификаторами фраз в базе данных с анализом фразы
		// phrasesMapping: drySentencePhrases(sentenceStructure.phrases),
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
		} else if (part.type === 'carriageReturn') {
			return { t: 'cr' } as const
		}

		return { t: 'pn', v: part.value } as const
	})
}

// Try not to use it
/*function drySentencePhrases(
	phrases: ChapterTextStructurePopulated.Phrase[],
): { wordIds: number[]; phraseIdInDb: number }[] {
	const successfulPhrases = phrases.filter((phrase) => phrase.type == 'success')

	return successfulPhrases.map((phrase) => {
		return { wordIds: phrase.wordIds, phraseIdInDb: phrase.phraseIdInDb }
	})
}*/
