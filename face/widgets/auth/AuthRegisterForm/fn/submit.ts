import { useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { authQueries } from '@/entities/auth/AuthQueryFacade'
import { FormStatus } from '@/shared/utils/forms'
import { RegisterFormData } from './form'

export function useGetOnRegisterFormSubmit(
	setFieldError: (field: keyof RegisterFormData, params: any) => void,
	setFormStatus: React.Dispatch<React.SetStateAction<FormStatus>>,
	setFormError: React.Dispatch<React.SetStateAction<string | null>>,
	setFormSuccess: React.Dispatch<React.SetStateAction<string | null>>,
) {
	const { mutateAsync: registerUser } = useMutation(authQueries.register())

	return useCallback(
		async function (formData: RegisterFormData) {
			setFormError(null)
			setFormStatus('submitting')

			const result = await registerUser({ email: formData.email, password: formData.password })

			if (result.error) {
				setFormError(result.error)
				setFormStatus('idle')
				return
			}

			if (result.errors) {
				result.errors.forEach(({ field, messages }) => {
					setFieldError(field as keyof RegisterFormData, {
						type: 'manual',
						message: messages.join(', '),
					})
				})
				setFormStatus('hasErrors')
				return
			}

			setFormStatus('success')
			setFormSuccess('На почту ' + result.data.email + ' отправлено письмо с кодом подтверждения.')
		},
		[registerUser, setFieldError, setFormError, setFormStatus, setFormSuccess],
	)
}
