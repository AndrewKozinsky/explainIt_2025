import { useEffect } from 'react'
import { useDetailsStore } from '../../detailsStore'

type ApplySelectionInput = {
	selectedSentenceId: null | number
	selectedWordId: null | number
}

/**
 * При изменении выделения (клик по слову в левом блоке) обновляет
 * currentSentenceId, currentSentenceText и currentWordId в detailsStore.
 *
 * sentenceText ищется в detailsStore.sentences (заполняется через usePopulateStore).
 * Больше не зависит от readingStore/videoStore — данные приходят через пропсы.
 */
export function useApplySelection(input: ApplySelectionInput): void {
	const { selectedSentenceId, selectedWordId } = input

	const sentences = useDetailsStore((s) => s.sentences)

	useEffect(
		function () {
			let sentenceText: string | null = null

			if (selectedSentenceId !== null) {
				const entry = sentences.find((s) => s.sentenceId === selectedSentenceId)
				sentenceText = entry?.sentenceText ?? null
			}

			useDetailsStore.getState().updateStore({
				currentSentenceId: selectedSentenceId,
				currentSentenceText: sentenceText,
				currentWordId: selectedWordId,
			})
		},
		[selectedSentenceId, selectedWordId, sentences],
	)
}
