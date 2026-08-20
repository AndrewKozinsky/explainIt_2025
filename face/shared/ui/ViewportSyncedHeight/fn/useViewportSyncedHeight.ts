import { RefObject, useLayoutEffect, useRef } from 'react'

type UseViewportSyncedHeightParams = {
	minHeight: number
	gapTop: number
	gapBottom: number
}

type UseViewportSyncedHeightResult = {
	trackRef: RefObject<HTMLDivElement | null>
	containerRef: RefObject<HTMLDivElement | null>
}

/**
 * Считает высоту контейнера как пересечение его места в вёрстке (трека) с видимой частью экрана.
 * Высота ставится прямо в стиль элемента, чтобы скролл не вызывал перерисовку React-дерева.
 */
export function useViewportSyncedHeight(params: UseViewportSyncedHeightParams): UseViewportSyncedHeightResult {
	const { minHeight, gapTop, gapBottom } = params

	const trackRef = useRef<HTMLDivElement | null>(null)
	const containerRef = useRef<HTMLDivElement | null>(null)

	useLayoutEffect(() => {
		const track = trackRef.current
		const container = containerRef.current
		if (!track || !container) return

		let raf = 0

		function compute() {
			if (!track || !container) return

			const trackRect = track.getBoundingClientRect()
			const viewportHeight = window.innerHeight || 0

			// Верх контейнера: либо его собственное место, либо линия прилипания к экрану
			const top = Math.max(trackRect.top, gapTop)
			// Низ контейнера: либо низ его места в вёрстке, либо низ экрана
			const bottom = Math.min(trackRect.bottom, viewportHeight - gapBottom)

			const nextHeight = Math.max(minHeight, bottom - top)
			container.style.height = nextHeight + 'px'
		}

		function scheduleCompute() {
			cancelAnimationFrame(raf)
			raf = requestAnimationFrame(compute)
		}

		scheduleCompute()

		// Место контейнера меняется не только при скролле и ресайзе окна,
		// но и когда меняется высота контента вокруг него
		const resizeObserver = new ResizeObserver(scheduleCompute)
		resizeObserver.observe(track)
		resizeObserver.observe(document.documentElement)

		window.addEventListener('scroll', scheduleCompute, { passive: true })
		window.addEventListener('resize', scheduleCompute)

		return () => {
			cancelAnimationFrame(raf)
			resizeObserver.disconnect()
			window.removeEventListener('scroll', scheduleCompute)
			window.removeEventListener('resize', scheduleCompute)
		}
	}, [minHeight, gapTop, gapBottom])

	return { trackRef, containerRef }
}
