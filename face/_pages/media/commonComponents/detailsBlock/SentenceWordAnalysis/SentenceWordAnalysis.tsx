import cn from 'classnames'
import { LanguageCode } from 'utils/utils'
import TranscriptionAndAudio from '_pages/media/commonComponents/detailsBlock/TranscriptionAndAudio/TranscriptionAndAudio'
import parseWordAnalysis, { WordAnalysisExample, WordAnalysisExampleWord } from './fn/wordAnalysis'
import './SentenceWordAnalysis.scss'

type SentenceWordProps = {
	wordAnalysis: null | string
	extraClass?: string
	languageCode: string
}

function SentenceWordAnalysis(props: SentenceWordProps) {
	const { wordAnalysis, extraClass, languageCode } = props

	if (!wordAnalysis) {
		return null
	}

	const parsedAnalysis = parseWordAnalysis(wordAnalysis)

	const word = parsedAnalysis?.word
	const wordTranslation = parsedAnalysis?.translation
	const examples = parsedAnalysis?.examples

	if (!word || !wordTranslation) {
		return null
	}

	return (
		<div className={cn('sentence-word-analysis', extraClass)}>
			<TopPart word={word} wordTranslation={wordTranslation} languageCode={languageCode} />
			{examples?.map((example, i) => {
				return <Example example={example} key={i} />
			})}
		</div>
	)
}

export default SentenceWordAnalysis

type TopPartProps = {
	word: string
	wordTranslation: WordAnalysisExampleWord[]
	languageCode: string
}

function TopPart(props: TopPartProps) {
	const { word, wordTranslation, languageCode } = props

	return (
		<p className='sentence-word-analysis__top'>
			<span className='sentence-word-analysis__analysis-phrase'>{word}</span>{' '}
			<TranscriptionAndAudio word={word} languageCode={languageCode as LanguageCode} /> —{' '}
			<span className='sentence-word-analysis__analysis-phrase-translate'>
				<Text text={wordTranslation} />
			</span>
		</p>
	)
}

function Example({ example }: { example: WordAnalysisExample }) {
	return (
		<p className='sentence-word-analysis__example'>
			{example.text && <Text text={example.text} />} — {example.translate && <Text text={example.translate} />}
		</p>
	)
}

function Text({ text }: { text: WordAnalysisExampleWord[] }) {
	return text.map((word, i) => {
		return (
			<span className={cn(word.flashed && 'sentence-word-analysis__word-flashed')} key={i}>
				{word.text}
			</span>
		)
	})
}
