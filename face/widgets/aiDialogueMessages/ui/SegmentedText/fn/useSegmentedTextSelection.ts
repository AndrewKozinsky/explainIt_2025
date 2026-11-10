import { useId, useMemo } from 'react'
import type { AiDialogueWordMapBlock } from '@/widgets/aiDialogueMessages/types/aiDialogueWordMap'
import { useSelectedWordsStore } from './selectedWordsStore'
import { getHighlightedWordStarts, splitDialogueText } from './wordSelection'
import type { DialogueTextSegment } from './wordSelection'

/**
 * Делит текст диалога на сегменты по карте слов и решает, какие слова выбирает клик: всё выражение из карты
 * или одно слово. Выбор один на страницу (useSelectedWordsStore), поэтому заливка остаётся только у этого текста.
 */
export function useSegmentedTextSelection(text: string, wordMap?: AiDialogueWordMapBlock) {
	const ownerId = useId()
	const segments = useMemo(() => splitDialogueText(text, wordMap), [text, wordMap])

	// Чужой выбор (в другом тексте) здесь не показывается.
	const selectedStarts = useSelectedWordsStore((store) => (store.ownerId === ownerId ? store.selectedStarts : null))
	const selectWords = useSelectedWordsStore((store) => store.selectWords)

	function getHighlightedStarts(segment: DialogueTextSegment) {
		return getHighlightedWordStarts(text, segments, segment, wordMap)
	}

	// Заливаются те же слова, что подсвечивала рамка: ровно то, что уйдёт в Словарь.
	function selectClickedWords(segment: DialogueTextSegment) {
		selectWords(ownerId, getHighlightedStarts(segment))
	}

	return { segments, selectedStarts, getHighlightedStarts, selectClickedWords }
}
