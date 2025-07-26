import React from 'react'
import './FormFieldsWrapper.scss'

type FormWrapperProps = {
	children: React.ReactNode
}

function FormFieldsWrapper(props: FormWrapperProps) {
	const { children } = props

	return <div className='form-fields-wrapper'>{children}</div>
}

export default FormFieldsWrapper
