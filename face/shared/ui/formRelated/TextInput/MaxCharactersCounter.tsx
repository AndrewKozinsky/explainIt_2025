import cn from 'classnames'

type MaxCharactersCounterProps = {
	maxCharacters: number
	text?: null | string
}

export default function MaxCharactersCounter(props: MaxCharactersCounterProps) {
	const { maxCharacters, text } = props

	if (!maxCharacters) {
		return null
	}

	const textLength = text?.length ?? 0

	return (
		<p className='text-input__counter'>
			<span className={cn(textLength > maxCharacters && 'text-input__counter--error')}>{textLength}</span> /{' '}
			{maxCharacters}
		</p>
	)
}
