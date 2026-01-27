type SelectedSentenceBlockProps = {
	sentenceId: number
	sentenceText: string
	wordIds: number[]
}

function SelectedSentenceBlock(props: SelectedSentenceBlockProps) {
	const { sentenceId, sentenceText, wordIds } = props

	return (
		<div className='details-side'>
			{sentenceText}
			{/*<DetailsSentence />*/}
			{/*<PhraseAnalysis />*/}
		</div>
	)
}

export default SelectedSentenceBlock
