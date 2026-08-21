import { formatDurationSec } from '@/shared/utils/time'

// Множитель, на который умножается длительность видео, чтобы получить
// длительность обратного отсчёта в секундах.
const COUNTDOWN_MULTIPLIER = 0.05

export function getSubtitlesGenerationTime(durationSeconds: number): null | string {
	const remainingSeconds = durationSeconds * COUNTDOWN_MULTIPLIER

	return formatDurationSec(remainingSeconds)
}
