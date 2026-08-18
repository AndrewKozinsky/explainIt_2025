/**
 * Общие чистые помощники для форматирования SRT-таймкодов.
 *
 * Вынесены в отдельный модуль, потому что используются и `SubtitlesService`
 * (сборка SRT из Deepgram-utterances), и конвертером YouTube VTT → SRT
 * (`youtubeVttToSrt.ts`).
 */

/**
 * Форматирует миллисекунды в SRT-таймкод `HH:MM:SS,mmm`.
 */
export function formatSrtTimeMs(ms: number): string {
	const clamped = Math.max(0, Math.floor(ms))
	const h = Math.floor(clamped / 3_600_000)
	const m = Math.floor((clamped % 3_600_000) / 60_000)
	const s = Math.floor((clamped % 60_000) / 1_000)
	const millis = clamped % 1_000

	const pad = (n: number, w = 2) => String(n).padStart(w, '0')
	return `${pad(h)}:${pad(m)}:${pad(s)},${pad(millis, 3)}`
}
