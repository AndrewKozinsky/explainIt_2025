import React from 'react'
import cn from 'classnames'
import LabelWithField from '@/shared/ui/formRelated/LabelWithField/LabelWithField'
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
	size?: 'small' | 'medium' | 'big' | 'custom'
}

function Select(props: SelectProps) {
	const { label, error, selectProps, options, size = 'medium' } = props

	const disabled = selectProps?.disabled

	return (
		<LabelWithField label={label} disabled={disabled}>
			<select
				{...selectProps}
				className={cn('dropdown__select', size !== 'custom' && `dropdown__select--size-${size}`, selectProps?.className)}
			>
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
