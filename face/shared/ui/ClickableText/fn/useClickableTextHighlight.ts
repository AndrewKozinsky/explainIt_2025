import { useMemo, useState } from 'react'
import type { PointerEvent } from 'react'
import { getFrameParts } from './frameParts'
import type { FramePart } from './frameParts'
import type { TextSegment } from './textSegments'

type UseClickableTextHighlightInput<Segment extends TextSegment> = {
	segments: Segment[]
	getHighlightedStarts: (segment: Segment) => Set<number>
	selectedStarts: null | Set<number>
}

/**
 * Следит, какие слова подсвечены рамкой. Подсвечиваются слова, которые выберет клик по слову под курсором,
 * а если курсора над текстом нет — по слову в фокусе (после клика или Tab). Какие это слова, решает
 * getHighlightedStarts. Также делит на части рамки заливку выбранных слов (selectedStarts).
 */
export function useClickableTextHighlight<Segment extends TextSegment>(input: UseClickableTextHighlightInput<Segment>) {
	const { segments, getHighlightedStarts, selectedStarts } = input

	const [hoveredSegment, setHoveredSegment] = useState<Segment | null>(null)
	const [focusedSegment, setFocusedSegment] = useState<Segment | null>(null)

	// Наведение важнее фокуса: после клика фокус остаётся на слове, а курсор уже может быть над другим.
	const highlightedSegment = hoveredSegment ?? focusedSegment
	const highlightedStarts = highlightedSegment ? getHighlightedStarts(highlightedSegment) : null

	// Соседние слова выражения объединяются общей рамкой: каждый сегмент рисует свою часть.
	const frameParts = highlightedStarts ? getFrameParts(segments, highlightedStarts) : new Map<number, FramePart>()

	const selectedParts = useMemo(
		() => (selectedStarts ? getFrameParts(segments, selectedStarts) : new Map<number, FramePart>()),
		[segments, selectedStarts],
	)

	// Остальной текст затухает только для выражения из нескольких слов: так видна связь частей,
	// например далёкого away в put … away. Одному слову хватает рамки, а затухание мешало бы читать.
	// Выбранное кликом выражение уже выделяет заливка, поэтому при наведении или фокусе на нём текст не затухает.
	// Наведение на другое выражение затухание включает, и тогда затухает и залитое выражение.
	const isSelectionHighlighted = areSameStarts(highlightedStarts, selectedStarts)
	const isExpressionHighlighted = (highlightedStarts?.size ?? 0) > 1 && !isSelectionHighlighted

	// На сенсорных экранах наведения нет: подсветка после касания осталась бы висеть.
	function handleWordPointerEnter(event: PointerEvent, segment: Segment) {
		if (event.pointerType === 'mouse') setHoveredSegment(segment)
	}

	// Вызывается при уходе курсора со всего текста, поэтому пробелы между словами подсветку не сбрасывают.
	function handleTextPointerLeave() {
		setHoveredSegment(null)
	}

	function handleWordFocus(segment: Segment) {
		setFocusedSegment(segment)
	}

	function handleWordBlur() {
		setFocusedSegment(null)
	}

	return {
		frameParts,
		selectedParts,
		isExpressionHighlighted,
		handleWordPointerEnter,
		handleTextPointerLeave,
		handleWordFocus,
		handleWordBlur,
	}
}

function areSameStarts(firstStarts: null | Set<number>, secondStarts: null | Set<number>) {
	if (!firstStarts || !secondStarts || firstStarts.size !== secondStarts.size) return false

	return [...firstStarts].every((start) => secondStarts.has(start))
}
