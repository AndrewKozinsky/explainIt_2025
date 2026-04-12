import cn from 'classnames'
import { LanguageCode } from 'utils/utils'
import TranscriptionAndAudio from '_pages/media/detailsBlock/TranscriptionAndAudio/TranscriptionAndAudio'
import parsePhraseAnalysis, { PhraseAnalysisExample, PhraseAnalysisExamplePhrase } from './fn/phraseAnalysis'
import './SentencePhraseAnalysis.scss'

type SentencePhraseProps = {
	phraseAnalysis: null | string
	extraClass?: string
	languageCode: string
	onWhiteBackground?: boolean
}

function SentencePhraseAnalysis(props: SentencePhraseProps) {
	const { phraseAnalysis, extraClass, languageCode, onWhiteBackground } = props

	if (!phraseAnalysis) {
		return null
	}

	const parsedAnalysis = parsePhraseAnalysis(phraseAnalysis)

	const phrase = parsedAnalysis?.phrase
	const phraseTranslation = parsedAnalysis?.translation
	const examples = parsedAnalysis?.examples

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
	phraseTranslation: PhraseAnalysisExamplePhrase[]
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
			—{' '}
			<span className='sentence-phrase-analysis__analysis-phrase-translate'>
				<Text text={phraseTranslation} />
			</span>
		</p>
	)
}

function Example({ example }: { example: PhraseAnalysisExample }) {
	return (
		<p className='sentence-phrase-analysis__example'>
			{example.text && <Text text={example.text} />} — {example.translate && <Text text={example.translate} />}
		</p>
	)
}

function Text({ text }: { text: PhraseAnalysisExamplePhrase[] }) {
	return text.map((phrase, i) => {
		return (
			<span className={cn(phrase.flashed && 'sentence-phrase-analysis__phrase-flashed')} key={i}>
				{phrase.text}
			</span>
		)
	})
}
