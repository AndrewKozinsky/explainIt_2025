import React from 'react'
import cn from 'classnames'
import './LabelWithField.scss'

type LabelWithFieldProps = {
	label?: string
	/** Пояснение, которое выводится после поля. */
	description?: string
	disabled?: boolean
	block?: boolean
	htmlFor?: string
	children: React.ReactNode
}

function LabelWithField(props: LabelWithFieldProps) {
	const { label, description, disabled, block, htmlFor, children } = props

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
			{description && <p className='label-with-field__description'>{description}</p>}
		</div>
	)
}

export default LabelWithField
