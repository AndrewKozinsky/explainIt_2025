import { useCallback } from 'react'
import { useAuthControllerLogin } from '@/shared/api/generated/auth/auth'
import type { UserOutModel } from '@/shared/api/generated/models'
import { useSetUser } from '@/shared/api/auth/UserProvider'
import { FormStatus, setErrorsToForm } from '@/utils/forms'
import { LoginFormData } from './form'

export function useGetOnLoginFormSubmit(
	setFieldError: (field: keyof LoginFormData, params: any) => void,
	setFormStatus: React.Dispatch<React.SetStateAction<FormStatus>>,
	setFormError: React.Dispatch<React.SetStateAction<string | null>>,
) {
	const { mutateAsync: loginUser } = useAuthControllerLogin()
	const setUser = useSetUser()

	return useCallback(
		async function (formData: LoginFormData) {
			setFormError(null)
			setFormStatus('submitting')

			try {
				const response = await loginUser({ data: { email: formData.email, password: formData.password } })
				const user = response as unknown as UserOutModel

				setUser(user)
				setFormStatus('success')
			} catch (gqError: unknown) {
				setErrorsToForm(gqError, setFieldError, setFormError)
				setFormStatus('idle')
			}
		},
		[loginUser, setUser, setFieldError, setFormError, setFormStatus],
	)
}
