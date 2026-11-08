import { useMemo, useState } from 'react'
import type { PointerEvent } from 'react'
import type { AiDialogueWordMapBlock } from '@/widgets/aiDialogueMessages/types/aiDialogueWordMap'
import { getHighlightedWordStarts, splitDialogueText } from './fn/wordSelection'
import type { DialogueTextSegment } from './fn/wordSelection'
import './SegmentedText.scss'

type SegmentedTextProps = {
	text: string
	wordMap?: AiDialogueWordMapBlock
	onWordClick?: (segment: DialogueTextSegment) => void
}

/**
 * Текст, разбитый на слова-кнопки. При наведении мышью (или фокусе с клавиатуры) подсвечиваются слова, которые уйдут
 * в Словарь при клике: всё выражение из карты или одно слово. Для выражения остальной текст блока затухает.
 * Подсветка снимается, только когда курсор уходит со всего текста, поэтому пробелы между словами её не сбрасывают.
 */
function SegmentedText({ text, wordMap, onWordClick }: SegmentedTextProps) {
	const segments = useMemo(() => splitDialogueText(text, wordMap), [text, wordMap])
	const [hoveredSegment, setHoveredSegment] = useState<DialogueTextSegment | null>(null)

	const highlightedStarts = useMemo(
		() => (hoveredSegment ? getHighlightedWordStarts(text, segments, hoveredSegment, wordMap) : null),
		[text, segments, hoveredSegment, wordMap],
	)

	// На сенсорных экранах наведения нет: подсветка после касания осталась бы висеть.
	function handleWordPointerEnter(event: PointerEvent, segment: DialogueTextSegment) {
		if (event.pointerType === 'mouse') setHoveredSegment(segment)
	}

	function clearHover() {
		setHoveredSegment(null)
	}

	// Остальной текст затухает только для выражения из нескольких слов: так видна связь частей,
	// например далёкого away в put … away. Одному слову хватает рамки, а затухание мешало бы читать.
	const isExpressionHighlighted = (highlightedStarts?.size ?? 0) > 1
	const rootClassName = isExpressionHighlighted ? 'segmented-text segmented-text--expression' : 'segmented-text'

	return (
		<span className={rootClassName} onPointerLeave={clearHover}>
			{segments.map((segment) => {
				if (!segment.isWord || !onWordClick) {
					return (
						<span key={segment.start} className='segmented-text__gap'>
							{segment.text}
						</span>
					)
				}

				const isHighlighted = highlightedStarts?.has(segment.start) ?? false

				return (
					<button
						key={segment.start}
						type='button'
						className={
							isHighlighted
								? 'segmented-text__word segmented-text__word--highlighted'
								: 'segmented-text__word'
						}
						onClick={() => onWordClick(segment)}
						onPointerEnter={(event) => handleWordPointerEnter(event, segment)}
						onFocus={() => setHoveredSegment(segment)}
						onBlur={clearHover}
					>
						{segment.text}
					</button>
				)
			})}
		</span>
	)
}

export default SegmentedText
