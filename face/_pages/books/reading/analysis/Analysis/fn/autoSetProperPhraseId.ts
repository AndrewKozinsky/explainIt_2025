// import { useGetSelectedSentence } from '_pages/books/reading/lib/getSelectedSentence'
// import { useReadingStore } from '_pages/books/reading/readingStore'
// import { useEffect } from 'react'

/**
 * При выделении любого слова или слов хук смотрит в какие фразы входят выделенные слова.
 * Если не входит ни в одну фразу, то в selectedSentence.phraseId устанавливается null.
 * Если входит в одну или несколько фраз, то в selectedSentence.phraseId ставит id первой фразы
 * Если в selectedSentence.phraseId уже есть идентификатор одной из входящих в выделенные слова,
 * то ничего не делает.
 */
/*export function useAutoSetProperPhraseId() {
	const selection = useReadingStore((s) => s.selection)
	const getSelectedSentence = useReadingStore((s) => s.getSelectedSentence)
	const changeSelectedPhraseId = useReadingStore((s) => s.changeSelectedPhraseId)
	const selectedSentence = useGetSelectedSentence()

	useEffect(
		function () {
			if (!selection.sentenceId || !selection.wordIds.length || !selectedSentence) {
				changeSelectedPhraseId(null)
				return
			}

			const phrasesWithThisWords = selectedSentence.phrases.filter((phrase) => {
				return selection.wordIds.every((wordId) => phrase.wordIds.includes(wordId))
			})

			if (!phrasesWithThisWords.length) {
				changeSelectedPhraseId(null)
				return
			}

			const phraseWhichAlreadySelected = phrasesWithThisWords.find((phrase) => phrase.id === selection.phraseId)
			if (phraseWhichAlreadySelected) return

			changeSelectedPhraseId(phrasesWithThisWords[0].id)
		},
		[changeSelectedPhraseId, getSelectedSentence, selection, selectedSentence],
	)
}*/
