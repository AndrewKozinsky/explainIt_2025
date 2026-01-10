import { PopulatedTextStructure } from '_pages/video/watching/common/populatedTextStructure'
import Word from '../../common/Word/Word'
import './SentenceBlock.scss'

type SentenceBlockProps = {
	sentence: PopulatedTextStructure.Sentence
}

function SentenceBlock(props: SentenceBlockProps) {
	const { sentence } = props

	return (
		<div className='sentence-block'>
			<p className='sentence-block__sentence'>
				{sentence.parts.map((part) => {
					if (part.type === 'word') {
						return (
							<Word
								contentType='plainText'
								sentenceId={sentence.id}
								wordId={part.id}
								wordValue={part.value}
								key={part.id}
							/>
						)
					} else if (part.type === 'punctuation') {
						return <span key={part.id}>{part.value}</span>
					} else if (part.type === 'space') {
						return <span key={part.id}> </span>
					}
				})}
			</p>
			{sentence.translation && <p className='sentence-block__translation'>{sentence.translation}</p>}
		</div>
	)
}

export default SentenceBlock
