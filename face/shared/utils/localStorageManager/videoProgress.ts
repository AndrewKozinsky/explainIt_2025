import { getItem, removeItem, setItem } from './storage'

type VideoProgressId = number | string

function key(videoId: VideoProgressId) {
	return `video_progress_seconds:${videoId}`
}

export const videoProgress = {
	get(videoId: VideoProgressId): number {
		const raw = getItem(key(videoId))
		if (!raw) return 0

		const value = Number(raw)
		return Number.isFinite(value) && value > 0 ? value : 0
	},

	set(videoId: VideoProgressId, seconds: number) {
		if (!Number.isFinite(seconds) || seconds <= 0) return
		setItem(key(videoId), String(seconds))
	},

	remove(videoId: VideoProgressId) {
		removeItem(key(videoId))
	},

	createSaver(videoId: VideoProgressId, options?: { throttleMs?: number }): (seconds: number) => void {
		const throttleMs = options?.throttleMs ?? 1000
		let lastSavedTs = 0

		return function saveProgress(seconds: number) {
			const now = Date.now()
			if (now - lastSavedTs < throttleMs) return
			lastSavedTs = now

			videoProgress.set(videoId, seconds)
		}
	},
}
