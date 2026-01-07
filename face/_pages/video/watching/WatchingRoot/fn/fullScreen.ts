import { useWatchingStore } from '_pages/video/watching/watchingStore'
import { RefObject, useEffect } from 'react'

export function useFullScreen(rootRef: RefObject<HTMLDivElement | null>) {
	const isFullScreen = useWatchingStore((s) => s.fullScreen)

	useEffect(
		function () {
			if (!rootRef.current) {
				return
			}

			if (isFullScreen) {
				void rootRef.current.requestFullscreen().catch(() => undefined)
			} else {
				if (!document.fullscreenElement) {
					return
				}

				void document.exitFullscreen().catch(() => undefined)
			}
		},
		[rootRef, isFullScreen],
	)
}
