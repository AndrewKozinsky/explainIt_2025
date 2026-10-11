import { useCallback, useEffect, useState } from 'react'
import type { AiDialogueWordSelection } from '@/widgets/aiDialogueMessages/types/aiDialogueUi'

/** Dictionary selection changes only on a user click. */
export function useAiDialogueWordSelection(dialogueId: string) {
	const [selectedWord, setSelectedWord] = useState<null | string>(null)
	const [selectedSentence, setSelectedSentence] = useState('')

	useEffect(
		function () {
			setSelectedWord(null)
			setSelectedSentence('')
		},
		[dialogueId],
	)

	const handleWordSelect = useCallback(function ({ word, sentence }: AiDialogueWordSelection) {
		setSelectedWord(word)
		setSelectedSentence(sentence)
	}, [])

	return { selectedWord, selectedSentence, handleWordSelect }
}
