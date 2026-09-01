import { useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { authQueries } from '@/entities/auth/AuthQueryFacade'
import { useSetUser } from '@/shared/api/auth/UserProvider'
import { FormStatus } from '@/shared/utils/forms'
import { LoginFormData } from './form'

export function useGetOnLoginFormSubmit(
	setFieldError: (field: keyof LoginFormData, params: any) => void,
	setFormStatus: React.Dispatch<React.SetStateAction<FormStatus>>,
	setFormError: React.Dispatch<React.SetStateAction<string | null>>,
) {
	const { mutateAsync: loginUser } = useMutation(authQueries.login())
	const setUser = useSetUser()

	return useCallback(
		async function (formData: LoginFormData) {
			setFormError(null)
			setFormStatus('submitting')

			const result = await loginUser({ email: formData.email, password: formData.password })

			if (result.error) {
				setFormError(result.error)
				setFormStatus('idle')
				return
			}

			if (result.errors) {
				result.errors.forEach(({ field, messages }) => {
					setFieldError(field as keyof LoginFormData, {
						type: 'manual',
						message: messages.join(', '),
					})
				})
				setFormStatus('hasErrors')
				return
			}

			setUser(result.data)
			setFormStatus('success')
		},
		[loginUser, setUser, setFieldError, setFormError, setFormStatus],
	)
}
