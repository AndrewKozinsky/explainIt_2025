import { useCallback } from 'react'
import { useAuth_Register } from '@/graphql'
import { FormStatus, setErrorsToForm } from '@/utils/forms'
import { RegisterFormData } from './form'

export function useGetOnRegisterFormSubmit(
	setFieldError: (field: keyof RegisterFormData, params: any) => void,
	setFormStatus: React.Dispatch<React.SetStateAction<FormStatus>>,
	setFormError: React.Dispatch<React.SetStateAction<string | null>>,
	setFormSuccess: React.Dispatch<React.SetStateAction<string | null>>,
) {
	const [registerUser] = useAuth_Register()

	return useCallback(
		async function (formData: RegisterFormData) {
			setFormError(null)
			setFormStatus('submitting')

			try {
				const { data } = await registerUser({
					variables: { input: { email: formData.email, password: formData.password } },
				})

				setFormStatus('success')
				setFormSuccess('На почту ' + data?.auth_register.email + ' отправлено письмо с кодом подтверждения.')
			} catch (gqError: unknown) {
				setErrorsToForm(gqError, setFieldError, setFormError)
				setFormStatus('idle')
			}

			setFormStatus('idle')
		},
		[registerUser, setFieldError, setFormError, setFormStatus, setFormSuccess],
	)
}
