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

export function useGetIdlePhraseIsSelectedSentence() {
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
