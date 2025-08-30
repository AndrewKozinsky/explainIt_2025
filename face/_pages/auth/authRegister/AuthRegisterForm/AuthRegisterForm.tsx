'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@/ui/formRelated/buttons/Button/Button'
import FormError from '@/ui/formRelated/FormError/FormError'
import FormFieldsWrapper from '@/ui/formRelated/FormFieldsWrapper/FormFieldsWrapper'
import TextInput from '@/ui/formRelated/TextInput/TextInput'
import InfoBlock from '@/ui/InfoBlock/InfoBlock'
import OAuthButtons from '@/ui/OAuthButtons/OAuthButtons'
import { FormStatus } from '../../../../utils/forms'
import { RegisterFormData, registerFormSchema, RegisterFormTest } from './fn/form'
import { useGetOnRegisterFormSubmit } from './fn/submit'

function AuthRegisterForm() {
	const [formStatus, setFormStatus] = useState<FormStatus>('idle')
	const [formError, setFormError] = useState<null | string>(null)
	const [formSuccess, setFormSuccess] = useState<null | string>(null)

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<RegisterFormData>({
		resolver: yupResolver(registerFormSchema),
	})

	const onSubmit = useGetOnRegisterFormSubmit(setError, setFormStatus, setFormError, setFormSuccess)

	return (
		<div>
			<OAuthButtons />
			<form onSubmit={handleSubmit(onSubmit)} data-testid={RegisterFormTest.form.id}>
				<FormFieldsWrapper>
					<TextInput
						label='Почта'
						error={errors.email?.message}
						dataTestId={RegisterFormTest.emailField.id}
						inputProps={{
							...register('email', { required: true }),
							disabled: ['success', 'submitting'].includes(formStatus),
						}}
					/>
					<TextInput
						label='Пароль'
						error={errors.password?.message}
						dataTestId={RegisterFormTest.passwordField.id}
						inputProps={{
							...register('password', { required: true }),
							disabled: ['success', 'submitting'].includes(formStatus),
						}}
					/>
					<TextInput
						label='Пароль ещё раз'
						error={errors.passwordAgain?.message}
						dataTestId={RegisterFormTest.passwordAgainField.id}
						inputProps={{
							...register('passwordAgain', { required: true }),
							disabled: ['success', 'submitting'].includes(formStatus),
						}}
					/>
					<Button
						type='submit'
						disabled={['success', 'submitting'].includes(formStatus)}
						dataTestId={RegisterFormTest.submitButton.id}
					>
						Зарегистрироваться
					</Button>
					<FormError text={formError} dataTestId={RegisterFormTest.failMessage.id} />
					{formSuccess && (
						<InfoBlock dataTestId={RegisterFormTest.successMessage.id}>{formSuccess}</InfoBlock>
					)}
				</FormFieldsWrapper>
			</form>
		</div>
	)
}

export default AuthRegisterForm
