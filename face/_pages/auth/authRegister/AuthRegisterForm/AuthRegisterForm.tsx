// 'use client'

// import React, { useState } from 'react'
// import { yupResolver } from '@hookform/resolvers/yup'
// import { useForm } from 'react-hook-form'
// import { Link } from '@/i18n/routing'
// import Button from '@/shared/ui/formRelated/buttons/Button/Button'
// import FormError from '@/shared/ui/formRelated/FormError/FormError'
// import FormFieldsWrapper from '@/shared/ui/formRelated/FormFieldsWrapper/FormFieldsWrapper'
// import TextInput from '@/shared/ui/formRelated/TextInput/TextInput'
// import StatusBlock from '@/shared/ui/InfoBlock/StatusBlock'
// import OAuthButtons from '@/shared/ui/OAuthButtons/OAuthButtons'
// import { FormStatus } from '@/shared/utils/forms'
// import { pageUrls } from '@/shared/utils/pageUrls'
// import { RegisterFormData, registerFormSchema } from './fn/form'
// import { useGetOnRegisterFormSubmit } from './fn/submit'

/*function AuthRegisterForm() {
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
					<TextInput
						label='Пароль ещё раз'
						error={errors.passwordAgain?.message}
						inputProps={{
							...register('passwordAgain', { required: true }),
							disabled: ['success', 'submitting'].includes(formStatus),
							type: 'password',
						}}
					/>
					<p>
						☑️ Регистрируясь вы даёте
						<br />
						<Link href={pageUrls.docs.privacyPolicy.path} className='link'>
							согласие на обработку персональных данных
						</Link>
						{', '}
						<br />
						<Link href={pageUrls.docs.offer.path} className='link'>
							соглашаетесь с офертой
						</Link>
						<br />
						{' и с '}
						<Link href={pageUrls.docs.contentUsePolicy.path} className='link'>
							политикой использования контента
						</Link>
						.
					</p>
					<Button type='submit' disabled={['success', 'submitting'].includes(formStatus)}>
						Зарегистрироваться
					</Button>
					<FormError text={formError} />
					{formSuccess && <StatusBlock type='success'>{formSuccess}</StatusBlock>}
				</FormFieldsWrapper>
			</form>
		</div>
	)
}*/

// export default AuthRegisterForm
