/**
 * Типы и загрузчик для YouTube IFrame Player API.
 *
 * Описывает только ту часть API, которая реально используется
 * в YouTubePlayerCore и useYouTubeController.
 */

// ── Состояния плеера ────────────────────────────────────────────────────

/*export const YouTubePlayerState = {
	UNSTARTED: -1,
	ENDED: 0,
	PLAYING: 1,
	PAUSED: 2,
	BUFFERING: 3,
	CUED: 5,
} as const*/

// Тип: значения перечисления
// export type YouTubePlayerStateValue = (typeof YouTubePlayerState)[keyof typeof YouTubePlayerState]

// ── Интерфейс YouTube-плеера ─────────────────────────────────────────────

/*export interface YouTubePlayer {
	playVideo(): void
	pauseVideo(): void
	seekTo(seconds: number, allowSeekAhead: boolean): void
	getCurrentTime(): number
	getDuration(): number
	setPlaybackRate(rate: number): void
	getPlaybackRate(): number
	setVolume(volume: number): void
	getVolume(): number
	getPlayerState(): number
	destroy(): void
}*/

// ── Опции создания плеера ───────────────────────────────────────────────

/*export interface YouTubePlayerOptions {
	videoId: string
	width?: string | number
	height?: string | number
	playerVars?: {
		autoplay?: 0 | 1
		controls?: 0 | 1
		modestbranding?: 0 | 1
		rel?: 0 | 1
		playsinline?: 0 | 1
		[key: string]: unknown
	}
	events?: {
		onReady?: (event: { target: YouTubePlayer }) => void
		onStateChange?: (event: { target: YouTubePlayer; data: number }) => void
		onError?: (event: { target: YouTubePlayer; data: number }) => void
	}
}*/

// ── Глобальные типы ─────────────────────────────────────────────────────

/*declare global {
	interface Window {
		YT?: {
			Player: new (elementId: string | HTMLElement, options: YouTubePlayerOptions) => YouTubePlayer
			PlayerState: typeof YouTubePlayerState
		}
		onYouTubeIframeAPIReady?: () => void
	}
}*/

// ── Загрузчик API ───────────────────────────────────────────────────────

// let apiLoadPromise: Promise<void> | null = null

/**
 * Загружает YouTube IFrame Player API.
 *
 * Безопасно вызывать несколько раз — при повторном вызове возвращает
 * тот же самый Promise. Если API уже загружен (window.YT существует),
 * резолвится мгновенно.
 *
 * На сервере (SSR) сразу резолвится, не добавляя тег <script>.
 */
/*export function loadYouTubeIframeApi(): Promise<void> {
	if (typeof window === 'undefined') return Promise.resolve()

	// Уже загружен
	if (window.YT?.Player) {
		return Promise.resolve()
	}

	// Уже загружается — возвращаем существующий Promise
	if (apiLoadPromise) return apiLoadPromise

	apiLoadPromise = new Promise<void>((resolve) => {
		const previousCallback = window.onYouTubeIframeAPIReady

		window.onYouTubeIframeAPIReady = () => {
			previousCallback?.()
			resolve()
		}

		// Другой код уже добавил тег <script> — ждём колбэк
		if (document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
			return
		}

		const script = document.createElement('script')
		script.src = 'https://www.youtube.com/iframe_api'
		document.head.appendChild(script)
	})

	return apiLoadPromise
}*/
