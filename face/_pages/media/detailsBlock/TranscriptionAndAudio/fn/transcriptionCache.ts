import { useDetailsStore } from '../../detailsStore'

export function getCachedTranscription(phrase: string): string | null {
	const normalizedPhrase = normalizePhrase(phrase)
	if (!normalizedPhrase) return null

	const transcriptions = useDetailsStore.getState().transcriptions
	const cached = transcriptions.find((item) => normalizePhrase(item.phrase) === normalizedPhrase)
	return cached?.transcription ?? null
}

export function upsertCachedTranscription(phrase: string, transcription: string) {
	const normalizedPhrase = normalizePhrase(phrase)
	if (!normalizedPhrase) return

	const state = useDetailsStore.getState()
	const nextTranscriptions = state.transcriptions.filter((item) => normalizePhrase(item.phrase) !== normalizedPhrase)
	nextTranscriptions.push({ phrase, transcription })
	state.updateStore({ transcriptions: nextTranscriptions })
}

function normalizePhrase(phrase: string): string {
	return phrase.trim().toLocaleLowerCase()
}
