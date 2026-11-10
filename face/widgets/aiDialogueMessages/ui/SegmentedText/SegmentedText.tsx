import type { AiDialogueWordMapBlock } from '@/widgets/aiDialogueMessages/types/aiDialogueWordMap'
import { getGapClassName, getRootClassName, getWordClassName } from './fn/segmentClassNames'
import { useSegmentedTextHighlight } from './fn/useSegmentedTextHighlight'
import type { DialogueTextSegment } from './fn/wordSelection'
import './SegmentedText.scss'

type SegmentedTextProps = {
	text: string
	wordMap?: AiDialogueWordMapBlock
	onWordClick?: (segment: DialogueTextSegment) => void
}

/**
 * Текст, разбитый на слова-кнопки. При наведении мышью или фокусе (после клика или Tab) подсвечиваются слова, которые
 * уйдут в Словарь при клике: всё выражение из карты или одно слово. Для выражения остальной текст блока затухает.
 */
function SegmentedText({ text, wordMap, onWordClick }: SegmentedTextProps) {
	const {
		segments,
		frameParts,
		isExpressionHighlighted,
		handleWordPointerEnter,
		handleTextPointerLeave,
		handleWordFocus,
		handleWordBlur,
	} = useSegmentedTextHighlight(text, wordMap)

	return (
		<span className={getRootClassName(isExpressionHighlighted)} onPointerLeave={handleTextPointerLeave}>
			{segments.map((segment) => {
				const framePart = frameParts.get(segment.start)

				if (!segment.isWord || !onWordClick) {
					return (
						<span key={segment.start} className={getGapClassName(framePart)}>
							{segment.text}
						</span>
					)
				}

				return (
					<button
						key={segment.start}
						type='button'
						className={getWordClassName(framePart)}
						onClick={() => onWordClick(segment)}
						onPointerEnter={(event) => handleWordPointerEnter(event, segment)}
						onFocus={() => handleWordFocus(segment)}
						onBlur={handleWordBlur}
					>
						{segment.text}
					</button>
				)
			})}
		</span>
	)
}

export default SegmentedText
