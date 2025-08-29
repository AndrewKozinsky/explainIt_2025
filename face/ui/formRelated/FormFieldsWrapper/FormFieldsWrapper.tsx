import cn from 'classnames'
import React from 'react'
import './FormFieldsWrapper.scss'

type FormWrapperProps = {
	gap?: 'standart' | 'big'
	children: React.ReactNode
}

function FormFieldsWrapper(props: FormWrapperProps) {
	const { gap, children } = props

	return <div className={cn('form-fields-wrapper', gap === 'big' && 'form-fields-wrapper--big-gap')}>{children}</div>
}

export default FormFieldsWrapper
