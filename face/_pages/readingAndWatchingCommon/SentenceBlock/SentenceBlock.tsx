import { getSentenceStructure } from '_pages/readingAndWatchingCommon/functions/getSentenceStructure'
import Word from '../Word/Word'

type SentenceBlockProps = {
	sentenceId: number
	sentenceText: string
	selectedSentenceId: null | number
	selectedWordIds: number[]
	selectWord: (input: { sentenceId: number; wordId: number }) => void
}

function SentenceBlock(props: SentenceBlockProps) {
	const { sentenceId, sentenceText, selectedSentenceId, selectedWordIds, selectWord } = props

	const sentenceStructure = getSentenceStructure(sentenceText)

	return (
		<p>
			{sentenceStructure.map((part, idx) => {
				if (part.isWord) {
					return (
						<Word
							sentenceId={sentenceId}
							wordId={idx}
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
