'use client'

import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { redirect } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useForm } from 'react-hook-form'
import Button from '@/ui/formRelated/buttons/Button/Button'
import FormError from '@/ui/formRelated/FormError/FormError'
import FormFieldsWrapper from '@/ui/formRelated/FormFieldsWrapper/FormFieldsWrapper'
import TextInput from '@/ui/formRelated/TextInput/TextInput'
import OAuthButtons from '@/ui/OAuthButtons/OAuthButtons'
import { FormStatus } from '@/utils/forms'
import { pageUrls, localizePath } from '@/utils/pageUrls'
import { LoginFormData, loginFormSchema } from './fn/form'
import { useGetOnLoginFormSubmit } from './fn/submit'

function AuthLoginForm() {
	const [formStatus, setFormStatus] = useState<FormStatus>('idle')
	const [formError, setFormError] = useState<null | string>(null)
	const locale = useLocale()

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
		redirect(localizePath(locale, pageUrls.books.path))
	}

	return (
		<div>
			<OAuthButtons />
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormFieldsWrapper>
					<TextInput
						label='Почта'
						error={errors.email?.message}
						inputProps={{
							...register('email', { required: true }),
							disabled: ['success', 'submitting'].includes(formStatus),
						}}
					/>
					<TextInput
						label='Пароль'
						error={errors.password?.message}
						inputProps={{
							...register('password', { required: true }),
							disabled: ['success', 'submitting'].includes(formStatus),
							type: 'password',
						}}
					/>
					<Button type='submit' disabled={['success', 'submitting'].includes(formStatus)}>
						Войти
					</Button>
					<FormError text={formError} />
				</FormFieldsWrapper>
			</form>
		</div>
	)
}

export default AuthLoginForm
