import React from 'react'
import TranscriptionAndAudio from 'ui/TranscriptionAndAudio/TranscriptionAndAudio'
import { LanguageCode } from 'utils/languages'
import { usePhraseDictionaryStore } from '_pages/media/dictionary/phraseDictionaryStore'
import './DictionaryPhraseTranscription.scss'

function DictionaryPhraseTranscription() {
	const status = usePhraseDictionaryStore((s) => s.status)
	const transcription = usePhraseDictionaryStore((s) => s.transcription)
	const audioUrl = usePhraseDictionaryStore((s) => s.audioUrl)
	const nonExistentWord = usePhraseDictionaryStore((s) => s.nonExistentWord)
	const phrase = usePhraseDictionaryStore((s) => s.inputText)
	const sourceLanguageCode = usePhraseDictionaryStore((s) => s.sourceLanguageCode)

	if (status !== 'ready' || nonExistentWord || !phrase || !sourceLanguageCode) {
		return null
	}

	return (
		<div className='dictionary-phrase-transcription'>
			<TranscriptionAndAudio
				phrase={phrase}
				languageCode={sourceLanguageCode as LanguageCode}
				audioUrl={audioUrl}
				transcription={transcription?.ipa}
				bg='white'
			/>
		</div>
	)
}

export default DictionaryPhraseTranscription
