import { LanguageCode } from 'utils/languages'
import { create } from 'zustand'
import {
	UniversalPhrase_GetDocument,
	UniversalPhrase_CreateDocument,
	UniversalPhaseTranscriptionGetOrCreateDocument,
	UniversalPhraseAudioGetOrCreateDocument,
} from '@/graphql'
import { apolloClient } from '@/graphql/apollo'

// ---- Types ----

export type EntryStatus = 'idle' | 'loading' | 'ready' | 'error'

export type EntryData = {
	phrase: string
	languageCode: LanguageCode
	phraseId: number | null
	transcription: string | null
	transcriptionStatus: EntryStatus
	audioUrl: string | null
	audioStatus: EntryStatus
}

export type PreloadItem = {
	phrase: string
	languageCode: LanguageCode
	transcription?: string
	audioUrl?: string | null
}

type TranscriptionAudioStoreValues = {
	entries: Record<string, EntryData>
}

type TranscriptionAudioStoreMethods = {
	preload: (items: PreloadItem[]) => void
	ensureTranscription: (phrase: string, languageCode: LanguageCode) => Promise<void>
	ensureAudio: (phrase: string, languageCode: LanguageCode) => Promise<void>
	get: (phrase: string, languageCode: LanguageCode) => EntryData | undefined
}

type TranscriptionAudioStore = TranscriptionAudioStoreValues & TranscriptionAudioStoreMethods

// ---- Helpers ----

export function makeKey(phrase: string, languageCode: LanguageCode): string {
	return `${languageCode}:${phrase.trim().toLocaleLowerCase()}`
}

// ---- Request deduplication (module-level singletons) ----

const transcriptionRequests = new Map<string, Promise<void>>()
const audioRequests = new Map<string, Promise<void>>()

// ---- Phrase resolution (imperative Apollo, mirrors resolveUniversalPhrase.ts pattern) ----

type PhraseData = {
	id: number
	text: string
	sourceLanguageCode: string
	transcription?: { id: number; universalPhraseId: number; ipa?: string | null; pinyin?: string | null } | null
	audioPronunciation?: { id: number; universalPhraseId: number; audioUrl: string } | null
}

type PhraseResult = { ok: true; data: PhraseData } | { ok: false }

const phraseRequestCache = new Map<string, Promise<PhraseResult>>()

async function resolvePhrase(phrase: string, languageCode: LanguageCode): Promise<PhraseResult> {
	const key = makeKey(phrase, languageCode)
	const cached = phraseRequestCache.get(key)
	if (cached) return cached

	const request: Promise<PhraseResult> = (async function () {
		try {
			const result = await apolloClient.query({
				query: UniversalPhrase_GetDocument,
				variables: { input: { text: phrase, sourceLanguageCode: languageCode } },
				fetchPolicy: 'network-only',
			})

			const data = result.data?.universal_phrase_get ?? null
			if (data) return { ok: true, data }
		} catch {
			// fall through to create
		}

		try {
			const result = await apolloClient.mutate({
				mutation: UniversalPhrase_CreateDocument,
				variables: { input: { text: phrase, sourceLanguageCode: languageCode } },
			})

			const data = result.data?.universal_phrase_create ?? null
			if (data) return { ok: true, data }
		} catch {
			// fall through to failure
		}

		return { ok: false }
	})()

	phraseRequestCache.set(key, request)
	request.then(function (result) {
		if (!result.ok) phraseRequestCache.delete(key)
	})

	return request
}

// ---- Store ----

