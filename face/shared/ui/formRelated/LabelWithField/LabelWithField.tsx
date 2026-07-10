import React from 'react'
import cn from 'classnames'
import './LabelWithField.scss'

type LabelWithFieldProps = {
	label?: string
	disabled?: boolean
	children: React.ReactNode
}

function LabelWithField(props: LabelWithFieldProps) {
	const { label, disabled, children } = props

	return (
		<div className={cn('label-with-field', disabled && 'label-with-field--disabled')}>
			{label && <label className='label-with-field__label'>{label}</label>}
			{children}
		</div>
	)
}

export default LabelWithField
