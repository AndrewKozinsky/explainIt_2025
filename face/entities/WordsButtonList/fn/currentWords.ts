// import { useMemo } from 'react'
// import { segmentSentence } from '@/entities/detailsBlock/DetailsBlock/fn/wordSegmentation'
// import { useMediaStoreContext } from '@/entities/media/store/MediaStoreContext'

/*export function useCurrentWords(): { sentenceWords: string[]; phrase: string | null } {
	const mediaStore = useMediaStoreContext()
	const sentenceId = mediaStore((s) => s.selectedSentenceId)
	const languageCode = mediaStore((s) => s.languageCode)
	const sentences = mediaStore((s) => s.sentences)

	return useMemo(() => {
		const entry = sentences.find((item) => item.sentenceId === sentenceId)
		if (!entry) {
			return { sentenceWords: [], phrase: null }
		}

		const selected = entry.data.phrases.find((item) => item.randomGeneratedPhraseId === entry.selectedPhraseId)

		return {
			sentenceWords: segmentSentence(entry.sentenceText, languageCode).map((word) => word.word),
			phrase: selected?.phrase ?? null,
		}
	}, [sentenceId, languageCode, sentences])
}*/
