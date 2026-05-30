import { RefObject, useEffect } from 'react'

export function useDetailsStickyTopBelowVideo(rootRef: RefObject<HTMLDivElement | null>) {
	useEffect(() => {
		const root = rootRef.current
		if (!root) return

		let resizeObserver: ResizeObserver | null = null
		let cleanupResize: (() => void) | null = null

		const setTop = (px: number) => {
			root.style.setProperty('--details-sticky-top', `${Math.max(0, Math.round(px))}px`)
		}

		const attach = (): boolean => {
			const videoEl = root.querySelector<HTMLElement>('.watching-root__video-container')
			if (!videoEl) {
				setTop(0)
				return false
			}

			const update = () => {
				setTop(videoEl.getBoundingClientRect().height)
			}

			update()

			if (typeof ResizeObserver !== 'undefined') {
				resizeObserver = new ResizeObserver(() => update())
				resizeObserver.observe(videoEl)
			}

			window.addEventListener('resize', update)
			cleanupResize = () => window.removeEventListener('resize', update)

			return true
		}

		if (attach()) {
			return () => {
				resizeObserver?.disconnect()
				cleanupResize?.()
			}
		}

		const mutationObserver = new MutationObserver(() => {
			if (attach()) mutationObserver.disconnect()
		})

		mutationObserver.observe(root, { childList: true, subtree: true })

		return () => {
			mutationObserver.disconnect()
			resizeObserver?.disconnect()
			cleanupResize?.()
		}
	}, [rootRef])
}
