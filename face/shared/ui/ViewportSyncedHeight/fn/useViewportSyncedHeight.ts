import { RefObject, useLayoutEffect, useRef, useState } from 'react'

type UseViewportSyncedHeightParams = {
	minHeight: number
}

type UseViewportSyncedHeightResult = {
	containerRef: RefObject<HTMLDivElement | null>
	height: number
}

export function useViewportSyncedHeight(params: UseViewportSyncedHeightParams): UseViewportSyncedHeightResult {
	const { minHeight } = params

	const containerRef = useRef<HTMLDivElement | null>(null)
	const [height, setHeight] = useState(minHeight)

	useLayoutEffect(() => {
		const el = containerRef.current
		if (!el) return

		let raf = 0

		function compute() {
			if (!el) return

			const rect = el.getBoundingClientRect()
			const viewportHeight = window.innerHeight || 0

			const topClamped = Math.min(Math.max(rect.top, 0), viewportHeight)
			const nextHeight = Math.max(minHeight, viewportHeight - topClamped)

			setHeight((prev) => (prev === nextHeight ? prev : nextHeight))
		}

		function scheduleCompute() {
			cancelAnimationFrame(raf)
			raf = requestAnimationFrame(compute)
		}

		scheduleCompute()

		window.addEventListener('scroll', scheduleCompute, { passive: true })
		window.addEventListener('resize', scheduleCompute)

		return () => {
			cancelAnimationFrame(raf)
			window.removeEventListener('scroll', scheduleCompute)
			window.removeEventListener('resize', scheduleCompute)
		}
	}, [minHeight])

	return { containerRef, height }
}
