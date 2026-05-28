// import { useState } from 'react'
// import { gql, useMutation } from '@apollo/client'
// import { useReadingStore } from '../readingStore'
// import ChapterSentence from './ChapterSentence'
// import './ChapterContent.scss'

/*const FETCH_GRAMMAR_CONCEPTS = gql`
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
`*/

/*function ChapterContent() {
	const populatedChapter = useReadingStore((state) => state.populatedChapter)
	const selection = useReadingStore((state) => state.selection)
	const selectWord = useReadingStore((state) => state.selectWord)
	const book = useReadingStore((state) => state.book.data)
	const updatePopulatedChapter = useReadingStore((state) => state.updatePopulatedChapter)

	const [fetchGrammar] = useMutation(FETCH_GRAMMAR_CONCEPTS)
	const [loadingSentenceId, setLoadingSentenceId] = useState<number | null>(null)

	async function handleFetchGrammarConcepts(sentenceId: number) {
		setLoadingSentenceId(sentenceId)
		try {
			const sentence = populatedChapter.sentences.find((s) => s.id === sentenceId)
			if (!sentence) return

			const { data } = await fetchGrammar({
				variables: {
					input: {
						sentenceText: sentence.sentence,
						sourceLanguage: book?.languageCode || 'en',
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
			setLoadingSentenceId(null)
		}
	}

	return (
		<div className='chapter-content'>
			{populatedChapter.sentences.map((sentence) => {
				return (
					<ChapterSentence
						key={sentence.id}
						sentence={sentence}
						selectedSentenceId={selection.sentenceId}
						selectedWordId={selection.wordId}
						selectWord={selectWord}
						languageCode={book?.languageCode!}
						onFetchGrammarConcepts={handleFetchGrammarConcepts}
						grammarLoading={loadingSentenceId === sentence.id}
					/>
				)
			})}
		</div>
	)
}*/

// export default ChapterContent
