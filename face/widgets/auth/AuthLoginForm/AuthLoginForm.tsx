'use client'

import React, { useMemo, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { redirect } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import FormError from '@/shared/ui/formRelated/FormError/FormError'
import FormFieldsWrapper from '@/shared/ui/formRelated/FormFieldsWrapper/FormFieldsWrapper'
import TextInput from '@/shared/ui/formRelated/TextInput/TextInput'
import OAuthButtons from '@/shared/ui/OAuthButtons/OAuthButtons'
import { FormStatus } from '@/shared/utils/forms'
import { localizePath, pageUrls } from '@/shared/utils/pageUrls'
import { useAuthValidationTexts } from '../fn/useAuthValidationTexts'
import { createLoginFormSchema, LoginFormData } from './fn/form'
import { useGetOnLoginFormSubmit } from './fn/submit'

function AuthLoginForm() {
	const [formStatus, setFormStatus] = useState<FormStatus>('idle')
	const [formError, setFormError] = useState<null | string>(null)
	const locale = useLocale()
	const t = useTranslations('auth')
	const validationTexts = useAuthValidationTexts()
	const loginFormSchema = useMemo(() => createLoginFormSchema(validationTexts), [validationTexts])

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
						label={t('fields.email')}
						error={errors.email?.message}
						inputProps={{
							...register('email', { required: true }),
							disabled: ['success', 'submitting'].includes(formStatus),
						}}
					/>
					<TextInput
						label={t('fields.password')}
						error={errors.password?.message}
						inputProps={{
							...register('password', { required: true }),
							disabled: ['success', 'submitting'].includes(formStatus),
							type: 'password',
						}}
					/>
					<Button type='submit' disabled={['success', 'submitting'].includes(formStatus)}>
						{t('login.submit')}
					</Button>
					<FormError text={formError} />
				</FormFieldsWrapper>
			</form>
		</div>
	)
}

export default AuthLoginForm
