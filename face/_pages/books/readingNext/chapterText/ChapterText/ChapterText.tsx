// import cn from 'classnames'
// import { useReadingStoreNext } from '_pages/books/reading/readingStore'
// import CarriageReturn from './CarriageReturn'
// import Word from './Word'
// import Punctuation from './Punctuation'
// import Space from './Space'
import './ChapterText.scss'

function ChapterText() {
	// const populatedChapter = useReadingStoreNext((state) => state.populatedChapter)
	// const selectedSentence = useReadingStoreNext((state) => state.selectedSentence)

	return (
		<div className='chapter-text'>
			{/*{populatedChapter.parts.map((sentence) => {
				if (sentence.type === 'sentence') {
					return (
						<span
							className={cn(
								'chapter-text__sentence',
								sentence.id === selectedSentence.sentenceId && 'chapter-text__sentence--selected',
							)}
							key={sentence.id}
						>
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
						</span>
					)
				} else if (sentence.type === 'space') {
					return <Space key={sentence.id} />
				} else if (sentence.type === 'punctuation') {
					return <Punctuation key={sentence.id} value={sentence.value} />
				} else if (sentence.type === 'carriageReturn') {
					return <CarriageReturn key={sentence.id} />
				}
				return null
			})}*/}
		</div>
	)
}

export default ChapterText
