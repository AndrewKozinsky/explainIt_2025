import React from 'react'
import { AuthFormParent } from '@/entities/auth/ui/AuthFormParent/AuthFormParent'
import { pageUrls } from '@/shared/utils/pageUrls'
import AuthRegisterForm from '@/widgets/auth/AuthRegisterForm/AuthRegisterForm'

function AuthRegisterPage() {
	return (
		<AuthFormParent
			pageTitle={pageUrls.auth.register.name}
			form={<AuthRegisterForm />}
			afterFormLinks={[pageUrls.auth.login]}
		/>
	)
}

export default AuthRegisterPage
