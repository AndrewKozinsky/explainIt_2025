import React from 'react'
import cn from 'classnames'
import './LabelWithField.scss'

type LabelWithFieldProps = {
	label?: string
	disabled?: boolean
	block?: boolean
	htmlFor?: string
	children: React.ReactNode
}

function LabelWithField(props: LabelWithFieldProps) {
	const { label, disabled, block, htmlFor, children } = props

	return (
		<div
			className={cn(
				'label-with-field',
				disabled && 'label-with-field--disabled',
				block && 'label-with-field--block',
			)}
		>
			{label && (
				<label className='label-with-field__label' htmlFor={htmlFor}>
					{label}
				</label>
			)}
			{children}
		</div>
	)
}

export default LabelWithField
