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
				rootRef.current.requestFullscreen()
			} else {
				document.exitFullscreen()
			}
		},
		[rootRef, isFullScreen],
	)
}
