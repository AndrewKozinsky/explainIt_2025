import cn from 'classnames'
import Word from '../Word/Word'
import { getSentenceStructure } from './fn/getSentenceStructure'

type SentenceBlockProps = {
	sentenceId: number
	sentenceText: string
	selectedSentenceId: null | number
	selectedWordId: null | number
	selectWord: (input: { sentenceId: number; wordId: number }) => void
	wordIdOffset?: number
	extraClass?: string
	loading?: boolean
}

function Sentence(props: SentenceBlockProps) {
	const {
		sentenceId,
		sentenceText,
		selectedSentenceId,
		selectedWordId,
		selectWord,
		wordIdOffset = 0,
		extraClass,
		loading,
	} = props

	const sentenceStructure = getSentenceStructure(sentenceText)
	let wordIndex = wordIdOffset

	return (
		<p className={cn(extraClass, loading && 'sentence-block--loading')} data-text={sentenceText}>
			{sentenceStructure.map((part) => {
				if (part.isWord) {
					wordIndex += 1

					return (
						<Word
							sentenceId={sentenceId}
							wordId={wordIndex}
							text={part.value}
							key={part.id}
							selectedSentenceId={selectedSentenceId}
							selectedWordId={selectedWordId}
							selectWord={selectWord}
						/>
					)
				}

				return part.value
			})}
		</p>
	)
}

export default Sentence
