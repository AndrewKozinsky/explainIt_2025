import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useReadingStore } from '../readingStore'

const FETCH_GRAMMAR_CONCEPTS = gql`
	mutation fetchGrammarConcepts($input: FetchGrammarConceptsInput!) {
		grammar_concept_fetch(input: $input) {
			grammarConcepts {
				id
				title
				slug
				category
				lemma
				order
				sourceLanguage
				targetLanguage
			}
			missingGrammarConcepts {
				category
				lemma
			}
		}
	}
`

type FetchGrammarConceptsButtonProps = {
	sentenceId: number
	sentenceText: string
	sourceLanguage: string
}

export default function FetchGrammarConceptsButton(props: FetchGrammarConceptsButtonProps) {
	const { sentenceId, sentenceText, sourceLanguage } = props

	const populatedChapter = useReadingStore((s) => s.populatedChapter)
	const updatePopulatedChapter = useReadingStore((s) => s.updatePopulatedChapter)

	const [fetchGrammar] = useMutation(FETCH_GRAMMAR_CONCEPTS)
	const [loading, setLoading] = useState(false)

	async function handleClick() {
		setLoading(true)
		try {
			const { data } = await fetchGrammar({
				variables: {
					input: {
						sentenceText,
						sourceLanguage,
						targetLanguage: 'ru',
					},
				},
			})

			if (data?.grammar_concept_fetch) {
				const { grammarConcepts, missingGrammarConcepts } = data.grammar_concept_fetch

				const newSentences = populatedChapter.sentences.map((s) =>
					s.id === sentenceId
						? {
								...s,
								grammarConcepts: grammarConcepts ?? [],
								missingGrammarConcepts: missingGrammarConcepts ?? [],
							}
						: s,
				)
				updatePopulatedChapter({ ...populatedChapter, sentences: newSentences })
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<button onClick={handleClick} disabled={loading}>
			{loading ? 'Загрузка...' : 'Показать грамматику'}
		</button>
	)
}
