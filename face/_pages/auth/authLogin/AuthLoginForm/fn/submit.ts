import { useCallback, useMemo } from 'react'
import { AuthService } from '@/entities/auth/AuthService'
import { AuthApi } from '@/entities/auth/repository/AuthApi'
import { useSetUser } from '@/shared/api/auth/UserProvider'
import { useAsyncMutation } from '@/shared/utils/fetchData/useAsyncMutation'
import { FormStatus } from '@/shared/utils/forms'
import { LoginFormData } from './form'

export function useGetOnLoginFormSubmit(
	setFieldError: (field: keyof LoginFormData, params: any) => void,
	setFormStatus: React.Dispatch<React.SetStateAction<FormStatus>>,
	setFormError: React.Dispatch<React.SetStateAction<string | null>>,
) {
	const service = useMemo(() => new AuthService(new AuthApi()), [])
	const { mutate: loginUser } = useAsyncMutation((input: { email: string; password: string }) => service.login(input))
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

			setUser(result.data as Parameters<typeof setUser>[0])
			setFormStatus('success')
		},
		[loginUser, setUser, setFieldError, setFormError, setFormStatus],
	)
}
