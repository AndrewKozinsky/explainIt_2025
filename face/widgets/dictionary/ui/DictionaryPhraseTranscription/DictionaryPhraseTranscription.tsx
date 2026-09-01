import TranscriptionAndAudio from '@/shared/ui/TranscriptionAndAudio/TranscriptionAndAudio'
import { usePhraseDictionaryStore } from '@/widgets/dictionary/ui/phraseDictionaryStore'
import './DictionaryPhraseTranscription.scss'

function DictionaryPhraseTranscription() {
	const transcription = usePhraseDictionaryStore((s) => s.transcription)
	const audioUrl = usePhraseDictionaryStore((s) => s.audioUrl)
	const phrase = usePhraseDictionaryStore((s) => s.inputText)
	const languageCode = usePhraseDictionaryStore((s) => s.languageCode)
	const isLoading = usePhraseDictionaryStore((s) => s.status === 'loading')

	if (!phrase || !languageCode) {
		return null
	}

	return (
		<div className='dictionary-phrase-transcription'>
			<TranscriptionAndAudio
				phrase={phrase}
				languageCode={languageCode}
				audioUrl={audioUrl}
				transcription={transcription?.ipa ?? null}
				transcriptionLoading={isLoading}
				bg='white'
			/>
		</div>
	)
}

export default DictionaryPhraseTranscription
