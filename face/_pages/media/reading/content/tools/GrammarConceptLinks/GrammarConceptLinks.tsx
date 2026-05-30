import Button from '@/ui/formRelated/buttons/Button/Button'
import { ChapterTextStructurePopulated } from '_pages/media/reading/readingStore'
import './GrammarConceptLinks.scss'

type GrammarConceptLinksProps = {
	grammarConcepts: ChapterTextStructurePopulated.GrammarConceptData[]
	missingGrammarConcepts: ChapterTextStructurePopulated.MissingGrammarConceptData[]
}

export default function GrammarConceptLinks(props: GrammarConceptLinksProps) {
	const { grammarConcepts, missingGrammarConcepts } = props

	return (
		<div className='grammar-concept-links'>
			{grammarConcepts.map((concept) => {
				return (
					<Button key={concept.id} size='small' theme='outline'>
						{concept.title}
					</Button>
				)
			})}
			{missingGrammarConcepts.map((concept) => {
				return (
					<Button key={`${concept.category}:${concept.lemma}`} size='small' theme='plain' disabled>
						{concept.lemma}
					</Button>
				)
			})}
		</div>
	)
}
