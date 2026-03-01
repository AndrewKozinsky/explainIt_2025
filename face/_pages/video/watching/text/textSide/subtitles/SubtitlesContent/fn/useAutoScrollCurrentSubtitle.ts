import { RefObject, useEffect } from 'react'

type UseAutoScrollCurrentSubtitleParams = {
	containerRef: RefObject<HTMLElement | null>
	currentSubtitleId: number
	bottomThresholdPx?: number
	topPaddingPx?: number
}

export function useAutoScrollCurrentSubtitle(params: UseAutoScrollCurrentSubtitleParams) {
	const { containerRef, currentSubtitleId, bottomThresholdPx = 40, topPaddingPx = 20 } = params

	useEffect(
		function () {
			const container = containerRef.current
			if (!container) {
				return
			}

			const currentEl = container.querySelector(`[data-subtitle-id="${currentSubtitleId}"]`) as HTMLElement | null
			if (!currentEl) {
				return
			}

			const scrollContainer = getScrollableParent(container) ?? getScrollableParent(currentEl)
			if (!scrollContainer) {
				scrollWindowToReveal({ currentEl, bottomThresholdPx, topPaddingPx })
				return
			}

			const containerRect = scrollContainer.getBoundingClientRect()
			const elRect = currentEl.getBoundingClientRect()

			const videoBottom = getStickyVideoBottomPx(container)
			const safeTop = Math.max(containerRect.top, videoBottom) + topPaddingPx
			const safeBottom = containerRect.bottom - bottomThresholdPx

			const isAboveSafe = elRect.top < safeTop
			const isBelowSafe = elRect.bottom > safeBottom

			if (!isAboveSafe && !isBelowSafe) {
				return
			}

			// Align the current subtitle just below the sticky video (safeTop).
			const delta = elRect.top - safeTop
			scrollContainer.scrollTo({ top: scrollContainer.scrollTop + delta, behavior: 'smooth' })
		},
		[bottomThresholdPx, containerRef, currentSubtitleId, topPaddingPx],
	)
}

function getScrollableParent(element: HTMLElement | null) {
	let el: HTMLElement | null = element

	while (el) {
		const style = window.getComputedStyle(el)
		const overflowY = style.overflowY
		const isScrollableOverflow = overflowY === 'auto' || overflowY === 'scroll'
		const canScroll = el.scrollHeight > el.clientHeight

		if (isScrollableOverflow && canScroll) {
			return el
		}

		el = el.parentElement
	}

	return null
}

function scrollWindowToReveal(params: { currentEl: HTMLElement; bottomThresholdPx: number; topPaddingPx: number }) {
	const { currentEl, bottomThresholdPx, topPaddingPx } = params

	const elRect = currentEl.getBoundingClientRect()

	const videoBottom = getStickyVideoBottomPx(currentEl)
	const safeTop = videoBottom + topPaddingPx
	const safeBottom = (window.innerHeight || 0) - bottomThresholdPx

	const isAboveSafe = elRect.top < safeTop
	const isBelowSafe = elRect.bottom > safeBottom

	if (!isAboveSafe && !isBelowSafe) return

	// Align element top to safeTop (just below video) instead of "nearest" reveal.
	const delta = elRect.top - safeTop
	window.scrollBy({ top: delta, behavior: 'smooth' })
}

function getStickyVideoBottomPx(fromEl: HTMLElement): number {
	const doc = fromEl.ownerDocument ?? document
	const root = (fromEl.closest('.root-surface') as HTMLElement | null) ?? doc.documentElement
	const videoEl =
		(root.querySelector('.watching-root__video-container') as HTMLElement | null) ??
		(doc.querySelector('.watching-root__video-container') as HTMLElement | null)
	if (!videoEl) return 0

	const rect = videoEl.getBoundingClientRect()
	if (!Number.isFinite(rect.bottom)) return 0

	if (rect.bottom <= 0 || rect.top >= (window.innerHeight || 0)) return 0

	return Math.max(0, Math.min(window.innerHeight || 0, rect.bottom))
}
