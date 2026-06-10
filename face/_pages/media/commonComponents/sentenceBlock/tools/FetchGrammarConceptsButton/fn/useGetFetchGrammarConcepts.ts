import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { tryUpdateReadingStore } from './updateReadingStore'
import { tryUpdateWatchingStore } from './updateWatchingStore'

const FETCH_GRAMMAR_CONCEPTS = gql`
	mutation fetchGrammarConcepts($input: FetchGrammarConceptsInput!) {
		grammar_concept_fetch(input: $input) {
			grammarConcepts {
				id
				title
				slug
				category
				order
				sourceLanguage
				targetLanguage
			}
			missingGrammarConcepts {
				category
				alias
			}
		}
	}
`

type UseGetFetchGrammarConceptsArgs = {
	sentenceId: number
	sentenceText: string
	sourceLanguage: string
}

export function useGetFetchGrammarConcepts({
	sentenceId,
	sentenceText,
	sourceLanguage,
}: UseGetFetchGrammarConceptsArgs) {
	const [fetchGrammar] = useMutation(FETCH_GRAMMAR_CONCEPTS)
	const [loading, setLoading] = useState(false)

	async function fetchGrammarConcepts() {
		setLoading(true)

		try {
			const { data } = await fetchGrammar({
				variables: {
					input: { sentenceText, sourceLanguage, targetLanguage: 'ru' },
				},
			})

			const result = data?.grammar_concept_fetch
			if (!result) return

			const grammarConcepts = result.grammarConcepts ?? []
			const missingGrammarConcepts = result.missingGrammarConcepts ?? []

			if (tryUpdateReadingStore(sentenceId, grammarConcepts, missingGrammarConcepts)) {
				return
			}

			tryUpdateWatchingStore(sentenceId, grammarConcepts, missingGrammarConcepts)
		} finally {
			setLoading(false)
		}
	}

	return { fetchGrammarConcepts, loading }
}
