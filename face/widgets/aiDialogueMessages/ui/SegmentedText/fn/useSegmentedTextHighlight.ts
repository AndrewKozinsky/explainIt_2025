import { useMemo, useState } from 'react'
import type { PointerEvent } from 'react'
import type { AiDialogueWordMapBlock } from '@/widgets/aiDialogueMessages/types/aiDialogueWordMap'
import { getFrameParts } from './frameParts'
import { getHighlightedWordStarts, splitDialogueText } from './wordSelection'
import type { FramePart } from './frameParts'
import type { DialogueTextSegment } from './wordSelection'

/**
 * Делит текст на сегменты и следит, какие слова подсвечены. Подсвечиваются слова, которые уйдут в Словарь при клике
 * по слову под курсором, а если курсора над текстом нет — по слову в фокусе (после клика или Tab).
 */
export function useSegmentedTextHighlight(text: string, wordMap?: AiDialogueWordMapBlock) {
	const segments = useMemo(() => splitDialogueText(text, wordMap), [text, wordMap])
	const [hoveredSegment, setHoveredSegment] = useState<DialogueTextSegment | null>(null)
	const [focusedSegment, setFocusedSegment] = useState<DialogueTextSegment | null>(null)

	// Наведение важнее фокуса: после клика фокус остаётся на слове, а курсор уже может быть над другим.
	const highlightedSegment = hoveredSegment ?? focusedSegment

	const highlightedStarts = useMemo(
		() => (highlightedSegment ? getHighlightedWordStarts(text, segments, highlightedSegment, wordMap) : null),
		[text, segments, highlightedSegment, wordMap],
	)

	// Соседние слова выражения объединяются общей рамкой: каждый сегмент рисует свою часть.
	const frameParts = useMemo(
		() => (highlightedStarts ? getFrameParts(segments, highlightedStarts) : new Map<number, FramePart>()),
		[segments, highlightedStarts],
	)

	// Остальной текст затухает только для выражения из нескольких слов: так видна связь частей,
	// например далёкого away в put … away. Одному слову хватает рамки, а затухание мешало бы читать.
	const isExpressionHighlighted = (highlightedStarts?.size ?? 0) > 1

	// На сенсорных экранах наведения нет: подсветка после касания осталась бы висеть.
	function handleWordPointerEnter(event: PointerEvent, segment: DialogueTextSegment) {
		if (event.pointerType === 'mouse') setHoveredSegment(segment)
	}

	// Вызывается при уходе курсора со всего текста, поэтому пробелы между словами подсветку не сбрасывают.
	function handleTextPointerLeave() {
		setHoveredSegment(null)
	}

	function handleWordFocus(segment: DialogueTextSegment) {
		setFocusedSegment(segment)
	}

	function handleWordBlur() {
		setFocusedSegment(null)
	}

	return {
		segments,
		frameParts,
		isExpressionHighlighted,
		handleWordPointerEnter,
		handleTextPointerLeave,
		handleWordFocus,
		handleWordBlur,
	}
}
