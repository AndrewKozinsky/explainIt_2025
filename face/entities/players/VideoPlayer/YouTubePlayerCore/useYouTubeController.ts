'use client'

import { RefObject, useEffect, useRef } from 'react'
import { usePlayerContext } from '../PlayerContext'
import type { YouTubePlayer } from './youTubeIframeApi'

/**
 * Исполняет {@link PlayerCommand} из плеерного контекста через YouTube IFrame API.
 *
 * Аналог {@link NativePlayerCore/useNativeController}, но вместо прямого
 * доступа к HTMLVideoElement дёргает методы YT.Player.
 *
 * Обратный перемот (START_REVERSE_SEEK) реализован через периодический
 * seekTo, так как YouTube API не поддерживает реверсное воспроизведение.
 */
export function useYouTubeController(playerRef: RefObject<YouTubePlayer | null>) {
	const command = usePlayerContext().command

	const reverseSeekIntervalIdRef = useRef<null | ReturnType<typeof setInterval>>(null)
	const forwardHoldActiveRef = useRef(false)
	const forwardHoldNormalRateRef = useRef(1)

	useEffect(() => {
		const player = playerRef.current
		if (!player || !command) return

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

		// Отменяем активные hold/seek при любой новой команде
		if (command.type !== 'START_REVERSE_SEEK' && command.type !== 'STOP_REVERSE_SEEK') {
			stopReverseSeekIfActive()
		}
		if (command.type !== 'START_FORWARD_HOLD' && command.type !== 'STOP_FORWARD_HOLD') {
			stopForwardHoldIfActive()
		}

		switch (command.type) {
			case 'PLAY':
				player.playVideo()
				break

			case 'PAUSE':
				player.pauseVideo()
				break

			case 'SET_TIME':
				player.seekTo(command.time, true)
				break

			case 'REWIND':
				player.seekTo(Math.max(0, player.getCurrentTime() + command.seconds), true)
				break

			case 'SET_PLAYBACK_RATE':
				player.setPlaybackRate(command.rate)
				break

			case 'START_FORWARD_HOLD':
				stopReverseSeekIfActive()
				forwardHoldActiveRef.current = true
				forwardHoldNormalRateRef.current = player.getPlaybackRate()
				player.setPlaybackRate(command.rate)
				break

			case 'STOP_FORWARD_HOLD':
				stopForwardHoldIfActive()
				break

			case 'START_REVERSE_SEEK': {
				stopForwardHoldIfActive()
				stopReverseSeekIfActive()

				let lastTs = performance.now()

				reverseSeekIntervalIdRef.current = setInterval(() => {
					const p = playerRef.current
					if (!p) return

					const now = performance.now()
					const dtSeconds = (now - lastTs) / 1000
					lastTs = now

					p.seekTo(Math.max(0, p.getCurrentTime() - command.rate * dtSeconds), true)
				}, 250)
				break
			}

			case 'STOP_REVERSE_SEEK':
				stopReverseSeekIfActive()
				break

			case 'SET_VOLUME':
				// YouTube API принимает громкость 0–100, а наша команда — 0–1
				player.setVolume(command.volume * 100)
				break
		}
	}, [command, playerRef])
}
