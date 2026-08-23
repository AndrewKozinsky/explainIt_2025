import { AuthFormParent } from '@/entities/auth/ui/AuthFormParent/AuthFormParent'
import { pageUrls } from '@/shared/utils/pageUrls'
import AuthLoginForm from '@/widgets/auth/AuthLoginForm/AuthLoginForm'

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
