import React from 'react'
import cn from 'classnames'
import FieldError from '../FieldError/FieldError'
import './RadioGroup.scss'

type RadioItemConfig = {
	label: string
	name?: string
	checked: boolean
	disabled?: boolean
	value?: string
	id?: string
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export type TextInputProps = {
	label?: string
	error?: null | string
	config: RadioItemConfig[]
	direction?: 'horizontal' | 'vertical'
	name?: string
	extraClass?: string
}

function RadioGroup(props: TextInputProps) {
	const { label, error, config, direction = 'vertical', name, extraClass } = props
	const groupName = name ?? label

	return (
		<div className={cn('radio-group', extraClass)}>
			{label && <label className='radio-group__label'>{label}</label>}
			<div className={cn('radio-group__radios', 'radio-group__radios--' + direction)}>
				{config.map((itemData, index) => {
					const { label: itemLabel, name: itemName, checked, disabled, value, id, inputProps } = itemData
					const inputId = inputProps?.id ?? id ?? itemName ?? `${groupName}-${index}`
					const isDisabled = inputProps?.disabled ?? disabled
					const isChecked = inputProps?.checked ?? checked

					return (
						<label
							className={cn(
								'radio-group__radio-label',
								isDisabled && 'radio-group__radio-label--disabled',
							)}
							key={inputId}
						>
							<input
								type='radio'
								className='radio-group__radio'
								id={inputId}
								name={inputProps?.name ?? groupName}
								value={inputProps?.value ?? value ?? itemName ?? itemLabel}
								checked={isChecked}
								disabled={isDisabled}
								{...inputProps}
							/>
							<span className='radio-group__control' aria-hidden='true'>
								<span className='radio-group__control-dot' />
							</span>
							<span className='radio-group__radio-text'>{itemLabel}</span>
						</label>
					)
				})}
			</div>
			<FieldError text={error} />
		</div>
	)
}

export default RadioGroup
