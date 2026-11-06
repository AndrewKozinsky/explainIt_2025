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
): number | false {
	if (!visuals || hasError) return 60_000
	if (!hasPendingDialogueVisuals(visuals)) return false

	const elapsed = now - pendingSince

	return elapsed < 120_000 ? 15_000 : elapsed < 300_000 ? 30_000 : 60_000
}
