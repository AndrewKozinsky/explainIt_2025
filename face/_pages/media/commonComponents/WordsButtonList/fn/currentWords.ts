import { useMemo } from 'react'
import { useDetailsStore } from '_pages/media/detailsBlock/detailsStore'

export function useCurrentWords(): { sentenceWords: string[]; phrase: string | null } {
	const getCurrentWords = useDetailsStore((s) => s.getCurrentWords)
	const currentSentenceId = useDetailsStore((s) => s.currentSentenceId)
	const currentSentenceText = useDetailsStore((s) => s.currentSentenceText)
	const languageCode = useDetailsStore((s) => s.languageCode)
	const sentences = useDetailsStore((s) => s.sentences)

	return useMemo(() => getCurrentWords(), [currentSentenceId, currentSentenceText, languageCode, sentences])
}
