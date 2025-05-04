import RouteNames from '../../infrastructure/routeNames'

export const queries = {
	ai: {
		/*checkTranslation(props: { email: string; password: string }) {
			return `mutation {
			  ${RouteNames.AI.CHECK_TRANSLATION}(input: {
				email: "${props.email}",
				password: "${props.password}"
			  }) {
				id
				email
				role
			  }
			}`
		},*/
		checkTranslation(data: { rusSentence: string; engSentence: string }) {
			return `query {
				${RouteNames.AI.CHECK_TRANSLATION}(
					input: {
						rusSentence: "${data.rusSentence}",
						engSentence: "${data.engSentence}",
					}
				) {
			  ... on SuccessResult {
				correct
				analysis
			  }
			  ... on ErrorResult {
				error
			  }
			}
			}`
		},
	},
}
