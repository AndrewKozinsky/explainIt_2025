// import PhraseHighlights from '../PhraseHighlights/PhraseHighlights'
// import { useGetWordClickHandler } from './fn/wordClickHandler'
// import { useGetSelectedSentence } from '_pages/books/reading/logic'
// import './SentenceBlock.scss'

/*function SentenceBlock() {
	const sentence = useGetSelectedSentence()
	const wordClickHandler = useGetWordClickHandler()

	if (!sentence) {
		return null
	}

	return (
		<div className='analysis-sentence'>
			<p className='analysis-sentence_sentence'>
				{sentence.parts.map((part) => {
					if (part.type === 'word') {
						return (
							<span
								className='analysis-sentence__word'
								key={part.id}
								data-word-id={part.id}
								onClick={(e) => wordClickHandler(e, part.id)}
							>
								{part.value}
							</span>
						)
					} else if (part.type === 'punctuation') {
						return (
							<span className='analysis-sentence__punctuation' key={part.id}>
								{part.value}
							</span>
						)
					} else if (part.type === 'space') {
						return <span key={part.id}> </span>
					} else if (part.type === 'carriageReturn') {
						return <br key={part.id} />
					}
				})}
			</p>
			<PhraseHighlights />
		</div>
	)
}*/

// export default SentenceBlock
