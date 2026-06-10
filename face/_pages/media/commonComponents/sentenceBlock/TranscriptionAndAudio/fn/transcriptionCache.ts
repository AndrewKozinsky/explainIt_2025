import { useDetailsStore } from '@/_pages/media/detailsBlock/detailsStore'

export function getCachedTranscription(phrase: string): string | null {
	const cached = getCachedEntry(phrase)
	return cached?.transcription || null
}

export function upsertCachedTranscription(phrase: string, transcription: string, audioUrl?: string | null) {
	const normalizedPhrase = normalizePhrase(phrase)
	if (!normalizedPhrase) return

	const state = useDetailsStore.getState()
	const nextTranscriptions = state.transcriptions.filter((item) => normalizePhrase(item.phrase) !== normalizedPhrase)
	nextTranscriptions.push({ phrase, transcription, audioUrl: audioUrl ?? null })
	state.updateStore({ transcriptions: nextTranscriptions })
}

function getCachedEntry(phrase: string) {
	const normalizedPhrase = normalizePhrase(phrase)
	if (!normalizedPhrase) return null

	const transcriptions = useDetailsStore.getState().transcriptions
	return transcriptions.find((item) => normalizePhrase(item.phrase) === normalizedPhrase) ?? null
}

function normalizePhrase(phrase: string): string {
	return phrase.trim().toLocaleLowerCase()
}
