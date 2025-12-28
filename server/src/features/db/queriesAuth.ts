import { OAuthProviderType } from 'routes/auth/inputs/loginWithOAuth.input'
import RouteNames from 'infrastructure/routeNames'

export const queriesAuth = {
	registerUser(props: { email: string; password: string }) {
		return `mutation {
			  ${RouteNames.AUTH.REGISTER}(input: {
				email: "${props.email}",
				password: "${props.password}"
			  }) {
				id
				email
				isUserConfirmed
				balance
			  }
			}`
	},
	loginUserWithOAuth(props: { providerType: OAuthProviderType; code: string }) {
		return `mutation {
			  ${RouteNames.AUTH.LOGIN_WITH_OAUTH}(input: {
				providerType: "${props.providerType}",
				code: "${props.code}"
			  }) {
				id
				email
				isUserConfirmed
				balance
			  }
			}`
	},
	confirmEmail(code: string) {
		return `mutation {
				${RouteNames.AUTH.CONFIRM_EMAIL}(
					input: {
						code: "${code}",
					}
				)
			}`
	},
	login(props: { email: string; password: string }) {
		return `mutation {
			  ${RouteNames.AUTH.LOGIN}(
				input: {
				  email: "${props.email}",
				  password: "${props.password}"
				}
			) {
				id
				email
				isUserConfirmed
				balance
			  }
			}`
	},
	resendConfirmationEmail(email: string) {
		return `mutation {
			  ${RouteNames.AUTH.RESEND_CONFIRMATION_EMAIL}(
				input: {
				  email: "${email}",
				}
			  )
			}`
	},
	getMe() {
		return `query {
			  ${RouteNames.AUTH.GET_ME} {
				id
				email
			  }
			}`
	},
	logout() {
		return `mutation {
			  ${RouteNames.AUTH.LOGOUT}
			}`
	},
}
