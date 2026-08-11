import { LanguageCode, languages } from '@/shared/utils/languages'

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
	 * Последняя открытая вкладка на медиа-страницах.
	 *
	 * Ключ: `lastMediaTab:<pageKey>`.
	 * `pageKey` — уникальный идентификатор страницы (например `"books"`, `"youtube"`).
	 */
	lastMediaTab: {
		/**
		 * Возвращает ключ последней открытой вкладки.
		 *
		 * @param pageKey — уникальный ключ страницы
		 * @returns ключ вкладки или `null`, если запись отсутствует
		 */
		get(pageKey: string): string | null {
			if (typeof window === 'undefined') return null

			const raw = window.localStorage.getItem(lastMediaTabKey(pageKey))
			return raw || null
		},

		/**
		 * Сохраняет ключ последней открытой вкладки.
		 *
		 * @param pageKey — уникальный ключ страницы
		 * @param tabKey — ключ вкладки
		 */
		set(pageKey: string, tabKey: string) {
			if (typeof window === 'undefined') return
			window.localStorage.setItem(lastMediaTabKey(pageKey), tabKey)
		},
	},

	/**
	 * Последний выбранный фильтр длительности видео.
	 *
	 * Ключ: `lastVideoDuration`.
	 */
	lastDuration: {
		/**
		 * Возвращает сохранённый ключ длительности.
		 *
		 * @returns ключ длительности, по умолчанию `""`
		 */
		get(): string {
			if (typeof window === 'undefined') return ''
			return window.localStorage.getItem(LAST_VIDEO_DURATION_KEY) || ''
		},

		/**
		 * Сохраняет ключ длительности.
		 *
		 * @param durationKey — ключ длительности (например `""`, `"0-5"`, `"5-15"`)
		 */
		set(durationKey: string) {
			if (typeof window === 'undefined') return
			window.localStorage.setItem(LAST_VIDEO_DURATION_KEY, durationKey)
		},
	},

	/**
	 * Последний выбранный фильтр уровня владения языком.
	 *
	 * Ключ: `lastVideoProficiency`.
	 */
	lastProficiency: {
		/**
		 * Возвращает сохранённый ключ уровня.
		 *
		 * @returns ключ уровня, по умолчанию `""`
		 */
		get(): string {
			if (typeof window === 'undefined') return ''
			return window.localStorage.getItem(LAST_VIDEO_PROFICIENCY_KEY) || ''
		},

		/**
		 * Сохраняет ключ уровня.
		 *
		 * @param proficiencyKey — ключ уровня (например `""`, `"1"`, `"2"`)
		 */
		set(proficiencyKey: string) {
			if (typeof window === 'undefined') return
			window.localStorage.setItem(LAST_VIDEO_PROFICIENCY_KEY, proficiencyKey)
		},
	},

	/**
	 * Последний выбранный фильтр темы видео.
	 *
	 * Ключ: `lastVideoTopic`.
	 */
	lastTopic: {
		/**
		 * Возвращает сохранённый ключ темы.
		 *
		 * @returns ключ темы, по умолчанию `""`
		 */
		get(): string {
			if (typeof window === 'undefined') return ''
			return window.localStorage.getItem(LAST_VIDEO_TOPIC_KEY) || ''
		},

		/**
		 * Сохраняет ключ темы.
		 *
		 * @param topicKey — ключ темы
		 */
		set(topicKey: string) {
			if (typeof window === 'undefined') return
			window.localStorage.setItem(LAST_VIDEO_TOPIC_KEY, topicKey)
		},
	},

	/**
	 * Последний выбранный язык в списке публичных книг.
	 *
	 * Ключ: `lastBookLanguage`.
	 */
	lastLanguage: {
		/**
		 * Возвращает сохранённый код языка.
		 *
		 * @returns код языка, по умолчанию `"en"`
		 */
		get(): LanguageCode {
			const defaultValue = languages.en.code as LanguageCode

			if (typeof window === 'undefined') return defaultValue

			const raw = window.localStorage.getItem(LAST_LANGUAGE_KEY) as LanguageCode
			return raw || defaultValue
		},

		/**
		 * Сохраняет код языка.
		 *
		 * @param languageCode — код языка (например `"en"`, `"ru"`)
		 */
		set(languageCode: string) {
			if (typeof window === 'undefined') return
			window.localStorage.setItem(LAST_LANGUAGE_KEY, languageCode)
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

// ── lastLanguage helpers ───────────────────────────────────────────────

const LAST_LANGUAGE_KEY = 'lastLanguage'

const LAST_VIDEO_DURATION_KEY = 'lastVideoDuration'
const LAST_VIDEO_PROFICIENCY_KEY = 'lastVideoProficiency'
const LAST_VIDEO_TOPIC_KEY = 'lastVideoTopic'

// ── lastMediaTab helpers ───────────────────────────────────────────────────

function lastMediaTabKey(pageKey: string) {
	return `lastMediaTab:${pageKey}`
}

// ── videoProgress helpers ──────────────────────────────────────────────────

function videoProgressKey(videoId: number) {
	return `video_progress_seconds:${videoId}`
}
