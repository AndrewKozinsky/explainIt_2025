import Button from '@/ui/formRelated/buttons/Button/Button'
import { useGetFetchGrammarConcepts } from './fn/useGetFetchGrammarConcepts'

type FetchGrammarConceptsButtonProps = {
	sentenceId: number
	sentenceText: string
	sourceLanguage: string
}

export default function FetchGrammarConceptsButton(props: FetchGrammarConceptsButtonProps) {
	const { sentenceId, sentenceText, sourceLanguage } = props

	const { fetchGrammarConcepts, loading } = useGetFetchGrammarConcepts({
		sentenceId,
		sentenceText,
		sourceLanguage,
	})

	return (
		<Button onClick={fetchGrammarConcepts} disabled={loading} size='small' loading={loading} theme='outline'>
			Темы
		</Button>
	)
}
