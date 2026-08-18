const LAST_CHAPTER_KEY = 'lastOpenedChapter'

type LastOpenedChapters = Record<string, number>

function readAll(): LastOpenedChapters {
	const raw = typeof window === 'undefined' ? null : window.localStorage.getItem(LAST_CHAPTER_KEY)
	if (!raw) return {}

	try {
		const parsed: unknown = JSON.parse(raw)
		if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
			return parsed as LastOpenedChapters
		}
	} catch {
		// Ignore malformed localStorage data.
	}

	return {}
}

function writeAll(data: LastOpenedChapters) {
	if (typeof window === 'undefined') return
	window.localStorage.setItem(LAST_CHAPTER_KEY, JSON.stringify(data))
}

export const lastBookChapter = {
	get(bookUrlId: string): number | null {
		const value = readAll()[bookUrlId]
		return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : null
	},

	set(bookUrlId: string, chapterId: number) {
		if (!Number.isFinite(chapterId) || chapterId <= 0) return

		const all = readAll()
		all[bookUrlId] = chapterId
		writeAll(all)
	},
}
