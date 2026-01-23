import React from 'react'
import { useGetLabelAndHeader } from './fn/getLabelAndHeader'
import './EditDetailsFormHeader.scss'

function EditDetailsFormHeader() {
	const { label, header } = useGetLabelAndHeader()

	return (
		<div className='edit-details-form-header'>
			<span className='edit-details-form-header__label'>{label}</span>
			<h1 className='edit-details-form-header__header'>{header}</h1>
		</div>
	)
}

export default EditDetailsFormHeader
