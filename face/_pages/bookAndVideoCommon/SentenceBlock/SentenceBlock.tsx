// import cn from 'classnames'
// import { getSentenceStructure } from '_pages/bookAndVideoCommon/functions/getSentenceStructure'
// import Word from '../Word/Word'
// import './SentenceBlock.scss'

/*type SentenceBlockProps = {
	sentenceId: number
	sentenceText: string
	selectedSentenceId: null | number
	selectedWordIds: number[]
	selectWord: (input: { sentenceId: number; wordId: number }) => void
	wordIdOffset?: number
	extraClass?: string
	loading?: boolean
}*/

/*function SentenceBlock(props: SentenceBlockProps) {
	const {
		sentenceId,
		sentenceText,
		selectedSentenceId,
		selectedWordIds,
		selectWord,
		wordIdOffset = 0,
		extraClass,
		loading,
	} = props

	const sentenceStructure = getSentenceStructure(sentenceText)
	let wordIndex = wordIdOffset

	return (
		<p className={cn(extraClass, loading && 'sentence-block__loading')} data-text={sentenceText}>
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
							selectedWordIds={selectedWordIds}
							selectWord={selectWord}
						/>
					)
				}

				return part.value
			})}
		</p>
	)
}*/

// export default SentenceBlock
