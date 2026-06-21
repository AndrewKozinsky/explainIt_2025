import { useEffect, useMemo } from 'react'
import { LanguageCode } from 'utils/languages'
import { useTranscriptionAudioStore, EntryData } from '@/stores/transcriptionAudioStore'
import { TranscriptionState } from '../types'

type UseTranscriptionStateInput = {
	phrase?: string
	languageCode?: LanguageCode
	propTranscription?: string | null
	storeEntry?: EntryData
	store: typeof useTranscriptionAudioStore
}

export function useTranscriptionState(input: UseTranscriptionStateInput): TranscriptionState | null | undefined {
	const { phrase, languageCode, propTranscription, storeEntry, store } = input

	const transcriptionExplicitlyProvided = typeof propTranscription === 'string'

	const effectiveTranscription: TranscriptionState | null | undefined = useMemo(
		function () {
			if (transcriptionExplicitlyProvided) {
				return { status: 'ready', transcription: propTranscription ?? null }
			}

			if (!storeEntry) return null

			if (storeEntry.transcriptionStatus === 'loading') return { status: 'loading' }
			if (storeEntry.transcriptionStatus === 'error') return { status: 'error' }
			if (storeEntry.transcriptionStatus === 'ready') {
				return { status: 'ready', transcription: storeEntry.transcription }
			}

			return null
		},
		[propTranscription, storeEntry],
	)

	useEffect(
		function () {
			if (transcriptionExplicitlyProvided) return
			if (!phrase || !languageCode) return

			const entry = store.getState().get(phrase, languageCode)
			if (entry && (entry.transcriptionStatus === 'ready' || entry.transcriptionStatus === 'loading')) {
				return
			}

			store.getState().ensureTranscription(phrase, languageCode)
		},
		[phrase, languageCode, transcriptionExplicitlyProvided, storeEntry?.transcriptionStatus, store],
	)

	return effectiveTranscription
}
