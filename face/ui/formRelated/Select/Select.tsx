import React from 'react'
import LabelWithField from 'ui/formRelated/LabelWithField/LabelWithField'
import FieldError from '../FieldError/FieldError'
import './Select.scss'

export type DropdownOption = {
	value: string
	label: string
}

export type SelectProps = {
	label?: string
	error?: null | string
	selectProps?: React.SelectHTMLAttributes<HTMLSelectElement>
	options: DropdownOption[]
}

function Select(props: SelectProps) {
	const { label, error, selectProps, options } = props

	const disabled = selectProps?.disabled

	return (
		<LabelWithField label={label} disabled={disabled}>
			<select className='dropdown__select' {...selectProps}>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			<FieldError text={error} />
		</LabelWithField>
	)
}

export default Select
