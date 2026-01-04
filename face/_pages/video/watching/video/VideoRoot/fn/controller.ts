import { useWatchingStore } from '_pages/video/watching/watchingStore'
import { useEffect, useRef } from 'react'

export function useVideoController() {
	const videoRef = useRef<HTMLVideoElement>(null)
	const command = useWatchingStore((s) => s.player.command)

	// Execute commands
	useEffect(() => {
		const video = videoRef.current
		if (!video || !command) return

		switch (command.type) {
			case 'PLAY':
				video.play()
				break
			case 'PAUSE':
				video.pause()
				break
			case 'SET_TIME':
				video.currentTime = command.time
				break
			case 'REWIND':
				video.currentTime += command.seconds
				break
			case 'SET_VOLUME':
				video.volume = command.volume
				break
		}
	}, [command])

	return videoRef
}
