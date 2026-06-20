import GenerateSubtitlesButton from '../GenerateSubtitlesButton/GenerateSubtitlesButton'

type GenerateSubtitlesBlockProps = {
	isFormDisabled: boolean
}

function GenerateSubtitlesBlock(props: GenerateSubtitlesBlockProps) {
	const { isFormDisabled } = props

	return (
		<div>
			<p></p>
			<GenerateSubtitlesButton disabled={isFormDisabled} />
		</div>
	)
}

export default GenerateSubtitlesBlock
