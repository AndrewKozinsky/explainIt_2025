// 'use client'

// import BaseButton from '@/ui/BaseButton/BaseButton'
// import { ChapterTextStructurePopulated } from '_pages/media/reading/readingStore'
// import { computeArticleUrl } from './computeArticleUrl'
// import './GrammarConceptLinks.scss'

/*type GrammarConceptLinksProps = {
	grammarConcepts: ChapterTextStructurePopulated.GrammarConceptData[] | null
	missingGrammarConcepts: ChapterTextStructurePopulated.MissingGrammarConceptData[]
	loading: boolean
	onFetch: () => void
}*/

/*export default function GrammarConceptLinks(props: GrammarConceptLinksProps) {
	const { grammarConcepts, missingGrammarConcepts, loading, onFetch } = props

	return (
		<div className='grammar-concept-links'>
			{grammarConcepts === null && (
				<BaseButton
					theme='plain'
					extraClass='grammar-concept-links__fetch-button'
					onClick={onFetch}
					disabled={loading}
				>
					{loading ? 'Определяю...' : 'Определить грамматические конструкции'}
				</BaseButton>
			)}

			{grammarConcepts !== null && (grammarConcepts.length > 0 || missingGrammarConcepts.length > 0) && (
				<div className='grammar-concept-links__list'>
					{grammarConcepts.map((concept) => (
						<BaseButton
							key={concept.id}
							theme='plain'
							extraClass='grammar-concept-links__link'
							href={computeArticleUrl(concept.sourceLanguage, concept.category, concept.slug)}
						>
							{concept.title}
						</BaseButton>
					))}
					{missingGrammarConcepts.map((concept) => (
						<BaseButton
							key={`${concept.category}:${concept.lemma}`}
							theme='plain'
							extraClass='grammar-concept-links__link grammar-concept-links__link--missing'
						>
							{concept.lemma}
						</BaseButton>
					))}
				</div>
			)}
		</div>
	)
}*/
