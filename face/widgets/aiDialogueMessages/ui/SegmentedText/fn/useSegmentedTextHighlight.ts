import { useId, useMemo, useState } from 'react'
import type { PointerEvent } from 'react'
import type { AiDialogueWordMapBlock } from '@/widgets/aiDialogueMessages/types/aiDialogueWordMap'
import { getFrameParts } from './frameParts'
import { useSelectedWordsStore } from './selectedWordsStore'
import { getHighlightedWordStarts, splitDialogueText } from './wordSelection'
import type { FramePart } from './frameParts'
import type { DialogueTextSegment } from './wordSelection'

/**
 * Делит текст на сегменты и следит, какие слова подсвечены. Подсвечиваются слова, которые уйдут в Словарь при клике
 * по слову под курсором, а если курсора над текстом нет — по слову в фокусе (после клика или Tab).
 * Отдельно хранит слова, выбранные кликом: они заливаются, пока не нажмут другое слово на странице.
 */
export function useSegmentedTextHighlight(text: string, wordMap?: AiDialogueWordMapBlock) {
	const ownerId = useId()
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

	// Заливка слов, выбранных кликом. Чужой выбор (в другом тексте) здесь не показывается.
	const selectedStarts = useSelectedWordsStore((store) => (store.ownerId === ownerId ? store.selectedStarts : null))
	const selectWords = useSelectedWordsStore((store) => store.selectWords)

	const selectedParts = useMemo(
		() => (selectedStarts ? getFrameParts(segments, selectedStarts) : new Map<number, FramePart>()),
		[segments, selectedStarts],
	)

	// Заливаются те же слова, что подсвечивала рамка: ровно то, что уйдёт в Словарь.
	function handleWordSelect(segment: DialogueTextSegment) {
		selectWords(ownerId, getHighlightedWordStarts(text, segments, segment, wordMap))
	}

	// Остальной текст затухает только для выражения из нескольких слов: так видна связь частей,
	// например далёкого away в put … away. Одному слову хватает рамки, а затухание мешало бы читать.
	// Выбранное кликом выражение уже выделяет заливка, поэтому при наведении или фокусе на нём текст не затухает.
	// Наведение на другое выражение затухание включает, и тогда затухает и залитое выражение.
	const isSelectionHighlighted = areSameStarts(highlightedStarts, selectedStarts)
	const isExpressionHighlighted = (highlightedStarts?.size ?? 0) > 1 && !isSelectionHighlighted

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
		selectedParts,
		isExpressionHighlighted,
		handleWordSelect,
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
