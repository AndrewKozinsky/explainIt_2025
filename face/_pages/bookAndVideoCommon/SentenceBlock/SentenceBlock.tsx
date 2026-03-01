import { getSentenceStructure } from '_pages/bookAndVideoCommon/functions/getSentenceStructure'
import Word from '../Word/Word'

type SentenceBlockProps = {
	sentenceId: number
	sentenceText: string
	selectedSentenceId: null | number
	selectedWordIds: number[]
	selectWord: (input: { sentenceId: number; wordId: number }) => void
	wordIdOffset?: number
	className?: string
}

function SentenceBlock(props: SentenceBlockProps) {
	const {
		sentenceId,
		sentenceText,
		selectedSentenceId,
		selectedWordIds,
		selectWord,
		wordIdOffset = 0,
		className,
	} = props

	const sentenceStructure = getSentenceStructure(sentenceText)
	let wordIndex = wordIdOffset

	return (
		<p className={className}>
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
}

export default SentenceBlock
