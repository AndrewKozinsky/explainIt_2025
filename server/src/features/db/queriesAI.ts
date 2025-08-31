import RouteNames from 'infrastructure/routeNames'

export const queriesAI = {
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
}
