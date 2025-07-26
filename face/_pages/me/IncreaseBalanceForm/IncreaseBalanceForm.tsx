'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../../ui/formRelated/buttons/Button/Button'
import FormError from '../../../ui/formRelated/FormError/FormError'
import FormFieldsWrapper from '../../../ui/formRelated/FormFieldsWrapper/FormFieldsWrapper'
import TextInput from '../../../ui/formRelated/TextInput/TextInput'
import { FormStatus } from '../../../utils/forms'
import { pageUrls } from '../../../сonsts/pageUrls'
import { IncreaseBalanceFormData, increaseBalanceFormSchema, IncreaseBalanceFormTest } from './fn/form'
import { useGetIncreaseBalanceFormSubmit } from './fn/submit'

function IncreaseBalanceForm() {
	const [formStatus, setFormStatus] = useState<FormStatus>('idle')
	const [formError, setFormError] = useState<null | string>(null)

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<IncreaseBalanceFormData>({
		resolver: yupResolver(increaseBalanceFormSchema),
	})

	const onSubmit = useGetIncreaseBalanceFormSubmit(setError, setFormStatus, setFormError)

	if (formStatus === 'success') {
		redirect(pageUrls.llm.path)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} data-testid={IncreaseBalanceFormTest.form.id}>
			<FormFieldsWrapper>
				<TextInput
					label='Сумма'
					error={errors.amount?.message}
					disabled={['success', 'submitting'].includes(formStatus)}
					dataTestId={IncreaseBalanceFormTest.amountField.id}
					{...register('amount', { required: true })}
				/>
				<Button
					type='submit'
					disabled={['success', 'submitting'].includes(formStatus)}
					dataTestId={IncreaseBalanceFormTest.submitButton.id}
				>
					К оплате
				</Button>
				<FormError text={formError} dataTestId={IncreaseBalanceFormTest.failMessage.id} />
			</FormFieldsWrapper>
		</form>
	)
}

export default IncreaseBalanceForm
