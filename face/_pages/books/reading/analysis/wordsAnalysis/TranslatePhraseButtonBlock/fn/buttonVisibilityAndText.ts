import React from 'react'
import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import { useGetIdlePhraseIsSelectedSentence, useGetSelectedSentence } from '_pages/books/reading/logic'

export function useGetButtonVisibilityAndText() {
	const selectedSentence = useGetSelectedSentence()
	const idlePhrase = useGetIdlePhraseIsSelectedSentence()

	const isButtonVisible = React.useMemo(() => {
		if (!idlePhrase) return false

		return !!idlePhrase.wordIds.length
	}, [idlePhrase])

	const buttonText = React.useMemo(() => {
		if (!isButtonVisible || !idlePhrase) return ''

		const withSentenceTranslate = selectedSentence.translation ? 'предложение и ' : ''
		if (idlePhrase.wordIds.length === 1) {
			const word = getWordValueById(selectedSentence.parts, idlePhrase.wordIds[0])
			return `Перевести ${withSentenceTranslate}${word}`
		} else {
			return `Перевести ${withSentenceTranslate} и фразу`
		}
	}, [idlePhrase, isButtonVisible, selectedSentence.parts, selectedSentence.translation])

	return { isButtonVisible, buttonText }
}

export function getWordValueById(sentenceParts: ChapterTextStructurePopulated.SentencePart[], wordId: number) {
	const found = sentenceParts.find((p) => p.type === 'word' && p.id === wordId)
	if (!found || found.type !== 'word') {
		return ''
	}

	return found.value
}
