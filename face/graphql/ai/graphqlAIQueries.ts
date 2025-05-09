import apolloClient from '../apollo'
import {
	AiCheckTranslation,
	AiCheckTranslationDocument,
	AiGetTranscription,
	AiGetTranscriptionDocument,
} from '../index'

const graphqlAIQueries = {
	checkTranslation(data: { rusSentence: string; engSentence: string }) {
		return apolloClient.query<AiCheckTranslation>({
			query: AiCheckTranslationDocument,
			variables: {
				rusSentence: data.rusSentence,
				engSentence: data.engSentence,
			},
		})
	},
	getTranscription(data: { engSentence: string }) {
		return apolloClient.query<AiGetTranscription>({
			query: AiGetTranscriptionDocument,
			variables: {
				engSentence: data.engSentence,
			},
		})
	},
}
export default graphqlAIQueries
