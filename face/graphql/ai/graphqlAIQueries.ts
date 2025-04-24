import apolloClient from '../apollo'
import { AiCheckTranslation, AiCheckTranslationDocument } from '../index'

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
}
export default graphqlAIQueries
