import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import './ChapterTooltip.scss'

export type ChapterTooltipProps = {
	anchorEl: HTMLElement | null
	open: boolean
	phrases: ChapterTextStructurePopulated.SuccessPhrase[]
}

function ChapterTooltip(props: ChapterTooltipProps) {
	const { anchorEl, open, phrases } = props
	const tooltipRef = useRef<HTMLDivElement | null>(null)
	const [coords, setCoords] = useState<{ left: number; top: number } | null>(null)

	const containerEl = useMemo(() => {
		if (!anchorEl) return null
		return (anchorEl.closest('.chapter-content') as HTMLElement | null) ?? null
	}, [anchorEl])

	useLayoutEffect(() => {
		if (!open || !anchorEl || !containerEl) return

		const containerRect = containerEl.getBoundingClientRect()
		const anchorRect = anchorEl.getBoundingClientRect()

		// Initial position: under the word, centered horizontally relative to the word
		const centerX = anchorRect.left + anchorRect.width / 2
		const initialLeft = centerX - containerRect.left
		const initialTop = anchorRect.bottom - containerRect.top + 4

		setCoords({ left: initialLeft, top: initialTop })

		const rafId = requestAnimationFrame(() => {
			const tip = tooltipRef.current
			if (!tip) return
			const tipRect = tip.getBoundingClientRect()

			// Center horizontally by subtracting half tooltip width, then clamp
			const centeredLeft = initialLeft - tipRect.width / 2
			const maxLeft = containerRect.width - tipRect.width - 4
			const maxTop = containerRect.height - tipRect.height - 4
			const clampedLeft = Math.max(4, Math.min(centeredLeft, maxLeft))
			const clampedTop = Math.max(4, Math.min(initialTop, maxTop))
			setCoords({ left: clampedLeft, top: clampedTop })
		})

		const onResize = () => {
			// Recompute on resize while open
			const tip = tooltipRef.current
			if (!tip) return
			const containerRect = containerEl.getBoundingClientRect()
			const anchorRect = anchorEl.getBoundingClientRect()
			const centerX = anchorRect.left + anchorRect.width / 2
			const initialLeft = centerX - containerRect.left - tip.getBoundingClientRect().width / 2
			const initialTop = anchorRect.bottom - containerRect.top + 4
			const maxLeft = containerRect.width - tip.getBoundingClientRect().width - 4
			const maxTop = containerRect.height - tip.getBoundingClientRect().height - 4
			setCoords({
				left: Math.max(4, Math.min(initialLeft, maxLeft)),
				top: Math.max(4, Math.min(initialTop, maxTop)),
			})
		}

		window.addEventListener('resize', onResize)
		return () => {
			cancelAnimationFrame(rafId)
			window.removeEventListener('resize', onResize)
		}
	}, [open, anchorEl, containerEl, phrases.length])

	if (!open || !containerEl || !coords || phrases.length === 0) return null

	return createPortal(
		<div className='chapter-tooltip' ref={tooltipRef} style={{ left: coords.left, top: coords.top }}>
			{phrases.map((p) => (
				<div className='chapter-tooltip__item' key={p.id}>
					<span className='chapter-tooltip__phrase'>{p.phrase}</span>
					<span className='chapter-tooltip__translation'>{p.analysis.translation}</span>
				</div>
			))}
		</div>,
		containerEl,
	)
}

export default ChapterTooltip
