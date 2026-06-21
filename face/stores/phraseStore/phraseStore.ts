import { LanguageCode } from 'utils/languages'
import { create } from 'zustand'
import {
	UniversalPhrase_GetDocument,
	UniversalPhrase_CreateDocument,
	UniversalPhaseTranscriptionGetOrCreateDocument,
	UniversalPhraseAudioGetOrCreateDocument,
} from '@/graphql'
import { apolloClient } from '@/graphql/apollo'
import { makePhraseKey } from './helpers'
import { EntryData, PhraseData, PhraseResult, PhraseStore, PreloadItem } from './types'

const phraseRequestCache = new Map<string, Promise<PhraseResult>>()
const transcriptionRequests = new Map<string, Promise<void>>()
const audioRequests = new Map<string, Promise<void>>()

export const usePhraseStore = create<PhraseStore>()(function (set, get) {
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
			phraseStatus: 'idle',
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

	function savePhraseToEntry(key: string, phraseData: PhraseData) {
		const transcriptionIpa = phraseData.transcription?.ipa ?? null
		const audioUrl = phraseData.audioPronunciation?.audioUrl ?? null

		setEntry(key, {
			phraseId: phraseData.id,
			phraseStatus: 'ready',
			transcription: transcriptionIpa,
			transcriptionStatus: transcriptionIpa ? 'ready' : 'idle',
			audioUrl: audioUrl,
			audioStatus: audioUrl ? 'ready' : 'idle',
		})
	}

	return {
		entries: {},

		resolvePhrase: async function (phrase: string, languageCode: LanguageCode): Promise<PhraseResult> {
			const key = makePhraseKey(phrase, languageCode)

			// Already resolved in entries — return cached
			const entry = get().entries[key]
			if (entry && entry.phraseStatus === 'ready' && entry.phraseId !== null) {
				return {
					ok: true,
					data: {
						id: entry.phraseId,
						text: phrase,
						sourceLanguageCode: languageCode,
						transcription: entry.transcription
							? { id: 0, universalPhraseId: entry.phraseId, ipa: entry.transcription, pinyin: null }
							: null,
						audioPronunciation: entry.audioUrl
							? { id: 0, universalPhraseId: entry.phraseId, audioUrl: entry.audioUrl }
							: null,
					},
				}
			}

			// Dedup in-flight requests
			const cached = phraseRequestCache.get(key)
			if (cached) return cached

			const request: Promise<PhraseResult> = (async function () {
				ensureEntry(key, phrase, languageCode)
				setEntry(key, { phraseStatus: 'loading' })

				try {
					const result = await apolloClient.query({
						query: UniversalPhrase_GetDocument,
						variables: { input: { text: phrase, sourceLanguageCode: languageCode } },
						fetchPolicy: 'network-only',
					})

					const data = result.data?.universal_phrase_get
					if (data) {
						savePhraseToEntry(key, data)
						return { ok: true, data }
					}
				} catch {
					// fall through to create
				}

				try {
					const result = await apolloClient.mutate({
						mutation: UniversalPhrase_CreateDocument,
						variables: { input: { text: phrase, sourceLanguageCode: languageCode } },
					})

					const data = result.data?.universal_phrase_create
					if (data) {
						savePhraseToEntry(key, data)
						return { ok: true, data }
					}
				} catch {
					// fall through to failure
				}

				setEntry(key, { phraseStatus: 'error' })
				return { ok: false }
			})()

			phraseRequestCache.set(key, request)
			request.then(function (result) {
				if (!result.ok) phraseRequestCache.delete(key)
			})

			return request
		},

		preload: function (items: PreloadItem[]) {
			set(function (state) {
				const nextEntries = { ...state.entries }

				for (const item of items) {
					const key = makePhraseKey(item.phrase, item.languageCode)
					const existing = nextEntries[key]

					if (existing && existing.phraseId !== null) {
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
						nextEntries[key] = {
							phrase: item.phrase,
							languageCode: item.languageCode,
							phraseId: null,
							phraseStatus: 'idle',
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
			const key = makePhraseKey(phrase, languageCode)
			const existing = get().entries[key]

			if (existing && (existing.transcriptionStatus === 'loading' || existing.transcriptionStatus === 'ready')) {
				return
			}

			if (transcriptionRequests.has(key)) return

			const promise: Promise<void> = (async function () {
				ensureEntry(key, phrase, languageCode)

				// Ensure the phrase exists in store
				const entry = get().entries[key]
				if (entry.phraseId === null) {
					const result = await get().resolvePhrase(phrase, languageCode)
					if (!result.ok) {
						setEntry(key, { transcriptionStatus: 'error' })
						return
					}
				}

				setEntry(key, { transcriptionStatus: 'loading' })

				// Check if transcription already came from resolvePhrase
				const updated = get().entries[key]
				if (updated.transcription) {
					setEntry(key, { transcriptionStatus: 'ready' })
					return
				}

				// Create transcription
				try {
					const transcriptionResult = await apolloClient.mutate({
						mutation: UniversalPhaseTranscriptionGetOrCreateDocument,
						variables: { input: { universalPhraseId: updated.phraseId! } },
					})
					const ipa = transcriptionResult.data?.universal_phrase_transcription_get_or_create?.ipa ?? null
					setEntry(key, {
						transcription: ipa,
						transcriptionStatus: 'ready',
					})
				} catch {
					setEntry(key, { transcriptionStatus: 'error' })
				}
			})()

			transcriptionRequests.set(key, promise)
			promise.catch(function () {
				transcriptionRequests.delete(key)
			})

			await promise
		},

		ensureAudio: async function (phrase: string, languageCode: LanguageCode) {
			const key = makePhraseKey(phrase, languageCode)
			const existing = get().entries[key]

			if (existing && existing.audioUrl && existing.audioStatus === 'ready') {
				return
			}

			if (audioRequests.has(key)) return

			const promise: Promise<void> = (async function () {
				ensureEntry(key, phrase, languageCode)

				// Ensure the phrase exists in store
				const entry = get().entries[key]
				if (entry.phraseId === null) {
					const result = await get().resolvePhrase(phrase, languageCode)
					if (!result.ok) {
						setEntry(key, { audioStatus: 'error' })
						return
					}
				}

				// Check if audio already came from resolvePhrase
				const updated = get().entries[key]
				if (updated.audioUrl) {
					setEntry(key, { audioStatus: 'ready' })
					return
				}

				setEntry(key, { audioStatus: 'loading' })

				// Create audio
				try {
					const audioResult = await apolloClient.mutate({
						mutation: UniversalPhraseAudioGetOrCreateDocument,
						variables: { input: { universalPhraseId: updated.phraseId! } },
					})

					const audioUrl = audioResult.data?.universal_phrase_audio_get_or_create?.audioUrl ?? null
					setEntry(key, {
						audioUrl,
						audioStatus: audioUrl ? 'ready' : 'error',
					})
				} catch {
					setEntry(key, { audioStatus: 'error' })
				}
			})()

			audioRequests.set(key, promise)
			promise.catch(function () {
				audioRequests.delete(key)
			})

			await promise
		},

		get: function (phrase: string, languageCode: LanguageCode) {
			return get().entries[makePhraseKey(phrase, languageCode)]
		},
	}
})
