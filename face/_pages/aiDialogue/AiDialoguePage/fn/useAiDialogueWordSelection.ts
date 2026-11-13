import { useCallback, useEffect, useState } from 'react'
import { capturePosthogEvent } from '@/shared/posthog/posthogEvents'
import type { AiDialogueWordSelection } from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import { useSelectedWordsStore } from '@/widgets/aiDialogueMessages/ui/SegmentedText/fn/selectedWordsStore'

/** Dictionary selection changes only on a user click. */
export function useAiDialogueWordSelection(dialogueId: string) {
	const [selectedWord, setSelectedWord] = useState<null | string>(null)
	const [selectedSentence, setSelectedSentence] = useState('')

	useEffect(
		function () {
			setSelectedWord(null)
			setSelectedSentence('')
			// Заливка выбранного слова относится к прежнему диалогу.
			useSelectedWordsStore.getState().clearSelectedWords()
		},
		[dialogueId],
	)

	const handleWordSelect = useCallback(
		function ({ word, sentence }: AiDialogueWordSelection) {
			setSelectedWord(word)
			setSelectedSentence(sentence)
			// Нажатие на слово показывает перевод предложения и статью словаря.
			capturePosthogEvent({ name: 'dialogue_help_used', dialogue_id: Number(dialogueId), kind: 'translation' })
		},
		[dialogueId],
	)

	return { selectedWord, selectedSentence, handleWordSelect }
}
