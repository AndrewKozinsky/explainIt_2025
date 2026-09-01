import { LanguageCode } from '@/shared/utils/languages'

const LAST_LANGUAGE_KEY = 'lastLanguage'
const LAST_VIDEO_DURATION_KEY = 'lastVideoDuration'
const LAST_VIDEO_PROFICIENCY_KEY = 'lastVideoProficiency'
const LAST_VIDEO_TOPIC_KEY = 'lastVideoTopic'
const LAST_VIDEO_SORT_KEY = 'lastVideoSort'

export const lastDuration = {
	get: () => get(LAST_VIDEO_DURATION_KEY),
	set: (value: string) => set(LAST_VIDEO_DURATION_KEY, value),
}

export const lastProficiency = {
	get: () => get(LAST_VIDEO_PROFICIENCY_KEY),
	set: (value: string) => set(LAST_VIDEO_PROFICIENCY_KEY, value),
}

export const lastTopic = {
	get: () => get(LAST_VIDEO_TOPIC_KEY),
	set: (value: string) => set(LAST_VIDEO_TOPIC_KEY, value),
}

export const lastSort = {
	get: () => get(LAST_VIDEO_SORT_KEY),
	set: (value: string) => set(LAST_VIDEO_SORT_KEY, value),
}

export const lastLanguage = {
	get(): null | LanguageCode {
		if (typeof window === 'undefined') return null
		return (window.localStorage.getItem(LAST_LANGUAGE_KEY) as LanguageCode) ?? null
	},

	set: (value: string) => set(LAST_LANGUAGE_KEY, value),
}

function get(key: string): string {
	if (typeof window === 'undefined') return ''
	return window.localStorage.getItem(key) || ''
}

function set(key: string, value: string) {
	if (typeof window === 'undefined') return
	window.localStorage.setItem(key, value)
}
