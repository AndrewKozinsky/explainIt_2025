import React from 'react'
import TranscriptionAndAudio from '@/shared/ui/TranscriptionAndAudio/TranscriptionAndAudio'
import { LanguageCode } from '@/shared/utils/languages'
import { usePhraseDictionaryStore } from '@/widgets/dictionary/ui/phraseDictionaryStore'
import './DictionaryPhraseTranscription.scss'

function DictionaryPhraseTranscription() {
	const transcription = usePhraseDictionaryStore((s) => s.transcription)
	const audioUrl = usePhraseDictionaryStore((s) => s.audioUrl)
	const phrase = usePhraseDictionaryStore((s) => s.inputText)
	const sourceLanguageCode = usePhraseDictionaryStore((s) => s.sourceLanguageCode)

	if (!phrase || !sourceLanguageCode) {
		return null
	}

	return (
		<div className='dictionary-phrase-transcription'>
			<TranscriptionAndAudio
				phrase={phrase}
				languageCode={sourceLanguageCode as LanguageCode}
				audioUrl={audioUrl}
				transcription={transcription?.ipa as unknown as string}
				bg='white'
			/>
		</div>
	)
}

export default DictionaryPhraseTranscription
