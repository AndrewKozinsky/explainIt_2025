import cn from 'classnames'
import { LanguageCode } from 'utils/utils'
import { PhraseExample, SentencePhrase } from '_pages/media/detailsBlock/detailsStore'
import TranscriptionAndAudio from '../TranscriptionAndAudio/TranscriptionAndAudio'
import FlashCardButton from './FlashCardButton'
import './SentencePhraseAnalysis.scss'

type SentencePhraseProps = {
	phraseAnalysis: SentencePhrase
	extraClass?: string
	languageCode: string
	onWhiteBackground?: boolean
}

function SentencePhraseAnalysis(props: SentencePhraseProps) {
	const { phraseAnalysis, extraClass, languageCode, onWhiteBackground } = props

	if (!phraseAnalysis) {
		return null
	}

	const phrase = phraseAnalysis.phrase
	const phraseTranslation = phraseAnalysis.translation
	const examples = phraseAnalysis.examples

	if (!phrase || !phraseTranslation || !phraseAnalysis.sentencePhraseId) {
		return null
	}

	return (
		<div className={cn('sentence-phrase-analysis', extraClass)}>
			<TopPart
				phrase={phrase}
				phraseTranslation={phraseTranslation}
				sentencePhraseId={phraseAnalysis.sentencePhraseId}
				flashcardId={phraseAnalysis.flashcardId}
				languageCode={languageCode}
				onWhiteBackground={onWhiteBackground}
			/>
			{examples?.map((example, i) => {
				return <Example example={example} key={i} />
			})}
		</div>
	)
}

export default SentencePhraseAnalysis

type TopPartProps = {
	phrase: string
	phraseTranslation: string
	sentencePhraseId: number
	flashcardId: null | number
	languageCode: string
	onWhiteBackground?: boolean
}

function TopPart(props: TopPartProps) {
	const { phrase, phraseTranslation, languageCode, onWhiteBackground, sentencePhraseId, flashcardId } = props

	return (
		<div className='sentence-phrase-analysis__top'>
			<p className='sentence-phrase-analysis__top-content'>
				<span className='sentence-phrase-analysis__analysis-phrase'>{phrase}</span>{' '}
				<TranscriptionAndAudio
					phrase={phrase}
					languageCode={languageCode as LanguageCode}
					onWhiteBackground={onWhiteBackground}
				/>{' '}
				— <span className='sentence-phrase-analysis__analysis-phrase-translate'>{phraseTranslation}</span>
			</p>
			<FlashCardButton sentencePhraseId={sentencePhraseId} flashcardId={flashcardId} />
		</div>
	)
}

function Example({ example }: { example: PhraseExample }) {
	return (
		<p className='sentence-phrase-analysis__example'>{example.text && `${example.text} — ${example.translate}`}</p>
	)
}
