'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@/ui/formRelated/buttons/Button/Button'
import FormError from '@/ui/formRelated/FormError/FormError'
import FormFieldsWrapper from '@/ui/formRelated/FormFieldsWrapper/FormFieldsWrapper'
import TextInput from '@/ui/formRelated/TextInput/TextInput'
import OAuthButtons from '@/ui/OAuthButtons/OAuthButtons'
import { FormStatus } from '@/utils/forms'
import { pageUrls } from '@/сonsts/pageUrls'
import { LoginFormData, loginFormSchema, LoginFormTest } from './fn/form'
import { useGetOnLoginFormSubmit } from './fn/submit'

function AuthLoginForm() {
	const [formStatus, setFormStatus] = useState<FormStatus>('idle')
	const [formError, setFormError] = useState<null | string>(null)

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<LoginFormData>({
		resolver: yupResolver(loginFormSchema),
	})

	const onSubmit = useGetOnLoginFormSubmit(setError, setFormStatus, setFormError)

	if (formStatus === 'success') {
		redirect(pageUrls.books.path)
	}

	return (
		<div>
			<OAuthButtons />
			<form onSubmit={handleSubmit(onSubmit)} data-testid={LoginFormTest.form.id}>
				<FormFieldsWrapper>
					<TextInput
						label='Почта'
						error={errors.email?.message}
						dataTestId={LoginFormTest.emailField.id}
						inputProps={{
							...register('email', { required: true }),
							disabled: ['success', 'submitting'].includes(formStatus),
						}}
					/>
					<TextInput
						label='Пароль'
						error={errors.password?.message}
						dataTestId={LoginFormTest.passwordField.id}
						inputProps={{
							...register('password', { required: true }),
							disabled: ['success', 'submitting'].includes(formStatus),
						}}
					/>
					<Button
						type='submit'
						disabled={['success', 'submitting'].includes(formStatus)}
						dataTestId={LoginFormTest.submitButton.id}
					>
						Войти
					</Button>
					<FormError text={formError} dataTestId={LoginFormTest.failMessage.id} />
				</FormFieldsWrapper>
			</form>
		</div>
	)
}

export default AuthLoginForm
