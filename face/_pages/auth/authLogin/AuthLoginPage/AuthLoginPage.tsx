import React from 'react'
import { pageUrls } from '@/сonsts/pageUrls'
import { AuthFormParent } from '../../common/AuthFormParent/AuthFormParent'
import AuthLoginForm from '../AuthLoginForm/AuthLoginForm'

function AuthLoginPage() {
	return (
		<AuthFormParent
			pageTitle={pageUrls.auth.login.name}
			form={<AuthLoginForm />}
			afterFormLinks={[pageUrls.auth.register]}
		/>
	)
}

export default AuthLoginPage
