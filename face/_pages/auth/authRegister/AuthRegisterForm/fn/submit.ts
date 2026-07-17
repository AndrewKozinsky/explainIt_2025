import { useCallback } from 'react'
import { useAuthControllerRegister } from '@/shared/api/generated/auth/auth'
import type { UserOutModel } from '@/shared/api/generated/models'
import { FormStatus, setErrorsToForm } from '@/shared/utils/forms'
import { RegisterFormData } from './form'

export function useGetOnRegisterFormSubmit(
	setFieldError: (field: keyof RegisterFormData, params: any) => void,
	setFormStatus: React.Dispatch<React.SetStateAction<FormStatus>>,
	setFormError: React.Dispatch<React.SetStateAction<string | null>>,
	setFormSuccess: React.Dispatch<React.SetStateAction<string | null>>,
) {
	const { mutateAsync: registerUser } = useAuthControllerRegister()

	return useCallback(
		async function (formData: RegisterFormData) {
			setFormError(null)
			setFormStatus('submitting')

			try {
				const response = await registerUser({ data: { email: formData.email, password: formData.password } })
				const user = response as unknown as UserOutModel

				setFormStatus('success')
				setFormSuccess('На почту ' + user.email + ' отправлено письмо с кодом подтверждения.')
			} catch (gqError: unknown) {
				setErrorsToForm(gqError, setFieldError, setFormError)
				setFormStatus('idle')
			}

			setFormStatus('idle')
		},
		[registerUser, setFieldError, setFormError, setFormStatus, setFormSuccess],
	)
}
