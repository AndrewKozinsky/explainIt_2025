import React from 'react'
import { pageUrls } from '../../../../сonsts/pageUrls'
import AuthLoginForm from '../AuthLoginForm/AuthLoginForm'
import { AuthFormParent } from '../../common/AuthFormParent/AuthFormParent'

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
