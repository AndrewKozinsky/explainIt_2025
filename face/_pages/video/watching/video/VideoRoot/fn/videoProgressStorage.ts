export function getVideoProgressStorageKey(videoId: number) {
	return `video_progress_seconds:${videoId}`
}

export function loadVideoProgressSeconds(videoId: number): number {
	if (typeof window === 'undefined') return 0

	const key = getVideoProgressStorageKey(videoId)
	const raw = window.localStorage.getItem(key)
	if (!raw) return 0

	const value = Number(raw)
	if (!Number.isFinite(value) || value <= 0) return 0

	return value
}

export function saveVideoProgressSeconds(videoId: number, seconds: number) {
	if (typeof window === 'undefined') return
	if (!Number.isFinite(seconds) || seconds <= 0) return

	const key = getVideoProgressStorageKey(videoId)
	window.localStorage.setItem(key, String(seconds))
}

export function createVideoProgressSaver(videoId: number, options?: { throttleMs?: number }) {
	const throttleMs = options?.throttleMs ?? 1000
	let lastSavedTs = 0

	return function saveProgress(seconds: number) {
		const now = Date.now()
		if (now - lastSavedTs < throttleMs) return
		lastSavedTs = now

		saveVideoProgressSeconds(videoId, seconds)
	}
}
