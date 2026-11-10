import ClickableText from '@/shared/ui/ClickableText/ClickableText'
import type { AiDialogueWordMapBlock } from '@/widgets/aiDialogueMessages/types/aiDialogueWordMap'
import { useSegmentedTextSelection } from './fn/useSegmentedTextSelection'
import type { DialogueTextSegment } from './fn/wordSelection'

type SegmentedTextProps = {
	text: string
	wordMap?: AiDialogueWordMapBlock
	onWordClick?: (segment: DialogueTextSegment) => void
}

/**
 * Текст диалога со словами-кнопками (ClickableText). Клик выбирает выражение из карты слов или одно слово;
 * слова, отправленные в Словарь последним кликом на странице, залиты акцентным цветом.
 */
function SegmentedText({ text, wordMap, onWordClick }: SegmentedTextProps) {
	const { segments, selectedStarts, getHighlightedStarts, selectClickedWords } = useSegmentedTextSelection(
		text,
		wordMap,
	)

	function handleWordClick(segment: DialogueTextSegment) {
		selectClickedWords(segment)
		onWordClick?.(segment)
	}

	return (
		<ClickableText
			segments={segments}
			getHighlightedStarts={getHighlightedStarts}
			selectedStarts={selectedStarts}
			onWordClick={onWordClick ? handleWordClick : undefined}
		/>
	)
}

export default SegmentedText
