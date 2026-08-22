'use client'

import { RefObject, useEffect, useRef } from 'react'
import type { PlayerCommandEvent } from '../../VideoPlayer/fn/types'
import type { YouTubePlayer } from './youTubeIframeApi'

type YouTubeControllerCallbacks = {
	setCurrentTime: (time: number) => void
	onTimeUpdate?: (time: number) => void
}

export function useYouTubeController(
	playerRef: RefObject<YouTubePlayer | null>,
	isReady: boolean,
	command: PlayerCommandEvent | null | undefined,
	callbacks: YouTubeControllerCallbacks,
	onCommandHandled?: (id: number) => void,
) {
	const callbacksRef = useRef(callbacks)
	callbacksRef.current = callbacks

	const reverseSeekIntervalIdRef = useRef<null | ReturnType<typeof setInterval>>(null)
	const forwardHoldActiveRef = useRef(false)
	const forwardHoldNormalRateRef = useRef(1)

	useEffect(() => {
		const player = playerRef.current
		if (!player || !isReady || !command) return

		const { setCurrentTime, onTimeUpdate } = callbacksRef.current
		const value = command.value

		function stopReverseSeekIfActive() {
			if (!reverseSeekIntervalIdRef.current) return
			clearInterval(reverseSeekIntervalIdRef.current)
			reverseSeekIntervalIdRef.current = null
		}

		function stopForwardHoldIfActive() {
			if (!forwardHoldActiveRef.current) return
			forwardHoldActiveRef.current = false
			player?.setPlaybackRate(forwardHoldNormalRateRef.current)
		}

		if (value.type !== 'START_REVERSE_SEEK' && value.type !== 'STOP_REVERSE_SEEK') {
			stopReverseSeekIfActive()
		}

		if (value.type !== 'START_FORWARD_HOLD' && value.type !== 'STOP_FORWARD_HOLD') {
			stopForwardHoldIfActive()
		}

		switch (value.type) {
			case 'PLAY':
				player.playVideo()
				break
			case 'PAUSE':
				player.pauseVideo()
				break
			case 'SET_TIME':
				setCurrentTime(value.time)
				onTimeUpdate?.(value.time)
				player.seekTo(value.time, true)
				break
			case 'REWIND': {
				const targetTime = Math.max(0, player.getCurrentTime() + value.seconds)
				setCurrentTime(targetTime)
				onTimeUpdate?.(targetTime)
				player.seekTo(targetTime, true)
				break
			}
			case 'SET_PLAYBACK_RATE':
				player.setPlaybackRate(value.rate)
				break
			case 'START_FORWARD_HOLD':
				forwardHoldActiveRef.current = true
				forwardHoldNormalRateRef.current = player.getPlaybackRate()
				player.setPlaybackRate(value.rate)
				break
			case 'STOP_FORWARD_HOLD':
				stopForwardHoldIfActive()
				break
			case 'START_REVERSE_SEEK': {
				let lastTs = performance.now()
				reverseSeekIntervalIdRef.current = setInterval(() => {
					const activePlayer = playerRef.current
					if (!activePlayer) return
					const now = performance.now()
					const dtSeconds = (now - lastTs) / 1000
					lastTs = now
					activePlayer.seekTo(Math.max(0, activePlayer.getCurrentTime() - value.rate * dtSeconds), true)
				}, 250)
				break
			}
			case 'STOP_REVERSE_SEEK':
				stopReverseSeekIfActive()
				break
			case 'SET_VOLUME':
				player.setVolume(value.volume * 100)
				break
		}

		onCommandHandled?.(command.id)
	}, [command, isReady, onCommandHandled, playerRef])

	useEffect(() => {
		return () => {
			if (reverseSeekIntervalIdRef.current) clearInterval(reverseSeekIntervalIdRef.current)
		}
	}, [])
}
