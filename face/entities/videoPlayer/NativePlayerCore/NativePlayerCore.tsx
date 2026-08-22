'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePlayerController } from '../VideoPlayer/fn/controller'
import type { PlayerCommandEvent } from '../VideoPlayer/fn/types'
import VideoProgress from './VideoProgress'

type NativePlayerCoreProps = {
	fileUrl: string
	initialTime?: number
	command?: PlayerCommandEvent | null
	onCommandHandled?: (id: number) => void
	onTimeUpdate?: (currentTime: number) => void
	onDurationChange?: (duration: number) => void
	onPlayStateChange?: (paused: boolean) => void
	onEnded?: () => void
	onProgressSave?: (seconds: number) => void
}

function NativePlayerCore(props: NativePlayerCoreProps) {
	const {
		fileUrl,
		initialTime,
		command,
		onCommandHandled,
		onTimeUpdate,
		onDurationChange,
		onPlayStateChange,
		onEnded,
		onProgressSave,
	} = props

	const playerRef = useRef<HTMLVideoElement>(null)
	const [currentTime, setCurrentTime] = useState(0)
	const [duration, setDuration] = useState(0)

	usePlayerController(playerRef, command, onCommandHandled)

	const syncTime = useCallback(
		(time: number) => {
			setCurrentTime(time)
			onTimeUpdate?.(time)
			onProgressSave?.(time)
		},
		[onProgressSave, onTimeUpdate],
	)

	const syncTimeRef = useRef(syncTime)
	syncTimeRef.current = syncTime

	const seek = useCallback(
		(time: number) => {
			const video = playerRef.current
			if (!video) return

			video.currentTime = time
			syncTime(time)
		},
		[syncTime],
	)

	// Точная синхронизация времени нужна для авто-паузы у границы субтитра.
	useEffect(() => {
		let rafId = 0
		let lastSync = 0

		function tick(now: number) {
			const video = playerRef.current
			if (video && !video.paused && now - lastSync >= 50) {
				lastSync = now
				syncTimeRef.current(video.currentTime)
			}
			rafId = requestAnimationFrame(tick)
		}

		rafId = requestAnimationFrame(tick)
		return () => cancelAnimationFrame(rafId)
	}, [])

	return (
		<div className='video-root'>
			<video
				src={fileUrl}
				className='video-root__video'
				ref={playerRef}
				onTimeUpdate={(event) => syncTime(event.currentTarget.currentTime)}
				onSeeked={(event) => syncTime(event.currentTarget.currentTime)}
				onLoadedMetadata={(event) => {
					const nextDuration = event.currentTarget.duration
					setDuration(nextDuration)
					onDurationChange?.(nextDuration)

					const savedTime = initialTime ?? 0
					if (savedTime > 0 && savedTime < nextDuration) seek(savedTime)
				}}
				onPlay={() => onPlayStateChange?.(false)}
				onPause={() => onPlayStateChange?.(true)}
				onEnded={onEnded}
			/>
			<VideoProgress currentTime={currentTime} duration={duration} onSeek={seek} />
		</div>
	)
}

export default NativePlayerCore
