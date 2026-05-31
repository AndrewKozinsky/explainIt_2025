import './SpeechlessBar.scss'

type SpeechlessBarProps = {
	subtitleId: number
}

function SpeechlessBar(props: SpeechlessBarProps) {
	const { subtitleId } = props

	return <div className='speechless-bar' data-subtitle-id={subtitleId} id={`subtitle-${subtitleId}`} />
}

export default SpeechlessBar
