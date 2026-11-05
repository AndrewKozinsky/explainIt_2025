import React from 'react'
import { useTranslations } from 'next-intl'
import { AuthFormParent } from '@/entities/auth/ui/AuthFormParent/AuthFormParent'
import { pageUrls } from '@/shared/utils/pageUrls'
import AuthRegisterForm from '@/widgets/auth/AuthRegisterForm/AuthRegisterForm'

function AuthRegisterPage() {
	const t = useTranslations('pageUrls')

	return (
		<AuthFormParent
			pageTitle={t(pageUrls.auth.register.nameKey)}
			form={<AuthRegisterForm />}
			afterFormLinks={[pageUrls.auth.login]}
		/>
	)
}

export default AuthRegisterPage
