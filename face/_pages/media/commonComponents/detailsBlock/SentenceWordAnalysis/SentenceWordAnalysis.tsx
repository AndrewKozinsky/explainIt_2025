import cn from 'classnames'
import parseWordAnalysis, { WordAnalysisExample, WordAnalysisExampleWord } from './fn/wordAnalysis'
import './SentenceWordAnalysis.scss'

type SentenceWordProps = {
	wordAnalysis: null | string
}

function SentenceWordAnalysis(props: SentenceWordProps) {
	const { wordAnalysis } = props

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
		<div className='sentence-word-analysis'>
			<TopPart word={word} wordTranslation={wordTranslation} />
			{examples?.map((example, i) => {
				return <Example example={example} key={i} />
			})}
		</div>
	)
}

export default SentenceWordAnalysis

function TopPart({ word, wordTranslation }: { word: string; wordTranslation: string }) {
	return (
		<p className='sentence-word-analysis__top'>
			<span className='sentence-word-analysis__analysis-phrase'>{word}</span> —{' '}
			<span className='sentence-word-analysis__analysis-phrase-translate'>{wordTranslation}</span>
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