export const useTranscriptionAudioStore = create<TranscriptionAudioStore>()(function (set, get) {
	function setEntry(key: string, patch: Partial<EntryData>) {
		set(function (state) {
			const existing = state.entries[key]
			return {
				entries: {
					...state.entries,
					[key]: { ...existing, ...patch } as EntryData,
				},
			}
		})
	}

	function ensureEntry(key: string, phrase: string, languageCode: LanguageCode): EntryData {
		const existing = get().entries[key]
		if (existing) return existing

		const newEntry: EntryData = {
			phrase,
			languageCode,
			phraseId: null,
			transcription: null,
			transcriptionStatus: 'idle',
			audioUrl: null,
			audioStatus: 'idle',
		}

		set(function (state) {
			return {
				entries: {
					...state.entries,
					[key]: newEntry,
				},
			}
		})

		return newEntry
	}

	return {
		entries: {},

		preload: function (items: PreloadItem[]) {
			set(function (state) {
				const nextEntries = { ...state.entries }

				for (const item of items) {
					const key = makeKey(item.phrase, item.languageCode)
					const existing = nextEntries[key]

					if (existing && existing.phraseId !== null) {
						// Entry already resolved — only fill in missing fields, never downgrade
						const patch: Partial<EntryData> = {}
						if (!existing.transcription && item.transcription) {
							patch.transcription = item.transcription
							patch.transcriptionStatus = 'ready'
						}
						if (!existing.audioUrl && item.audioUrl) {
							patch.audioUrl = item.audioUrl
							patch.audioStatus = 'ready'
						}
						if (Object.keys(patch).length > 0) {
							nextEntries[key] = { ...existing, ...patch } as EntryData
						}
					} else if (!existing) {
						// No entry yet — create from preload data
						nextEntries[key] = {
							phrase: item.phrase,
							languageCode: item.languageCode,
							phraseId: null,
							transcription: item.transcription ?? null,
							transcriptionStatus: item.transcription ? 'ready' : 'idle',
							audioUrl: item.audioUrl ?? null,
							audioStatus: item.audioUrl ? 'ready' : 'idle',
						}
					}
				}

				return { entries: nextEntries }
			})
		},

		ensureTranscription: async function (phrase: string, languageCode: LanguageCode) {
			const key = makeKey(phrase, languageCode)
			const existing = get().entries[key]

			if (existing && (existing.transcriptionStatus === 'loading' || existing.transcriptionStatus === 'ready')) {
				return
			}

			if (transcriptionRequests.has(key)) return

			const promise: Promise<void> = (async function () {
				ensureEntry(key, phrase, languageCode)
				setEntry(key, { transcriptionStatus: 'loading' })

				try {
					const phraseResult = await resolvePhrase(phrase, languageCode)
					if (!phraseResult.ok) {
						setEntry(key, { transcriptionStatus: 'error' })
						return
					}

					const phraseData = phraseResult.data
					const phraseId = phraseData.id

					let transcriptionIpa: string | null = null
					let audioUrl: string | null = null

					// Extract transcription from phrase response
					const existingTranscription = phraseData.transcription
					if (existingTranscription) {
						transcriptionIpa = existingTranscription.ipa ?? null
					}

					// Extract audio from phrase response
					const existingAudio = phraseData.audioPronunciation
					if (existingAudio) {
						audioUrl = existingAudio.audioUrl
					}

					// If no transcription in phrase, create one
					if (!transcriptionIpa) {
						try {
							const transcriptionResult = await apolloClient.mutate({
								mutation: UniversalPhaseTranscriptionGetOrCreateDocument,
								variables: { input: { universalPhraseId: phraseId } },
							})
							transcriptionIpa =
								transcriptionResult.data?.universal_phrase_transcription_get_or_create?.ipa ?? null
						} catch {
							// transcription creation failed, will show error
						}
					}

					setEntry(key, {
						phraseId,
						transcription: transcriptionIpa,
						transcriptionStatus: 'ready',
						audioUrl: audioUrl,
						audioStatus: audioUrl ? 'ready' : 'idle',
					})
				} catch {
					setEntry(key, { transcriptionStatus: 'error' })
				} finally {
					transcriptionRequests.delete(key)
				}
			})()

			transcriptionRequests.set(key, promise)
			promise.catch(function () {
				transcriptionRequests.delete(key)
			})

			await promise
		},

		ensureAudio: async function (phrase: string, languageCode: LanguageCode) {
			const key = makeKey(phrase, languageCode)
			const existing = get().entries[key]

			if (existing && existing.audioUrl && existing.audioStatus === 'ready') {
				return
			}

			if (audioRequests.has(key)) return

			const promise: Promise<void> = (async function () {
				ensureEntry(key, phrase, languageCode)
				setEntry(key, { audioStatus: 'loading' })

				try {
					let phraseId = get().entries[key]?.phraseId ?? null

					// Resolve phrase if needed
					if (phraseId === null) {
						const phraseResult = await resolvePhrase(phrase, languageCode)
						if (!phraseResult.ok) {
							setEntry(key, { audioStatus: 'error' })
							return
						}
						phraseId = phraseResult.data.id

						// Check if audio was included
						const phraseAudio = phraseResult.data.audioPronunciation
						if (phraseAudio) {
							setEntry(key, {
								phraseId,
								audioUrl: phraseAudio.audioUrl,
								audioStatus: 'ready',
							})
							return
						}

						setEntry(key, { phraseId })
					}

					// Create audio
					const audioResult = await apolloClient.mutate({
						mutation: UniversalPhraseAudioGetOrCreateDocument,
						variables: { input: { universalPhraseId: phraseId } },
					})

					const audioUrl = audioResult.data?.universal_phrase_audio_get_or_create?.audioUrl ?? null
					setEntry(key, {
						audioUrl,
						audioStatus: audioUrl ? 'ready' : 'error',
					})
				} catch {
					setEntry(key, { audioStatus: 'error' })
				} finally {
					audioRequests.delete(key)
				}
			})()

			audioRequests.set(key, promise)
			promise.catch(function () {
				audioRequests.delete(key)
			})

			await promise
		},

		get: function (phrase: string, languageCode: LanguageCode) {
			return get().entries[makeKey(phrase, languageCode)]
		},
	}
})
