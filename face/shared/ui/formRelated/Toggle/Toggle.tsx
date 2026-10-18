import React from 'react'
import cn from 'classnames'
import './Toggle.scss'

export type ToggleProps = {
	label: string
	checked: boolean
	disabled?: boolean
	inputProps?: Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		'type' | 'role' | 'checked' | 'defaultChecked' | 'disabled'
	>
	extraClass?: string
}

function Toggle(props: ToggleProps) {
	const { label, checked, disabled, inputProps, extraClass } = props

	return (
		<label className={cn('toggle', disabled && 'toggle--disabled', extraClass)}>
			<input
				{...inputProps}
				type='checkbox'
				role='switch'
				checked={checked}
				disabled={disabled}
				className={cn('toggle__input', inputProps?.className)}
			/>
			<span className='toggle__track' aria-hidden='true'>
				<span className='toggle__thumb' />
			</span>
			<span className='toggle__text'>{label}</span>
		</label>
	)
}

export default Toggle
