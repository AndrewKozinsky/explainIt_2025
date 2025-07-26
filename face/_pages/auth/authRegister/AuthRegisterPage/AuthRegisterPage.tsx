import React from 'react'
import { pageUrls } from '../../../../сonsts/pageUrls'
import AuthRegisterForm from '../AuthRegisterForm/AuthRegisterForm'
import { AuthFormParent } from '../../common/AuthFormParent/AuthFormParent'

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
