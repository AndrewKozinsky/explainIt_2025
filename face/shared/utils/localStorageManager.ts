/**
 * Централизованный доступ к localStorage.
 *
 * Все ключи и логика работы с localStorage собраны здесь, чтобы:
 * - не плодить разрозненные обращения к localStorage по проекту;
 * - иметь единую точку для проверки SSR (typeof window === 'undefined');
 * - видеть все используемые ключи в одном месте.
 */
export const localStorageManager = {
	/**
	 * Последняя открытая глава каждой книги.
	 *
	 * Ключ книги — строка из `createMediaIdUrl()` (например `"p3"`, `"u46"`).
	 * Данные хранятся в ключе `lastOpenedChapter` как `Record<bookUrlId, chapterId>`.
	 */
	lastBookChapter: {
		/**
		 * Возвращает ID последней открытой главы.
		 *
		 * @param bookUrlId — идентификатор книги в URL (результат `createMediaIdUrl`)
		 * @returns ID главы или `null`, если запись отсутствует
		 */
		get(bookUrlId: string): null | number {
			const all = lastChapterReadAll()
			const value = all[bookUrlId]

			if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
				return value
			}

			return null
		},

		/**
		 * Сохраняет ID последней открытой главы.
		 *
		 * @param bookUrlId — идентификатор книги в URL (результат `createMediaIdUrl`)
		 * @param chapterId — ID главы
		 */
		set(bookUrlId: string, chapterId: number) {
			if (!Number.isFinite(chapterId) || chapterId <= 0) return

			const all = lastChapterReadAll()
			all[bookUrlId] = chapterId
			lastChapterWriteAll(all)
		},
	},

	/**
	 * Прогресс просмотра видео.
	 *
	 * Хранит позицию в секундах для каждого видео.
	 * Ключ: `video_progress_seconds:<videoId>`.
	 */
	videoProgress: {
		/**
		 * Возвращает сохранённую позицию видео в секундах.
		 *
		 * @param videoId — ID видео
		 * @returns позиция в секундах или 0, если запись отсутствует
		 */
		get(videoId: number): number {
			if (typeof window === 'undefined') return 0

			const key = videoProgressKey(videoId)
			const raw = window.localStorage.getItem(key)
			if (!raw) return 0

			const value = Number(raw)
			if (!Number.isFinite(value) || value <= 0) return 0

			return value
		},

		/**
		 * Сохраняет позицию видео в секундах.
		 *
		 * @param videoId — ID видео
		 * @param seconds — позиция в секундах
		 */
		set(videoId: number, seconds: number) {
			if (typeof window === 'undefined') return
			if (!Number.isFinite(seconds) || seconds <= 0) return

			const key = videoProgressKey(videoId)
			window.localStorage.setItem(key, String(seconds))
		},

		/**
		 * Создаёт троттлированную функцию сохранения прогресса видео.
		 * Полезно для вызова из обработчика `timeupdate` видеоплеера.
		 *
		 * @param videoId — ID видео
		 * @param options.throttleMs — интервал троттлинга в мс (по умолчанию 1000)
		 * @returns функция `(seconds: number) => void`, которую можно вызывать часто
		 */
		createSaver(videoId: number, options?: { throttleMs?: number }): (seconds: number) => void {
			const throttleMs = options?.throttleMs ?? 1000
			let lastSavedTs = 0

			return function saveProgress(seconds: number) {
				const now = Date.now()
				if (now - lastSavedTs < throttleMs) return
				lastSavedTs = now

				localStorageManager.videoProgress.set(videoId, seconds)
			}
		},
	},

	/**
	 * Признак скрытия онбординг-модалки.
	 *
	 * Ключ: `hideOnboardingModal`.
	 */
	onboarding: {
		/**
		 * Показывать ли онбординг-модалку.
		 *
		 * @returns `true`, если модалку нужно показать
		 */
		shouldShow(): boolean {
			if (typeof window === 'undefined') return false
			return window.localStorage.getItem(ONBOARDING_KEY) !== 'true'
		},

		/**
		 * Скрывает онбординг-модалку навсегда.
		 */
		hide() {
			if (typeof window === 'undefined') return
			window.localStorage.setItem(ONBOARDING_KEY, 'true')
		},
	},

	/**
	 * OAuth CSRF-токен.
	 *
	 * Ключ: `latestCSRFToken`.
	 */
	oauth: {
		/**
		 * Сохраняет CSRF-токен перед отправкой пользователя на страницу OAuth-провайдера.
		 *
		 * @param token — сгенерированная случайная строка
		 */
		setCSRFToken(token: string) {
			if (typeof window === 'undefined') return
			window.localStorage.setItem(OAUTH_CSRF_KEY, token)
		},
	},
}

// ── lastBookChapter helpers ────────────────────────────────────────────────

const LAST_CHAPTER_KEY = 'lastOpenedChapter'

type LastOpenedChapters = Record<string, number>

function lastChapterReadAll(): LastOpenedChapters {
	if (typeof window === 'undefined') return {}

	const raw = window.localStorage.getItem(LAST_CHAPTER_KEY)
	if (!raw) return {}

	try {
		const parsed = JSON.parse(raw)

		if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
			return parsed as LastOpenedChapters
		}

		return {}
	} catch {
		return {}
	}
}

function lastChapterWriteAll(data: LastOpenedChapters) {
	if (typeof window === 'undefined') return
	window.localStorage.setItem(LAST_CHAPTER_KEY, JSON.stringify(data))
}

// ── onboarding helpers ─────────────────────────────────────────────────────

const ONBOARDING_KEY = 'hideOnboardingModal'

// ── oauth helpers ──────────────────────────────────────────────────────────

const OAUTH_CSRF_KEY = 'latestCSRFToken'

// ── videoProgress helpers ──────────────────────────────────────────────────

function videoProgressKey(videoId: number) {
	return `video_progress_seconds:${videoId}`
}
