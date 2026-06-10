import { useState } from 'react'
import Button from '@/ui/formRelated/buttons/Button/Button'
import { ChapterTextStructurePopulated } from '_pages/media/reading/readingStore'
import GrammarArticleModal from '../GrammarArticleModal/GrammarArticleModal'
import './GrammarConceptLinks.scss'

type GrammarConceptLinksProps = {
	grammarConcepts: ChapterTextStructurePopulated.GrammarConceptData[]
	missingGrammarConcepts: ChapterTextStructurePopulated.MissingGrammarConceptData[]
}

export default function GrammarConceptLinks(props: GrammarConceptLinksProps) {
	const { grammarConcepts, missingGrammarConcepts } = props

	const [modalArticle, setModalArticle] = useState<ChapterTextStructurePopulated.GrammarConceptData | null>(null)

	return (
		<div className='grammar-concept-links'>
			{grammarConcepts.map((concept) => {
				return (
					<Button key={concept.id} size='small' theme='outline' onClick={() => setModalArticle(concept)}>
						{concept.title}
					</Button>
				)
			})}
			{missingGrammarConcepts.map((concept) => {
				return (
					<span className='grammar-concept-links__missed' key={`${concept.category}:${concept.alias}`}>
						{concept.alias}
					</span>
				)
			})}

			{modalArticle && (
				<GrammarArticleModal
					isOpen={true}
					onClose={() => setModalArticle(null)}
					title={modalArticle.title}
					sourceLanguage={modalArticle.sourceLanguage}
					targetLanguage={modalArticle.targetLanguage}
					category={modalArticle.category}
					slug={modalArticle.slug}
				/>
			)}
		</div>
	)
}
