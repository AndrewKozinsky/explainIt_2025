import React from 'react'
import cn from 'classnames'
import FieldError from '../FieldError/FieldError'
import './RadioGroup.scss'

export type TextInputProps = {
	label: string
	error?: null | string
	config: {
		label: string
		name: string
		checked: boolean
	}[]
	direction?: 'horizontal' | 'vertical'
}

function RadioGroup(props: TextInputProps) {
	const { label, error, config, direction = 'vertical' } = props

	return (
		<div className='radio-group'>
			<label className='radio-group__label'>{label}</label>
			<div className={cn('radio-group__radios', 'radio-group__radios--' + direction)}>
				{config.map((itemData) => {
					return (
						<label className='radio-group__radio-label' key={itemData.name}>
							<input
								type='radio'
								className='radio-group__radio'
								name={itemData.name}
								checked={itemData.checked}
							/>
							{itemData.label}
						</label>
					)
				})}
			</div>
			<FieldError text={error} />
		</div>
	)
}

export default RadioGroup
