// 'use client'

// import { useRef } from 'react'
// import { usePlayerController } from '../fn/controller'
// import { usePlayerControl } from '../fn/playerControl'
// import VideoProgress from '../VideoProgress'

// ── Props ──────────────────────────────────────────────────────────────

/*type NativePlayerCoreProps = {
	fileUrl: string
	initialTime?: number
	playerWrapperRef: React.RefObject<HTMLDivElement | null>
	onTimeUpdate?: (currentTime: number) => void
	onDurationChange?: (duration: number) => void
	onPlayStateChange?: (paused: boolean) => void
	setCurrentTime: (t: number) => void
	setDuration: (d: number) => void
	setPaused: (p: boolean) => void
	saveProgress: (seconds: number) => void
}*/

// ── Компонент ──────────────────────────────────────────────────────────

/*function NativePlayerCore(props: NativePlayerCoreProps) {
	const {
		fileUrl,
		initialTime,
		playerWrapperRef,
		onTimeUpdate,
		onDurationChange,
		onPlayStateChange,
		setCurrentTime,
		setDuration,
		setPaused,
		saveProgress,
	} = props

	const playerRef = useRef<HTMLVideoElement>(null)

	// ── Controller: выполнение команд из PlayerContext ───────────────────
	usePlayerController(playerRef)

	// ── Player controls: клавиатура + pointer-жесты ─────────────────────
	usePlayerControl(playerWrapperRef)

	// ── Рендер ──────────────────────────────────────────────────────────

	return (
		<div className='video-root' ref={playerWrapperRef}>
			<video
				src={fileUrl}
				className='video-root__video'
				ref={playerRef}
				onTimeUpdate={(e) => {
					const currentTime = e.currentTarget.currentTime
					setCurrentTime(currentTime)
					onTimeUpdate?.(currentTime)
					saveProgress(currentTime)
				}}
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
			/>
			<VideoProgress />
		</div>
	)
}*/

// export default NativePlayerCore
