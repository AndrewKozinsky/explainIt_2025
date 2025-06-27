import RouteNames from '../../infrastructure/routeNames'

export const queries = {
	auth: {
		registerUser(props: { email: string; password: string }) {
			return `mutation {
			  ${RouteNames.AUTH.REGISTER}(input: {
				email: "${props.email}",
				password: "${props.password}"
			  }) {
				id
				email
			  }
			}`
		},
		/*confirmEmail(code: string) {
			return `query {
				${RouteNames.AUTH.CONFIRM_EMAIL}(
					input: {
						code: "${code}",
					}
				)
			}`
		},*/
		/*login(props: { email: string; password: string }) {
			return `mutation {
			  ${RouteNames.AUTH.LOGIN}(
				input: {
				  email: "${props.email}",
				  password: "${props.password}"
				}
			) {
			  ... on AdminOutModel {
					id
					email
					role
				}
				... on SenderOutModel {
					id
					email
					firstName
					lastName
					passportNum
					balance
					active
					role
				}
			  }
			}`
		},*/
		/*resendConfirmationEmail(email: string) {
			return `mutation {
			  ${RouteNames.AUTH.RESEND_CONFIRMATION_EMAIL}(
				input: {
				  email: "${email}",
				}
				)
			}`
		},*/
		/*logout() {
			return `mutation {
			  ${RouteNames.AUTH.LOGOUT}
			}`
		},*/
		/*getNewAccessAndRefreshTokens() {
			return `mutation {
			  ${RouteNames.AUTH.GET_NEW_ACCESS_AND_REFRESH_TOKENS}
			}`
		},*/
		/*getMe() {
			return `query {
			  ${RouteNames.AUTH.GET_ME} {
				... on AdminOutModel {
					id
					email
					role
				}
				... on SenderOutModel {
					id
					email
					firstName
					lastName
					passportNum
					balance
					active
					role
				}
			  }
			}`
		},*/
	},
	ai: {
		checkTranslation(data: { rusSentence: string; engSentence: string }) {
			return `query {
				${RouteNames.AI.CHECK_TRANSLATION}(
					input: {
						rusSentence: "${data.rusSentence}",
						engSentence: "${data.engSentence}",
					}
				) {
			  ... on CheckTranslationOutSuccessModel {
				correct
				analysis
			  }
			  ... on CheckTranslationOutErrorModel {
				error
			  }
			}
			}`
		},
		getTranscription(data: { engSentence: string }) {
			return `query {
				${RouteNames.AI.GET_TRANSCRIPTION}(
					input: {
						engSentence: "${data.engSentence}",
					}
				) {
			  ... on GetTranscriptionOutSuccessModel {
				transcription
			  }
			  ... on GetTranscriptionOutErrorModel {
				error
			  }
			}
			}`
		},
	},
}
