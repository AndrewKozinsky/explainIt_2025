import './ThoughtBox.scss'

type ThoughtBoxProps = {
	label: string
	text: string
}

/** Мысль персонажа в пунктирной рамке: подпись и сама мысль */
function ThoughtBox(props: ThoughtBoxProps) {
	const { label, text } = props

	return (
		<div className='any-level-thought-box'>
			<p className='any-level-thought-box__label'>{label}</p>
			<p className='any-level-thought-box__text'>{text}</p>
		</div>
	)
}

export default ThoughtBox
