import cn from 'classnames'
import { LanguageCode } from 'utils/utils'
import { PhraseExample, PhraseTranslationStatus } from '_pages/media/detailsBlock/detailsStore'
import TranscriptionAndAudio from '_pages/media/detailsBlock/TranscriptionAndAudio/TranscriptionAndAudio'
import './SentencePhraseAnalysis.scss'

type SentencePhraseProps = {
	phraseAnalysis: PhraseTranslationStatus
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

	if (!phrase || !phraseTranslation) {
		return null
	}

	return (
		<div className={cn('sentence-phrase-analysis', extraClass)}>
			<TopPart
				phrase={phrase}
				phraseTranslation={phraseTranslation}
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
	languageCode: string
	onWhiteBackground?: boolean
}

function TopPart(props: TopPartProps) {
	const { phrase, phraseTranslation, languageCode, onWhiteBackground } = props

	return (
		<p className='sentence-phrase-analysis__top'>
			<span className='sentence-phrase-analysis__analysis-phrase'>{phrase}</span>{' '}
			<TranscriptionAndAudio
				phrase={phrase}
				languageCode={languageCode as LanguageCode}
				onWhiteBackground={onWhiteBackground}
			/>{' '}
			— <span className='sentence-phrase-analysis__analysis-phrase-translate'>{phraseTranslation}</span>
		</p>
	)
}

function Example({ example }: { example: PhraseExample }) {
	return (
		<p className='sentence-phrase-analysis__example'>{example.text && `${example.text} — ${example.translate}`}</p>
	)
}
