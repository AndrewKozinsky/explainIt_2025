import { getSentenceStructure } from '_pages/readingAndWatchingCommon/common/getSentenceStructure'
import Word from '../Word/Word'

type SentenceBlockProps = {
	sentenceText: string
}

function SentenceBlock(props: SentenceBlockProps) {
	const { sentenceText } = props

	const sentenceStructure = getSentenceStructure(sentenceText)

	return (
		<p>
			{sentenceStructure.map((part) => {
				if (part.isWord) {
					return <Word text={part.value} key={part.id} />
				}

				return part.value
			})}
		</p>
	)
}

export default SentenceBlock
