// import type { VideoSubtitlesModel } from '@/entities/video/lib/types'

// type Subtitle = VideoSubtitlesModel.Subtitle

/**
 * Индекс активного субтитра (полуинтервал [fromSeconds, toSeconds)) или -1.
 */
/*export function findActiveSubtitleIndex(subtitles: Subtitle[], t: number): number {
	for (let i = 0; i < subtitles.length; i++) {
		if (t >= subtitles[i].fromSeconds && t < subtitles[i].toSeconds) return i
	}

	return -1
}*/

/**
 * Индекс первого субтитра, начинающегося строго после `t` («следующий»), или -1.
 */
/*export function findNextSubtitleIndex(subtitles: Subtitle[], t: number): number {
	for (let i = 0; i < subtitles.length; i++) {
		if (subtitles[i].fromSeconds > t) return i
	}

	return -1
}*/

/**
 * Индекс последнего субтитра, закончившегося к моменту `t` («предыдущий»), или -1.
 */
/*export function findPrevSubtitleIndex(subtitles: Subtitle[], t: number): number {
	let result = -1

	for (let i = 0; i < subtitles.length; i++) {
		if (subtitles[i].toSeconds <= t) result = i
		else break
	}

	return result
}*/
