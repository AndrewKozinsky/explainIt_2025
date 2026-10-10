import type { AiDialogueVisualsModel } from '@/entities/aiDialogue/repository/AiDialogueRepository'

export function hasPendingDialogueVisuals(visuals: AiDialogueVisualsModel | undefined): boolean {
	const pending = ['queued', 'waitingDependencies', 'generating']
	return Boolean(
		visuals &&
		[...visuals.characters, ...visuals.scenes].some((item) => pending.includes(item.generationStatus ?? '')),
	)
}

/** Polling never changes a generation status or submits a new generation. */
export function getVisualsRefreshInterval(
	visuals: AiDialogueVisualsModel | undefined,
	pendingSince: number,
	now: number,
	hasError = false,
): number {
	if (!visuals || hasError) return 60_000

	const expiry = Date.parse(visuals.urlsExpireAt) - now - 60_000
	const refreshIn = Number.isFinite(expiry) ? Math.max(60_000, expiry) : 60_000
	if (!hasPendingDialogueVisuals(visuals)) return refreshIn

	const elapsed = now - pendingSince
	const pollIn = elapsed < 120_000 ? 15_000 : elapsed < 300_000 ? 30_000 : 60_000

	return Math.min(refreshIn, pollIn)
}
