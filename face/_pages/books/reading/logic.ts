import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import { useReadingStore } from '_pages/books/reading/readingStore'
import { useMemo } from 'react'

export function useGetSelectedSentence() {
	const populatedChapter = useReadingStore((s) => s.populatedChapter)
	const sentenceId = useReadingStore((s) => s.selectedSentence.sentenceId)

	return useMemo(
		function () {
			return populatedChapter.find(
				(chapterPart) => chapterPart.id === sentenceId,
			) as ChapterTextStructurePopulated.Sentence
		},
		[populatedChapter, sentenceId],
	)
}

export function useGetSentenceById(sentenceId: number) {
	const populatedChapter = useReadingStore((s) => s.populatedChapter)

	return useMemo(
		function () {
			return populatedChapter.find(
				(chapterPart) => chapterPart.id === sentenceId,
			) as ChapterTextStructurePopulated.Sentence
		},
		[populatedChapter, sentenceId],
	)
}

export function useGetIdlePhraseFromSelectedSentence() {
	const selectedSentence = useGetSelectedSentence()

	return useMemo(
		function () {
			return selectedSentence.phrases.find((phrase) => {
				return phrase.type === 'idle'
			})
		},
		[selectedSentence],
	)
}

/**
 * Получает массив данных предложения, идентификаторы выделенных слов и формирует строку из текста выделенных слов.
 * @param sentence — данные предложения
 * @param wordIds — id выделенных слов
 */
export function getPhaseTextFromWordIdx(sentence: ChapterTextStructurePopulated.SentencePart[], wordIds: number[]) {
	return wordIds
		.map((selectedWordId) => {
			const selectedWord: undefined | ChapterTextStructurePopulated.Word = sentence.find(
				(word): word is ChapterTextStructurePopulated.Word => {
					return word.type === 'word' && word.id === selectedWordId
				},
			)

			if (selectedWord) {
				return selectedWord.value
			}
		})
		.join(' ')
}

export function getWordValueById(sentenceParts: ChapterTextStructurePopulated.SentencePart[], wordId: number) {
	const found = sentenceParts.find((p) => p.type === 'word' && p.id === wordId)
	if (!found || found.type !== 'word') {
		return ''
	}

	return found.value
}
