import { useEffect, useState } from 'react'
import { universalPhraseService } from '@/entities/universalPhrase/UniversalPhraseService'
import { LanguageCode } from '@/shared/utils/languages'
import { TranscriptionState } from '../types'

type UseTranscriptionStateInput = {
	phrase?: string
	languageCode?: LanguageCode
	propTranscription?: string | null
}

export function useTranscriptionState(input: UseTranscriptionStateInput): TranscriptionState | null | undefined {
	const { phrase, languageCode, propTranscription } = input

	const transcriptionExplicitlyProvided = typeof propTranscription === 'string'

	const [state, setState] = useState<TranscriptionState | null>(() => {
		if (transcriptionExplicitlyProvided) {
			return { status: 'ready', transcription: propTranscription ?? null }
		}

		return null
	})

	useEffect(
		function () {
			if (transcriptionExplicitlyProvided) return
			if (!phrase || !languageCode) return

			setState({ status: 'loading' })

			universalPhraseService.getTranscription(phrase, languageCode).then(function (result) {
				if (result.ok) {
					setState({ status: 'ready', transcription: result.data.ipa })
				} else {
					setState({ status: 'error' })
				}
			})
		},
		[phrase, languageCode, transcriptionExplicitlyProvided],
	)

	// Если транскрипция явно передана, возвращаем её без загрузки
	if (transcriptionExplicitlyProvided) {
		return { status: 'ready', transcription: propTranscription ?? null }
	}

	return state
}
