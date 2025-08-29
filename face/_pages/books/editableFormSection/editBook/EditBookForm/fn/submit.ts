import { useCallback } from 'react'
import { useAuth_Login } from '../../../../../../graphql'
import { FormStatus } from '../../../../../../utils/forms'
import { ChangeBookFormData } from './form'

export function useGetOnLoginFormSubmit(
	setFieldError: (field: keyof ChangeBookFormData, params: any) => void,
	setFormStatus: React.Dispatch<React.SetStateAction<FormStatus>>,
	setFormError: React.Dispatch<React.SetStateAction<string | null>>,
) {
	const [loginUser] = useAuth_Login()

	return useCallback(async function (formData: ChangeBookFormData) {
		setFormError(null)
		setFormStatus('submitting')

		try {
			/*const { data } = await loginUser({
				variables: { input: { email: formData.email, password: formData.password } },
			})*/
			/*if (!data || data?.auth_login === null) {
				setFormError('Неверный логин или пароль')
				return
			}*/
			// Put user data to the User store
			// useUserStore.setState({ user: data.auth_login })
			// setFormStatus('success')
		} catch (gqError: unknown) {
			// setErrorsToForm(gqError, setFieldError, setFormError)
			// setFormStatus('idle')
		}
	}, [])
}
