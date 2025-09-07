import React from 'react'

/**
 * Sets the CSS var --ra-top to the container's current distance to the viewport top,
 * but never less than its sticky top value.
 * @param containerRef
 */
export function useSetCorrectHeightToMainContainer(containerRef: React.RefObject<HTMLDivElement | null>) {
	React.useEffect(() => {
		const el = containerRef.current
		if (!el) return

		const readStickyTopPx = () => {
			const cs = window.getComputedStyle(el)
			const topStr = cs.top || '0px'
			const px = parseFloat(topStr)
			return Number.isFinite(px) ? px : 0
		}

		let stickyTopPx = readStickyTopPx()
		let ticking = false

		const update = () => {
			const rectTop = el.getBoundingClientRect().top
			// Re-read in case responsive styles changed sticky offset
			stickyTopPx = readStickyTopPx()
			const value = Math.max(rectTop, stickyTopPx, 0)
			el.style.setProperty('--ra-top', `${value}px`)
		}

		const onScrollOrResize = () => {
			if (ticking) return
			ticking = true
			requestAnimationFrame(() => {
				update()
				ticking = false
			})
		}

		// Initial set
		update()
		window.addEventListener('scroll', onScrollOrResize, { passive: true })
		window.addEventListener('resize', onScrollOrResize)
		return () => {
			window.removeEventListener('scroll', onScrollOrResize)
			window.removeEventListener('resize', onScrollOrResize)
		}
	}, [containerRef])
}
