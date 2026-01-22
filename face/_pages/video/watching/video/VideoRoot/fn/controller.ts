import { useWatchingStore } from '_pages/video/watching/watchingStore'
import { useEffect, useRef } from 'react'

export function usePlayerController(playerRef: React.RefObject<HTMLVideoElement | null>) {
	const command = useWatchingStore((s) => s.player.command)
	const reverseSeekIntervalIdRef = useRef<null | ReturnType<typeof setInterval>>(null)
	const reverseSeekWasPlayingRef = useRef(false)
	const reverseSeekLastTsRef = useRef<number>(0)
	const forwardHoldWasPlayingRef = useRef(false)
	const forwardHoldActiveRef = useRef(false)

	// Execute commands
	useEffect(() => {
		const video = playerRef.current
		if (!video || !command) return

		function stopReverseSeekIfActive() {
			if (!reverseSeekIntervalIdRef.current || !video) return

			clearInterval(reverseSeekIntervalIdRef.current)
			reverseSeekIntervalIdRef.current = null
			reverseSeekLastTsRef.current = 0

			video.playbackRate = 1
			if (reverseSeekWasPlayingRef.current) {
				reverseSeekWasPlayingRef.current = false
				video.play()
			}
		}

		function stopForwardHoldIfActive() {
			if (!forwardHoldActiveRef.current || !video) return

			forwardHoldActiveRef.current = false
			video.playbackRate = 1
			if (!forwardHoldWasPlayingRef.current) {
				video.pause()
			}
			forwardHoldWasPlayingRef.current = false
		}

		if (command.type !== 'START_REVERSE_SEEK' && command.type !== 'STOP_REVERSE_SEEK') {
			stopReverseSeekIfActive()
		}
		if (command.type !== 'START_FORWARD_HOLD' && command.type !== 'STOP_FORWARD_HOLD') {
			stopForwardHoldIfActive()
		}
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
		case 'SET_PLAYBACK_RATE':
			video.playbackRate = command.rate
			break
		case 'START_FORWARD_HOLD':
			stopReverseSeekIfActive()
			forwardHoldActiveRef.current = true
			forwardHoldWasPlayingRef.current = !video.paused
			video.playbackRate = command.rate
			if (video.paused) {
				video.play()
			}
			break
		case 'STOP_FORWARD_HOLD':
			stopForwardHoldIfActive()
			break
		case 'START_REVERSE_SEEK': {
			stopForwardHoldIfActive()
			stopReverseSeekIfActive()
			reverseSeekWasPlayingRef.current = !video.paused
			video.pause()
			video.playbackRate = 1
			reverseSeekLastTsRef.current = performance.now()
			reverseSeekIntervalIdRef.current = setInterval(() => {
				const now = performance.now()
				const last = reverseSeekLastTsRef.current || now
				reverseSeekLastTsRef.current = now
				const dtSeconds = (now - last) / 1000
				video.currentTime = Math.max(0, video.currentTime - command.rate * dtSeconds)
			}, 250)
			break
		}
		case 'STOP_REVERSE_SEEK':
			stopReverseSeekIfActive()
			break
		case 'SET_VOLUME':
			video.volume = command.volume
			break
		}
	}, [command, playerRef])
}
