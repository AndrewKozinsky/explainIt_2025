import TranscriptionAndAudio from 'ui/TranscriptionAndAudio/TranscriptionAndAudio'
import { LanguageCode } from 'utils/languages'
import FlashCardButton from '../FlashCardButton/FlashCardButton'
import './SentencePhraseTop.scss'

type SentencePhraseTopPartProps = {
	phrase: string
	phraseTranslation: string
	sentencePhraseId: number
	flashcardId: null | number
	languageCode: string
	onWhiteBackground?: boolean
}

function SentencePhraseTop(props: SentencePhraseTopPartProps) {
	const { phrase, phraseTranslation, languageCode, onWhiteBackground, sentencePhraseId, flashcardId } = props

	return (
		<div className='sentence-phrase-top'>
			<p className='sentence-phrase-top__content'>
				<span className='sentence-phrase-top__phrase'>{phrase}</span>{' '}
				<TranscriptionAndAudio
					phrase={phrase}
					languageCode={languageCode as LanguageCode}
					bg={onWhiteBackground ? 'white' : 'pale'}
				/>{' '}
				— {phraseTranslation}
			</p>
			<FlashCardButton sentencePhraseId={sentencePhraseId} flashcardId={flashcardId} />
		</div>
	)
}

export default SentencePhraseTop
