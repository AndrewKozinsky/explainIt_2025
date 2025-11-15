import { RefObject, useCallback } from 'react'
import { useReadingStoreNext } from '../../../readingStoreNext'

export function useWordHoverHandlers(
	wrapperRef: RefObject<null | HTMLSpanElement>,
	sentenceId: number,
	wordId: number,
) {
	const setHoveredWord = useReadingStoreNext((s) => s.setHoveredWord)
	const clearHoveredWord = useReadingStoreNext((s) => s.clearHoveredWord)

	const onMouseEnter = useCallback(() => {
		const wordEl = wrapperRef.current
		if (!wordEl) return

		const containerEl = wordEl.closest('.chapter-content') as HTMLElement | null
		if (!containerEl) return

		const containerRect = containerEl.getBoundingClientRect()
		const wordRect = wordEl.getBoundingClientRect()

		const centerX = wordRect.left + wordRect.width / 2 - containerRect.left
		const top = wordRect.bottom - containerRect.top + 4

		setHoveredWord(
			sentenceId,
			wordId,
			{ left: centerX, top },
			{ width: containerRect.width, height: containerRect.height },
		)
	}, [wrapperRef, sentenceId, wordId, setHoveredWord])

	const onMouseLeave = useCallback(() => {
		clearHoveredWord()
	}, [clearHoveredWord])

	return { onMouseEnter, onMouseLeave }
}
