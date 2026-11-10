'use client'

import type { MouseEvent } from 'react'
import { getGapClassName, getRootClassName, getWordClassName } from './fn/segmentClassNames'
import { useClickableTextHighlight } from './fn/useClickableTextHighlight'
import { useTouchTap } from './fn/useTouchTap'
import type { TextSegment } from './fn/textSegments'
import './ClickableText.scss'

type ClickableTextProps<Segment extends TextSegment> = {
	/** Текст, разбитый на слова и промежутки (segmentText или свой разбор, например по карте слов). */
	segments: Segment[]
	/** Начала слов, которые выберет клик по слову: всё выражение или одно слово. По умолчанию — само слово. */
	getHighlightedStarts?: (segment: Segment) => Set<number>
	/** Начала слов, выбранных последним кликом: они залиты акцентным цветом. */
	selectedStarts?: null | Set<number>
	/** Без обработчика слова не нажимаются: текст показывается как обычный. */
	onWordClick?: (segment: Segment) => void
}

/**
 * Текст, разбитый на слова-кнопки. При наведении мышью или фокусе (после клика или Tab) рамкой подсвечиваются слова,
 * которые выберет клик: всё выражение или одно слово. Для выражения остальной текст затухает.
 * Выбранные слова залиты акцентным цветом. Что выбрано, решает тот, кто показывает текст.
 */
function ClickableText<Segment extends TextSegment>(props: ClickableTextProps<Segment>) {
	const { segments, getHighlightedStarts = getOwnStart, selectedStarts = null, onWordClick } = props

	const {
		frameParts,
		selectedParts,
		isExpressionHighlighted,
		handleWordPointerEnter,
		handleTextPointerLeave,
		handleWordFocus,
		handleWordBlur,
	} = useClickableTextHighlight({ segments, getHighlightedStarts, selectedStarts })

	const { handleTouchStart, handleTouchMove, handleTouchEnd, handleTouchCancel } = useTouchTap()

	return (
		<span className={getRootClassName(isExpressionHighlighted)} onPointerLeave={handleTextPointerLeave}>
			{segments.map((segment) => {
				const framePart = frameParts.get(segment.start)
				const selectedPart = selectedParts.get(segment.start)

				if (!segment.isWord || !onWordClick) {
					return (
						<span key={segment.start} className={getGapClassName(framePart, selectedPart)}>
							{segment.text}
						</span>
					)
				}

				return (
					<button
						key={segment.start}
						type='button'
						className={getWordClassName(framePart, selectedPart)}
						onClick={() => onWordClick(segment)}
						onTouchStart={handleTouchStart}
						onTouchMove={handleTouchMove}
						onTouchEnd={(event) => handleTouchEnd(event, () => onWordClick(segment))}
						onTouchCancel={handleTouchCancel}
						onContextMenu={preventTouchContextMenu}
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

function getOwnStart(segment: TextSegment) {
	return new Set([segment.start])
}

/** Долгое касание слова не открывает меню браузера: слово нажимают, а не выделяют. */
function preventTouchContextMenu(event: MouseEvent) {
	const pointerType = (event.nativeEvent as PointerEvent).pointerType
	if (pointerType === 'touch' || pointerType === 'pen') event.preventDefault()
}

export default ClickableText
