import { RefObject, useEffect } from 'react'

type UseAutoScrollCurrentSubtitleParams = {
	containerRef: RefObject<HTMLElement | null>
	currentSubtitleId: number
	bottomThresholdPx?: number
	topPaddingPx?: number
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
				currentEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
				return
			}

			const containerRect = scrollContainer.getBoundingClientRect()
			const elRect = currentEl.getBoundingClientRect()

			const isAbove = elRect.top < containerRect.top
			const isBelow = elRect.bottom > containerRect.bottom - bottomThresholdPx

			if (!isAbove && !isBelow) {
				return
			}

			const top = scrollContainer.scrollTop + (elRect.top - containerRect.top) - topPaddingPx
			scrollContainer.scrollTo({ top, behavior: 'smooth' })
		},
		[bottomThresholdPx, containerRef, currentSubtitleId, topPaddingPx],
	)
}
