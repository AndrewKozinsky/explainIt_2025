import { useTranslations } from 'next-intl'
import { AuthFormParent } from '@/entities/auth/ui/AuthFormParent/AuthFormParent'
import { pageUrls } from '@/shared/utils/pageUrls'
import AuthLoginForm from '@/widgets/auth/AuthLoginForm/AuthLoginForm'

function AuthLoginPage() {
	const t = useTranslations('pageUrls')

	return (
		<AuthFormParent
			pageTitle={t(pageUrls.auth.login.nameKey)}
			form={<AuthLoginForm />}
			afterFormLinks={[pageUrls.auth.register]}
		/>
	)
}

export default AuthLoginPage
