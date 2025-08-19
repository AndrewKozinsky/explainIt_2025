import RouteNames from '../../infrastructure/routeNames'
import { OAuthProviderType } from '../../routes/auth/inputs/loginWithOAuth.input'

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
	payment: {
		topUpBalanceWithYooKassa(amount: number) {
			return `mutation {
				${RouteNames.PAYMENT.YOOKASSA.TOP_UP_BALANCE}(
					input: {
						amount: ${amount},
					}
				) {
				  confirmationUrl
				}
			}`
		},
	},
	book: {
		create(dto: { author?: null | string; name?: null | string; note?: null | string }) {
			const { author, name, note } = dto

			const authorValue = author ? `"${author}"` : null
			const nameValue = name ? `"${name}"` : null
			const noteValue = note ? `"${note}"` : null

			return `mutation {
			  ${RouteNames.BOOK.CREATE}(input: {
				author: ${authorValue}
				name: ${nameValue}
				note: ${noteValue}
			  }) {
				id
				author
				name
				note
			  }
			}`
		},
		update(dto: { id: number; author?: null | string; name?: null | string; note?: null | string }) {
			const { id, author, name, note } = dto

			const authorValue = author ? `"${author}"` : null
			const nameValue = name ? `"${name}"` : null
			const noteValue = note ? `"${note}"` : null

			return `mutation {
			  ${RouteNames.BOOK.UPDATE}(input: {
			    id: ${id}
				author: ${authorValue}
				name: ${nameValue}
				note: ${noteValue}
			  }) {
				id
				author
				name
				note
			  }
			}`
		},
		getUserBooks() {
			return `query {
			  ${RouteNames.BOOK.GET_USER_BOOKS} {
				id
				author
				name
				note
			  }
			}`
		},
	},
}
