import type { DialogueAudioSnapshot } from '@/entities/aiDialogue/audio/dialogueAudioTypes'

export function hasPendingDialogueAudio(snapshot: DialogueAudioSnapshot | undefined): boolean {
	return Boolean(
		snapshot &&
		(snapshot.attempts.some((attempt) => attempt.status === 'active') ||
			snapshot.items.some((item) => item.status === 'queued' || item.status === 'generating')),
	)
}

/** Retry read-only snapshots with backoff; never change generation state or resubmit TTS. */
export function getAudioRefreshInterval(
	snapshot: DialogueAudioSnapshot | undefined,
	pendingSince: number,
	now: number,
	hasError = false,
): number | false {
	const elapsed = Math.max(0, now - pendingSince)
	const pollIn = elapsed < 120_000 ? 2000 : elapsed < 300_000 ? 15_000 : 60_000
	if (!snapshot || hasError) return Math.max(5000, pollIn)

	const dates = snapshot.items.map((item) => Date.parse(item.urlsExpireAt ?? '')).filter(Number.isFinite)
	const renewIn = dates.length ? Math.max(60_000, Math.min(...dates) - now - 60_000) : false
	if (!hasPendingDialogueAudio(snapshot)) return renewIn

	return renewIn === false ? pollIn : Math.min(pollIn, renewIn)
}
