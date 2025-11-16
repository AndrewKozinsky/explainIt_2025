import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import { useReadingStore } from '_pages/books/reading/readingStore'
import { CHAPTER_TOOLTIP_DELAY_MS } from '../constants'

export function useChapterTooltip() {
	const hovered = useReadingStore((s) => s.hoveredWord)
	const getSentenceById = useReadingStore((s) => s.getSentenceById)

	const tooltipRef = useRef<HTMLDivElement | null>(null)
	const [coords, setCoords] = useState<{ left: number; top: number } | null>(null)
	const [visible, setVisible] = useState(false)
	const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
	const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	const sentence = useMemo(() => {
		if (hovered.sentenceId == null) return null
		return getSentenceById(hovered.sentenceId)
	}, [hovered.sentenceId, getSentenceById])

	const currentPhrases: ChapterTextStructurePopulated.SuccessPhrase[] = useMemo(() => {
		if (!sentence || hovered.wordId == null) return []
		return sentence.phrases.filter(
			(p): p is ChapterTextStructurePopulated.SuccessPhrase =>
				p.type === 'success' && p.wordIds.includes(hovered.wordId as number),
		)
	}, [sentence, hovered.wordId])

	const [phrases, setPhrases] = useState<ChapterTextStructurePopulated.SuccessPhrase[]>([])

	useEffect(() => {
		const hasHoverData = Boolean(hovered.pos && hovered.container && currentPhrases.length > 0)

		if (hasHoverData) {
			setPhrases(currentPhrases)
			if (hideTimerRef.current) {
				clearTimeout(hideTimerRef.current)
				hideTimerRef.current = null
			}

			if (!visible && !showTimerRef.current) {
				showTimerRef.current = setTimeout(() => {
					setVisible(true)
					showTimerRef.current = null
				}, CHAPTER_TOOLTIP_DELAY_MS)
			}
		} else {
			if (showTimerRef.current) {
				clearTimeout(showTimerRef.current)
				showTimerRef.current = null
			}
			if (visible && !hideTimerRef.current) {
				hideTimerRef.current = setTimeout(() => {
					setVisible(false)
					hideTimerRef.current = null
				}, CHAPTER_TOOLTIP_DELAY_MS)
			}
		}

		return () => {
			// no-op
		}
	}, [hovered.pos, hovered.container, currentPhrases, visible])

	useLayoutEffect(() => {
		if (!hovered.pos || !hovered.container || currentPhrases.length === 0) return
		const initialLeft = hovered.pos.left
		const initialTop = hovered.pos.top
		setCoords({ left: initialLeft, top: initialTop })

		const raf = requestAnimationFrame(() => {
			const tip = tooltipRef.current
			if (!tip || !visible) return
			const tipRect = tip.getBoundingClientRect()

			const halfW = tipRect.width / 2
			const minCenter = 4 + halfW
			const maxCenter = hovered.container!.width - 4 - halfW
			const clampedCenter = Math.max(minCenter, Math.min(initialLeft, maxCenter))

			const maxTop = hovered.container!.height - tipRect.height - 4
			const clampedTop = Math.max(4, Math.min(initialTop, maxTop))
			setCoords({ left: clampedCenter, top: clampedTop })
		})

		return () => cancelAnimationFrame(raf)
	}, [
		hovered.pos?.left,
		hovered.pos?.top,
		hovered.container?.width,
		hovered.container?.height,
		visible,
		currentPhrases.length,
		hovered.pos,
		hovered.container,
	])

	const show = Boolean(visible && coords && phrases.length > 0)

	return { tooltipRef, coords, phrases, show }
}
