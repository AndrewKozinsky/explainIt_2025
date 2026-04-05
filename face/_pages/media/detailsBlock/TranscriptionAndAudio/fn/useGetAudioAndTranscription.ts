import { useEffect, useRef, useState } from 'react'
import { LanguageCode } from 'utils/utils'
import {
	useWord_GetLazyQuery,
	useWord_Create,
	useTranscription_Create,
	useAudioPronunciation_Create,
	Word_Get,
} from '@/graphql'

const SUPPORTED_LANGUAGES: LanguageCode[] = ['en', 'fr']

type Status = 'loading' | 'error' | 'ready'

export type AudioData = {
	status: Status
	url?: string
}

export type TranscriptionData = {
	status: Status
	ipa?: string | null
}

export type AudioAndTranscriptionResult = {
	visible: boolean
	wordStatus: Status
	audio: AudioData
	transcription: TranscriptionData
}

export function useGetAudioAndTranscription(word: string, languageCode: LanguageCode): AudioAndTranscriptionResult {
	const visible = SUPPORTED_LANGUAGES.includes(languageCode)

	const [wordStatus, setWordStatus] = useState<Status>('loading')
	const [audio, setAudio] = useState<AudioData>({ status: 'loading' })
	const [transcription, setTranscription] = useState<TranscriptionData>({ status: 'loading' })

	const [getWord] = useWord_GetLazyQuery()
	const [createWord] = useWord_Create()
	const [createTranscription] = useTranscription_Create()
	const [createAudioPronunciation] = useAudioPronunciation_Create()

	const activeWordRef = useRef(word)

	useEffect(
		function () {
			if (!visible) return

			activeWordRef.current = word

			setWordStatus('loading')
			setAudio({ status: 'loading' })
			setTranscription({ status: 'loading' })

			fetchData()

			async function fetchData() {
				const wordData = await getOrCreateWord()
				if (activeWordRef.current !== word) return

				if (!wordData) {
					setWordStatus('error')
					return
				}

				setWordStatus('ready')

				const existingTranscription = wordData.transcription
				if (existingTranscription) {
					setTranscription({ status: 'ready', ipa: existingTranscription.ipa })
				}

				const existingAudio = wordData.audioPronunciations?.[0]
				if (existingAudio) {
					setAudio({ status: 'ready', url: existingAudio.audioUrl })
				}

				const promises: Promise<void>[] = []

				if (!existingTranscription) {
					promises.push(createTranscriptionForWord(wordData.id))
				}

				if (!existingAudio) {
					promises.push(createAudioForWord(wordData.id))
				}

				await Promise.allSettled(promises)
			}

			async function getOrCreateWord(): Promise<Word_Get['word_get'] | null> {
				try {
					const result = await getWord({
						variables: { input: { word } },
						fetchPolicy: 'network-only',
					})
					if (result.data?.word_get) {
						return result.data.word_get
					}
				} catch {
					// Word not found or network error, will try to create
				}

				try {
					const result = await createWord({
						variables: { input: { word, languageCode } },
					})
					return result.data?.word_create ?? null
				} catch {
					return null
				}
			}

			async function createTranscriptionForWord(wordId: number) {
				try {
					const result = await createTranscription({
						variables: { input: { wordId } },
					})
					if (activeWordRef.current !== word) return
					setTranscription({ status: 'ready', ipa: result.data?.create_transcription.ipa })
				} catch {
					if (activeWordRef.current !== word) return
					setTranscription({ status: 'error' })
				}
			}

			async function createAudioForWord(wordId: number) {
				try {
					const result = await createAudioPronunciation({
						variables: { input: { wordId } },
					})
					if (activeWordRef.current !== word) return
					setAudio({ status: 'ready', url: result.data?.create_audio_pronunciation.audioUrl })
				} catch {
					if (activeWordRef.current !== word) return
					setAudio({ status: 'error' })
				}
			}
		},
		[word, languageCode, visible],
	)

	if (!visible) {
		return {
			visible: false,
			wordStatus: 'loading',
			audio: { status: 'loading' },
			transcription: { status: 'loading' },
		}
	}

	return { visible, wordStatus, audio, transcription }
}
