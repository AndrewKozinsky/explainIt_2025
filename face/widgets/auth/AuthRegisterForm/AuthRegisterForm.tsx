'use client'

import React, { useMemo, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import FormError from '@/shared/ui/formRelated/FormError/FormError'
import FormFieldsWrapper from '@/shared/ui/formRelated/FormFieldsWrapper/FormFieldsWrapper'
import TextInput from '@/shared/ui/formRelated/TextInput/TextInput'
import OAuthButtons from '@/shared/ui/OAuthButtons/OAuthButtons'
import StatusBlock from '@/shared/ui/StatusBlock/StatusBlock'
import { FormStatus } from '@/shared/utils/forms'
import { useAuthValidationTexts } from '../fn/useAuthValidationTexts'
import { createRegisterFormSchema, RegisterFormData } from './fn/form'
import { useGetOnRegisterFormSubmit } from './fn/submit'

function AuthRegisterForm() {
	const t = useTranslations('auth')
	const validationTexts = useAuthValidationTexts()
	const registerFormSchema = useMemo(() => createRegisterFormSchema(validationTexts), [validationTexts])

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
					<TextInput
						label={t('fields.passwordAgain')}
						error={errors.passwordAgain?.message}
						inputProps={{
							...register('passwordAgain', { required: true }),
							disabled: ['success', 'submitting'].includes(formStatus),
							type: 'password',
						}}
					/>
					<Button type='submit' disabled={['success', 'submitting'].includes(formStatus)}>
						{t('register.submit')}
					</Button>
					<FormError text={formError} />
					{formSuccess && <StatusBlock type='success'>{formSuccess}</StatusBlock>}
				</FormFieldsWrapper>
			</form>
		</div>
	)
}

export default AuthRegisterForm
