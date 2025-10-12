import { ChapterTextStructure, ChapterTextStructurePopulated } from './chapterStructureTypes'

/**
 * Получает структуру главы с сервера и наполняет её полезными данными чтобы из
 * ChapterTextStructure.Chapter получить ChapterTextStructureFull.Chapter
 * @param chapterStructure — данные с сервера преобразованные в массив объектов
 * @param phrases — данные о переведённых фразах
 */
export function populateChapterStructure(
	chapterStructure: ChapterTextStructure.Chapter,
	phrases: ChapterTextStructure.Phrase[],
): ChapterTextStructurePopulated.Chapter {
	let elementId = 1

	return chapterStructure.map((item: any) => {
		const currentId = elementId++

		if (item.t === 'sentence') {
			return populateSentenceStructure(currentId, item, phrases)
		} else if (item.t === 'space') {
			return { id: currentId, type: 'space' }
		} else if (item.t === 'carriageReturn') {
			return { id: currentId, type: 'carriageReturn' }
		}

		return { id: currentId, type: 'punctuation', value: item.v }
	})
}

function populateSentenceStructure(
	currentId: number,
	sentenceStructure: ChapterTextStructure.Sentence,
	phrases: ChapterTextStructure.Phrase[],
): ChapterTextStructurePopulated.Sentence {
	return {
		id: currentId,
		type: 'sentence',
		context: '', // TODO Put correct context later!!!
		translation: sentenceStructure.translation ?? null,
		parts: populateSentencePartsStructure(sentenceStructure.parts),
		phrases: populateSentencePhrases(phrases, currentId),
	}
}

function populateSentencePartsStructure(
	sentenceParts: ChapterTextStructure.SentencePart[],
): ChapterTextStructurePopulated.SentencePart[] {
	let partId = 1

	return sentenceParts.map((part: any) => {
		partId++

		if (part.t === 'word') {
			return { id: partId, type: 'word', value: part.v } as const
		} else if (part.t === 'space') {
			return { id: partId, type: 'space' } as const
		} else if (part.t === 'carriageReturn') {
			return { id: partId, type: 'carriageReturn' } as const
		}

		return { id: partId, type: 'punctuation', value: part.v } as const
	})
}

function populateSentencePhrases(
	allPhrases: ChapterTextStructure.Phrase[],
	sentenceId: number,
): ChapterTextStructurePopulated.Phrase[] {
	const thisSentencePhrases = allPhrases.filter((phrase) => phrase.sentenceId === sentenceId)

	return thisSentencePhrases.map((phrase) => {
		return {
			type: 'success',
			phraseIdInDb: phrase.id,
			phrase: phrase.phrase,
			// Идентификаторы выделенных слов этой фразы
			wordIds: phrase.phraseWordsIdx,
			analysis: {
				// Краткий перевод фразы
				translation: phrase.translation,
				// Анализ фразы
				analysis: phrase.analysis,
				// Примеры использования фразы (предложение на иностранном языке и родном)
				examples: phrase.examples.map((example) => {
					return {
						id: example.id,
						foreignLang: example.sentence,
						nativeLang: example.translation,
					}
				}),
			},
		}
	})
}
