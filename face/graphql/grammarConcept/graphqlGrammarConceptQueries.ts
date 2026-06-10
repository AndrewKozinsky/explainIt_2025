import apolloClient from '../apollo'
import { GrammarConceptsList, GrammarConceptsListDocument } from '../index'

const graphqlGrammarConceptQueries = {
	getConceptsList(data: { sourceLanguage: string; targetLanguage: string }) {
		return apolloClient.query<GrammarConceptsList>({
			query: GrammarConceptsListDocument,
			variables: {
				input: {
					sourceLanguage: data.sourceLanguage,
					targetLanguage: data.targetLanguage,
				},
			},
		})
	},
}

export default graphqlGrammarConceptQueries
