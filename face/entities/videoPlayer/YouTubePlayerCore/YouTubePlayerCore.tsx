'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { PlayerCommandEvent } from '../VideoPlayer/fn/types'
import { useYouTubeController } from './fn/useYouTubeController'
import { loadYouTubeIframeApi, YouTubePlayerState } from './fn/youTubeIframeApi'
import type { YouTubePlayer } from './fn/youTubeIframeApi'
import './YouTubePlayerCore.scss'

// ── Props ──────────────────────────────────────────────────────────────

type YouTubePlayerCoreProps = {
	youTubeVideoId: string
	/** Соотношение сторон в CSS-формате, например "1280 / 720". По умолчанию "16 / 9". */
	ratio?: string
	initialTime?: number
	command?: PlayerCommandEvent | null
	onCommandHandled?: (id: number) => void
	onTimeUpdate?: (currentTime: number) => void
	onDurationChange?: (duration: number) => void
	onPlayStateChange?: (paused: boolean) => void
	onEnded?: () => void
	onProgressSave?: (seconds: number) => void
}

// ── Константы ──────────────────────────────────────────────────────────

/** Интервал опроса getCurrentTime() во время воспроизведения */
const TIME_POLL_INTERVAL = 50

// ── Компонент ──────────────────────────────────────────────────────────

function YouTubePlayerCore(props: YouTubePlayerCoreProps) {
	const {
		youTubeVideoId,
		ratio,
		initialTime,
		command,
		onCommandHandled,
		onTimeUpdate,
		onDurationChange,
		onPlayStateChange,
		onEnded,
		onProgressSave,
	} = props

	// ── Соотношение сторон (из YouTube Data API или фоллбек) ────────────

	const aspectRatio = ratio || '16 / 9'

	// ── Refs ──────────────────────────────────────────────────────────

	const playerRef = useRef<YouTubePlayer | null>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
	const initialTimeRef = useRef(initialTime)
	const [isReady, setIsReady] = useState(false)
	const [, setCurrentTime] = useState(0)
	const [, setDuration] = useState(0)
	initialTimeRef.current = initialTime

	// ── Controller: исполнение команды, полученной через props ─────────

	useYouTubeController(playerRef, isReady, command, { setCurrentTime, onTimeUpdate }, onCommandHandled)

	// ── Опрос времени ─────────────────────────────────────────────────

	const startPolling = useCallback(() => {
		if (pollIntervalRef.current) return

		pollIntervalRef.current = setInterval(() => {
			const player = playerRef.current
			if (!player) return

			const t = player.getCurrentTime()
			setCurrentTime(t)
			onTimeUpdate?.(t)

			// Сохранение прогресса дросселируется владельцем плеера.
			onProgressSave?.(t)
		}, TIME_POLL_INTERVAL)
	}, [onProgressSave, onTimeUpdate])

	const stopPolling = useCallback(() => {
		if (!pollIntervalRef.current) return

		clearInterval(pollIntervalRef.current)
		pollIntervalRef.current = null
	}, [])

	// ── Инициализация YouTube-плеера ──────────────────────────────────

	useEffect(() => {
		let disposed = false
		setIsReady(false)

		async function initPlayer() {
			await loadYouTubeIframeApi()

			if (disposed || !containerRef.current || !window.YT) return

			playerRef.current = new window.YT.Player(containerRef.current, {
				videoId: youTubeVideoId,
				playerVars: {
					autoplay: 0,
					controls: 1, // Временно включены для отладки 403
					modestbranding: 1,
					rel: 0, // Не показывать похожие видео в конце
					playsinline: 1,
					origin: window.location.origin,
				},
				events: {
					onReady(event) {
						if (disposed) {
							event.target.destroy()
							return
						}

						const d = event.target.getDuration()
						setDuration(d)
						onDurationChange?.(d)

						const savedTime = initialTimeRef.current ?? 0
						if (savedTime > 0 && savedTime < d) {
							event.target.seekTo(savedTime, true)
							setCurrentTime(savedTime)
						}

						setIsReady(true)
					},

					onStateChange(event) {
						if (disposed) return

						const state = event.data

						if (state === YouTubePlayerState.PLAYING) {
							onPlayStateChange?.(false)
							startPolling()
						} else if (state === YouTubePlayerState.BUFFERING) {
							// Буферизация — продолжаем опрос, время может идти
							startPolling()
						} else if (state === YouTubePlayerState.PAUSED) {
							onPlayStateChange?.(true)
							stopPolling()
							// Последний замер времени
							const t = event.target.getCurrentTime()
							setCurrentTime(t)
							onTimeUpdate?.(t)
						} else if (state === YouTubePlayerState.ENDED) {
							onPlayStateChange?.(true)
							stopPolling()
							onEnded?.()
						}
					},

					onError(event) {
						const errorCodes: Record<number, string> = {
							2: 'Неверный ID видео',
							5: 'Ошибка HTML5-плеера',
							100: 'Видео не найдено или удалено',
							101: 'Владелец запретил встраивание',
							150: 'Владелец запретил встраивание',
						}

						const message = errorCodes[event.data] ?? `Ошибка YouTube (код ${event.data})`
						console.error(message)
					},
				},
			})
		}

		void initPlayer()

		return () => {
			disposed = true
			stopPolling()
			playerRef.current?.destroy()
			playerRef.current = null
			setIsReady(false)
		}
		// плеер пересоздаётся только при смене videoId
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [youTubeVideoId])

	// Очистка поллинга при размонтировании
	useEffect(() => {
		return () => stopPolling()
	}, [stopPolling])

	// ── Рендер ────────────────────────────────────────────────────────

	return (
		<div className='video-root'>
			<div className='video-root__youtube-container' ref={containerRef} style={{ aspectRatio }} />
		</div>
	)
}

export default YouTubePlayerCore
