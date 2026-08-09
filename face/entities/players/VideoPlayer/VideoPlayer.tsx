'use client'

import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react'
import NativePlayerCore from './NativePlayerCore/NativePlayerCore'
import { PlayerContext } from './PlayerContext'
import YouTubePlayerCore from './YouTubePlayerCore/YouTubePlayerCore'
import './VideoPlayer.scss'
import type { PlayerCommand } from './fn/types'
import type { PlayerContextValue } from './PlayerContext'

// ── Public API ────────────────────────────────────────────────────────

export type VideoPlayerHandle = {
	sendCommand: (command: PlayerCommand) => void
}

type VideoPlayerProps = {
	/** URL видеофайла (S3). Если передан — используется нативный <video> */
	fileUrl?: string
	/** ID видео на YouTube. Если передан — используется YouTube IFrame Player */
	youTubeVideoId?: string
	/** Соотношение сторон плеера в CSS-формате "1280 / 720" (из YouTube Data API) */
	ratio?: string
	videoId?: number
	initialTime?: number
	onTimeUpdate?: (currentTime: number) => void
	onDurationChange?: (duration: number) => void
	onPlayStateChange?: (paused: boolean) => void
	onProgressSave?: (videoId: number, seconds: number) => void
}

// ── Общие пропсы для обоих Core-компонентов ──────────────────────────

type CommonCoreProps = {
	initialTime?: number
	playerWrapperRef: React.RefObject<HTMLDivElement | null>
	onTimeUpdate?: (currentTime: number) => void
	onDurationChange?: (duration: number) => void
	onPlayStateChange?: (paused: boolean) => void
	setCurrentTime: (t: number) => void
	setDuration: (d: number) => void
	setPaused: (p: boolean) => void
	saveProgress: (seconds: number) => void
}

// ── Компонент-обёртка ────────────────────────────────────────────────

const VideoPlayer = forwardRef<VideoPlayerHandle, VideoPlayerProps>(function VideoPlayer(props, ref) {
	const {
		fileUrl,
		youTubeVideoId,
		ratio,
		videoId,
		initialTime,
		onTimeUpdate,
		onDurationChange,
		onPlayStateChange,
		onProgressSave,
	} = props

	const playerWrapperRef = useRef<HTMLDivElement>(null)

	// ── Player state ───────────────────────────────────────────────────

	const [currentTime, setCurrentTime] = useState(0)
	const [duration, setDuration] = useState(0)
	const [paused, setPaused] = useState(true)

	// ── Command bus ────────────────────────────────────────────────────

	// Счётчик ts нужен для повторных одинаковых команд (например, REWIND +10 дважды)
	const [commandState, setCommandState] = useState<{ cmd: PlayerCommand; ts: number } | null>(null)

	const sendCommand = useCallback((cmd: PlayerCommand) => {
		setCommandState({ cmd, ts: performance.now() })
	}, [])

	useImperativeHandle(ref, () => ({ sendCommand }), [sendCommand])

	// ── Throttled progress save ────────────────────────────────────────

	const lastSaveRef = useRef(0)

	const saveProgress = useCallback(
		(seconds: number) => {
			if (videoId === undefined || !onProgressSave) return
			const now = Date.now()
			if (now - lastSaveRef.current < 1000) return
			lastSaveRef.current = now
			onProgressSave(videoId, seconds)
		},
		[videoId, onProgressSave],
	)

	// ── Context value ──────────────────────────────────────────────────

	const ctx: PlayerContextValue = useMemo(
		() => ({
			currentTime,
			duration,
			paused,
			command: commandState?.cmd ?? null,
			sendCommand,
		}),
		[currentTime, duration, paused, commandState, sendCommand],
	)

	// ── Общие пропсы для Core ──────────────────────────────────────────

	const commonProps: CommonCoreProps = {
		initialTime,
		playerWrapperRef,
		onTimeUpdate,
		onDurationChange,
		onPlayStateChange,
		setCurrentTime,
		setDuration,
		setPaused,
		saveProgress,
	}

	// ── Render ─────────────────────────────────────────────────────────

	return (
		<PlayerContext.Provider value={ctx}>
			{fileUrl && <NativePlayerCore fileUrl={fileUrl} {...commonProps} />}
			{youTubeVideoId && <YouTubePlayerCore youTubeVideoId={youTubeVideoId} ratio={ratio} {...commonProps} />}
		</PlayerContext.Provider>
	)
})

export default VideoPlayer
