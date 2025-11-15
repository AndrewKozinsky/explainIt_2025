import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import { useReadingStoreNext } from '../../../readingStoreNext'

export function useChapterTooltip() {
	const hovered = useReadingStoreNext((s) => s.hoveredWord)
	const getSentenceById = useReadingStoreNext((s) => s.getSentenceById)

	const tooltipRef = useRef<HTMLDivElement | null>(null)
	const [coords, setCoords] = useState<{ left: number; top: number } | null>(null)

	const sentence = useMemo(() => {
		if (hovered.sentenceId == null) return null
		return getSentenceById(hovered.sentenceId)
	}, [hovered.sentenceId, getSentenceById])

	const phrases: ChapterTextStructurePopulated.SuccessPhrase[] = useMemo(() => {
		if (!sentence || hovered.wordId == null) return []
		return sentence.phrases.filter(
			(p): p is ChapterTextStructurePopulated.SuccessPhrase => p.type === 'success' && p.wordIds.includes(hovered.wordId as number),
		)
	}, [sentence, hovered.wordId])

	useLayoutEffect(() => {
		if (!hovered.pos || !hovered.container) return
		const initialLeft = hovered.pos.left
		const initialTop = hovered.pos.top
		setCoords({ left: initialLeft, top: initialTop })

		const raf = requestAnimationFrame(() => {
			const tip = tooltipRef.current
			if (!tip) return
			const tipRect = tip.getBoundingClientRect()

			const centeredLeft = initialLeft - tipRect.width / 2
			const maxLeft = hovered.container!.width - tipRect.width - 4
			const maxTop = hovered.container!.height - tipRect.height - 4
			const clampedLeft = Math.max(4, Math.min(centeredLeft, maxLeft))
			const clampedTop = Math.max(4, Math.min(initialTop, maxTop))
			setCoords({ left: clampedLeft, top: clampedTop })
		})

		return () => cancelAnimationFrame(raf)
	}, [hovered.pos?.left, hovered.pos?.top, hovered.container?.width, hovered.container?.height])

	const show = Boolean(hovered.pos && hovered.container && coords && phrases.length > 0)

	return { tooltipRef, coords, phrases, show }
}
