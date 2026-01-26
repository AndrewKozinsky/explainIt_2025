import Word from '../Word/Word'
import { getSentenceStructure } from './fn/getSentenceStructure'

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
					return <Word value={part.value} key={part.id} />
				}

				return part.value
			})}
		</p>
	)
}

export default SentenceBlock
