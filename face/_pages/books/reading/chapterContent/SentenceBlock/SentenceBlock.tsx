import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import CarriageReturn from '../parts/CarriageReturn'
import Punctuation from '../parts/Punctuation'
import Space from '../parts/Space'
import Word from '../Word/Word'
import './SentenceBlock.scss'

type SentenceBlockProps = {
	sentence: ChapterTextStructurePopulated.Sentence
}

function SentenceBlock(props: SentenceBlockProps) {
	const { sentence } = props

	return (
		<div className='sentence-block'>
			<p className='sentence-block__sentence' key={sentence.id}>
				{sentence.parts.map((part) => {
					if (part.type === 'word') {
						return <Word wordData={part} sentence={sentence} key={part.id} />
					} else if (part.type === 'punctuation') {
						return <Punctuation key={part.id} value={part.value} />
					} else if (part.type === 'space') {
						return <Space key={part.id} />
					} else if (part.type === 'carriageReturn') {
						return <CarriageReturn key={part.id} />
					}

					return null
				})}
			</p>
			{sentence.translation && <p className='sentence-block__translation'>{sentence.translation}</p>}
		</div>
	)
}

export default SentenceBlock
