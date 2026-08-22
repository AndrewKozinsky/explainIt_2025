'use client'

import { useEffect, useRef } from 'react'
import { usePlayerController } from '../VideoPlayer/fn/controller'
import VideoProgress from './VideoProgress'

// ── Props ──────────────────────────────────────────────────────────────

type NativePlayerCoreProps = {
	fileUrl: string
	initialTime?: number
	playerWrapperRef: React.RefObject<HTMLDivElement | null>
	onTimeUpdate?: (currentTime: number) => void
	onDurationChange?: (duration: number) => void
	onPlayStateChange?: (paused: boolean) => void
	onEnded?: () => void
	setCurrentTime: (t: number) => void
	setDuration: (d: number) => void
	setPaused: (p: boolean) => void
	saveProgress: (seconds: number) => void
}

// ── Компонент ──────────────────────────────────────────────────────────

function NativePlayerCore(props: NativePlayerCoreProps) {
	const {
		fileUrl,
		initialTime,
		playerWrapperRef,
		onTimeUpdate,
		onDurationChange,
		onPlayStateChange,
		onEnded,
		setCurrentTime,
		setDuration,
		setPaused,
		saveProgress,
	} = props

	const playerRef = useRef<HTMLVideoElement>(null)

	// ── Controller: выполнение команд из PlayerContext ───────────────────
	usePlayerController(playerRef)

	// ── Рендер ──────────────────────────────────────────────────────────

	function syncTime(currentTime: number) {
		setCurrentTime(currentTime)
		onTimeUpdate?.(currentTime)
		saveProgress(currentTime)
	}

	// Точная синхронизация времени (~20 раз/сек), чтобы автопауза срабатывала
	// у границы субтитра без заметного перелёта в следующий субтитр.
	const syncTimeRef = useRef(syncTime)
	syncTimeRef.current = syncTime

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
		<div className='video-root' ref={playerWrapperRef}>
			<video
				src={fileUrl}
				className='video-root__video'
				ref={playerRef}
				onTimeUpdate={(e) => syncTime(e.currentTarget.currentTime)}
				onSeeked={(e) => syncTime(e.currentTarget.currentTime)}
				onLoadedMetadata={(e) => {
					const duration = e.currentTarget.duration
					setDuration(duration)
					onDurationChange?.(duration)

					const savedTime = initialTime ?? 0
					if (savedTime > 0 && savedTime < duration) {
						e.currentTarget.currentTime = savedTime
						setCurrentTime(savedTime)
					}
				}}
				onPlay={() => {
					setPaused(false)
					onPlayStateChange?.(false)
				}}
				onPause={() => {
					setPaused(true)
					onPlayStateChange?.(true)
				}}
				onEnded={onEnded}
			/>
			<VideoProgress />
		</div>
	)
}

export default NativePlayerCore
