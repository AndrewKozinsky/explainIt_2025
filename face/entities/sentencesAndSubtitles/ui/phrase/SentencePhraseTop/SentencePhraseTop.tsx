import TranscriptionAndAudio from '@/shared/ui/TranscriptionAndAudio/TranscriptionAndAudio'
import { LanguageCode } from '@/shared/utils/languages'
import './SentencePhraseTop.scss'

type SentencePhraseTopPartProps = {
	phrase: string
	phraseTranslation: string
	languageCode: string
}

function SentencePhraseTop(props: SentencePhraseTopPartProps) {
	const { phrase, phraseTranslation, languageCode } = props

	return (
		<div className='sentence-phrase-top'>
			<p className='sentence-phrase-top__content'>
				<span className='sentence-phrase-top__phrase'>{phrase}</span>{' '}
				<TranscriptionAndAudio phrase={phrase} languageCode={languageCode as LanguageCode} /> —{' '}
				{phraseTranslation}
			</p>
		</div>
	)
}

export default SentencePhraseTop
