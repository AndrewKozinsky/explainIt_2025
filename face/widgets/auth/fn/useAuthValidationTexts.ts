import { useMemo } from 'react'
import { useTranslations } from 'next-intl'

/** Тексты проверки полей форм входа и регистрации на языке интерфейса */
export type AuthValidationTexts = {
	requiredField: string
	wrongEmailFormat: string
	minPasswordCharacters: string
	passwordsMustBeTheSame: string
}

/** Минимальная длина пароля в формах входа и регистрации */
export const minPasswordLength = 6

export function useAuthValidationTexts(): AuthValidationTexts {
	const t = useTranslations('auth.validation')

	return useMemo(
		function () {
			return {
				requiredField: t('requiredField'),
				wrongEmailFormat: t('wrongEmailFormat'),
				minPasswordCharacters: t('minCharacters', { count: minPasswordLength }),
				passwordsMustBeTheSame: t('passwordsMustBeTheSame'),
			}
		},
		[t],
	)
}
