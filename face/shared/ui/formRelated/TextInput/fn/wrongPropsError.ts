import { TextInputProps } from '../TextInput'

export function throwErrorIfWrongProps(props: TextInputProps) {
	const { inputProps, textareaProps } = props

	if ((!inputProps && !textareaProps) || (inputProps && textareaProps)) {
		throw new Error('TextInput must have either inputProps or textareaProps')
	}
}
